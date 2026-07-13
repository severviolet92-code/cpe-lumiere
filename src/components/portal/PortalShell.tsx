import Link from 'next/link'
import type { ReactNode } from 'react'

import type { Locale } from '../../i18n/config'
import { localizedPath } from '../../i18n/config'
import { t } from '../../i18n/ui'
import type { Group, Parent } from '../../payload-types'
import { PortalSignOut } from './PortalSignOut'

const PORTAL_NAV = [
  { path: '/portail', key: 'navDashboard' },
  { path: '/portail/activites', key: 'navActivities' },
  { path: '/portail/annonces', key: 'navAnnouncements' },
  { path: '/portail/documents', key: 'navDocuments' },
  { path: '/portail/aide', key: 'navHelp' },
] as const

export function PortalShell({
  locale,
  parent,
  current,
  children,
}: {
  locale: Locale
  parent: Parent
  current: string
  children: ReactNode
}) {
  const dict = t(locale)
  const groups = (parent.groups || []).filter((g): g is Group => typeof g === 'object')

  return (
    <section className="section" style={{ paddingTop: '2.5rem' }}>
      <div className="container">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '1.8rem',
          }}
        >
          <div>
            <p className="eyebrow">{dict.portal.title}</p>
            <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', marginBottom: '0.5rem' }}>
              {dict.portal.hello}, {parent.name}
            </h1>
            <p style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', margin: 0 }}>
              {groups.map((g) => (
                <span key={g.id} className={`group-chip group-chip--sm chip--${g.color || 'miel'}`}>
                  <span className="group-chip__dot" aria-hidden="true" />
                  {g.name}
                </span>
              ))}
            </p>
          </div>
          <PortalSignOut label={dict.portal.signOut} />
        </div>

        <nav className="portal-nav" aria-label={dict.portal.title}>
          {PORTAL_NAV.map(({ path, key }) => (
            <Link
              key={path}
              href={localizedPath(locale, path)}
              aria-current={current === path ? 'page' : undefined}
            >
              {dict.portal[key]}
            </Link>
          ))}
        </nav>

        <div style={{ marginTop: '2.2rem' }}>{children}</div>

        <p className="form-note" style={{ marginTop: '3rem' }}>
          🔒 {dict.portal.privateNote}
        </p>
      </div>
    </section>
  )
}
