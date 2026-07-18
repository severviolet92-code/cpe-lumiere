import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'
import type { Endpoint, PayloadRequest } from 'payload'

import { isLocale, type Locale } from '../i18n/config'

/**
 * GET /api/kb-articles/:id/preview?locale=fr
 * Renders a knowledge-base article exactly as it will appear in the parent
 * assistant (question, category chip, rich answer, image) — including drafts,
 * so the administration can check an article before publishing it. Admin-only:
 * this must never expose a draft/disabled article to anyone else.
 */
export const kbArticlePreviewEndpoint: Endpoint = {
  path: '/:id/preview',
  method: 'get',
  handler: async (req: PayloadRequest) => {
    if (req.user?.collection !== 'users') {
      return Response.json({ error: 'Unauthorized' }, { status: 403 })
    }
    const id = Number(req.routeParams?.id)
    if (!id) return Response.json({ error: 'Missing id' }, { status: 400 })

    const rawLocale = String(req.query?.locale ?? 'fr')
    const locale: Locale = isLocale(rawLocale) ? rawLocale : 'fr'

    const article = await req.payload.findByID({
      collection: 'kb-articles',
      id,
      depth: 1,
      locale,
      draft: true,
      overrideAccess: true,
    })

    const category = typeof article.category === 'object' && article.category ? article.category : null
    const image = typeof article.image === 'object' && article.image ? article.image : null
    const answerHtml = convertLexicalToHTML({ data: article.answer, disableContainer: true })
    const statusLabel =
      article._status === 'published'
        ? (locale === 'en' ? 'Published' : 'Publié')
        : (locale === 'en' ? 'Draft — not visible to parents yet' : 'Brouillon — pas encore visible des parents')
    const visibilityLabel =
      article.enabled === false
        ? (locale === 'en' ? 'Disabled' : 'Désactivé')
        : (locale === 'en' ? 'Enabled' : 'Activé')

    const html = `<!DOCTYPE html>
<html lang="${locale === 'en' ? 'en-CA' : 'fr-CA'}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${locale === 'en' ? 'Preview' : 'Aperçu'} — ${escapeHtml(article.question)}</title>
<style>
  body { margin:0; padding:2.5rem 1.5rem; background:#faf5ec; color:#38291a; font-family:-apple-system,'Segoe UI',Helvetica,Arial,sans-serif; }
  .status-bar { max-width:640px; margin:0 auto 1.2rem; display:flex; gap:.6rem; flex-wrap:wrap; }
  .badge { display:inline-block; border-radius:999px; padding:.25rem .8rem; font-size:.78rem; font-weight:700; }
  .badge--status { background:#f3cd8a; color:#8a5c10; }
  .badge--visibility { background:#e9efe4; color:#46603f; }
  .bubble { max-width:640px; margin:0 auto; background:#fffdf8; border:1px solid rgba(56,41,26,.1); border-radius:18px; padding:1.4rem 1.6rem; box-shadow:0 20px 60px -30px rgba(88,60,20,.35); }
  .head { display:flex; justify-content:space-between; align-items:baseline; gap:.8rem; flex-wrap:wrap; margin-bottom:.5rem; }
  h1 { font-size:1.15rem; margin:0; font-family:Georgia,'Times New Roman',serif; }
  .category { background:#e9efe4; color:#46603f; border-radius:999px; padding:.15rem .65rem; font-size:.72rem; font-weight:700; white-space:nowrap; }
  img { max-width:100%; border-radius:12px; margin-top:.9rem; }
  p { line-height:1.6; }
</style>
</head>
<body>
  <div class="status-bar">
    <span class="badge badge--status">${statusLabel}</span>
    <span class="badge badge--visibility">${visibilityLabel}</span>
  </div>
  <div class="bubble">
    <div class="head">
      <h1>${escapeHtml(article.question)}</h1>
      ${category ? `<span class="category">${category.icon ? escapeHtml(category.icon) + ' ' : ''}${escapeHtml(category.name)}</span>` : ''}
    </div>
    ${answerHtml}
    ${image ? `<img src="${image.sizes?.card?.url || image.url}" alt="${escapeHtml(image.alt || '')}">` : ''}
  </div>
</body>
</html>`

    return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } })
  },
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}
