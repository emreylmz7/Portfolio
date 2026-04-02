# Portfolio — Gelecekte Eklenebilecek Özellikler

## Tamamlanan

- ~~Formspree Entegrasyonu~~ — Contact formu aktif (`mjgpeprz`)
- ~~Proje Detay Sayfaları~~ — `/projects/[slug]` dinamik route + SEO metadata
- ~~Gerçek Proje Screenshot'ları~~ — 12 proje için gerçek görseller eklendi
- ~~Sitemap + robots.txt~~ — Static dosyalar + proje URL'leri eklendi
- ~~Open Graph Görseli~~ — `public/images/og-image.png` eklendi
- ~~Blog / Notlar Bölümü~~ — MDX blog, rehype-pretty-code syntax highlighting, Medium tarzı listeleme, cover image desteği

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
