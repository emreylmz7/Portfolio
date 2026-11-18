import type { L } from '@/i18n';

export interface Experience {
  company: string;
  /** File name (without .png) in src/assets/companies. Without it, the company name is shown instead. */
  logo?: string;
  url?: string;
  role: L;
  period: L;
  place: string;
  summary: L;
  points: L<string[]>;
  stack: string[];
}

export const experiences: Experience[] = [
  {
    company: 'Dotlantis',
    logo: 'dotlantis',
    url: 'https://dotlantis.com',
    role: { en: 'Software Engineer', tr: 'Yazılım Mühendisi' },
    period: { en: 'May 2025 – Present', tr: 'May 2025 – Günümüz' },
    place: 'Antalya',
    summary: {
      en: 'Designing and building scalable full-stack modules for enterprise clients with .NET Core and Clean Architecture.',
      tr: 'Kurumsal müşteriler için .NET Core ve Clean Architecture ile ölçeklenebilir full-stack modüller tasarlıyor ve geliştiriyorum.',
    },
    points: {
      en: [
        'Applying Domain-Driven Design to turn complex business needs into scalable applications',
        'Developing high-scale e-commerce platforms and custom automation tools from the ground up',
        'Integrating multi-vendor payment gateways and accounting software',
        'Automating deployment cycles with Docker and Azure DevOps',
      ],
      tr: [
        'Karmaşık iş ihtiyaçlarını Domain-Driven Design ile ölçeklenebilir uygulamalara dönüştürme',
        'Yüksek ölçekli e-ticaret platformlarını ve özel otomasyon araçlarını sıfırdan geliştirme',
        'Çoklu sağlayıcılı ödeme altyapıları ve muhasebe yazılımları entegrasyonu',
        'Docker ve Azure DevOps ile yayın süreçlerinin otomasyonu',
      ],
    },
    stack: ['.NET Core', 'Clean Architecture', 'DDD', 'Docker', 'Azure DevOps'],
  },
  {
    company: 'Hi Travel',
    logo: 'hi-travel',
    url: 'https://hitravel.com.tr',
    role: { en: 'Software Engineer, part-time', tr: 'Yazılım Mühendisi, yarı zamanlı' },
    period: { en: 'Feb 2025 – Present', tr: 'Şub 2025 – Günümüz' },
    place: 'Antalya',
    summary: {
      en: 'Building high-performance backend systems with .NET 8 and CQRS for a booking platform with 10,000+ daily users.',
      tr: "Günde 10.000'den fazla kullanıcısı olan bir rezervasyon platformu için .NET 8 ve CQRS ile yüksek performanslı backend sistemleri geliştiriyorum.",
    },
    points: {
      en: [
        'Reduced API response times to under 200 ms by integrating Redis and Elasticsearch',
        'Optimized booking processes, achieving a 35% improvement in conversion rate',
        'Automated CI/CD pipelines with GitHub Actions and Azure DevOps',
        'Developed responsive Angular / PWA components',
      ],
      tr: [
        "Redis ve Elasticsearch entegrasyonuyla API yanıt sürelerini 200 ms'nin altına indirme",
        'Rezervasyon süreçlerini iyileştirerek dönüşüm oranında %35 artış',
        'GitHub Actions ve Azure DevOps ile CI/CD otomasyonu',
        'Angular / PWA ile mobil uyumlu arayüz bileşenleri',
      ],
    },
    stack: ['.NET 8', 'CQRS', 'Redis', 'Elasticsearch', 'Angular', 'Azure DevOps'],
  },
  {
    company: 'Mutlu Yazılım',
    role: { en: 'Software Engineer', tr: 'Yazılım Mühendisi' },
    period: { en: 'Nov 2023 – Aug 2024', tr: 'Kas 2023 – Ağu 2024' },
    place: 'İzmir',
    summary: {
      en: 'Developed web applications with .NET Core and ASP.NET MVC for a range of client projects.',
      tr: 'Farklı müşteri projeleri için .NET Core ve ASP.NET MVC ile web uygulamaları geliştirdim.',
    },
    points: {
      en: [
        'Developed scalable web applications with .NET Core and ASP.NET MVC',
        'Optimized MSSQL database designs to improve system performance',
        'Built modern, responsive interfaces with Angular, React and TypeScript',
      ],
      tr: [
        '.NET Core ve ASP.NET MVC ile ölçeklenebilir web uygulamaları',
        'MSSQL veritabanı tasarımlarını iyileştirerek sistem performansını artırma',
        'Angular, React ve TypeScript ile modern, mobil uyumlu arayüzler',
      ],
    },
    stack: ['.NET Core', 'ASP.NET MVC', 'MSSQL', 'Angular', 'React', 'TypeScript'],
  },
  {
    company: 'Shipentegra',
    logo: 'shipentegra',
    url: 'https://shipentegra.com',
    role: { en: 'Software Development Intern', tr: 'Yazılım Geliştirme Stajyeri' },
    period: { en: 'Aug 2023 – Sep 2023', tr: 'Ağu 2023 – Eyl 2023' },
    place: 'İstanbul',
    summary: {
      en: 'Contributed to e-commerce web projects, building interfaces with React and Angular.',
      tr: 'E-ticaret web projelerinde React ve Angular ile arayüz geliştirmeye katkı sağladım.',
    },
    points: {
      en: [
        'Developed e-commerce web pages with React and Angular',
        'Helped design user-friendly interfaces and improve user experience',
      ],
      tr: [
        'React ve Angular ile e-ticaret sayfaları geliştirme',
        'Kullanıcı dostu arayüz tasarımına ve kullanıcı deneyiminin iyileştirilmesine destek',
      ],
    },
    stack: ['React', 'Angular', 'JavaScript'],
  },
];

