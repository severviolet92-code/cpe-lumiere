import Image from 'next/image'

import type { Locale } from '../../i18n/config'
import { t } from '../../i18n/ui'
import { formatDate, formatDateWithWeekday } from '../../lib/format'
import { videoEmbedUrl } from '../../lib/video'
import type { Announcement, Document, Media } from '../../payload-types'
import { RichTextBlock } from '../RichTextBlock'

const KIND_CLASS: Record<string, string> = {
  news: 'kind-badge--news',
  event: 'kind-badge--event',
  reminder: 'kind-badge--reminder',
  holiday: 'kind-badge--holiday',
}

/**
 * One announcement in the portal news centre: kind badge, dates, rich body,
 * optional image, embedded video and PDF attachments. `compact` renders the
 * dashboard variant (no media, no attachments).
 */
export function AnnouncementCard({
  announcement,
  locale,
  compact = false,
}: {
  announcement: Announcement
  locale: Locale
  compact?: boolean
}) {
  const dict = t(locale)
  const kind = announcement.kind || 'news'
  const image =
    !compact && typeof announcement.image === 'object' ? (announcement.image as Media) : null
  const embed =
    !compact && announcement.videoUrl ? videoEmbedUrl(announcement.videoUrl) : null
  const attachments = !compact
    ? ((announcement.attachments || []).filter(
        (d): d is Document => typeof d === 'object' && d !== null,
      ) as Document[])
    : []
  const publishedIso = announcement.publishAt || announcement.createdAt

  return (
    <article className="announcement-item">
      <div className="announcement-item__meta">
        {announcement.pinned && <span className="pinned-badge">{dict.portal.pinnedBadge}</span>}
        <span className={`kind-badge ${KIND_CLASS[kind] || KIND_CLASS.news}`}>
          {dict.portal.news.kinds[kind as keyof typeof dict.portal.news.kinds] ||
            dict.portal.news.kinds.news}
        </span>
        <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{announcement.title}</h3>
        {publishedIso && (
          <span style={{ fontSize: '0.82rem', color: 'var(--ink-faint)' }}>
            {formatDate(locale, publishedIso)}
          </span>
        )}
      </div>

      {kind === 'event' && announcement.eventDate && (
        <p className="announcement-item__event-date">
          📅 {dict.portal.news.eventOn} {formatDateWithWeekday(locale, announcement.eventDate)}
        </p>
      )}

      <RichTextBlock data={announcement.body} />

      {image && (
        <Image
          src={image.sizes?.card?.url || image.url || ''}
          alt={image.alt || ''}
          width={image.sizes?.card?.width || 800}
          height={image.sizes?.card?.height || 600}
          className="announcement-item__image"
        />
      )}

      {embed && (
        <div className="announcement-item__video">
          <iframe
            src={embed}
            title={dict.portal.news.watchVideo}
            loading="lazy"
            allow="accelerometer; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
      {!compact && announcement.videoUrl && !embed && (
        <p>
          <a href={announcement.videoUrl} target="_blank" rel="noopener noreferrer">
            🎬 {dict.portal.news.watchVideo}
          </a>
        </p>
      )}

      {attachments.length > 0 && (
        <div className="announcement-item__attachments">
          <span className="announcement-item__attachments-label">
            {dict.portal.news.attachments}
          </span>
          <ul>
            {attachments.map((doc) => (
              <li key={doc.id}>
                <a href={doc.url || '#'} target="_blank" rel="noopener noreferrer">
                  📄 {doc.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  )
}
