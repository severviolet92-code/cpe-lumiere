import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound, redirect } from 'next/navigation'

import { PortalShell } from '../../../../../components/portal/PortalShell'
import { isLocale, localizedPath, type Locale } from '../../../../../i18n/config'
import { t } from '../../../../../i18n/ui'
import { formatDate } from '../../../../../lib/format'
import { getPayload } from '../../../../../lib/payload'
import { getParentUser } from '../../../../../lib/portalAuth'

export const metadata: Metadata = { robots: { index: false } }

/**
 * Group-scoped photo feed: access control (`galleryPhotosRead`) decides what
 * this parent can see — public photos, CPE-wide portal photos, and photos
 * tagged with one of their child's groups. Never filtered client-side.
 */
export default async function PortalPhotosPage({
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
  const photos = await payload.find({
    collection: 'gallery-photos',
    sort: '-takenAt',
    limit: 60,
    locale,
    overrideAccess: false,
    user: parent,
  })

  return (
    <PortalShell locale={locale} parent={parent} current="/portail/photos">
      <p className="eyebrow eyebrow--lavande">{dict.portal.photosTitle}</p>
      <p className="lede" style={{ marginBottom: '1.8rem' }}>{dict.portal.photosLede}</p>
      {photos.docs.length === 0 ? (
        <p style={{ color: 'var(--ink-soft)' }}>{dict.portal.noPhotos}</p>
      ) : (
        <div className="gallery-grid">
          {photos.docs.map((photo) => (
            <figure className="gallery-item" key={photo.id} style={{ margin: 0 }}>
              {photo.url && (
                <Image
                  src={photo.sizes?.card?.url || photo.url}
                  alt={photo.caption || ''}
                  width={photo.sizes?.card?.width || 800}
                  height={photo.sizes?.card?.height || 600}
                  sizes="(max-width: 700px) 100vw, 380px"
                  // Portal photos are access-controlled: Next's image optimizer
                  // fetches server-side without the parent's session cookie and
                  // gets denied. Unoptimized = the browser fetches the file
                  // directly, with credentials, through the same access rules.
                  unoptimized
                />
              )}
              <figcaption>
                <time dateTime={photo.takenAt}>{formatDate(locale, photo.takenAt)}</time>
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </PortalShell>
  )
}
