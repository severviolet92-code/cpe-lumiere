import Image from 'next/image'

import type { Locale } from '../i18n/config'
import { t } from '../i18n/ui'
import { formatDateWithWeekday } from '../lib/format'
import type { Activity, Group, Media } from '../payload-types'
import { RichTextBlock } from './RichTextBlock'

function monthShort(locale: Locale, iso: string): string {
  return new Intl.DateTimeFormat(locale === 'fr' ? 'fr-CA' : 'en-CA', {
    month: 'short',
    timeZone: 'UTC',
  }).format(new Date(iso))
}

/** The activity card — the core visual unit of the activities-first experience. */
export function ActivityCard({
  activity,
  locale,
  featured = false,
}: {
  activity: Activity
  locale: Locale
  featured?: boolean
}) {
  const dict = t(locale)
  const image = activity.image && typeof activity.image === 'object' ? (activity.image as Media) : null
  const groups = (activity.groups || []).filter((g): g is Group => typeof g === 'object')
  const dayNum = new Date(activity.date).getUTCDate()

  return (
    <article className={`activity-card${featured ? ' activity-card--featured' : ''}`}>
      <div className="activity-card__media">
        {image?.url ? (
          <Image
            src={image.sizes?.card?.url || image.url}
            alt={image.alt || ''}
            width={image.sizes?.card?.width || 800}
            height={image.sizes?.card?.height || 600}
            sizes={featured ? '(max-width: 700px) 100vw, 640px' : '(max-width: 700px) 100vw, 380px'}
            priority={featured}
          />
        ) : (
          <div className="activity-card__media-fallback" aria-hidden="true">☀️</div>
        )}
        <div className="date-badge" aria-hidden="true">
          <span className="date-badge__day">{dayNum}</span>
          <span className="date-badge__month">{monthShort(locale, activity.date)}</span>
        </div>
      </div>

      <div className="activity-card__body">
        <p className="activity-card__date">
          {formatDateWithWeekday(locale, activity.date)}
          {activity.endDate && ` ${dict.activities.multiDay} ${formatDateWithWeekday(locale, activity.endDate)}`}
        </p>
        <h3>{activity.title}</h3>

        {groups.length > 0 && (
          <p className="activity-card__groups">
            <span className="activity-card__groups-label">{dict.activities.forGroups}</span>
            {groups.map((g) => (
              <span key={g.id} className={`group-chip group-chip--sm chip--${g.color || 'miel'}`}>
                <span className="group-chip__dot" aria-hidden="true" />
                {g.name}
              </span>
            ))}
          </p>
        )}

        <RichTextBlock data={activity.description} className="activity-card__desc" />

        {activity.importantNote && (
          <p className="important-note">
            <strong>{dict.activities.important} :</strong> {activity.importantNote}
          </p>
        )}

        {(activity.checklist?.length ?? 0) > 0 && (
          <div className="activity-card__bring">
            <span className="activity-card__bring-label">{dict.activities.toBring}</span>
            <ul className="checklist-pills">
              {activity.checklist!.map((c, i) => (
                <li key={c.id || i}>{c.item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  )
}
