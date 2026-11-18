import type { L } from '@/i18n';

export interface Service {
  id: string;
  icon: 'layout' | 'code' | 'phone' | 'cart' | 'layers' | 'gauge';
  title: L;
  short: L;
  long: L;
  includes: L<string[]>;
  /** Illustration shown next to the service. */
  art: 'website' | 'dashboard' | 'mobile' | 'store' | 'integration' | 'support';
}

// Written for business owners, not developers: what they get, in plain words.
export const services: Service[] = [
  {
    id: 'websites',
    icon: 'layout',
    title: { en: 'Corporate websites', tr: 'Kurumsal web siteleri' },
    short: {
      en: 'Websites that present your brand clearly, load fast and let you manage the content yourself.',
      tr: 'Markanızı doğru anlatan, hızlı açılan ve içeriğini sizin yönetebildiğiniz web siteleri.',
    },
    long: {
      en: 'From a simple presentation site to a multilingual corporate site, I handle design, development and launch in one place, and deliver it with an admin panel so you can update content without technical help.',
      tr: 'Tanıtım sitesinden çok dilli kurumsal siteye kadar tasarımı, yazılımı ve yayını tek elden yapıyorum. İçerikleri teknik bilgi gerekmeden güncelleyebileceğiniz bir yönetim paneliyle teslim ediyorum.',
    },
    includes: {
      en: [
        'Modern, mobile-friendly design',
        'Content management panel',
        'Multiple languages',
        'SEO foundations and fast loading',
      ],
      tr: [
        'Mobil uyumlu, modern tasarım',
        'İçerik yönetim paneli',
        'Çok dil desteği',
        'SEO altyapısı ve hızlı açılış',
      ],
    },
    art: 'website',
  },
  {
    id: 'web-apps',
    icon: 'code',
    title: { en: 'Web applications & admin panels', tr: 'Web uygulamaları ve yönetim panelleri' },
    short: {
      en: 'Booking systems, customer portals and internal tools, shaped around how you work.',
      tr: 'Rezervasyon sistemleri, müşteri panelleri ve şirket içi araçlar; iş yapış şeklinize göre.',
    },
    long: {
      en: "When off-the-shelf software doesn't fit, I build the application around your process: screens, business rules, reports and user permissions shaped to your needs.",
      tr: 'Hazır yazılımlar işinize uymadığında uygulamayı sürecinize göre kurarım: ekranlar, iş kuralları, raporlar ve kullanıcı yetkileri sizin ihtiyacınıza göre şekillenir.',
    },
    includes: {
      en: [
        'Booking, order and tracking systems',
        'Admin panels with role-based access',
        'Reports, charts and Excel or PDF exports',
        'Delivered documented, with the source code',
      ],
      tr: [
        'Rezervasyon, sipariş ve takip sistemleri',
        'Rol bazlı yetkilendirmeli yönetim panelleri',
        'Raporlar, grafikler ve Excel ya da PDF çıktıları',
        'Kaynak koduyla birlikte, belgelenmiş teslim',
      ],
    },
    art: 'dashboard',
  },
  {
    id: 'mobile',
    icon: 'phone',
    title: { en: 'Mobile apps', tr: 'Mobil uygulamalar' },
    short: {
      en: 'Mobile apps for Android and iOS, from idea to store release.',
      tr: 'Android ve iOS için, fikir aşamasından mağazada yayına kadar mobil uygulamalar.',
    },
    long: {
      en: "I build apps that run in your customers' or your team's pocket and, when needed, the server side and admin panel behind them.",
      tr: 'Müşterilerinizin ya da ekibinizin cebinde çalışan uygulamalar geliştiriyorum. Gerekiyorsa uygulamanın arkasındaki sunucu tarafını ve yönetim panelini de birlikte kuruyorum.',
    },
    includes: {
      en: [
        'Android and iOS apps',
        'Server side and admin panel for the app',
        'Core features such as sign-in, notifications and payments',
        'Support through store publishing',
      ],
      tr: [
        'Android ve iOS uygulamaları',
        'Uygulamanın sunucu tarafı ve yönetim paneli',
        'Giriş, bildirim ve ödeme gibi temel özellikler',
        'Mağaza yayın sürecinde destek',
      ],
    },
    art: 'mobile',
  },
  {
    id: 'ecommerce',
    icon: 'cart',
    title: { en: 'E-commerce', tr: 'E-ticaret' },
    short: {
      en: 'An online store with order management and secure payment, ready to sell.',
      tr: 'Ürünlerinizi online satmanız için mağaza, sipariş yönetimi ve güvenli ödeme.',
    },
    long: {
      en: 'From catalog and cart to payment and order tracking, I set up your store and connect it to your payment provider, shipping and accounting systems.',
      tr: 'Katalogdan sepete, ödemeden sipariş takibine kadar e-ticaret sitenizi kurar; kullandığınız ödeme sağlayıcısına, kargo ve muhasebe sistemlerine bağlarım.',
    },
    includes: {
      en: [
        'Product catalog, cart and order management',
        'Virtual POS and 3D Secure payment integration',
        'Campaigns, coupons and stock management',
        'Accounting and shipping integrations',
      ],
      tr: [
        'Ürün kataloğu, sepet ve sipariş yönetimi',
        'Sanal POS ve 3D Secure ödeme entegrasyonu',
        'Kampanya, kupon ve stok yönetimi',
        'Muhasebe ve kargo entegrasyonları',
      ],
    },
    art: 'store',
  },
  {
    id: 'custom',
    icon: 'layers',
    title: { en: 'Custom software & integrations', tr: 'Özel yazılım ve entegrasyonlar' },
    short: {
      en: 'Software built for your business that connects your ERP, accounting and other systems.',
      tr: 'ERP, muhasebe ve diğer sistemlerinizi birbirine bağlayan, işinize özel yazılımlar.',
    },
    long: {
      en: "If your systems don't talk to each other, or the report you need isn't in any of them, I build the software that fills the gap: reporting panels, automations and integrations.",
      tr: 'Elinizdeki sistemler birbiriyle konuşmuyorsa ya da ihtiyacınız olan rapor hiçbirinde yoksa, aradaki boşluğu dolduran yazılımı geliştiririm: raporlama panelleri, otomasyonlar ve entegrasyonlar.',
    },
    includes: {
      en: [
        'Reporting and finance panels on top of your ERP',
        'Data transfer and automation between systems',
        'Integrations with official systems such as ÜTS',
        'New modules for your existing software',
      ],
      tr: [
        'ERP üzerine raporlama ve finans panelleri',
        'Sistemler arası veri aktarımı ve otomasyon',
        'ÜTS gibi resmî sistemlerle entegrasyon',
        'Mevcut yazılımınıza yeni modüller',
      ],
    },
    art: 'integration',
  },
  {
    id: 'support',
    icon: 'gauge',
    title: { en: 'Maintenance, support & improvement', tr: 'Bakım, destek ve iyileştirme' },
    short: {
      en: 'I take over your existing site or software, speed it up and keep it up to date.',
      tr: 'Mevcut sitenizi ya da yazılımınızı devralır, hızlandırır ve güncel tutarım.',
    },
    long: {
      en: "It doesn't matter if someone else built it. I fix bugs, speed up the slow parts, add new features and put the release process in order.",
      tr: 'Yazılımı başkası yapmış olsa da sorun değil. Hataları giderir, yavaş çalışan yerleri hızlandırır, yeni özellikler ekler ve yayın sürecini düzene sokarım.',
    },
    includes: {
      en: [
        'Bug fixes and updates',
        'Speed and performance improvements',
        'New feature development',
        'Hosting, releases and backups put in order',
      ],
      tr: [
        'Hata giderme ve güncellemeler',
        'Hız ve performans iyileştirme',
        'Yeni özellik geliştirme',
        'Sunucu, yayın ve yedekleme düzeni',
      ],
    },
    art: 'support',
  },
];
