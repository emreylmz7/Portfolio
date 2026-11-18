---
title: "Redis ve Elasticsearch ile API Yanıt Sürelerini 200ms'nin Altına Nasıl İndirdim"
description: "Bir seyahat rezervasyon platformunun aramasını Redis önbellekleme ve Elasticsearch indeksleme ile optimize etmeye dair gerçek bir vaka çalışması."
date: 2026-04-06
tags: ["Redis","Elasticsearch",".NET","Performans"]
minutes: 7
cover: ../../../assets/blog/redis-elasticsearch-api-performance.png
---

Yavaş API'ler kullanıcı deneyimini öldürür. Hi Travel'da günde 10.000'den fazla kullanıcıya hizmet veriyorduk ve rezervasyon arama endpoint'imizin yanıt vermesi 2 saniyeyi aşıyordu. Otel ayırtmaya çalışan biri için bu bir ömür demek. Bu yazıda Redis ve Elasticsearch kullanarak bu süreyi nasıl 200ms'nin altına indirdiğimi anlatıyorum.

## Sorun: SQL Sorguları Arama İçin Ölçeklenmiyor

Başlangıçtaki kurulumumuz basitti: full-text search özellikli bir MSSQL veritabanı. 1.000 kayıtla gayet iyi çalışıyordu, ama 50.000'i aşkın tur ve otele ulaştığımızda işler zorlaşmaya başladı:

- **Karmaşık filtre sorguları** (tarih aralığı + konum + fiyat + olanaklar) birden fazla JOIN'e takılıyordu
- Açıklamalar üzerindeki **full-text search** hem yavaş hem de isabetsizdi
- Saniyeler arayla yapılan birebir aynı aramalarda bile **her istek doğrudan veritabanına gidiyordu**

## 1. Adım: Arama İçin Elasticsearch

Elasticsearch tam olarak bu tür bir problem için tasarlanmış. SQL'i metin aramasına zorlamak yerine, aranabilir tüm verileri bir Elasticsearch index'ine taşıdım.

```csharp
public class TourSearchService : ITourSearchService
{
    private readonly IElasticClient _elastic;

    public async Task<SearchResult<TourDto>> SearchAsync(
        TourSearchQuery query,
        CancellationToken ct)
    {
        var response = await _elastic.SearchAsync<TourDocument>(s => s
            .Index("tours")
            .Query(q => q
                .Bool(b => b
                    .Must(
                        m => m.MultiMatch(mm => mm
                            .Fields(f => f
                                .Field(t => t.Title, 3)
                                .Field(t => t.Description))
                            .Query(query.SearchTerm)
                            .Fuzziness(Fuzziness.Auto)),
                        m => m.DateRange(r => r
                            .Field(t => t.AvailableFrom)
                            .LessThanOrEquals(query.CheckIn)),
                        m => m.Range(r => r
                            .Field(t => t.Price)
                            .LessThanOrEquals(query.MaxPrice))))), ct);

        return MapToResult(response);
    }
}
```

Önemli kararlar:
- Birebir isim eşleşmeleri üst sıralarda çıksın diye **başlık eşleşmelerine boost verdim** (3 kat ağırlık)
- **Fuzzy matching** yazım hatalarını otomatik olarak tolere ediyor
- Veritabanına birden fazla gidip gelmek yerine **filtreleri tek bir query'de birleştirdim**

Sonuç: Arama süresi ~2 saniyeden ~80ms'ye düştü.

## 2. Adım: Önbellekleme İçin Redis

Her isteğin Elasticsearch'e gitmesine gerek yok. Popüler aramalar ("Antalya otelleri" ya da "İstanbul turları" gibi) saatte yüzlerce kez tekrarlanıyor. Redis bu sonuçları önbelleğe alıyor.

```csharp
public class CachedSearchService : ITourSearchService
{
    private readonly ITourSearchService _inner;
    private readonly IDistributedCache _cache;

    public async Task<SearchResult<TourDto>> SearchAsync(
        TourSearchQuery query,
        CancellationToken ct)
    {
        var cacheKey = $"search:{query.ToHashKey()}";

        var cached = await _cache.GetStringAsync(cacheKey, ct);
        if (cached is not null)
            return JsonSerializer.Deserialize<SearchResult<TourDto>>(cached)!;

        var result = await _inner.SearchAsync(query, ct);

        await _cache.SetStringAsync(cacheKey,
            JsonSerializer.Serialize(result),
            new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
            }, ct);

        return result;
    }
}
```

Burada **decorator pattern** kullandım: önbellekli servis, asıl arama servisini sarmalıyor. Controller önbellekten haberdar değil, umursamıyor da.

## 3. Adım: Önbellek Geçersiz Kılma Stratejisi

Önbelleklemenin en zor kısmı, önbelleği ne zaman geçersiz kılacağını bilmek. Benim yaklaşımım şöyle:

- Arama sonuçları için **zamana dayalı expiration** (5 dakika): ilanlar için kabul edilebilir bir bayatlık
- Kritik veriler için **olaya dayalı invalidation**: bir rezervasyon yapıldığında ilgili ilanın önbelleği anında temizleniyor
- **Etiket tabanlı gruplama**: bir bölgeye yeni bir tur eklendiğinde o bölgeye ait tüm önbellekler temizlenebiliyor

## Rakamlar

| Metrik | Öncesi | Sonrası |
|--------|--------|-------|
| Ortalama yanıt süresi | 2.100ms | 180ms |
| P95 yanıt süresi | 4.500ms | 350ms |
| Arama başına veritabanı sorgusu | 5-8 | 0 (cache hit) veya 1 |
| Dönüşüm oranı | Başlangıç seviyesi | +%35 iyileşme |

Dönüşüm oranındaki %35'lik artış sadece hızdan kaynaklanmıyordu: daha hızlı arama, kullanıcıların daha fazla seçeneği keşfetmesi, daha fazla ilanı karşılaştırması ve sonunda rezervasyonu daha büyük bir güvenle yapması anlamına geliyor.

## Çıkardığım Dersler

1. **Erken optimizasyon yapmayın**, ama performansı da göz ardı etmeyin. Biz Redis/Elasticsearch'ü eklemeden önce gerçek kullanıcıların etkilenmeye başlamasını bekledik.
2. **Doğru katmanda önbellekleyin.** Veritabanına çok yakın bir katmanda önbelleklemek asıl amacı ıskalar. Servis katmanında önbelleklemek ise tüm hesaplamayı kapsar.
3. **Cache hit oranlarını izleyin.** Hiç isabet almayan bir önbellek, boşa harcanmış bellektir. Biz hit/miss oranlarını metrik dashboard'umuzda takip ediyoruz.
4. **Elasticsearch bir veritabanının yerini tutmaz.** MSSQL'i source of truth olarak tutuyor ve Elasticsearch'e asenkron olarak senkronize ediyoruz.

.NET API'niz arama performansında zorlanıyorsa, Redis + Elasticsearch kombinasyonu sahada kendini kanıtlamış bir çözüm ve kurulumuna harcadığınız zamana fazlasıyla değer.
