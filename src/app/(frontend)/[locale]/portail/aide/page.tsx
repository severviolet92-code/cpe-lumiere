import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { PortalAssistant } from '../../../../../components/portal/PortalAssistant'
import { PortalShell } from '../../../../../components/portal/PortalShell'
import { RichTextBlock } from '../../../../../components/RichTextBlock'
import { isLocale, localizedPath, type Locale } from '../../../../../i18n/config'
import { t } from '../../../../../i18n/ui'
import { getPayload } from '../../../../../lib/payload'
import { getParentUser } from '../../../../../lib/portalAuth'

export const metadata: Metadata = { robots: { index: false } }

/**
 * Help centre: chat-style assistant on top (answers only from the published
 * knowledge base), full browsable knowledge centre below, grouped by the
 * categories the administration manages.
 */
export default async function PortalHelpPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale: Locale = rawLocale
  const dict = t(locale)

  const parent = await getParentUser()
  if (!parent) redirect(localizedPath(locale, '/portail'))

  const payload = await getPayload()
  const [categories, articles] = await Promise.all([
    payload.find({
      collection: 'kb-categories',
      sort: 'order',
      limit: 50,
      locale,
      overrideAccess: false,
      user: parent,
    }),
    payload.find({
      collection: 'kb-articles',
      depth: 0,
      limit: 500,
      locale,
      overrideAccess: false,
      user: parent,
    }),
  ])

  const byCategory = categories.docs
    .map((category) => ({
      category,
      items: articles.docs.filter((a) =>
        typeof a.category === 'object' ? a.category?.id === category.id : a.category === category.id,
      ),
    }))
    .filter((g) => g.items.length > 0)

  const suggestions = articles.docs.slice(0, 4).map((a) => a.question)

  return (
    <PortalShell locale={locale} parent={parent} current="/portail/aide">
      <p className="eyebrow eyebrow--ciel">{dict.portal.assistant.title}</p>
      <p className="lede" style={{ maxWidth: '620px' }}>
        {dict.portal.assistant.lede}
      </p>

      <PortalAssistant locale={locale} suggestions={suggestions} />

      <section style={{ marginTop: '3.5rem', maxWidth: '820px' }}>
        <h2 style={{ fontSize: '1.5rem' }}>{dict.portal.assistant.browseTitle}</h2>
        {byCategory.length === 0 ? (
          <p style={{ color: 'var(--ink-soft)' }}>{dict.portal.assistant.browseEmpty}</p>
        ) : (
          byCategory.map(({ category, items }) => (
            <div key={category.id} style={{ marginBottom: '2.2rem' }}>
              <p className="eyebrow eyebrow--sauge">
                {category.icon ? `${category.icon} ` : ''}
                {category.name}
              </p>
              {items.map((article) => (
                <details className="faq-item" key={article.id}>
                  <summary>{article.question}</summary>
                  <div className="faq-item__body">
                    <RichTextBlock data={article.answer} />
                  </div>
                </details>
              ))}
            </div>
          ))
        )}
      </section>
    </PortalShell>
  )
}
