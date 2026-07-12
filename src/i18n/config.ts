export const locales = ['fr', 'en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'fr'

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

/** Build the public URL for a path in a given locale (FR is unprefixed, EN uses /en). */
export function localizedPath(locale: Locale, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`
  return locale === 'fr' ? (clean === '/' ? '/' : clean) : `/en${clean === '/' ? '' : clean}`
}
