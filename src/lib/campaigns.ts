import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'
import type { Payload } from 'payload'

import { htmlToText, renderBrandedEmail } from '../emails/branded'
import type { Locale } from '../i18n/config'
import { sendOne } from './mailer'
import type { EmailCampaign, Parent } from '../payload-types'

/**
 * Email campaign engine: recipient resolution, per-language rendering and
 * delivery accounting. Used by the admin "send now" endpoint and by the
 * scheduled runner — one code path, one audit trail.
 */

export async function resolveRecipients(
  payload: Payload,
  campaign: EmailCampaign,
): Promise<Parent[]> {
  const groupIds = (campaign.groups || []).map((g) => (typeof g === 'object' ? g.id : g))
  const parents = await payload.find({
    collection: 'parents',
    where: {
      and: [
        { active: { equals: true } },
        ...(campaign.audience === 'groups' ? [{ groups: { in: groupIds } }] : []),
      ],
    },
    limit: 2000,
    overrideAccess: true,
  })
  return parents.docs
}

export async function renderCampaignHtml(
  payload: Payload,
  campaignId: number,
  locale: Locale,
): Promise<{ subject: string; html: string; text: string }> {
  const [campaign, settings] = await Promise.all([
    payload.findByID({
      collection: 'email-campaigns',
      id: campaignId,
      locale,
      overrideAccess: true,
    }),
    payload.findGlobal({ slug: 'site-settings', locale, overrideAccess: true }),
  ])

  const bodyHtml = convertLexicalToHTML({ data: campaign.body, disableContainer: true })
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  const portalUrl = locale === 'en' ? `${serverUrl}/en/portail` : `${serverUrl}/portail`

  const html = renderBrandedEmail({
    locale,
    cpeName: settings.cpeName || 'CPE',
    title: campaign.subject,
    bodyHtml,
    ctaUrl: portalUrl,
    ctaLabel: locale === 'en' ? 'Open the parent portal' : 'Ouvrir le portail parents',
  })

  return { subject: campaign.subject, html, text: htmlToText(bodyHtml) }
}

export type CampaignSendOutcome = {
  recipients: number
  delivered: number
  failed: number
  failures: string[]
}

/**
 * Send a campaign to every resolved recipient in the recipient's own
 * language, then persist status, counters and a notification-log entry.
 * Callers must have verified authorization and confirmation beforehand.
 */
export async function sendCampaign(
  payload: Payload,
  campaignId: number,
  options: { sentById?: number; trigger: 'manual' | 'schedule' },
): Promise<CampaignSendOutcome> {
  const campaign = await payload.findByID({
    collection: 'email-campaigns',
    id: campaignId,
    depth: 1,
    overrideAccess: true,
  })

  const recipients = await resolveRecipients(payload, campaign)
  const rendered = {
    fr: await renderCampaignHtml(payload, campaignId, 'fr'),
    en: await renderCampaignHtml(payload, campaignId, 'en'),
  }

  let delivered = 0
  const failures: string[] = []
  for (const parent of recipients) {
    const language: Locale = parent.language === 'en' ? 'en' : 'fr'
    const message = rendered[language]
    const result = await sendOne(payload, {
      to: parent.email,
      subject: message.subject,
      html: message.html,
      text: message.text,
    })
    if (result.ok) delivered += 1
    else failures.push(`${parent.email}: ${result.error}`)
  }

  const failed = failures.length
  const status = failed > 0 && delivered === 0 ? 'failed' : 'sent'

  await payload.update({
    collection: 'email-campaigns',
    id: campaignId,
    data: {
      status,
      sentAt: new Date().toISOString(),
      recipientsCount: recipients.length,
      deliveredCount: delivered,
      failedCount: failed,
      deliveryNote: failures.slice(0, 20).join('\n') || null,
    },
    overrideAccess: true,
  })

  const groupNames = (campaign.groups || [])
    .map((g) => (typeof g === 'object' ? g.name : null))
    .filter(Boolean)
    .join(', ')

  await payload.create({
    collection: 'notification-log',
    data: {
      title: `[Campagne] ${campaign.title}`,
      sourceType: 'campaign',
      sourceId: campaignId,
      audience:
        campaign.audience === 'groups'
          ? groupNames || 'Groupes / Groups'
          : 'Tout le CPE / Whole CPE',
      recipients: recipients.length,
      delivered,
      failed,
      sentBy: options.sentById,
      trigger: options.trigger,
    },
    overrideAccess: true,
  })

  return { recipients: recipients.length, delivered, failed, failures }
}

/** Send every scheduled campaign whose time has come. Returns per-campaign results. */
export async function runDueCampaigns(
  payload: Payload,
): Promise<{ id: number; title: string; outcome: CampaignSendOutcome }[]> {
  const due = await payload.find({
    collection: 'email-campaigns',
    where: {
      and: [
        { status: { equals: 'scheduled' } },
        { scheduledAt: { less_than_equal: new Date().toISOString() } },
      ],
    },
    limit: 20,
    overrideAccess: true,
  })

  const results = []
  for (const campaign of due.docs) {
    // Claim before sending so a concurrent runner cannot double-send.
    await payload.update({
      collection: 'email-campaigns',
      id: campaign.id,
      data: { status: 'sending' },
      overrideAccess: true,
    })
    const outcome = await sendCampaign(payload, campaign.id as number, { trigger: 'schedule' })
    results.push({ id: campaign.id as number, title: campaign.title, outcome })
  }
  return results
}
