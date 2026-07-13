import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { PortalShell } from '../../../../../components/portal/PortalShell'
import { isLocale, localizedPath, type Locale } from '../../../../../i18n/config'
import { t } from '../../../../../i18n/ui'
import { getPayload } from '../../../../../lib/payload'
import { getParentUser } from '../../../../../lib/portalAuth'

export const metadata: Metadata = { robots: { index: false } }

const CATEGORY_LABELS: Record<string, { fr: string; en: string }> = {
  menus: { fr: 'Menus', en: 'Menus' },
  politiques: { fr: 'Politiques et règlements', en: 'Policies & rules' },
  guides: { fr: 'Guides aux parents', en: 'Parent guides' },
  general: { fr: 'Général', en: 'General' },
}

export default async function PortalDocumentsPage({
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
  const documents = await payload.find({
    collection: 'documents',
    sort: 'category',
    limit: 100,
    locale,
    overrideAccess: false,
    user: parent,
  })

  return (
    <PortalShell locale={locale} parent={parent} current="/portail/documents">
      <p className="eyebrow eyebrow--sauge">{dict.portal.documents}</p>
      {documents.docs.length === 0 ? (
        <p style={{ color: 'var(--ink-soft)' }}>{dict.portal.noDocuments}</p>
      ) : (
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, maxWidth: '680px' }}>
          {documents.docs.map((doc) => (
            <li
              key={doc.id}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1rem', padding: '1rem 0', borderBottom: '1px solid rgba(56,41,26,0.1)' }}
            >
              <a href={doc.url || '#'} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600 }}>
                📄 {doc.title}
              </a>
              <span style={{ fontSize: '0.85rem', color: 'var(--ink-faint)' }}>
                {CATEGORY_LABELS[doc.category || 'general']?.[locale]}
              </span>
            </li>
          ))}
        </ul>
      )}
    </PortalShell>
  )
}
