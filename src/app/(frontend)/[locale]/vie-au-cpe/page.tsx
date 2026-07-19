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
    title: locale === 'fr' ? 'La vie au CPE' : 'Life at the CPE',
    alternates: {
      canonical: locale === 'fr' ? '/vie-au-cpe' : '/en/vie-au-cpe',
      languages: { 'fr-CA': '/vie-au-cpe', 'en-CA': '/en/vie-au-cpe' },
    },
  }
}

export default async function LifePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale: Locale = rawLocale
  const dict = t(locale)
  const payload = await getPayload()

  const [life, groups] = await Promise.all([
    payload.findGlobal({ slug: 'life-page', locale, overrideAccess: false }),
    payload.find({
      collection: 'groups',
      where: { active: { equals: true } },
      sort: 'order',
      limit: 12,
      locale,
      overrideAccess: false,
    }),
  ])

  return (
    <>
      <section className="section" style={{ paddingBottom: '2rem' }}>
        <div className="container">
          <Reveal>
            <p className="eyebrow">{dict.life.title}</p>
            <h1>
              {locale === 'fr' ? (
                <>Des journées douces, <em>bien rythmées</em>.</>
              ) : (
                <>Gentle days with a <em>steady rhythm</em>.</>
              )}
            </h1>
            {life?.intro && <p className="lede">{life.intro}</p>}
          </Reveal>
        </div>
      </section>

      {(life?.dailySchedule?.length ?? 0) > 0 && (
        <section className="section section--warm">
          <div className="container">
            <Reveal>
              <div className="section-head">
                <p className="eyebrow eyebrow--sauge">{dict.life.day}</p>
              </div>
              <ul className="timeline">
                {life!.dailySchedule!.map((m, i) => (
                  <li key={m.id || i}>
                    <span className="timeline__time">{m.time}</span>
                    <span className="timeline__dot" aria-hidden="true" />
                    <span className="timeline__label">{m.moment}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      )}

      {groups.docs.length > 0 && (
        <section className="section">
          <div className="container">
            <Reveal>
              <div className="section-head">
                <p className="eyebrow eyebrow--lavande">{dict.life.groups}</p>
                {life?.groupsIntro && <p className="lede">{life.groupsIntro}</p>}
              </div>
              <div className="card-grid">
                {groups.docs.map((g) => (
                  <div className="card" key={g.id}>
                    <span className={`group-chip chip--${g.color || 'miel'}`}>
                      <span className="group-chip__dot" aria-hidden="true" />
                      {g.name}
                    </span>
                    <p style={{ color: 'var(--honey-deep)', fontWeight: 600, margin: '0.8rem 0 0.4rem' }}>
                      {g.ageRange}
                    </p>
                    {g.description && <p>{g.description}</p>}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {life?.development && (
        <section className="section section--warm">
          <div className="container">
            <Reveal>
              <p className="eyebrow">{dict.life.development}</p>
              <RichTextBlock data={life.development} />
            </Reveal>
          </div>
        </section>
      )}

      {life?.meals && (
        <section className="section">
          <div className="container">
            <Reveal>
              <p className="eyebrow eyebrow--terracotta">{dict.life.meals}</p>
              <RichTextBlock data={life.meals} />
              <p style={{ marginTop: '1.2rem' }}>
                <Link className="btn btn--ghost" href={localizedPath(locale, '/nutrition')}>
                  {dict.life.nutritionCta}
                </Link>
              </p>
            </Reveal>
          </div>
        </section>
      )}

      {life?.naps && (
        <section className="section section--warm">
          <div className="container">
            <Reveal>
              <p className="eyebrow eyebrow--lavande">{dict.life.naps}</p>
              <RichTextBlock data={life.naps} />
            </Reveal>
          </div>
        </section>
      )}

      {life?.outdoor && (
        <section className="section">
          <div className="container">
            <Reveal>
              <p className="eyebrow eyebrow--sauge">{dict.life.outdoor}</p>
              <RichTextBlock data={life.outdoor} />
            </Reveal>
          </div>
        </section>
      )}

      {life?.activities && (
        <section className="section section--warm">
          <div className="container">
            <Reveal>
              <p className="eyebrow eyebrow--ciel">{dict.life.activities}</p>
              <RichTextBlock data={life.activities} />
            </Reveal>
          </div>
        </section>
      )}

      {life?.safety && (
        <section className="section">
          <div className="container">
            <Reveal>
              <p className="eyebrow eyebrow--terracotta">{dict.life.safety}</p>
              <RichTextBlock data={life.safety} />
            </Reveal>
          </div>
        </section>
      )}
    </>
  )
}