const companyLogos = import.meta.glob<{ default: ImageMetadata }>('../assets/companies/*.png', { eager: true });

/**
 * A company's logo for light pages (<name>.png) and dark pages (<name>-light.png).
 * Logos that read well on both backgrounds only need the first file.
 */
export function companyLogo(name: string | undefined): { dark: ImageMetadata; light: ImageMetadata } | undefined {
  if (!name) return undefined;
  const find = (file: string) => Object.entries(companyLogos).find(([path]) => path.endsWith(`/${file}.png`))?.[1].default;
  const dark = find(name);
  return dark ? { dark, light: find(`${name}-light`) ?? dark } : undefined;
}

export const skillGroups: { title: L; items: string[] }[] = [
  {
    title: { en: 'Backend & core', tr: 'Backend ve temel' },
    items: ['C#', '.NET 6+', 'ASP.NET Core', 'EF Core', 'LINQ', 'REST APIs', 'RabbitMQ'],
  },
  {
    title: { en: 'Architecture', tr: 'Mimari' },
    items: ['Clean Architecture', 'CQRS', 'Microservices', 'DDD'],
  },
  {
    title: { en: 'Data & cache', tr: 'Veri ve önbellek' },
    items: ['MSSQL (T-SQL)', 'PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch'],
  },
  {
    title: { en: 'DevOps', tr: 'DevOps' },
    items: ['Docker', 'Azure DevOps', 'GitHub Actions', 'CI/CD'],
  },
  {
    title: { en: 'Frontend', tr: 'Frontend' },
    items: ['Angular', 'React', 'TypeScript', 'JavaScript', 'HTML / CSS'],
  },
  {
    title: { en: 'Testing & tools', tr: 'Test ve araçlar' },
    items: ['xUnit', 'NUnit', 'Jira', 'Agile / Scrum'],
  },
];

/** Short stack line shown under the hero. */
export const coreStack = [
  '.NET',
  'ASP.NET Core',
  'Angular',
  'React',
  'MSSQL',
  'PostgreSQL',
  'Redis',
  'Elasticsearch',
  'RabbitMQ',
  'Docker',
  'Azure DevOps',
];
