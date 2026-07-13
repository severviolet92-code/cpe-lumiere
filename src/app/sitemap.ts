import type { MetadataRoute } from 'next'

const base = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

const PATHS = ['', '/activites', '/notre-cpe', '/vie-au-cpe', '/admission', '/faq', '/carrieres', '/contact']

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return PATHS.flatMap((path) => [
    {
      url: `${base}${path || '/'}`,
      lastModified: now,
      alternates: { languages: { 'fr-CA': `${base}${path || '/'}`, 'en-CA': `${base}/en${path}` } },
    },
    {
      url: `${base}/en${path}`,
      lastModified: now,
      alternates: { languages: { 'fr-CA': `${base}${path || '/'}`, 'en-CA': `${base}/en${path}` } },
    },
  ])
}
