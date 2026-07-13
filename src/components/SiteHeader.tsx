'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import type { Locale } from '../i18n/config'
import { localizedPath } from '../i18n/config'
import { t } from '../i18n/ui'
import { BrandMark } from './BrandMark'

const NAV_ITEMS = [
  { path: '/activites', key: 'activities' },
  { path: '/notre-cpe', key: 'about' },
  { path: '/vie-au-cpe', key: 'life' },
  { path: '/admission', key: 'admission' },
  { path: '/faq', key: 'faq' },
  { path: '/carrieres', key: 'careers' },
  { path: '/contact', key: 'contact' },
] as const

export function SiteHeader({ locale, cpeName }: { locale: Locale; cpeName: string }) {
  const dict = t(locale)
  const pathname = usePathname() || '/'
  const [open, setOpen] = useState(false)

  // The public URL for the current page in the other locale.
  const basePath = pathname.replace(/^\/en(?=\/|$)/, '') || '/'
  const otherLocale: Locale = locale === 'fr' ? 'en' : 'fr'
  const togglePath = localizedPath(otherLocale, basePath)

  // Close the mobile menu when any nav link is activated.
  const closeMenu = () => setOpen(false)

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link className="brand" href={localizedPath(locale, '/')}>
          <BrandMark className="brand__mark" />
          <span className="brand__name">{cpeName}</span>
        </Link>

        <nav
          id="main-nav"
          className={`main-nav${open ? ' is-open' : ''}`}
          aria-label={locale === 'fr' ? 'Navigation principale' : 'Main navigation'}
        >
          {NAV_ITEMS.map(({ path, key }) => {
            const href = localizedPath(locale, path)
            const current = basePath === path
            return (
              <Link key={path} href={href} aria-current={current ? 'page' : undefined} onClick={closeMenu}>
                {dict.nav[key]}
              </Link>
            )
          })}
          <Link href={localizedPath(locale, '/portail')} onClick={closeMenu}>{dict.nav.portal}</Link>
        </nav>

        <div className="header-actions">
          <Link
            className="lang-toggle"
            href={togglePath}
            lang={otherLocale}
            hrefLang={otherLocale}
            aria-label={dict.langToggle}
          >
            {dict.langToggleShort}
          </Link>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="main-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? '✕' : 'Menu'}
          </button>
        </div>
      </div>
    </header>
  )
}
