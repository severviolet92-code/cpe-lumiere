import Link from 'next/link'

import type { Locale } from '../i18n/config'
import { localizedPath } from '../i18n/config'
import { t } from '../i18n/ui'
import type { SiteSetting } from '../payload-types'

export function SiteFooter({ locale, settings }: { locale: Locale; settings: SiteSetting }) {
  const dict = t(locale)

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div>
            <h4>{settings.cpeName}</h4>
            {settings.tagline && <p style={{ maxWidth: '30em' }}>{settings.tagline}</p>}
            {settings.permitNote && (
              <p style={{ fontSize: '0.88rem', color: 'var(--ink-faint)' }}>{settings.permitNote}</p>
            )}
          </div>
          <div>
            <h4>{dict.footer.quickLinks}</h4>
            <ul>
              <li><Link href={localizedPath(locale, '/admission')}>{dict.nav.admission}</Link></li>
              <li><Link href={localizedPath(locale, '/nutrition')}>{dict.nav.nutrition}</Link></li>
              <li><Link href={localizedPath(locale, '/faq')}>{dict.nav.faq}</Link></li>
              <li><Link href={localizedPath(locale, '/carrieres')}>{dict.nav.careers}</Link></li>
              <li><Link href={localizedPath(locale, '/portail')}>{dict.nav.portal}</Link></li>
            </ul>
          </div>
          <div>
            <h4>{dict.footer.contact}</h4>
            <ul>
              {settings.phone && <li><a href={`tel:${settings.phone.replace(/[^+\d]/g, '')}`}>{settings.phone}</a></li>}
              {settings.email && <li><a href={`mailto:${settings.email}`}>{settings.email}</a></li>}
              {settings.address && <li style={{ whiteSpace: 'pre-line' }}>{settings.address}</li>}
              {settings.hours && <li>{settings.hours}</li>}
            </ul>
          </div>
        </div>
        <div className="site-footer__legal">
          <span>© {new Date().getFullYear()} {settings.cpeName}</span>
          <span>{dict.footer.privacyNote}</span>
          <span>{dict.footer.demoNotice}</span>
        </div>
      </div>
    </footer>
  )
}
