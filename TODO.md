# Portfolio — Gelecekte Eklenebilecek Özellikler

## Yüksek Öncelik

### Blog / Notlar Bölümü
- MDX ile teknik yazılar yazılabilir
- SEO için çok değerli (organik trafik çeker)
- `/blog` sayfası + `/blog/[slug]` detay sayfaları
- Kod syntax highlighting (rehype-pretty-code)
- Okuma süresi gösterimi

### Proje Detay Sayfaları
- `/projects/[slug]` dinamik route
- longDescription, tüm görseller, karşılaşılan problemler ve çözümler
- Proje mimarisi açıklaması
- Screenshot galerisi

### Gerçek Proje Screenshot'ları
- GitHub OG image'ları generic görünüyor
- Her proje için gerçek ekran görüntüleri ekle
- `public/images/projects/` klasörüne koy

### Formspree Entegrasyonu
- Contact formu şu an dummy
- https://formspree.io'dan ücretsiz hesap aç
- Form ID'yi `src/data/site-config.ts` → `formspreeId` alanına yaz

### Sitemap + robots.txt
- Arama motorları için gerekli
- `src/app/sitemap.ts` ve `src/app/robots.ts` dosyaları oluştur
- Next.js file convention ile otomatik üretilir

### Open Graph Görseli
- Sosyal medyada paylaşıldığında görünen görsel
- 1200x630px tasarla
- `public/images/og-image.png` olarak kaydet

---

## Orta Öncelik

### i18n (Çoklu Dil Desteği)
- Türkçe / İngilizce dil desteği
- Recruiter'lar için İngilizce, Türk müşteriler için Türkçe
- next-intl veya next-i18next kütüphanesi

### GitHub Stats Widget
- GitHub contribution graph veya repo istatistikleri
- GitHub API entegrasyonu
- Anasayfada veya About sayfasında gösterilebilir

### Analytics
- Vercel Analytics veya Umami (self-hosted, privacy-friendly)
- Ziyaretçi takibi, sayfa görüntülenme, trafik kaynakları
- Docker ile Umami kurulabilir (mevcut VPS'te)

### Testimonials / Referanslar
- Çalıştığın kişilerden kısa referans yazıları
- Kart formatında anasayfada veya ayrı bölümde

---

## Düşük Öncelik

### Smooth Page Transitions
- Sayfalar arası geçişte fade animasyonu
- Framer Motion `AnimatePresence` ile

### RSS Feed
- Blog eklendikten sonra RSS desteği
- Teknik topluluk takipçileri için

### Komut Paleti (Cmd+K)
- Site içi hızlı navigasyon
- cmdk kütüphanesi ile

### PWA Desteği
- Offline erişim
- Ana ekrana ekleme
- next-pwa kütüphanesi

---

## Notlar

- Değişiklik yaptıktan sonra `git push` yeterli — CI/CD otomatik deploy eder
- Site config: `src/data/site-config.ts`
- Projeler: `src/data/projects.ts`
- Deneyimler: `src/data/experience.ts`
- Yetenekler: `src/data/skills.ts`
