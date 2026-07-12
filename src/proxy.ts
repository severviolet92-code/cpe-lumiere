import { NextRequest, NextResponse } from 'next/server'

/**
 * Locale routing: French is canonical at the root (/), English lives under /en.
 * Internally both render through app/(frontend)/[locale]/…
 *   /faq        → rewrite → /fr/faq   (URL stays /faq)
 *   /en/faq     → passes through as-is
 *   /fr/faq     → 301 → /faq          (one canonical URL per page)
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/en' || pathname.startsWith('/en/')) {
    return NextResponse.next()
  }

  if (pathname === '/fr' || pathname.startsWith('/fr/')) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.replace(/^\/fr/, '') || '/'
    return NextResponse.redirect(url, 301)
  }

  const url = request.nextUrl.clone()
  url.pathname = `/fr${pathname === '/' ? '' : pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  // Everything except admin, api, Next internals, and files with an extension.
  matcher: ['/((?!admin|api|_next|.*\\..*).*)'],
}
