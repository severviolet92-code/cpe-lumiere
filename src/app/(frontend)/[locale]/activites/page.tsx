import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { ActivityCard } from '../../../../components/ActivityCard'
import { Reveal } from '../../../../components/Reveal'
import { isLocale, localizedPath, type Locale } from '../../../../i18n/config'
import { t } from '../../../../i18n/ui'
import { formatDate } from '../../../../lib/format'
import { getPayload } from '../../../../lib/payload'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === 'fr' ? 'Activités' : 'Activities',
    alternates: {
      canonical: locale === 'fr' ? '/activites' : '/en/activites',
      languages: { 'fr-CA': '/activites', 'en-CA': '/en/activites' },
    },
  }
}

export default async function ActivitiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale: Locale = rawLocale
  const dict = t(locale)
  const payload = await getPayload()

  const today = new Date().toISOString().slice(0, 10)
  const horizon = new Date(Date.now() + 15 * 86400000).toISOString().slice(0, 10)

  // overrideAccess: false → anonymous rules apply: only explicitly-public, published activities.
  const [upcoming, gallery] = await Promise.all([
    payload.find({
      collection: 'activities',
      where: {
        or: [{ date: { greater_than_equal: today } }, { endDate: { greater_than_equal: today } }],
      },
      sort: 'date',
      limit: 40,
      locale,
      overrideAccess: false,
    }),
    payload.find({
      collection: 'gallery-photos',
      sort: '-takenAt',
      limit: 18,
      locale,
      overrideAccess: false,
    }),
  ])

  const soon = upcoming.docs.filter((a) => a.date.slice(0, 10) <= horizon)
  const later = upcoming.docs.filter((a) => a.date.slice(0, 10) > horizon)

  return (
    <>
      <section className="section" style={{ paddingBottom: '2rem' }}>
        <div className="container">
          <Reveal>
            <p className="eyebrow">{dict.activities.title}</p>
            <h1>
              {locale === 'fr' ? (
                <>Ce qui <em>s’en vient</em>.</>
              ) : (
                <>What’s <em>coming up</em>.</>
              )}
            </h1>
            <p className="lede">{dict.activities.heroLede}</p>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '1rem' }}>
        <div className="container">
          <Reveal>
            <div className="section-head" style={{ marginBottom: '1.6rem' }}>
              <p className="eyebrow eyebrow--terracotta">{dict.activities.next15}</p>
            </div>
            {soon.length === 0 ? (
              <p className="lede">{dict.activities.emptyUpcoming}</p>
            ) : (
              <div className="activity-grid">
                {soon.map((a) => (
                  <ActivityCard key={a.id} activity={a} locale={locale} />
                ))}
              </div>
            )}
          </Reveal>

          {later.length > 0 && (
            <Reveal>
              <div className="section-head" style={{ margin: '3.5rem 0 1.6rem' }}>
                <p className="eyebrow eyebrow--ciel">{dict.activities.later}</p>
              </div>
              <div className="activity-grid">
                {later.map((a) => (
                  <ActivityCard key={a.id} activity={a} locale={locale} />
                ))}
              </div>
            </Reveal>
          )}

          <Reveal>
            <p
              className="form-note"
              style={{ marginTop: '2.5rem', display: 'flex', gap: '0.5rem', alignItems: 'baseline' }}
            >
              🔒 {dict.activities.portalNote}{' '}
              <Link href={localizedPath(locale, '/portail')}>{dict.nav.portal} →</Link>
            </p>
          </Reveal>
        </div>
      </section>

      {gallery.docs.length > 0 && (
        <section className="section section--warm">
          <div className="container">
            <Reveal>
              <div className="section-head">
                <p className="eyebrow eyebrow--sauge">{dict.activities.galleryEyebrow}</p>
                <h2>{dict.activities.galleryTitle}</h2>
                <p className="lede">{dict.activities.galleryIntro}</p>
              </div>
              <div className="gallery-grid">
                {gallery.docs.map((photo) => (
                  <figure className="gallery-item" key={photo.id} style={{ margin: 0 }}>
                    {photo.url && (
                      <Image
                        src={photo.sizes?.card?.url || photo.url}
                        alt={photo.caption || ''}
                        width={photo.sizes?.card?.width || 800}
                        height={photo.sizes?.card?.height || 600}
                        sizes="(max-width: 700px) 100vw, 380px"
                      />
                    )}
                    <figcaption>
                      <time dateTime={photo.takenAt}>{formatDate(locale, photo.takenAt)}</time>
                      {photo.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}
    </>
  )
}
