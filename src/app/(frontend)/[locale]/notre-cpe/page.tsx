import type { Metadata } from 'next'
import Image from 'next/image'
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
  const title = locale === 'fr' ? 'Notre CPE' : 'Our CPE'
  return {
    title,
    alternates: {
      canonical: locale === 'fr' ? '/notre-cpe' : '/en/notre-cpe',
      languages: { 'fr-CA': '/notre-cpe', 'en-CA': '/en/notre-cpe' },
    },
  }
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale: Locale = rawLocale
  const dict = t(locale)
  const payload = await getPayload()

  const [about, team] = await Promise.all([
    payload.findGlobal({ slug: 'about-page', locale, overrideAccess: false }),
    payload.find({
      collection: 'staff-profiles',
      sort: 'order',
      limit: 30,
      locale,
      overrideAccess: false,
    }),
  ])

  return (
    <>
      <section className="section" style={{ paddingBottom: '2rem' }}>
        <div className="container">
          <Reveal>
            <p className="eyebrow">{dict.about.title}</p>
            <h1>
              {locale === 'fr' ? (
                <>Un endroit pensé pour <em>grandir</em>.</>
              ) : (
                <>A place designed for <em>growing</em>.</>
              )}
            </h1>
            {about?.intro && <p className="lede">{about.intro}</p>}
          </Reveal>
        </div>
      </section>

      {about?.pedagogy && (
        <section className="section" style={{ paddingTop: '2rem' }}>
          <div className="container">
            <Reveal>
              <p className="eyebrow eyebrow--sauge">{dict.about.pedagogy}</p>
              <RichTextBlock data={about.pedagogy} />
            </Reveal>
          </div>
        </section>
      )}

      {(about?.values?.length ?? 0) > 0 && (
        <section className="section section--warm">
          <div className="container">
            <Reveal>
              <div className="section-head">
                <p className="eyebrow">{dict.about.values}</p>
              </div>
              <div className="card-grid">
                {about!.values!.map((v, i) => (
                  <div className="card" key={v.id || i}>
                    <h3>{v.title}</h3>
                    <p>{v.text}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {about?.facilities && (
        <section className="section">
          <div className="container">
            <Reveal>
              <p className="eyebrow eyebrow--terracotta">{dict.about.facilities}</p>
              <RichTextBlock data={about.facilities} />
            </Reveal>
          </div>
        </section>
      )}

      {team.docs.length > 0 && (
        <section className="section section--warm">
          <div className="container">
            <Reveal>
              <div className="section-head">
                <p className="eyebrow eyebrow--ciel">{dict.about.team}</p>
              </div>
              <div className="card-grid">
                {team.docs.map((member) => {
                  const photo =
                    member.photo && typeof member.photo === 'object' ? member.photo : null
                  return (
                    <div className="card" key={member.id}>
                      {photo?.url && (
                        <Image
                          src={photo.sizes?.card?.url || photo.url}
                          alt={photo.alt || member.name}
                          width={photo.sizes?.card?.width || 800}
                          height={photo.sizes?.card?.height || 600}
                          style={{ borderRadius: '12px', marginBottom: '1rem', objectFit: 'cover' }}
                        />
                      )}
                      <h3>{member.name}</h3>
                      <p style={{ color: 'var(--honey-deep)', fontWeight: 600, marginBottom: '0.5rem' }}>
                        {member.jobTitle}
                      </p>
                      {member.bio && <p>{member.bio}</p>}
                    </div>
                  )
                })}
              </div>
            </Reveal>
          </div>
        </section>
      )}
    </>
  )
}
