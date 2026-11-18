---
title: ".NET Mikroservislerinde RabbitMQ ile Event-Driven Mimari"
description: "Güvenilir asenkron iletişim için RabbitMQ ve MassTransit kullanarak mikroservislerinizi birbirinden nasıl ayırabileceğinizi anlatıyorum."
date: 2026-04-04
tags: ["RabbitMQ","Mikroservis",".NET","MassTransit"]
minutes: 8
cover: ../../../assets/blog/rabbitmq-event-driven-dotnet.png
---

Monolitik bir uygulamada kullanıcı sipariş verdiğinde her şey sırayla gerçekleşir: sipariş doğrulanır, ödeme alınır, onay e-postası gönderilir, stok güncellenir. E-posta servisi yavaşsa tüm istek yavaşlar. RabbitMQ, servisler arasında asenkron ve olay tabanlı (event-driven) iletişimi mümkün kılarak bu zinciri kırıyor.

## Senkron İletişimin Sorunu

Monolitik ya da sıkı bağlı (tightly-coupled) bir sistemdeki şu tipik akışa bakalım:

```csharp
// Synchronous — everything blocks
public async Task<Guid> PlaceOrder(PlaceOrderCommand command)
{
    var order = await _orderService.Create(command);
    await _paymentService.Charge(order);        // 500ms
    await _emailService.SendConfirmation(order); // 300ms
    await _inventoryService.Reserve(order);      // 200ms
    return order.Id;
    // Total: ~1000ms, and if email fails, the whole thing fails
}
```

Sorunlar:
- **Yavaş**: Kullanıcı tüm adımların tamamlanmasını bekliyor
- **Kırılgan**: Alt servislerden herhangi biri hata verirse sipariş de başarısız oluyor
- **Bağımlı**: Sipariş servisi ödemelerden, e-postalardan ve stoktan haberdar olmak zorunda

## RabbitMQ ile Event-Driven Yaklaşım

RabbitMQ ile sipariş servisi bir olay yayınlar ve yoluna devam eder. Diğer servisler bu olaya birbirinden bağımsız olarak tepki verir:

```csharp
// The order service publishes and returns immediately
public async Task<Guid> PlaceOrder(PlaceOrderCommand command)
{
    var order = await _orderService.Create(command);

    await _messageBus.PublishAsync(new OrderPlacedEvent
    {
        OrderId = order.Id,
        CustomerId = order.CustomerId,
        Items = order.Items,
        TotalAmount = order.TotalAmount
    });

    return order.Id;
    // Total: ~50ms — user gets instant response
}
```

Ödeme, e-posta ve stok servislerinin her biri bu olaya abone olur ve onu kendi hızında işler.

## .NET'te RabbitMQ Kurulumu

RabbitMQ'nun üzerinde bir soyutlama katmanı olarak MassTransit kullanıyorum. Serileştirme, retry politikaları ve hata kuyruklarını kutudan çıktığı haliyle hallediyor:

```csharp
// Program.cs — Producer setup
builder.Services.AddMassTransit(x =>
{
    x.UsingRabbitMq((context, cfg) =>
    {
        cfg.Host("rabbitmq", "/", h =>
        {
            h.Username("guest");
            h.Password("guest");
        });

        cfg.ConfigureEndpoints(context);
    });
});
```

## Bir Event Consumer Oluşturmak

Sipariş olaylarıyla ilgilenen her servis bir consumer oluşturur:

