import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import { Reveal } from '../../../../components/Reveal'
import { RichTextBlock } from '../../../../components/RichTextBlock'
import { isLocale, type Locale } from '../../../../i18n/config'
import { t } from '../../../../i18n/ui'
import { getPayload } from '../../../../lib/payload'
import type { Media } from '../../../../payload-types'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === 'fr' ? 'Cuisine et nutrition' : 'Kitchen & nutrition',
    alternates: {
      canonical: locale === 'fr' ? '/nutrition' : '/en/nutrition',
      languages: { 'fr-CA': '/nutrition', 'en-CA': '/en/nutrition' },
    },
  }
}

export default async function NutritionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale: Locale = rawLocale
  const dict = t(locale)
  const payload = await getPayload()

  const nutrition = await payload.findGlobal({ slug: 'nutrition-page', locale, overrideAccess: false })

  const menuDoc =
    nutrition?.menuDocument && typeof nutrition.menuDocument === 'object'
      ? nutrition.menuDocument
      : null
  const photos = (nutrition?.photos || []).filter(
    (p): p is Media => typeof p === 'object' && p !== null,
  )

  return (
    <>
      <section className="section" style={{ paddingBottom: '2rem' }}>
        <div className="container">
          <Reveal>
            <p className="eyebrow">{dict.nutrition.title}</p>
            <h1>
              {locale === 'fr' ? (
                <>Bien manger, <em>chaque midi</em>.</>
              ) : (
                <>Eating well, <em>every noon</em>.</>
              )}
            </h1>
            {nutrition?.intro && <p className="lede">{nutrition.intro}</p>}
          </Reveal>
        </div>
      </section>

      {nutrition?.philosophy && (
        <section className="section" style={{ paddingTop: '2rem' }}>
          <div className="container">
            <Reveal>
              <p className="eyebrow eyebrow--sauge">{dict.nutrition.philosophy}</p>
              <RichTextBlock data={nutrition.philosophy} />
            </Reveal>
          </div>
        </section>
      )}

      {(nutrition?.weeklyMenu?.length ?? 0) > 0 && (
        <section className="section section--warm">
          <div className="container">
            <Reveal>
              <div className="section-head">
                <p className="eyebrow eyebrow--terracotta">{dict.nutrition.weeklyMenu}</p>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table className="menu-table">
                  <thead>
                    <tr>
                      <th scope="col">{dict.nutrition.day}</th>
                      <th scope="col">{dict.nutrition.snackAm}</th>
                      <th scope="col">{dict.nutrition.lunch}</th>
                      <th scope="col">{dict.nutrition.snackPm}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {nutrition!.weeklyMenu!.map((d, i) => (
                      <tr key={d.id || i}>
                        <th scope="row">{d.day}</th>
                        <td>{d.snackAm}</td>
                        <td>{d.lunch}</td>
                        <td>{d.snackPm}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {menuDoc?.url && (
                <p style={{ marginTop: '1.4rem' }}>
                  <a className="btn btn--primary" href={menuDoc.url} target="_blank" rel="noopener">
                    {dict.nutrition.downloadMenu}
                  </a>
                </p>
              )}
            </Reveal>
          </div>
        </section>
      )}

      {nutrition?.allergies && (
        <section className="section">
          <div className="container">
            <Reveal>
              <p className="eyebrow eyebrow--ciel">{dict.nutrition.allergies}</p>
              <RichTextBlock data={nutrition.allergies} />
            </Reveal>
          </div>
        </section>
      )}

      {photos.length > 0 && (
        <section className="section section--warm">
          <div className="container">
            <Reveal>
              <div className="section-head">
                <p className="eyebrow">{dict.nutrition.photosEyebrow}</p>
              </div>
              <div className="card-grid">
                {photos.map((photo) => (
                  <figure className="card" key={photo.id} style={{ padding: 0, overflow: 'hidden' }}>
                    {photo.url && (
                      <Image
                        src={photo.sizes?.card?.url || photo.url}
                        alt={photo.alt || ''}
                        width={photo.sizes?.card?.width || 800}
                        height={photo.sizes?.card?.height || 600}
                        style={{ width: '100%', height: 'auto', display: 'block' }}
                      />
                    )}
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
