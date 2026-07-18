import type { Endpoint, PayloadRequest } from 'payload'

import { isLocale, type Locale } from '../i18n/config'
import { hasEventIntent, lexicalPlainText, rankArticles, type SearchableArticle } from '../lib/kbSearch'
import { captureError } from '../lib/observability'
import { scrubPii } from '../lib/piiScrub'
import { isRateLimited } from '../lib/rateLimit'
import { detectRiskCategory, GATED_MESSAGE } from '../lib/riskGate'

const MAX_RESULTS = 3
/** Results scoring far below the best match are noise, not alternatives. */
const RELATIVE_SCORE_FLOOR = 0.35
const RATE_LIMIT_MAX = 10
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000

function requesterIp(req: PayloadRequest): string {
  const header = req.headers.get('x-forwarded-for') || ''
  return header.split(',')[0].trim() || 'local'
}

/**
 * GET /api/kb-articles/search?q=…&locale=fr
 * Ranked keyword search over the knowledge base — reachable by anonymous
 * visitors (public FAQ) and by signed-in portal parents. Access control is
 * enforced by the collection itself (kbArticlesRead): the query below runs
 * with the requester's own permissions, so drafts, disabled and portal-only
 * articles can never leak to the wrong audience.
 *
 * Architecture (non-negotiable, see PROJECT_MEMORY.md §2.7): the assistant
 * never invents information and never lets a plausible match stand in for a
 * human on high-risk topics. Order of operations matters:
 *   1. Rate limit (abuse/cost protection)
 *   2. High-risk topic gate — checked BEFORE retrieval; a match short-
 *      circuits straight to a fixed redirect, retrieval never runs
 *   3. Retrieval — verbatim admin-authored answers only, never generated
 *   4. Every question is logged (PII-scrubbed) with its outcome, for the
 *      director's content-gap dashboard
 */
export function makeKBSearchEndpoint(): Endpoint {
  return {
    path: '/search',
    method: 'get',
    handler: async (req: PayloadRequest) => {
      const q = String(req.query?.q ?? '').slice(0, 300)
      const rawLocale = String(req.query?.locale ?? 'fr')
      const locale: Locale = isLocale(rawLocale) ? rawLocale : 'fr'
      const isParent = req.user?.collection === 'parents'
      const audience: 'public' | 'portal' = isParent ? 'portal' : 'public'

      if (!q.trim()) {
        return Response.json({ results: [] })
      }

      // Authenticated requests are rate-limited per parent (precise identity);
      // anonymous requests fall back to IP, the only identity available.
      const rateLimitKey = isParent ? `parent:${req.user!.id}` : `ip:${requesterIp(req)}`
      if (isRateLimited(rateLimitKey, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS)) {
        return Response.json(
          { error: 'Trop de questions en peu de temps. Réessayez dans quelques minutes. / Too many questions in a short time. Try again in a few minutes.' },
          { status: 429 },
        )
      }

      const logQuestion = (outcome: 'answered' | 'refused' | 'gated', matchedArticles: number[] = []) =>
        req.payload
          .create({
            collection: 'question-log',
            data: {
              question: scrubPii(q),
              locale,
              audience,
              outcome,
              matchedArticles,
              askedBy: isParent ? (req.user!.id as number) : undefined,
            },
            overrideAccess: true,
          })
          .catch((err) => {
            // Logging must never break the assistant response, but the failure
            // is still worth capturing for the health page.
            captureError(req.payload, err, { scope: 'assistant', detail: { task: 'question-log write' } })
          })

      const riskCategory = detectRiskCategory(q)
      if (riskCategory) {
        await logQuestion('gated')
        return Response.json({ gated: true, message: GATED_MESSAGE[locale], results: [], events: [] })
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

      await logQuestion(results.length > 0 ? 'answered' : 'refused', results.map((r) => r.id))

      // Integration with the news centre: when the question is about events
      // or outings, surface the requester's upcoming events alongside the
      // articles. Announcements are never public, so this naturally returns
      // nothing for anonymous visitors — same access rules as the portal.
      let events: { id: number; title: string; eventDate: string }[] = []
      if (isParent && hasEventIntent(q)) {
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

      return Response.json({ gated: false, results, events })
    },
  }
}
