import type { Endpoint, PayloadRequest } from 'payload'

import { isLocale, type Locale } from '../i18n/config'
import { renderCampaignHtml, resolveRecipients, runDueCampaigns, sendCampaign } from '../lib/campaigns'

function isAdmin(req: PayloadRequest): boolean {
  return req.user?.collection === 'users'
}

/**
 * GET /api/email-campaigns/:id/preview?locale=fr
 * Returns the fully rendered branded email as text/html so the admin can see
 * exactly what parents will receive, before anything is sent.
 */
export const campaignPreviewEndpoint: Endpoint = {
  path: '/:id/preview',
  method: 'get',
  handler: async (req: PayloadRequest) => {
    if (!isAdmin(req)) return Response.json({ error: 'Unauthorized' }, { status: 403 })
    const id = Number(req.routeParams?.id)
    if (!id) return Response.json({ error: 'Missing id' }, { status: 400 })

    const rawLocale = String(req.query?.locale ?? 'fr')
    const locale: Locale = isLocale(rawLocale) ? rawLocale : 'fr'
    const { html } = await renderCampaignHtml(req.payload, id, locale)
    return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } })
  },
}

/**
 * POST /api/email-campaigns/:id/send
 * Explicit two-step send, mirroring the announcement notify flow:
 *   {}               → recipient preview (count + audience label)
 *   { test: true }   → send only to the requesting admin, subject prefixed
 *   { confirm: true }→ send to every recipient, record delivery + log
 */
export const campaignSendEndpoint: Endpoint = {
  path: '/:id/send',
  method: 'post',
  handler: async (req: PayloadRequest) => {
    if (!isAdmin(req) || !req.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 403 })
    }
    const id = Number(req.routeParams?.id)
    if (!id) return Response.json({ error: 'Missing id' }, { status: 400 })

    const campaign = await req.payload.findByID({
      collection: 'email-campaigns',
      id,
      depth: 1,
      overrideAccess: true,
    })

    const body = (req.json ? await req.json().catch(() => ({})) : {}) as {
      confirm?: boolean
      test?: boolean
    }

    if (body.test) {
      const { sendOne } = await import('../lib/mailer')
      const rendered = await renderCampaignHtml(req.payload, id, 'fr')
      const result = await sendOne(req.payload, {
        to: req.user.email,
        subject: `[TEST] ${rendered.subject}`,
        html: rendered.html,
        text: rendered.text,
      })
      if (!result.ok) return Response.json({ error: result.error }, { status: 502 })
      return Response.json({ test: true, to: req.user.email })
    }

    if (campaign.status === 'sent' || campaign.status === 'sending') {
      return Response.json(
        { error: 'Campagne déjà envoyée — dupliquez-la pour renvoyer. / Already sent — duplicate it to send again.' },
        { status: 400 },
      )
    }

    const recipients = await resolveRecipients(req.payload, campaign)
    const groupNames = (campaign.groups || [])
      .map((g) => (typeof g === 'object' ? g.name : null))
      .filter(Boolean)
      .join(', ')
    const audienceLabel =
      campaign.audience === 'groups' ? groupNames || 'Groupes / Groups' : 'Tout le CPE / Whole CPE'

    if (recipients.length === 0) {
      return Response.json({ error: 'Aucun destinataire. / No recipients.' }, { status: 400 })
    }

    if (!body.confirm) {
      return Response.json({ preview: true, recipients: recipients.length, audience: audienceLabel })
    }

    const outcome = await sendCampaign(req.payload, id, {
      sentById: req.user.id as number,
      trigger: 'manual',
    })
    return Response.json(outcome)
  },
}

/**
 * POST /api/email-campaigns/run-due
 * Sends every scheduled campaign whose time has passed. Callable by an admin
 * user or by an external scheduler (cron) with
 * `Authorization: Bearer $CAMPAIGN_CRON_SECRET`.
 */
export const campaignRunDueEndpoint: Endpoint = {
  path: '/run-due',
  method: 'post',
  handler: async (req: PayloadRequest) => {
    const secret = process.env.CAMPAIGN_CRON_SECRET
    const bearer = req.headers.get('authorization')
    const cronAuthorized = Boolean(secret && bearer === `Bearer ${secret}`)
    if (!isAdmin(req) && !cronAuthorized) {
      return Response.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const results = await runDueCampaigns(req.payload)
    return Response.json({
      ran: results.length,
      campaigns: results.map((r) => ({ id: r.id, title: r.title, ...r.outcome })),
    })
  },
}
