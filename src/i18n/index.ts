export const languages = { tr: 'Türkçe', en: 'English' } as const;
export type Lang = keyof typeof languages;

/** The language served at the site root. The other one lives under its own prefix. */
export const defaultLang: Lang = 'tr';

/** A value that exists in every language. */
export type L<T = string> = Record<Lang, T>;

/** Build a site-relative URL for a language. Turkish lives at the root, English under /en. */
export function href(lang: Lang, path = '/'): string {
  const clean = path === '/' ? '' : path.replace(/\/+$/, '');
  if (lang === defaultLang) return clean || '/';
  return `/${lang}${clean}`;
}

/** Language-independent path of the current page ("/en/about" -> "/about"). */
export function barePath(pathname: string): string {
  // The built homepage reports "/index.html", so "/index" has to collapse to "/".
  const p =
    pathname
      .replace(/\.html$/, '')
      .replace(/\/index$/, '')
      .replace(/\/+$/, '') || '/';

  for (const lang of Object.keys(languages)) {
    if (lang === defaultLang) continue;
    if (p === `/${lang}`) return '/';
    if (p.startsWith(`/${lang}/`)) return p.slice(lang.length + 1);
  }
  return p;
}

export function otherLang(lang: Lang): Lang {
  return lang === 'en' ? 'tr' : 'en';
}

const dateFormats: Record<Lang, Intl.DateTimeFormat> = {
  en: new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
  tr: new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' }),
};

export function formatDate(date: Date, lang: Lang): string {
  return dateFormats[lang].format(date);
}
