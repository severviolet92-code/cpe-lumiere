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
    title: locale === 'fr' ? 'Questions fréquentes' : 'FAQ',
    alternates: {
      canonical: locale === 'fr' ? '/faq' : '/en/faq',
      languages: { 'fr-CA': '/faq', 'en-CA': '/en/faq' },
    },
  }
}

const CATEGORY_ORDER = ['admission', 'quotidien', 'sante', 'alimentation', 'general'] as const

export default async function FAQPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale: Locale = rawLocale
  const dict = t(locale)
  const payload = await getPayload()

  const entries = await payload.find({
    collection: 'faq-entries',
    where: { audience: { equals: 'public' } },
    sort: 'order',
    limit: 100,
    locale,
    overrideAccess: false,
  })

  const byCategory = CATEGORY_ORDER.map((cat) => ({
    cat,
    items: entries.docs.filter((e) => e.category === cat),
  })).filter((g) => g.items.length > 0)

  return (
    <>
      <section className="section" style={{ paddingBottom: '2rem' }}>
        <div className="container">
          <Reveal>
            <p className="eyebrow">{dict.faq.title}</p>
            <h1>
              {locale === 'fr' ? (
                <>Vos questions, <em>nos réponses</em>.</>
              ) : (
                <>Your questions, <em>our answers</em>.</>
              )}
            </h1>
            <p className="lede">{dict.faq.intro}</p>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '1rem' }}>
        <div className="container" style={{ maxWidth: '820px' }}>
          {byCategory.map(({ cat, items }) => (
            <Reveal key={cat}>
              <div style={{ marginBottom: '2.8rem' }}>
                <p className="eyebrow eyebrow--sauge">{dict.faq.categories[cat]}</p>
                {items.map((entry) => (
                  <details className="faq-item" key={entry.id}>
                    <summary>{entry.question}</summary>
                    <div className="faq-item__body">
                      <RichTextBlock data={entry.answer} />
                    </div>
                  </details>
                ))}
              </div>
            </Reveal>
          ))}

          <Reveal>
            <div className="card text-center" style={{ padding: '2.4rem' }}>
              <h3>{dict.faq.notFoundTitle}</h3>
              <p>{dict.faq.notFoundText}</p>
              <p className="mt-2" style={{ margin: '1.4rem 0 0' }}>
                <Link className="btn btn--primary" href={localizedPath(locale, '/contact')}>
                  {dict.faq.contactCta}
                </Link>
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
