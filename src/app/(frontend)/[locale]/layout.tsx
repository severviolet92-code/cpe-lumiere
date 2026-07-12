import type { Metadata } from 'next'
import { Figtree, Fraunces } from 'next/font/google'
import { notFound } from 'next/navigation'
import React from 'react'

import '../globals.css'
import { SiteFooter } from '../../../components/SiteFooter'
import { SiteHeader } from '../../../components/SiteHeader'
import { isLocale, locales } from '../../../i18n/config'
import { t } from '../../../i18n/ui'
import { getPayload } from '../../../lib/payload'

const display = Fraunces({
  subsets: ['latin'],
  variable: '--next-font-display',
  display: 'swap',
})

const sans = Figtree({
  subsets: ['latin'],
  variable: '--next-font-sans',
  display: 'swap',
})

// Content edited in the CMS must appear immediately — render on demand.
export const dynamic = 'force-dynamic'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const payload = await getPayload()
  const settings = await payload.findGlobal({ slug: 'site-settings', locale })
  const name = settings?.cpeName || 'CPE'
  return {
    title: {
      default: name,
      template: `%s · ${name}`,
    },
    description: settings?.tagline || undefined,
  }
}

export default async function FrontendLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const payload = await getPayload()
  const settings = await payload.findGlobal({ slug: 'site-settings', locale })
  const dict = t(locale)

  return (
    <html lang={locale === 'fr' ? 'fr-CA' : 'en-CA'} className={`${display.variable} ${sans.variable}`}>
      <body>
        <a className="skip-link" href="#contenu">
          {dict.skipToContent}
        </a>
        <SiteHeader locale={locale} cpeName={settings?.cpeName || 'CPE'} />
        <main id="contenu">{children}</main>
        <SiteFooter locale={locale} settings={settings} />
      </body>
    </html>
  )
}