```csharp
// Payment Service — consumes OrderPlacedEvent
public class OrderPlacedConsumer : IConsumer<OrderPlacedEvent>
{
    private readonly IPaymentGateway _gateway;
    private readonly ILogger<OrderPlacedConsumer> _logger;

    public OrderPlacedConsumer(
        IPaymentGateway gateway,
        ILogger<OrderPlacedConsumer> logger)
    {
        _gateway = gateway;
        _logger = logger;
    }

    public async Task Consume(ConsumeContext<OrderPlacedEvent> context)
    {
        var message = context.Message;

        _logger.LogInformation(
            "Processing payment for order {OrderId}", message.OrderId);

        var result = await _gateway.ChargeAsync(
            message.CustomerId,
            message.TotalAmount);

        if (result.Success)
        {
            await context.Publish(new PaymentCompletedEvent
            {
                OrderId = message.OrderId,
                TransactionId = result.TransactionId
            });
        }
        else
        {
            await context.Publish(new PaymentFailedEvent
            {
                OrderId = message.OrderId,
                Reason = result.ErrorMessage
            });
        }
    }
}
```

Dikkat ederseniz ödeme servisi de olay yayınlıyor. E-posta servisi makbuz göndermek için `PaymentCompletedEvent` olayını, sipariş servisi de siparişi iptal etmek için `PaymentFailedEvent` olayını dinleyebilir. Her servis yalnızca ilgilendiği olaylardan haberdar.

## Retry ve Dead Letter Queue ile Hataları Yönetmek

Mesajlar zaman zaman başarısız olacaktır: ödeme altyapısı çökmüş olabilir, veritabanı geçici olarak erişilemez durumda olabilir. MassTransit, retry yapılandırmasını oldukça basit hale getiriyor:

```csharp
cfg.UseMessageRetry(r =>
{
    r.Intervals(
        TimeSpan.FromSeconds(1),
        TimeSpan.FromSeconds(5),
        TimeSpan.FromSeconds(15));
});
```

Tüm denemeler başarısız olursa mesaj bir **dead letter queue**'ya (hata kuyruğu) taşınır. Burada mesajı inceleyebilir, sorunu düzeltip tekrar işletebilirsiniz. Hiçbir veri kaybolmaz.

## Olay Akışı

Akışın tamamı şöyle görünüyor:

```
User places order
    → OrderService creates order
    → Publishes: OrderPlacedEvent
        → PaymentService charges card
            → Publishes: PaymentCompletedEvent
                → EmailService sends receipt
                → InventoryService reserves stock
        → (if fails) Publishes: PaymentFailedEvent
            → OrderService cancels order
            → EmailService sends failure notice
```

Her ok asenkron. Her servis birbirinden bağımsız olarak deploy edilebilir, ölçeklenebilir ve bakımı yapılabilir.

## Yerel Geliştirme için Docker Compose

RabbitMQ'yu yerelde çalıştırmak tek bir Docker komutu kadar kolay:

```yaml
rabbitmq:
  image: rabbitmq:3-management-alpine
  ports:
    - "5672:5672"    # AMQP protocol
    - "15672:15672"  # Management UI
```

`localhost:15672` adresindeki yönetim arayüzü kuyrukları, mesaj oranlarını ve consumer durumlarını görmenizi sağlıyor. Hata ayıklarken paha biçilmez.

## Öne Çıkanlar

1. **Komut değil, olay yayınlayın.** Olaylar ne olması gerektiğini (`ChargePayment`) değil, ne olduğunu (`OrderPlaced`) anlatır. Bu, servisleri birbirinden bağımsız tutar.
2. **Idempotency'yi baştan tasarlayın.** Mesajlar birden fazla kez iletilebilir. Consumer'larınız tekrarlanan mesajları sorunsuz şekilde ele alabilmeli.
3. **Kuyruklarınızı izleyin.** Büyüyen bir kuyruk, consumer'ların yetişemediği anlamına gelir. Sorun büyümeden alarm kurun.
4. **Basit başlayın.** Tam teşekküllü bir event sourcing sistemine ihtiyacınız yok. Yalnızca tek bir yavaş işlemi (örneğin e-posta gönderimini) ayırmak için RabbitMQ eklemek bile büyük bir kazanç.

RabbitMQ ile event-driven mimari, mikroservis geliştirme şeklimi kökten değiştirdi. İlk kurulum birkaç saat sürüyor ama sağladığı esneklik ve dayanıklılık harcanan her dakikaya değiyor.
