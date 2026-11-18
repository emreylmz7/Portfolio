import type { ImageMetadata } from 'astro';
import type { L } from '@/i18n';

export type Category = 'fullstack' | 'backend' | 'frontend' | 'web' | 'mobile' | 'other';

/** product: built and owned end to end. client: work for a client. personal: side and open-source projects. */
export type Kind = 'product' | 'client' | 'personal';

export interface Project {
  slug: string;
  title: L;
  summary: L;
  body: L;
  features: L<string[]>;
  kind: Kind;
  category: Category;
  tags: string[];
  year?: number;
  /** Company the work was done at, shown on the card. */
  company?: string;
  /** The cover is a real screenshot and is shown inside a browser frame instead of being cropped. */
  shot?: boolean;
  github?: string;
  live?: string;
  /** Shown on the homepage, in this order. */
  featured?: boolean;
  /** Brand colour used to tint the background behind the screenshot. */
  tint?: string;
}

// Cover images live in src/assets/projects and are named after the project slug.
const covers = import.meta.glob<{ default: ImageMetadata }>('../assets/projects/*.{png,jpg,webp}', {
  eager: true,
});

export function coverFor(slug: string): ImageMetadata {
  const match = Object.entries(covers).find(([path]) =>
    path.split('/').pop()!.startsWith(`${slug}.`),
  );
  if (!match) throw new Error(`No cover image found for project "${slug}"`);
  return match[1].default;
}

// Product logos live in src/assets/logos as <slug>-dark.png (for light backgrounds) and <slug>-light.png.
const logos = import.meta.glob<{ default: ImageMetadata }>('../assets/logos/*.png', { eager: true });

export function logoFor(slug: string): { dark: ImageMetadata; light: ImageMetadata } | undefined {
  const find = (variant: string) =>
    Object.entries(logos).find(([path]) => path.endsWith(`/${slug}-${variant}.png`))?.[1].default;
  const dark = find('dark');
  const light = find('light');
  return dark && light ? { dark, light } : undefined;
}

// Tags are written in English. Technology names stay as they are; descriptive tags get a Turkish label.
const tagsTr: Record<string, string> = {
  Finance: 'Finans',
  'Real-time': 'Gerçek zamanlı',
  Reporting: 'Raporlama',
  'Medical devices': 'Tıbbi cihazlar',
  'Excel export': 'Excel dışa aktarma',
  'Role-based access': 'Rol bazlı yetki',
  Booking: 'Rezervasyon',
  'Admin panel': 'Yönetim paneli',
  'Dynamic content': 'Dinamik içerik',
  'Service requests': 'Servis talepleri',
  Portfolio: 'Portföy',
  Website: 'Web sitesi',
  Responsive: 'Mobil uyumlu',
  'Corporate website': 'Kurumsal web sitesi',
  Microservices: 'Mikroservis',
  Mobile: 'Mobil',
};

export function tagLabel(tag: string, lang: 'en' | 'tr'): string {
  return lang === 'tr' ? (tagsTr[tag] ?? tag) : tag;
}

