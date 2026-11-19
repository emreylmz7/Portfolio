export const site = {
  name: 'Veysel Emre Yılmaz',
  shortName: 'Emre Yılmaz',
  url: 'https://vemreyilmaz.com',
  email: 'yilmazvemre@gmail.com',
  location: { en: 'Antalya, Türkiye', tr: 'Antalya, Türkiye' },
  cv: '/docs/Veysel-Emre-Yilmaz-CV.pdf',
  // Public site key of the Turnstile widget on the contact form. The form posts to
  // functions/api/contact.ts, which holds the secret key and the Formspree form ID.
  turnstileSiteKey: '0x4AAAAAAGInSi-Upi91bH3B',
  github: 'https://github.com/emreylmz7',
  linkedin: 'https://linkedin.com/in/veysel-emre-yilmaz',
} as const;
