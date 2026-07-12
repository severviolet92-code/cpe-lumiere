import type { Locale } from '../i18n/config'

export function formatDate(locale: Locale, iso: string): string {
  // Dates are stored as UTC midnight; format in UTC so the calendar day never shifts.
  return new Intl.DateTimeFormat(locale === 'fr' ? 'fr-CA' : 'en-CA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(iso))
}

export function formatDateRange(locale: Locale, startIso: string, endIso?: string | null): string {
  if (!endIso || endIso === startIso) return formatDate(locale, startIso)
  const sep = locale === 'fr' ? ' au ' : ' to '
  return `${formatDate(locale, startIso)}${sep}${formatDate(locale, endIso)}`
}
