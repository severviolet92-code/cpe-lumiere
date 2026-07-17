import type { Endpoint, PayloadRequest } from 'payload'

import { isLocale, type Locale } from '../i18n/config'
import { hasEventIntent, lexicalPlainText, rankArticles, type SearchableArticle } from '../lib/kbSearch'

const MAX_RESULTS = 3
/** Results scoring far below the best match are noise, not alternatives. */
const RELATIVE_SCORE_FLOOR = 0.35

/**
 * GET /api/kb-articles/search?q=…&locale=fr
 * Ranked keyword search over the knowledge base, for authenticated portal
 * parents (and admin users). Access control is enforced by the collection:
 * the query below runs with the requester's own permissions, so drafts and
 * disabled articles can never leak into results.
 */
export function makeKBSearchEndpoint(): Endpoint {
  return {
    path: '/search',
    method: 'get',
    handler: async (req: PayloadRequest) => {
      if (!req.user) {
        return Response.json({ error: 'Unauthorized' }, { status: 403 })
      }

      const q = String(req.query?.q ?? '').slice(0, 300)
      const rawLocale = String(req.query?.locale ?? 'fr')
      const locale: Locale = isLocale(rawLocale) ? rawLocale : 'fr'

      if (!q.trim()) {
        return Response.json({ results: [] })
      }

      const articles = await req.payload.find({
        collection: 'kb-articles',
        depth: 1,
        limit: 500,
        locale,
        overrideAccess: false,
        user: req.user,
      })

      const searchable: SearchableArticle[] = articles.docs.map((doc) => ({
        id: doc.id as number,
        question: doc.question || '',
        keywords: (doc.keywords || []).map((k: { term?: string | null }) => k.term || ''),
        categoryName:
          typeof doc.category === 'object' && doc.category ? doc.category.name || '' : '',
        answerText: lexicalPlainText(doc.answer),
      }))

      const allRanked = rankArticles(q, searchable)
      const best = allRanked[0]?.score ?? 0
      const ranked = allRanked
        .filter((r) => r.score >= best * RELATIVE_SCORE_FLOOR)
        .slice(0, MAX_RESULTS)
      const byId = new Map(articles.docs.map((doc) => [doc.id as number, doc]))

      const results = ranked.map(({ id, score }) => {
        const doc = byId.get(id)!
        const category = typeof doc.category === 'object' && doc.category ? doc.category : null
        const image = typeof doc.image === 'object' && doc.image ? doc.image : null
        return {
          id,
          score: Math.round(score * 100) / 100,
          question: doc.question,
          answer: doc.answer,
          category: category ? { name: category.name, icon: category.icon || null } : null,
          image: image
            ? { url: image.sizes?.card?.url || image.url, alt: image.alt || '' }
            : null,
        }
      })

      // Integration with the news centre: when the question is about events
      // or outings, surface the requester's upcoming events alongside the
      // articles. Same access rules as the portal — nothing extra leaks.
      let events: { id: number; title: string; eventDate: string }[] = []
      if (hasEventIntent(q)) {
        const today = new Date().toISOString().slice(0, 10)
        const upcoming = await req.payload.find({
          collection: 'announcements',
          where: {
            and: [
              { kind: { equals: 'event' } },
              { archived: { not_equals: true } },
              { eventDate: { greater_than_equal: today } },
            ],
          },
          sort: 'eventDate',
          limit: 3,
          depth: 0,
          locale,
          overrideAccess: false,
          user: req.user,
        })
        events = upcoming.docs
          .filter((doc) => doc.eventDate)
          .map((doc) => ({
            id: doc.id as number,
            title: doc.title,
            eventDate: doc.eventDate as string,
          }))
      }

      return Response.json({ results, events })
    },
  }
}
