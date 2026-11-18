---
title: "MediatR ile .NET'te CQRS Pattern'ine Giriş"
description: "MediatR ve FluentValidation ile Command Query Responsibility Segregation'ı adım adım uygulamaya yönelik bir rehber."
date: 2026-04-02
tags: [".NET","CQRS","MediatR","Mimari"]
minutes: 8
cover: ../../../assets/blog/cqrs-pattern-dotnet-guide.png
---

CQRS, yani Command Query Responsibility Segregation, kulağa göz korkutucu gelse de temel fikri oldukça basit: veriyi okuyan kodu, veriyi yazan koddan ayırmak. Kullanmaya başladıktan sonra ikisini tek bir service sınıfında karıştırmaya bir daha hiç geri dönmedim.

## Okuma ve Yazma Neden Ayrılmalı?

Geleneksel bir service'te her şeyi tek bir sınıf üstlenir:

```csharp
// Traditional approach — one service does it all
public class OrderService
{
    public OrderDto GetById(Guid id) { /* read logic */ }
    public List<OrderDto> GetFiltered(OrderFilter filter) { /* read logic */ }
    public void CreateOrder(CreateOrderDto dto) { /* write logic */ }
    public void CancelOrder(Guid id) { /* write logic */ }
    public void UpdateShipping(Guid id, ShippingDto dto) { /* write logic */ }
}
```

Bu yaklaşım şu durumlara kadar gayet iyi görünür:
- Okuma modellerinin yazma modellerinden farklı şekillere ihtiyaç duyması (liste görünümü, detay görünümü, admin görünümü)
- Yazma işlemlerindeki karmaşık doğrulamanın okuma tarafını kirletmesi
- Okuma ve yazmayı birbirinden bağımsız ölçeklendirmek istemeniz
- Service sınıfının 500 satırı aşıp bakımı zor bir hale gelmesi

## CQRS Çözümü

Her şeyi **Command**'lar (yazma) ve **Query**'ler (okuma) olarak ikiye ayırırsınız; her birini kendine ait bir handler işler.

```csharp
// Command — represents an intent to change state
public record CreateOrderCommand(
    Guid CustomerId,
    List<OrderItemDto> Items,
    string ShippingAddress) : IRequest<Guid>;

// Command Handler — contains write logic
public class CreateOrderCommandHandler
    : IRequestHandler<CreateOrderCommand, Guid>
{
    private readonly IOrderRepository _repository;
    private readonly IUnitOfWork _unitOfWork;

    public CreateOrderCommandHandler(
        IOrderRepository repository,
        IUnitOfWork unitOfWork)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
    }

    public async Task<Guid> Handle(
        CreateOrderCommand request,
        CancellationToken ct)
    {
        var order = Order.Create(
            request.CustomerId,
            request.Items,
            request.ShippingAddress);

        _repository.Add(order);
        await _unitOfWork.SaveChangesAsync(ct);

        return order.Id;
    }
}
```

```csharp
// Query — represents a request for data
public record GetOrderByIdQuery(Guid OrderId)
    : IRequest<OrderDetailDto>;

// Query Handler — contains read logic
public class GetOrderByIdQueryHandler
    : IRequestHandler<GetOrderByIdQuery, OrderDetailDto>
{
    private readonly IOrderReadRepository _readRepository;

    public GetOrderByIdQueryHandler(
        IOrderReadRepository readRepository)
    {
        _readRepository = readRepository;
    }

    public async Task<OrderDetailDto> Handle(
        GetOrderByIdQuery request,
        CancellationToken ct)
    {
        return await _readRepository
            .GetDetailByIdAsync(request.OrderId, ct)
            ?? throw new NotFoundException("Order", request.OrderId);
    }
}
```

## MediatR Kurulumu

MediatR, command ve query'leri ilgili handler'lara yönlendiren yapıştırıcıdır. Kurulumu oldukça sade:

```csharp
// Program.cs
builder.Services.AddMediatR(cfg =>
    cfg.RegisterServicesFromAssembly(
        typeof(CreateOrderCommand).Assembly));
```

Ardından controller'ınızda:

```csharp
[ApiController]
[Route("api/orders")]
public class OrdersController : ControllerBase
{
    private readonly ISender _sender;

    public OrdersController(ISender sender) => _sender = sender;

    [HttpPost]
    public async Task<IActionResult> Create(CreateOrderCommand command)
    {
        var id = await _sender.Send(command);
        return CreatedAtAction(nameof(GetById), new { id }, null);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var order = await _sender.Send(new GetOrderByIdQuery(id));
        return Ok(order);
    }
}
```

Controller ince kalır; tek yaptığı isteği iletmektir. Tüm iş mantığı handler'larda yaşar.

## Pipeline Behavior'larla Doğrulama Eklemek

MediatR'ın en iyi özelliklerinden biri pipeline behavior'lar. Hiçbir handler'a dokunmadan cross-cutting concern'leri ekleyebilirsiniz:

```csharp
public class ValidationBehavior<TRequest, TResponse>
    : IPipelineBehavior<TRequest, TResponse>
    where TRequest : IRequest<TResponse>
{
    private readonly IEnumerable<IValidator<TRequest>> _validators;

    public ValidationBehavior(
        IEnumerable<IValidator<TRequest>> validators)
    {
        _validators = validators;
    }

    public async Task<TResponse> Handle(
        TRequest request,
        RequestHandlerDelegate<TResponse> next,
        CancellationToken ct)
    {
        var context = new ValidationContext<TRequest>(request);

        var failures = _validators
            .Select(v => v.Validate(context))
            .SelectMany(r => r.Errors)
            .Where(f => f is not null)
            .ToList();

        if (failures.Count > 0)
            throw new ValidationException(failures);

        return await next();
    }
}
```

Her command, handler'ına ulaşmadan önce otomatik olarak doğrulanır. Elle doğrulama çağrısı yapmaya gerek kalmaz.

## CQRS Ne Zaman Kullanılmalı?

CQRS biraz boilerplate getiriyor; her işlem için bir request sınıfı ve bir handler gerekiyor. Şu durumlarda buna kesinlikle değer:

- **Domain'inizde izole edilmekten fayda sağlayacak karmaşık yazma mantığı varsa**
- **Okuma modelleri yazma modellerinden belirgin şekilde farklıysa**
- **Temiz ve test edilebilir kod istiyorsanız**: her handler'ın tek bir sorumluluğu vardır
- **Ekibiniz büyüyorsa**: yeni geliştiriciler çakışma yaşamadan tek tek handler'lar üzerinde çalışabilir

İş mantığı olmayan basit CRUD uygulamaları için CQRS fazla kaçabilir. Ama gerçek bir domain karmaşıklığı olan her projede, kendini çok hızlı amorti ediyor.

## Sonuç

MediatR ile CQRS, .NET araç kutumun standart bir parçası haline geldi. Dayattığı ayrım; test etmesi, anlaması ve değiştirmesi daha kolay, küçük ve odaklı sınıflar ortaya çıkarıyor. Clean Architecture ile birleştiğinde de ekibinizle ve gereksinimlerinizle birlikte ölçeklenen bir kod tabanı oluşturuyor.
