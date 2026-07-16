import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { ActivityCard } from '../../../../components/ActivityCard'
import { AnnouncementCard } from '../../../../components/portal/AnnouncementCard'
import { PortalLogin } from '../../../../components/portal/PortalLogin'
import { PortalShell } from '../../../../components/portal/PortalShell'
import { Reveal } from '../../../../components/Reveal'
import { isLocale, localizedPath, type Locale } from '../../../../i18n/config'
import { t } from '../../../../i18n/ui'
import { formatDateRange } from '../../../../lib/format'
import { getPayload } from '../../../../lib/payload'
import { getParentUser } from '../../../../lib/portalAuth'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === 'fr' ? 'Portail parents' : 'Parent portal',
    robots: { index: false },
  }
}

export default async function PortalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale: Locale = rawLocale
  const dict = t(locale)

  const parent = await getParentUser()

  if (!parent) {
    return (
      <section className="section">
        <div className="container text-center" style={{ maxWidth: '620px' }}>
          <Reveal>
            <p className="eyebrow">{dict.portal.title}</p>
            <h1>{dict.portal.loginTitle}</h1>
            <p className="lede" style={{ marginInline: 'auto', marginBottom: '2rem' }}>
              {dict.portal.loginLede}
            </p>
            <PortalLogin locale={locale} />
          </Reveal>
        </div>
      </section>
    )
  }

  const payload = await getPayload()
  const today = new Date().toISOString().slice(0, 10)

  // overrideAccess: false + user → every query is scoped by the parent's access rules.
  const [activities, announcements, closures] = await Promise.all([
    payload.find({
      collection: 'activities',
      where: {
        or: [{ date: { greater_than_equal: today } }, { endDate: { greater_than_equal: today } }],
      },
      sort: 'date',
      limit: 4,
      locale,
      overrideAccess: false,
      user: parent,
    }),
    payload.find({
      collection: 'announcements',
      where: {
        and: [
          { archived: { not_equals: true } },
          { or: [{ expiresAt: { exists: false } }, { expiresAt: { greater_than_equal: today } }] },
        ],
      },
      sort: '-createdAt',
      limit: 5,
      locale,
      overrideAccess: false,
      user: parent,
    }),
    payload.find({
      collection: 'closure-dates',
      where: {
        or: [{ startDate: { greater_than_equal: today } }, { endDate: { greater_than_equal: today } }],
      },
      sort: 'startDate',
      limit: 3,
      locale,
      overrideAccess: false,
    }),
  ])

  const sortedAnnouncements = [...announcements.docs].sort(
    (a, b) => Number(b.pinned) - Number(a.pinned),
  )

  return (
    <PortalShell locale={locale} parent={parent} current="/portail">
      <div style={{ display: 'grid', gap: '3rem' }}>
        <div>
          <div
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.8rem', marginBottom: '1.2rem' }}
          >
            <p className="eyebrow eyebrow--terracotta" style={{ margin: 0 }}>{dict.portal.thisWeek}</p>
            <Link href={localizedPath(locale, '/portail/activites')}>{dict.activities.seeAll} →</Link>
          </div>
          {activities.docs.length === 0 ? (
            <p style={{ color: 'var(--ink-soft)' }}>{dict.portal.noUpcoming}</p>
          ) : (
            <div className="activity-grid">
              {activities.docs.map((a) => (
                <ActivityCard key={a.id} activity={a} locale={locale} />
              ))}
            </div>
          )}
        </div>

        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: '3rem' }}
        >
          <div>
            <p className="eyebrow eyebrow--ciel">{dict.portal.announcements}</p>
            {sortedAnnouncements.length === 0 ? (
              <p style={{ color: 'var(--ink-soft)' }}>{dict.portal.noAnnouncements}</p>
            ) : (
              sortedAnnouncements.slice(0, 3).map((a) => (
                <AnnouncementCard key={a.id} announcement={a} locale={locale} compact />
              ))
            )}
          </div>
          {closures.docs.length > 0 && (
            <div>
              <p className="eyebrow eyebrow--sauge">{dict.portal.closures}</p>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {closures.docs.map((c) => (
                  <li
                    key={c.id}
                    style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', padding: '0.9rem 0', borderBottom: '1px solid rgba(56,41,26,0.1)' }}
                  >
                    <strong>{c.label}</strong>
                    <span style={{ color: 'var(--ink-soft)', textAlign: 'right' }}>
                      {formatDateRange(locale, c.startDate, c.endDate)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </PortalShell>
  )
}
