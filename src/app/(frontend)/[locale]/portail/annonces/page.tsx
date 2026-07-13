import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { PortalShell } from '../../../../../components/portal/PortalShell'
import { RichTextBlock } from '../../../../../components/RichTextBlock'
import { isLocale, localizedPath, type Locale } from '../../../../../i18n/config'
import { t } from '../../../../../i18n/ui'
import { formatDate } from '../../../../../lib/format'
import { getPayload } from '../../../../../lib/payload'
import { getParentUser } from '../../../../../lib/portalAuth'

export const metadata: Metadata = { robots: { index: false } }

export default async function PortalAnnouncementsPage({
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
  const announcements = await payload.find({
    collection: 'announcements',
    sort: '-createdAt',
    limit: 50,
    locale,
    overrideAccess: false,
    user: parent,
  })

  const sorted = [...announcements.docs].sort((a, b) => Number(b.pinned) - Number(a.pinned))

  return (
    <PortalShell locale={locale} parent={parent} current="/portail/annonces">
      <p className="eyebrow eyebrow--ciel">{dict.portal.announcements}</p>
      {sorted.length === 0 ? (
        <p style={{ color: 'var(--ink-soft)' }}>{dict.portal.noAnnouncements}</p>
      ) : (
        <div style={{ maxWidth: '760px' }}>
          {sorted.map((a) => (
            <article className="announcement-item" key={a.id}>
              <div className="announcement-item__meta">
                {a.pinned && <span className="pinned-badge">{dict.portal.pinnedBadge}</span>}
                <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{a.title}</h3>
                {a.createdAt && (
                  <span style={{ fontSize: '0.82rem', color: 'var(--ink-faint)' }}>
                    {formatDate(locale, a.createdAt)}
                  </span>
                )}
              </div>
              <RichTextBlock data={a.body} />
            </article>
          ))}
        </div>
      )}
    </PortalShell>
  )
}
