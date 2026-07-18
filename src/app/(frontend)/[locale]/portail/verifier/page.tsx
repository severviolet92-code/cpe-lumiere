import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { MagicLinkVerify } from '../../../../../components/portal/MagicLinkVerify'
import { Reveal } from '../../../../../components/Reveal'
import { isLocale, type Locale } from '../../../../../i18n/config'
import { t } from '../../../../../i18n/ui'

export const metadata: Metadata = { robots: { index: false } }

/**
 * Landing page for a magic-link email. Client-side, reads ?email=&token=
 * from the URL and posts them to the normal /api/parents/login endpoint —
 * see src/endpoints/magicLink.ts for why the token IS the (temporary)
 * password rather than a bespoke verification mechanism.
 */
export default async function PortalVerifyPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale: Locale = rawLocale
  const dict = t(locale)

  return (
    <section className="section">
      <div className="container text-center" style={{ maxWidth: '480px' }}>
        <Reveal>
          <p className="eyebrow">{dict.portal.title}</p>
          <h1>{dict.portal.tabMagicLink}</h1>
          <div style={{ marginTop: '1.5rem' }}>
            <MagicLinkVerify locale={locale} />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
