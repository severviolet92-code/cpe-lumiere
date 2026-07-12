import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Reveal } from '../../../../components/Reveal'
import { isLocale, localizedPath, type Locale } from '../../../../i18n/config'
import { t } from '../../../../i18n/ui'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === 'fr' ? 'Portail parents' : 'Parent portal',
    robots: { index: false },
    alternates: {
      canonical: locale === 'fr' ? '/portail' : '/en/portail',
      languages: { 'fr-CA': '/portail', 'en-CA': '/en/portail' },
    },
  }
}

export default async function PortalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale: Locale = rawLocale
  const dict = t(locale)

  return (
    <section className="section">
      <div className="container text-center" style={{ maxWidth: '640px' }}>
        <Reveal>
          <p className="eyebrow">{dict.portal.title}</p>
          <h1>{dict.portal.soon}</h1>
          <p className="lede" style={{ marginInline: 'auto' }}>{dict.portal.text}</p>
          <Link className="btn btn--ghost mt-2" href={localizedPath(locale, '/')}>
            ← {dict.nav.home}
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
