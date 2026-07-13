import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { ActivityCard } from '../../../components/ActivityCard'
import { HeroScene } from '../../../components/HeroScene'
import { Reveal } from '../../../components/Reveal'
import { RichTextBlock } from '../../../components/RichTextBlock'
import { isLocale, localizedPath, type Locale } from '../../../i18n/config'
import { t } from '../../../i18n/ui'
import { formatDateRange } from '../../../lib/format'
import { getPayload } from '../../../lib/payload'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    alternates: {
      canonical: locale === 'fr' ? '/' : '/en',
      languages: { 'fr-CA': '/', 'en-CA': '/en' },
    },
  }
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale: Locale = rawLocale
  const dict = t(locale)
  const payload = await getPayload()

  const today = new Date().toISOString().slice(0, 10)

  const [home, upcomingActivities, groups, closures, faqTeaser] = await Promise.all([
    payload.findGlobal({ slug: 'home-page', locale, overrideAccess: false }),
    payload.find({
      collection: 'activities',
      where: {
        or: [{ date: { greater_than_equal: today } }, { endDate: { greater_than_equal: today } }],
      },
      sort: 'date',
      limit: 3,
      locale,
      overrideAccess: false,
    }),
    payload.find({
      collection: 'groups',
      where: { active: { equals: true } },
      sort: 'order',
      limit: 12,
      locale,
      overrideAccess: false,
    }),
    payload.find({
      collection: 'closure-dates',
      where: {
        or: [
          { startDate: { greater_than_equal: today } },
          { endDate: { greater_than_equal: today } },
        ],
      },
      sort: 'startDate',
      limit: 3,
      locale,
      overrideAccess: false,
    }),
    payload.find({
      collection: 'faq-entries',
      where: { audience: { equals: 'public' } },
      sort: 'order',
      limit: 3,
      locale,
      overrideAccess: false,
    }),
  ])

  const chipClasses = ['chip--miel', 'chip--sauge', 'chip--terracotta', 'chip--ciel', 'chip--lavande']

  return (
    <>
      {/* ---- Hero: the diorama stage ---- */}
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__copy">
            <h1>{home?.heroTitle || '…'}</h1>
            {home?.heroSubtitle && <p className="lede">{home.heroSubtitle}</p>}
            <div className="hero__actions">
              <Link className="btn btn--primary" href={localizedPath(locale, '/notre-cpe')}>
                {dict.home.discover}
              </Link>
              <Link className="btn btn--ghost" href={localizedPath(locale, '/admission')}>
                {dict.home.admission}
              </Link>
            </div>
          </div>
          <div className="hero__scene">
            <HeroScene
              label={
                locale === 'fr'
                  ? 'Illustration : une salle de jeu chaleureuse baignée de lumière du matin'
                  : 'Illustration: a warm playroom bathed in morning light'
              }
            />
          </div>
        </div>
        <div className="hero__scroll-hint" aria-hidden="true">
          {dict.home.scrollHint} ↓
        </div>
      </section>

      {/* ---- Upcoming activities: the core experience, first after the hero ---- */}
      {upcomingActivities.docs.length > 0 && (
        <section className="section section--warm">
          <div className="container">
            <Reveal>
              <div
                className="section-head"
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', maxWidth: 'none' }}
              >
                <div>
                  <p className="eyebrow eyebrow--terracotta">{dict.activities.homeEyebrow}</p>
                  <h2 style={{ marginBottom: 0 }}>{dict.activities.homeTitle}</h2>
                </div>
                <Link className="btn btn--ghost" href={localizedPath(locale, '/activites')}>
                  {dict.activities.seeAll} →
                </Link>
              </div>
            </Reveal>
            <Reveal>
              <div className="activity-grid activity-grid--featured">
                {upcomingActivities.docs.map((a) => (
                  <ActivityCard key={a.id} activity={a} locale={locale} featured />
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ---- Intro + highlights ---- */}
      {(home?.introTitle || (home?.highlights?.length ?? 0) > 0) && (
        <section className="section">
          <div className="container">
            <Reveal>
              <div className="section-head">
                <p className="eyebrow">{dict.nav.about}</p>
                {home?.introTitle && <h2>{home.introTitle}</h2>}
                {home?.introText && <p className="lede">{home.introText}</p>}
              </div>
            </Reveal>
            {(home?.highlights?.length ?? 0) > 0 && (
              <Reveal>
                <div className="card-grid">
                  {home!.highlights!.map((h, i) => (
                    <div className="card" key={h.id || i}>
                      <div
                        className="card__icon"
                        style={{
                          background: `var(--${['honey', 'sauge', 'terracotta'][i % 3]}-whisper)`,
                        }}
                        aria-hidden="true"
                      >
                        {['☀️', '🌱', '🎨', '🧸'][i % 4]}
                      </div>
                      <h3>{h.title}</h3>
                      <p>{h.text}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* ---- Groups ---- */}
      {groups.docs.length > 0 && (
        <section className="section section--warm">
          <div className="container">
            <Reveal>
              <div className="section-head">
                <p className="eyebrow eyebrow--sauge">{dict.home.groupsTitle}</p>
                <h2>{dict.home.groupsNote}</h2>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                {groups.docs.map((g, i) => (
                  <span key={g.id} className={`group-chip chip--${g.color || chipClasses[i % 5].slice(6)}`}>
                    <span className="group-chip__dot" aria-hidden="true" />
                    {g.name}
                    <span style={{ fontWeight: 450, opacity: 0.8 }}>· {g.ageRange}</span>
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ---- Closures + FAQ teaser ---- */}
      <section className="section">
        <div
          className="container"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(340px, 100%), 1fr))', gap: '3rem' }}
        >
          {closures.docs.length > 0 && (
            <Reveal>
              <div>
                <p className="eyebrow eyebrow--terracotta">{dict.home.closuresTitle}</p>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                  {closures.docs.map((c) => (
                    <li
                      key={c.id}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: '1rem',
                        padding: '0.9rem 0',
                        borderBottom: '1px solid rgba(56,41,26,0.1)',
                      }}
                    >
                      <strong>{c.label}</strong>
                      <span style={{ color: 'var(--ink-soft)', textAlign: 'right' }}>
                        {formatDateRange(locale, c.startDate, c.endDate)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}
          {faqTeaser.docs.length > 0 && (
            <Reveal>
              <div>
                <p className="eyebrow eyebrow--ciel">{dict.home.faqTitle}</p>
                {faqTeaser.docs.map((f) => (
                  <details className="faq-item" key={f.id}>
                    <summary>{f.question}</summary>
                    <div className="faq-item__body">
                      <RichTextBlock data={f.answer} />
                    </div>
                  </details>
                ))}
                <p className="mt-2">
                  <Link href={localizedPath(locale, '/faq')}>{dict.home.faqMore} →</Link>
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ---- Careers band ---- */}
      <section className="section section--warm">
        <div className="container text-center">
          <Reveal>
            <p className="eyebrow">{dict.nav.careers}</p>
            <h2 style={{ maxWidth: '20em', marginInline: 'auto' }}>
              {locale === 'fr' ? (
                <>Travailler ici, c’est <em>grandir</em> aussi.</>
              ) : (
                <>Working here means <em>growing</em>, too.</>
              )}
            </h2>
            <Link className="btn btn--primary mt-2" href={localizedPath(locale, '/carrieres')}>
              {dict.home.careers}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
