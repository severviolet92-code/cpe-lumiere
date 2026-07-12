import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Reveal } from '../../../../components/Reveal'
import { isLocale, type Locale } from '../../../../i18n/config'
import { t } from '../../../../i18n/ui'
import { getPayload } from '../../../../lib/payload'
import { ContactForm } from './ContactForm'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === 'fr' ? 'Nous joindre' : 'Contact us',
    alternates: {
      canonical: locale === 'fr' ? '/contact' : '/en/contact',
      languages: { 'fr-CA': '/contact', 'en-CA': '/en/contact' },
    },
  }
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale: Locale = rawLocale
  const dict = t(locale)
  const payload = await getPayload()

  const settings = await payload.findGlobal({ slug: 'site-settings', locale, overrideAccess: false })

  return (
    <section className="section">
      <div
        className="container"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(340px, 100%), 1fr))', gap: '3.5rem' }}
      >
        <Reveal>
          <div>
            <p className="eyebrow">{dict.contact.title}</p>
            <h1>
              {locale === 'fr' ? (
                <>On vous <em>écoute</em>.</>
              ) : (
                <>We’re <em>listening</em>.</>
              )}
            </h1>
            <ul style={{ listStyle: 'none', padding: 0, margin: '2rem 0 0', display: 'grid', gap: '1.2rem' }}>
              {settings?.phone && (
                <li>
                  <p className="eyebrow" style={{ marginBottom: '0.2rem' }}>{dict.contact.phone}</p>
                  <a href={`tel:${settings.phone.replace(/[^+\d]/g, '')}`} style={{ fontSize: '1.15rem' }}>
                    {settings.phone}
                  </a>
                </li>
              )}
              {settings?.email && (
                <li>
                  <p className="eyebrow" style={{ marginBottom: '0.2rem' }}>{dict.contact.email}</p>
                  <a href={`mailto:${settings.email}`} style={{ fontSize: '1.15rem' }}>{settings.email}</a>
                </li>
              )}
              {settings?.address && (
                <li>
                  <p className="eyebrow" style={{ marginBottom: '0.2rem' }}>{dict.contact.address}</p>
                  <span style={{ whiteSpace: 'pre-line' }}>{settings.address}</span>
                </li>
              )}
              {settings?.hours && (
                <li>
                  <p className="eyebrow" style={{ marginBottom: '0.2rem' }}>{dict.contact.hours}</p>
                  <span>{settings.hours}</span>
                </li>
              )}
            </ul>
          </div>
        </Reveal>
        <Reveal>
          <div>
            <h2 style={{ fontSize: '1.6rem' }}>{dict.contact.formTitle}</h2>
            <ContactForm locale={locale} />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
