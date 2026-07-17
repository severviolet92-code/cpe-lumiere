/**
 * Turn a pasted YouTube/Vimeo link into an embeddable player URL.
 * Anything else falls back to a plain external link (no iframe for unknown
 * hosts — the portal only embeds players we trust).
 */
export function videoEmbedUrl(url: string): string | null {
  let parsed: URL
  try {
    parsed = new URL(url)
  } catch {
    return null
  }
  const host = parsed.hostname.replace(/^www\./, '')

  if (host === 'youtube.com' || host === 'm.youtube.com') {
    const id = parsed.searchParams.get('v')
    if (id) return `https://www.youtube-nocookie.com/embed/${id}`
    const shorts = parsed.pathname.match(/^\/shorts\/([\w-]+)/)
    if (shorts) return `https://www.youtube-nocookie.com/embed/${shorts[1]}`
  }
  if (host === 'youtu.be') {
    const id = parsed.pathname.slice(1).split('/')[0]
    if (id) return `https://www.youtube-nocookie.com/embed/${id}`
  }
  if (host === 'vimeo.com') {
    const id = parsed.pathname.match(/^\/(\d+)/)
    if (id) return `https://player.vimeo.com/video/${id[1]}`
  }
  return null
}
