---
title: "Neden Her .NET Projemde Clean Architecture Kullanıyorum"
description: "Uzun vadede bakımı kolay .NET projeleri için Clean Architecture, CQRS ve MediatR ile proje yapılandırmaya dair pratik bir rehber."
date: 2026-04-01
tags: [".NET","Clean Architecture","CQRS"]
minutes: 6
cover: ../../../assets/blog/clean-architecture-dotnet.png
---

Profesyonel olarak backend sistemleri geliştirmeye başladığımda, bir projenin başlangıçtaki yapısının altı ay sonra işlerin ne kadar can sıkıcı hale geleceğini belirlediğini çok çabuk fark ettim. Bu yüzden Clean Architecture'ı erkenden benimsedim ve o günden beri ilk tercihim oldu.

## Geleneksel Katmanlı Yapının Sorunu

.NET eğitimlerinin çoğu basit bir üç katmanlı mimari öğretir: Controller → Service → Repository. Küçük projelerde gayet iyi çalışır, ama kod tabanı büyüdükçe şunlarla karşılaşırsınız:

- İş mantığını altyapı kaygılarıyla karıştıran **şişkin servisler**
- Entity Framework'e **sıkı bağımlılık**, bu da unit test yazmayı neredeyse imkânsız hale getirir
- Birbirinden bağımsız olması gereken katmanlar arasında **döngüsel bağımlılıklar**

## Clean Architecture Bunu Nasıl Çözüyor

Clean Architecture bağımlılık yönünü tersine çevirir. İş mantığı veritabanına bağımlı olmak yerine, veritabanı iş mantığına bağımlı olur. Çekirdek domain'in hiçbir dış bağımlılığı yoktur.

```csharp
// Domain Layer — pure business logic, no dependencies
public class Order
{
    public Guid Id { get; private set; }
    public OrderStatus Status { get; private set; }
    public decimal TotalAmount { get; private set; }

    public void Confirm()
    {
        if (Status != OrderStatus.Pending)
            throw new DomainException("Only pending orders can be confirmed.");

        Status = OrderStatus.Confirmed;
    }
}
```

Application katmanı, use case'leri command ve query'ler üzerinden yönetir:

```csharp
// Application Layer — use case orchestration with MediatR
public class ConfirmOrderCommandHandler : IRequestHandler<ConfirmOrderCommand>
{
    private readonly IOrderRepository _repository;
    private readonly IUnitOfWork _unitOfWork;

    public ConfirmOrderCommandHandler(
        IOrderRepository repository,
        IUnitOfWork unitOfWork)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
    }

    public async Task Handle(
        ConfirmOrderCommand request,
        CancellationToken cancellationToken)
    {
        var order = await _repository.GetByIdAsync(request.OrderId);
        order.Confirm();
        await _unitOfWork.SaveChangesAsync(cancellationToken);
    }
}
```

## Vazgeçilmez Proje Yapım

Başladığım her yeni proje şu klasör düzenini takip ediyor:

```
src/
├── Domain/           # Entities, Value Objects, Domain Events
├── Application/      # Commands, Queries, DTOs, Interfaces
├── Infrastructure/   # EF Core, External APIs, File Storage
└── Presentation/     # Controllers, Middleware, Filters
```

Her katman solution içinde ayrı bir proje olarak duruyor; böylece bağımlılık kuralları derleme zamanında zorunlu hale geliyor. Domain projesi hiçbir şeye referans vermiyor. Application yalnızca Domain'e referans veriyor. Infrastructure ve Presentation ise Application'a referans veriyor.

## Sonuç

Bu yapı sayesinde:

- Veritabanına hiç dokunmadan iş mantığı için **unit test yazabiliyorum**
- Domain kodunda tek bir satır değiştirmeden **altyapıyı değiştirebiliyorum** (örneğin SQL Server'dan PostgreSQL'e geçmek)
- Yapı öngörülebilir ve kendi kendini belgelediği için **yeni geliştiricileri** projeye daha hızlı **dahil edebiliyorum**
- Yeni özellikleri izole dikey dilimler (vertical slice) olarak ekleyerek **kod tabanını ölçeklendirebiliyorum**

## Son Söz

Clean Architecture başlangıçta biraz ek kurulum süresi gerektiriyor, ama karşılığında kazandırdıkları çok büyük. Bu yaklaşımla geliştirdiğim her projenin bakımı, test edilmesi ve genişletilmesi, bu yaklaşım olmadan geliştirdiklerime göre çok daha kolay oldu. Basit bir CRUD API'nin ötesinde bir şey üzerinde çalışıyorsanız, kesinlikle denemenizi tavsiye ederim.