export const projects: Project[] = [
  {
    slug: 'hi-travel-booking',
    title: { en: 'Hi Travel Booking Platform', tr: 'Hi Travel Rezervasyon Platformu' },
    summary: {
      en: 'Travel marketplace for tours, hotels and villas across Türkiye, serving 10,000+ daily users.',
      tr: "Türkiye genelinde tur, otel ve villa rezervasyonu sunan, günde 10.000'den fazla kullanıcıya hizmet veren seyahat platformu.",
    },
    body: {
      en: 'hitravel.com.tr is a travel marketplace for tours, hotels and villas. The focus was search and booking performance: with CQRS, Redis caching and Elasticsearch, API responses came down to under 200 ms.',
      tr: "hitravel.com.tr; tur, otel ve villa rezervasyonu sunan bir seyahat platformu. Odak noktası arama ve rezervasyon performansıydı: CQRS, Redis önbellekleme ve Elasticsearch ile API yanıt süreleri 200 ms'nin altına indi.",
    },
    features: {
      en: [
        'Core backend on .NET 8 with the CQRS pattern',
        'Redis caching and Elasticsearch search for sub-200 ms responses',
        'Booking flow optimization: 35% higher conversion rate',
        'Stripe and PayPal payment integration',
        'CI/CD automated with Azure DevOps',
        'Responsive Angular / PWA components',
      ],
      tr: [
        '.NET 8 ve CQRS deseniyle çekirdek backend',
        '200 ms altı yanıt için Redis önbellekleme ve Elasticsearch arama',
        'Rezervasyon akışı iyileştirmesi: dönüşüm oranında %35 artış',
        'Stripe ve PayPal ödeme entegrasyonu',
        'Azure DevOps ile otomatik CI/CD',
        'Angular / PWA ile mobil uyumlu bileşenler',
      ],
    },
    kind: 'client',
    category: 'fullstack',
    tags: ['.NET 8', 'CQRS', 'Redis', 'Elasticsearch', 'Angular', 'Azure DevOps'],
    year: 2025,
    live: 'https://hitravel.com.tr/tr',
    shot: true,
    featured: true,
    tint: '#f07a2b',
  },
  {
    slug: 'capitalist-panel',
    title: { en: 'Capitalist — ERP Finance Panel', tr: 'Capitalist — ERP Finans Paneli' },
    summary: {
      en: 'A finance and reporting panel on top of Bay.t ERP: profitability, cash flow and receivables in real time.',
      tr: 'Bay.t ERP üzerine kurulu finans ve raporlama paneli: kârlılık, nakit akışı ve alacaklar gerçek zamanlı.',
    },
    body: {
      en: 'Capitalist is a Dotlantis product that turns ERP data into a live picture of the business. It sits on top of Bay.t ERP as an analytics layer and shows management turnover, profit, cash flow and receivables on one modern dashboard, while each employee sees only the data relevant to their role.',
      tr: "Capitalist, ERP verisini işletmenin canlı bir görünümüne dönüştüren bir Dotlantis ürünü. Bay.t ERP'nin üzerine analiz katmanı olarak oturur; yönetime ciroyu, kârı, nakit akışını ve alacakları tek bir modern panelde gösterir, her çalışan ise yalnızca kendi rolüyle ilgili veriyi görür.",
    },
    features: {
      en: [
        'Dashboard with turnover, gross and net profit, net VAT, profit margins and period comparisons',
        'Daily, weekly and monthly cash-flow charts across cash registers and bank accounts',
        'Profitability analysis by product, customer and invoice',
        'Current accounts with debt, credit and balance filters, plus maturity analysis',
        'Cheque and promissory-note tracking; orders and dispatch notes',
        'Sales rep performance tracking',
        'In-panel support tickets with urgency levels',
        'PDF and Excel export, role-based access, light and dark themes',
      ],
      tr: [
        'Ciro, brüt ve net kâr, net KDV, kâr marjları ve dönem karşılaştırmaları içeren kontrol paneli',
        'Kasa ve banka hesapları için günlük, haftalık ve aylık nakit akışı grafikleri',
        'Ürün, müşteri ve fatura bazında kârlılık analizi',
        'Borç, alacak ve bakiye filtreleriyle cari hesaplar; vade analizi',
        'Çek ve senet takibi; sipariş ve irsaliye süreçleri',
        'Satış temsilcisi performans takibi',
        'Panel içinden aciliyet seviyeli destek talepleri',
        'PDF ve Excel dışa aktarım, rol bazlı erişim, açık ve koyu tema',
      ],
    },
    kind: 'product',
    category: 'fullstack',
    tags: ['.NET', 'ERP', 'Finance', 'Real-time', 'Reporting'],
    year: 2025,
    company: 'Dotlantis',
    live: 'https://capitalist.dotlantis.com',
    shot: true,
    featured: true,
    tint: '#3b6ff6',
  },
  {
    slug: 'mono-uts',
    title: { en: 'Mono ÜTS — Product Tracking Panel', tr: 'Mono ÜTS — Ürün Takip Sistemi Paneli' },
    summary: {
      en: "A single panel for managing ÜTS (Türkiye's medical device tracking system) notifications, queries and reports.",
      tr: 'ÜTS (Ürün Takip Sistemi) bildirimlerini, sorgularını ve raporlarını tek yerden yönetmeyi sağlayan panel.',
    },
    body: {
      en: 'Managing ÜTS processes means dispatch and receipt notifications, cancellations, queries and reports scattered across different places. Mono ÜTS brings the whole workflow into one fast, organized panel, so companies keep control of every movement of their medical devices and products.',
      tr: "ÜTS süreçleri; verme ve alma bildirimleri, iptaller, sorgulamalar ve raporlar arasında dağılan, hataya açık bir iş. Mono ÜTS tüm bu akışı hızlı ve düzenli tek bir panelde toplar; firmalar tıbbi cihaz ve ürünlerinin her hareketini kontrol altında tutar.",
    },
    features: {
      en: [
        'Dashboard summarizing notifications, cancellations, pending and suspended transactions, failed notifications and products nearing expiry',
        'Dispatch, receipt, consumer-dispatch and undefined-destination notifications, with their cancellations',
        'Product, company and notification queries with full notification detail',
        'Dispatch and receipt reports with Excel export',
        'Multi-user company management with role-based permissions',
        'License validity tracking with renewal reminders',
        'Responsive interface with light and dark themes',
      ],
      tr: [
        "Bildirimleri, iptalleri, bekleyen ve askıdaki işlemleri, başarısız bildirimleri ve SKT'si yaklaşan ürünleri özetleyen kontrol paneli",
        'Verme, alma, tüketiciye verme ve tanımsız yere verme bildirimleri ile iptalleri',
        'Ürün, firma ve bildirim sorgulama; her bildirimin tüm detayı',
        "Verme ve alma raporları, Excel'e aktarım",
        'Rol bazlı yetkilerle çok kullanıcılı şirket yönetimi',
        'Lisans geçerliliği takibi ve yenileme hatırlatmaları',
        'Açık ve koyu temalı, mobil uyumlu arayüz',
      ],
    },
    kind: 'product',
    category: 'fullstack',
    tags: ['ÜTS', 'Medical devices', 'Reporting', 'Excel export', 'Role-based access'],
    company: 'Dotlantis',
    live: 'https://uts.dotlantis.com',
    shot: true,
    featured: true,
    tint: '#0f8a76',
  },
  {
    slug: 'pusula-tatil',
    title: {
      en: 'Pusula Tatil — Hotel & Holiday Booking Platform',
      tr: 'Pusula Tatil — Otel ve Tatil Rezervasyon Platformu',
    },
    summary: {
      en: 'End-to-end hotel booking platform: search and compare hotels, pick a room and pay online with 3D Secure.',
      tr: 'Uçtan uca otel rezervasyon platformu: otel arama ve karşılaştırma, oda seçimi ve 3D Secure ile online ödeme.',
    },
    body: {
      en: 'Pusula Tatil lets users search and compare thousands of hotels in seconds, choose a room and complete the reservation with secure online payment. It was built from the ground up at Dotlantis and is integrated with real payment and reservation systems.',
      tr: "Pusula Tatil, kullanıcıların binlerce oteli saniyeler içinde arayıp karşılaştırmasını, oda seçmesini ve rezervasyonu güvenli online ödemeyle tamamlamasını sağlar. Dotlantis'te sıfırdan geliştirildi; gerçek ödeme ve rezervasyon sistemleriyle entegre çalışır.",
    },
    features: {
      en: [
        'Hotel search with destination autocomplete, dates, room count and guest ages in one form',
        'Server-side filtering by price, facilities, board type, theme and campaign, with sorting and pagination',
        'Hotel pages with rooms, photos, amenities and prices that also open from shared links',
        'Step-by-step booking flow with guest details, discount coupons and agreement approvals, protected by route guards',
        '3D Secure payment over NestPay with BIN-based card detection, regional installment rules and individual or corporate invoicing',
        'Membership, user accounts, blog and legal pages in one product',
        'Angular 18 standalone components with lazy-loaded pages, result caching and request deduplication',
      ],
      tr: [
        'Bölge otomatik tamamlama, tarih, oda sayısı ve misafir yaşlarını tek formda toplayan otel arama',
        'Fiyat, tesis özellikleri, pansiyon tipi, tema ve kampanyaya göre sunucu taraflı filtreleme; sıralama ve sayfalama',
        'Oda, fotoğraf, olanak ve fiyatlarıyla otel sayfaları; paylaşılan bağlantıdan da açılır',
        'Misafir bilgileri, indirim kuponları ve sözleşme onaylarıyla adım adım rezervasyon akışı; route guard korumalı',
        'NestPay üzerinden 3D Secure ödeme: BIN ile kart tanıma, bölgeye göre taksit kuralları, bireysel ve kurumsal fatura',
        'Üyelik, kullanıcı hesabı, blog ve yasal sayfalar tek üründe',
        'Angular 18 standalone bileşenler; lazy-load sayfalar, sonuç önbelleği ve tekrarlanan isteklerin birleştirilmesi',
      ],
    },
    kind: 'client',
    category: 'fullstack',
    tags: ['Angular 18', 'Angular Material', 'NestPay 3D Secure', 'TypeScript', 'Booking'],
    company: 'Dotlantis',
    live: 'https://pusulatatil.com',
    shot: true,
    featured: true,
    tint: '#2f4fd8',
  },
  {
    slug: 'ecommerce-microservices',
    title: {
      en: 'E-Commerce Microservices Platform',
      tr: 'Mikroservis Tabanlı E-Ticaret Platformu',
    },
    summary: {
      en: 'E-commerce platform on ASP.NET Core with independent services for catalog, orders, auth and payment.',
      tr: 'Katalog, sipariş, kimlik doğrulama ve ödeme için bağımsız servislerden oluşan ASP.NET Core e-ticaret platformu.',
    },
    body: {
      en: 'A full e-commerce platform designed with a microservices architecture on ASP.NET Core. Each service runs independently in its own Docker container, with a responsive storefront for browsing products, managing the cart and placing orders.',
      tr: 'ASP.NET Core üzerinde mikroservis mimarisiyle tasarlanmış eksiksiz bir e-ticaret platformu. Her servis kendi Docker konteynerinde bağımsız çalışır; ürünlere göz atma, sepet yönetimi ve sipariş için mobil uyumlu bir mağaza arayüzü içerir.',
    },
    features: {
      en: [
        'Separate services for product catalog, order management, authentication and payment',
        'Each service containerized with Docker',
        'Inter-service communication and centralized logging',
        'Responsive storefront with cart and checkout',
      ],
      tr: [
        'Ürün kataloğu, sipariş yönetimi, kimlik doğrulama ve ödeme için ayrı servisler',
        'Her servis Docker ile konteynerleştirildi',
        'Servisler arası iletişim ve merkezi loglama',
        'Sepet ve ödeme adımlarını içeren mobil uyumlu mağaza arayüzü',
      ],
    },
    kind: 'personal',
    category: 'fullstack',
    tags: ['ASP.NET Core', 'Microservices', 'Docker', 'HTML', 'CSS'],
    year: 2024,
    github: 'https://github.com/emreylmz7/ECommerceApp',
  },
  {
    slug: 'clean-architecture-setup',
    title: { en: 'Clean Architecture Setup', tr: 'Clean Architecture Setup' },
    summary: {
      en: 'A production-ready Clean Architecture template for .NET with CQRS, .NET Aspire and Scalar.',
      tr: 'CQRS, .NET Aspire ve Scalar içeren, canlıya hazır .NET Clean Architecture şablonu.',
    },
    body: {
      en: 'A starting template for .NET projects with best practices already in place, so a new project begins from a tested structure instead of an empty solution.',
      tr: 'En iyi pratiklerin hazır geldiği bir .NET başlangıç şablonu; yeni proje boş bir solution yerine denenmiş bir yapıdan başlar.',
    },
    features: {
      en: [
        'Layered separation: Domain, Application, Infrastructure, Presentation',
        'CQRS with MediatR and FluentValidation',
        '.NET Aspire for orchestration',
        'Scalar for interactive API documentation',
      ],
      tr: [
        'Katmanlı ayrım: Domain, Application, Infrastructure, Presentation',
        'MediatR ve FluentValidation ile CQRS',
        'Orkestrasyon için .NET Aspire',
        'Etkileşimli API dokümantasyonu için Scalar',
      ],
    },
    kind: 'personal',
    category: 'backend',
    tags: ['C#', '.NET', 'Clean Architecture', 'Aspire', 'Scalar'],
    year: 2025,
    github: 'https://github.com/emreylmz7/CleanArchitectureSetup',
  },
  {
    slug: 'medical-dictionary',
    title: { en: 'Medical Dictionary App', tr: 'Tıp Sözlüğü Uygulaması' },
    summary: {
      en: 'Native Android app in Kotlin for medical students to search and explore medical terms.',
      tr: 'Tıp öğrencilerinin tıbbi terimleri arayıp keşfetmesi için Kotlin ile geliştirilen Android uygulaması.',
    },
    body: {
      en: 'A native Android application for medical students and healthcare professionals, designed with Material Design principles.',
      tr: 'Tıp öğrencileri ve sağlık çalışanları için Material Design ilkeleriyle tasarlanmış yerel bir Android uygulaması.',
    },
    features: {
      en: [
        'Instant search with autocomplete',
        'Detailed definitions with related terms',
        'Bookmarks for frequently used entries',
        'Offline-first: content is available without a connection',
      ],
      tr: [
        'Otomatik tamamlamalı anlık arama',
        'İlişkili terimlerle ayrıntılı tanımlar',
        'Sık kullanılan terimler için yer imleri',
        'Çevrimdışı öncelikli: içerik bağlantı olmadan da erişilebilir',
      ],
    },
    kind: 'personal',
    category: 'mobile',
    tags: ['Kotlin', 'Android', 'Mobile', 'UI/UX'],
    year: 2025,
    github: 'https://github.com/emreylmz7/MedicalDictionary',
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const professionalProjects = projects.filter((p) => p.kind !== 'personal');
export const personalProjects = projects.filter((p) => p.kind === 'personal');

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
