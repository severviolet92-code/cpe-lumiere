import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Reveal } from '../../../../components/Reveal'
import { RichTextBlock } from '../../../../components/RichTextBlock'
import { isLocale, localizedPath, type Locale } from '../../../../i18n/config'
import { t } from '../../../../i18n/ui'
import { getPayload } from '../../../../lib/payload'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === 'fr' ? 'Carrières' : 'Careers',
    alternates: {
      canonical: locale === 'fr' ? '/carrieres' : '/en/carrieres',
      languages: { 'fr-CA': '/carrieres', 'en-CA': '/en/carrieres' },
    },
  }
}

export default async function CareersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale: Locale = rawLocale
  const dict = t(locale)
  const payload = await getPayload()

  const [careers, openings] = await Promise.all([
    payload.findGlobal({ slug: 'careers-page', locale, overrideAccess: false }),
    payload.find({
      collection: 'job-openings',
      sort: '-createdAt',
      limit: 20,
      locale,
      overrideAccess: false,
    }),
  ])

  return (
    <>
      <section className="section" style={{ paddingBottom: '2rem' }}>
        <div className="container">
          <Reveal>
            <p className="eyebrow">{dict.careers.title}</p>
            <h1>
              {locale === 'fr' ? (
                <>Faire une vraie différence, <em>chaque matin</em>.</>
              ) : (
                <>Make a real difference, <em>every morning</em>.</>
              )}
            </h1>
            {careers?.intro && <RichTextBlock data={careers.intro} className="lede" />}
          </Reveal>
        </div>
      </section>

      {(careers?.perks?.length ?? 0) > 0 && (
        <section className="section section--warm">
          <div className="container">
            <Reveal>
              <div className="card-grid">
                {careers!.perks!.map((p, i) => (
                  <div className="card" key={p.id || i}>
                    <p style={{ color: 'var(--ink)', fontWeight: 550 }}>{p.text}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <p className="eyebrow eyebrow--sauge">{dict.careers.openings}</p>
            </div>
            {openings.docs.length === 0 ? (
              <p className="lede">{dict.careers.noOpenings}</p>
            ) : (
              <div style={{ display: 'grid', gap: '1.2rem', maxWidth: '820px' }}>
                {openings.docs.map((job) => (
                  <div className="card" key={job.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.6rem', alignItems: 'baseline' }}>
                      <h3 style={{ margin: 0 }}>{job.title}</h3>
                      <span className="group-chip chip--sauge">{dict.careers.schedule[job.schedule]}</span>
                    </div>
                    <div style={{ marginTop: '0.8rem' }}>
                      <RichTextBlock data={job.description} />
                    </div>
                    <p style={{ marginTop: '1rem', marginBottom: 0 }}>
                      <Link className="btn btn--ghost" href={localizedPath(locale, '/contact')}>
                        {dict.careers.apply}
                      </Link>
                    </p>
                  </div>
                ))}
              </div>
            )}
          </Reveal>
        </div>
      </section>
    </>
  )
}
