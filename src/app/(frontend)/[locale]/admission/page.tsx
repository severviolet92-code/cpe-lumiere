import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Reveal } from '../../../../components/Reveal'
import { RichTextBlock } from '../../../../components/RichTextBlock'
import { isLocale, type Locale } from '../../../../i18n/config'
import { t } from '../../../../i18n/ui'
import { getPayload } from '../../../../lib/payload'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: 'Admission',
    alternates: {
      canonical: locale === 'fr' ? '/admission' : '/en/admission',
      languages: { 'fr-CA': '/admission', 'en-CA': '/en/admission' },
    },
  }
}

export default async function AdmissionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale: Locale = rawLocale
  const dict = t(locale)
  const payload = await getPayload()

  const admission = await payload.findGlobal({ slug: 'admission-page', locale, overrideAccess: false })

  return (
    <>
      <section className="section" style={{ paddingBottom: '2rem' }}>
        <div className="container">
          <Reveal>
            <p className="eyebrow">{dict.admission.title}</p>
            <h1>
              {locale === 'fr' ? (
                <>Une place pour votre enfant, <em>en toute clarté</em>.</>
              ) : (
                <>A place for your child, <em>clearly explained</em>.</>
              )}
            </h1>
            {admission?.intro && <RichTextBlock data={admission.intro} className="lede" />}
          </Reveal>
        </div>
      </section>

      {(admission?.steps?.length ?? 0) > 0 && (
        <section className="section section--warm">
          <div className="container">
            <Reveal>
              <div className="section-head">
                <p className="eyebrow eyebrow--sauge">{dict.admission.steps}</p>
              </div>
              <div className="card-grid">
                {admission!.steps!.map((s, i) => (
                  <div className="card" key={s.id || i}>
                    <div className="card__icon" aria-hidden="true">
                      <span
                        className="display"
                        style={{ fontSize: '1.5rem', color: 'var(--honey-deep)' }}
                      >
                        {i + 1}
                      </span>
                    </div>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container text-center">
          <Reveal>
            <h2 style={{ maxWidth: '22em', marginInline: 'auto' }}>La Place 0-5</h2>
            <p className="lede" style={{ marginInline: 'auto' }}>{dict.admission.laPlaceNote}</p>
            {admission?.note && (
              <p style={{ color: 'var(--ink-soft)', maxWidth: '40em', marginInline: 'auto' }}>
                {admission.note}
              </p>
            )}
            <a
              className="btn btn--primary mt-2"
              href={admission?.laPlaceUrl || 'https://www.laplace0-5.com'}
              target="_blank"
              rel="noopener noreferrer"
            >
              {dict.admission.laPlaceCta} ↗
            </a>
          </Reveal>
        </div>
      </section>
    </>
  )
}
