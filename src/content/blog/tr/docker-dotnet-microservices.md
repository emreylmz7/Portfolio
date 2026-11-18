---
title: ".NET Mikroservislerini Docker'a Taşımak: Pratik Bir Rehber"
description: "Multi-stage Dockerfile'lardan Docker Compose orkestrasyonuna: .NET mikroservislerinizi container'a taşımak için ihtiyacınız olan her şey."
date: 2026-04-03
tags: ["Docker",".NET","Mikroservis","DevOps"]
minutes: 7
cover: ../../../assets/blog/docker-dotnet-microservices.png
---

Üzerinde çalıştığım her mikroservis projesi Docker üzerinde çalışıyor. Docker, "benim makinemde çalışıyordu" sorununu ortadan kaldırıyor, deployment'ları tekrarlanabilir hâle getiriyor ve her servisi birbirinden bağımsız olarak ölçeklendirmenize imkân tanıyor. Bu yazıda .NET mikroservislerini container'a taşırken izlediğim pratik yaklaşımı anlatıyorum.

## Mikroservisler İçin Neden Docker?

Her birinin kendi bağımlılıkları ve çalışma zamanı gereksinimleri olan birden fazla servisiniz olduğunda (bir sipariş servisi, bir ödeme servisi, bir bildirim servisi gibi) Docker size şunları sağlar:

- **İzolasyon**: Her servis, kendi bağımlılıklarıyla birlikte kendi container'ında çalışır
- **Tutarlılık**: Aynı image development, staging ve production ortamlarında çalışır
- **Ölçeklenebilirlik**: Bildirim servisini 1 instance'ta tutarken ödeme servisini 5 instance'a çıkarabilirsiniz
- **Kolay yerel geliştirme**: `docker compose up` dersiniz ve her şey ayağa kalkar

## Dockerfile: Multi-Stage Build

.NET için iyi yapılandırılmış bir Dockerfile, final image'ı küçük tutmak için multi-stage build kullanır:

```dockerfile
# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj files first for layer caching
COPY ["src/OrderService.API/OrderService.API.csproj", "OrderService.API/"]
COPY ["src/OrderService.Application/OrderService.Application.csproj", "OrderService.Application/"]
COPY ["src/OrderService.Domain/OrderService.Domain.csproj", "OrderService.Domain/"]
COPY ["src/OrderService.Infrastructure/OrderService.Infrastructure.csproj", "OrderService.Infrastructure/"]
RUN dotnet restore "OrderService.API/OrderService.API.csproj"

# Copy everything and build
COPY src/ .
RUN dotnet publish "OrderService.API/OrderService.API.csproj" \
    -c Release -o /app/publish --no-restore

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine AS runtime
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 8080
ENTRYPOINT ["dotnet", "OrderService.API.dll"]
```

Öne çıkan optimizasyonlar:
- **Önce `.csproj` dosyalarını kopyalayın**: Docker restore adımını önbelleğe alır, böylece değişmeyen bağımlılıklar tekrar indirilmez
- **Alpine tabanlı image**: Tam Debian image'ındaki ~200MB yerine ~100MB
- **Runtime'da SDK yok**: Yalnızca ASP.NET runtime bulunur, bu da saldırı yüzeyini küçültür

## Yerel Geliştirme İçin Docker Compose

Birden fazla servis olduğunda her şeyi Docker Compose yönetir:

