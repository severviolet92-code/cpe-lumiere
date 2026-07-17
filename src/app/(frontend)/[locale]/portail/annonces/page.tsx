import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'

import { AnnouncementCard } from '../../../../../components/portal/AnnouncementCard'
import { PortalShell } from '../../../../../components/portal/PortalShell'
import { isLocale, localizedPath, type Locale } from '../../../../../i18n/config'
import { t } from '../../../../../i18n/ui'
import { getPayload } from '../../../../../lib/payload'
import { getParentUser } from '../../../../../lib/portalAuth'
import type { Announcement } from '../../../../../payload-types'

export const metadata: Metadata = { robots: { index: false } }

/**
 * News centre: pinned first, then upcoming events, then the regular feed.
 * Archived or expired announcements move to a browsable archive section
 * (?archives=1) instead of disappearing.
 */
export default async function PortalAnnouncementsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ archives?: string }>
}) {
  const { locale: rawLocale } = await params
  const { archives: archivesParam } = await searchParams
  if (!isLocale(rawLocale)) notFound()
  const locale: Locale = rawLocale
  const dict = t(locale)
  const showArchives = archivesParam === '1'

  const parent = await getParentUser()
  if (!parent) redirect(localizedPath(locale, '/portail'))

  const payload = await getPayload()
  const announcements = await payload.find({
    collection: 'announcements',
    sort: '-createdAt',
    limit: 100,
    depth: 1,
    locale,
    overrideAccess: false,
    user: parent,
  })

  const today = new Date().toISOString().slice(0, 10)
  const isArchived = (a: Announcement) =>
    Boolean(a.archived) || Boolean(a.expiresAt && a.expiresAt.slice(0, 10) < today)

  const live = announcements.docs.filter((a) => !isArchived(a))
  const archived = announcements.docs.filter(isArchived)

  const pinned = live.filter((a) => a.pinned)
  const upcomingEvents = live
    .filter(
      (a) => !a.pinned && a.kind === 'event' && a.eventDate && a.eventDate.slice(0, 10) >= today,
    )
    .sort((a, b) => (a.eventDate || '').localeCompare(b.eventDate || ''))
  const recent = live.filter((a) => !a.pinned && !upcomingEvents.includes(a))

  const sections: { title: string; items: Announcement[] }[] = [
    { title: dict.portal.news.pinnedSection, items: pinned },
    { title: dict.portal.news.upcomingSection, items: upcomingEvents },
    { title: dict.portal.news.recentSection, items: recent },
  ].filter((s) => s.items.length > 0)

  const basePath = localizedPath(locale, '/portail/annonces')

  return (
    <PortalShell locale={locale} parent={parent} current="/portail/annonces">
      <p className="eyebrow eyebrow--ciel">{dict.portal.announcements}</p>
      <p className="lede" style={{ maxWidth: '620px' }}>
        {dict.portal.news.lede}
      </p>

      {sections.length === 0 && (
        <p style={{ color: 'var(--ink-soft)' }}>{dict.portal.noAnnouncements}</p>
      )}

      <div style={{ maxWidth: '760px' }}>
        {sections.map((section) => (
          <section key={section.title} style={{ marginBottom: '2.4rem' }}>
            <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>{section.title}</h2>
            {section.items.map((a) => (
              <AnnouncementCard key={a.id} announcement={a} locale={locale} />
            ))}
          </section>
        ))}

        <section style={{ marginTop: '3rem' }}>
          {showArchives ? (
            <>
              <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>
                {dict.portal.news.archivesSection}
              </h2>
              {archived.length === 0 ? (
                <p style={{ color: 'var(--ink-soft)' }}>{dict.portal.news.noArchives}</p>
              ) : (
                archived.map((a) => <AnnouncementCard key={a.id} announcement={a} locale={locale} />)
              )}
              <p>
                <Link href={basePath}>← {dict.portal.news.hideArchives}</Link>
              </p>
            </>
          ) : (
            <p>
              <Link href={`${basePath}?archives=1`}>{dict.portal.news.showArchives} →</Link>
            </p>
          )}
        </section>
      </div>
    </PortalShell>
  )
}
