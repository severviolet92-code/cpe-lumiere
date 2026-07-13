import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { ActivityCard } from '../../../../../components/ActivityCard'
import { PortalShell } from '../../../../../components/portal/PortalShell'
import { isLocale, localizedPath, type Locale } from '../../../../../i18n/config'
import { t } from '../../../../../i18n/ui'
import { getPayload } from '../../../../../lib/payload'
import { getParentUser } from '../../../../../lib/portalAuth'

export const metadata: Metadata = { robots: { index: false } }

export default async function PortalActivitiesPage({
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
  const today = new Date().toISOString().slice(0, 10)

  const activities = await payload.find({
    collection: 'activities',
    where: {
      or: [{ date: { greater_than_equal: today } }, { endDate: { greater_than_equal: today } }],
    },
    sort: 'date',
    limit: 50,
    locale,
    overrideAccess: false,
    user: parent,
  })

  return (
    <PortalShell locale={locale} parent={parent} current="/portail/activites">
      <p className="eyebrow eyebrow--terracotta">{dict.portal.thisWeek}</p>
      {activities.docs.length === 0 ? (
        <p style={{ color: 'var(--ink-soft)' }}>{dict.portal.noUpcoming}</p>
      ) : (
        <div className="activity-grid">
          {activities.docs.map((a) => (
            <ActivityCard key={a.id} activity={a} locale={locale} />
          ))}
        </div>
      )}
    </PortalShell>
  )
}