```yaml
services:
  order-service:
    build: ./src/OrderService
    ports:
      - "5001:8080"
    environment:
      - ConnectionStrings__Database=Server=db;Database=Orders;User=sa;Password=Strong@Pass1;TrustServerCertificate=true
      - RabbitMQ__Host=rabbitmq
    depends_on:
      db:
        condition: service_healthy
      rabbitmq:
        condition: service_healthy

  payment-service:
    build: ./src/PaymentService
    ports:
      - "5002:8080"
    environment:
      - ConnectionStrings__Database=Server=db;Database=Payments;User=sa;Password=Strong@Pass1;TrustServerCertificate=true
      - RabbitMQ__Host=rabbitmq
    depends_on:
      db:
        condition: service_healthy

  db:
    image: mcr.microsoft.com/mssql/server:2022-latest
    environment:
      - ACCEPT_EULA=Y
      - SA_PASSWORD=Strong@Pass1
    ports:
      - "1433:1433"
    healthcheck:
      test: /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "Strong@Pass1" -C -Q "SELECT 1"
      interval: 10s
      retries: 5

  rabbitmq:
    image: rabbitmq:3-management-alpine
    ports:
      - "5672:5672"
      - "15672:15672"
    healthcheck:
      test: rabbitmq-diagnostics -q ping
      interval: 10s
      retries: 5
```

Tek bir komutla, yani `docker compose up` ile SQL Server ve RabbitMQ dahil eksiksiz bir mikroservis ortamına sahip olursunuz.

## Health Check'ler ve Bağımlılıklar

`condition: service_healthy` ile birlikte kullanılan `depends_on` kısmına dikkat edin. Bu ayar, servislerin bağımlılıkları hazır olmadan başlamasını engeller. Bu olmadan API'niz, hâlâ ayağa kalkmakta olan bir veritabanına bağlanmaya çalışırken daha açılışta çöker.

.NET servisinize bir health check endpoint'i ekleyin:

```csharp
builder.Services.AddHealthChecks()
    .AddSqlServer(connectionString)
    .AddRabbitMQ(rabbitConnectionString);

app.MapHealthChecks("/health");
```

## Ortama Özel Yapılandırma

Docker, yapılandırmayı ortama göre değiştirmeyi kolaylaştırır. .NET'te ortam değişkenleri `appsettings.json` içindeki değerleri ezer:

```csharp
// appsettings.json — defaults for development
{
  "RabbitMQ": {
    "Host": "localhost",
    "Port": 5672
  }
}

// In Docker, override with environment variables:
// RabbitMQ__Host=rabbitmq
// RabbitMQ__Port=5672
```

Çift alt çizgi (`__`), JSON'daki iç içe yapıya karşılık gelir. Ortamlar arasında geçiş yaparken kodda hiçbir değişiklik yapmanız gerekmez.

## CI/CD Pipeline

Azure DevOps pipeline'ımızda her push şu adımları tetikliyor:

1. Her servisin Docker image'ını **build etmek**
2. **Testleri** bir container içinde (production ile aynı ortamda) **çalıştırmak**
3. **Image'ları** bir container registry'ye **push etmek**
4. Hedef ortama **deploy etmek**

```yaml
- task: Docker@2
  inputs:
    command: buildAndPush
    repository: $(imageRepository)
    dockerfile: $(dockerfilePath)
    containerRegistry: $(dockerRegistryConnection)
    tags: |
      $(Build.BuildId)
      latest
```

## Production'dan Çıkardığım Dersler

Birçok projede Docker'ı production'da çalıştırdıktan sonra öğrendiklerim şunlar:

1. Production'da **her zaman belirli image tag'leri kullanın**, asla `latest` kullanmayın. Sürpriz breaking change'lerle karşılaşmamak için base image'larınızı belirli bir sürüme sabitleyin.
2. **Log'ları dosyalara değil, stdout/stderr'e yazın.** Docker container log'larını otomatik olarak yakalar ve orkestratörünüz bunları istediğiniz yere iletebilir.
3. **Image'ları küçük tutun.** Deployment sırasında image'ları ağ üzerinden çekerken her megabayt önemlidir.
4. `bin/`, `obj/`, `.git/` ve diğer gereksiz dosyaları build context'inden hariç tutmak için **`.dockerignore` kullanın**.

Docker sadece bir deployment aracı değil; mikroservisleri ilk günden itibaren yönetilebilir kılan bir geliştirme aracı.
