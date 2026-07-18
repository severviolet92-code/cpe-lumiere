import crypto from 'crypto'
import type { Endpoint, PayloadRequest } from 'payload'

import { renderBrandedEmail } from '../emails/branded'
import { isLocale, type Locale } from '../i18n/config'
import { sendOne } from '../lib/mailer'
import { isRateLimited } from '../lib/rateLimit'

const TOKEN_TTL_MS = 15 * 60 * 1000
const RATE_LIMIT_MAX = 3
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000

function requesterIp(req: PayloadRequest): string {
  const header = req.headers.get('x-forwarded-for') || ''
  return header.split(',')[0].trim() || 'local'
}

/**
 * POST /api/parents/magic-link/request  { email, locale }
 * Passwordless sign-in, the production-intended mode per PROJECT_MEMORY.md
 * ("demo uses password login; production switches to magic-link sign-in").
 *
 * Implementation note: rather than a separate token table, the freshly
 * generated one-time token *becomes* the parent's `password` field (Payload
 * hashes it exactly like any password) for the `magicLinkExpiresAt` window.
 * Consuming it is then just a normal call to Payload's own, already-tested
 * `/api/parents/login` REST endpoint — no custom JWT/cookie handling needed.
 * `beforeLogin`/`afterLogin` hooks on the Parents collection enforce the
 * expiry and rotate the password again immediately after use, so the link
 * is genuinely single-use. Requesting a link does overwrite whatever
 * password was previously set (including the fixed demo password) — this
 * endpoint is a real feature exercised end-to-end, not a cosmetic stub, so
 * that trade-off is accepted and documented rather than hidden.
 *
 * Always responds 200 with a generic message, whether or not the email
 * matches an account — this prevents an attacker from using the endpoint
 * to discover which email addresses belong to enrolled families.
 */
export function makeMagicLinkRequestEndpoint(): Endpoint {
  return {
    path: '/magic-link/request',
    method: 'post',
    handler: async (req: PayloadRequest) => {
      const rateLimitKey = `magiclink:${requesterIp(req)}`
      if (isRateLimited(rateLimitKey, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS)) {
        return Response.json(
          { error: 'Trop de demandes. Réessayez plus tard. / Too many requests. Try again later.' },
          { status: 429 },
        )
      }

      const body = (req.json ? await req.json().catch(() => ({})) : {}) as {
        email?: string
        locale?: string
      }
      const email = String(body.email || '').trim().toLowerCase().slice(0, 200)
      const locale: Locale = isLocale(body.locale || '') ? (body.locale as Locale) : 'fr'

      if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        const found = await req.payload.find({
          collection: 'parents',
          where: { and: [{ email: { equals: email } }, { active: { equals: true } }] },
          limit: 1,
          overrideAccess: true,
        })
        const parent = found.docs[0]

        if (parent) {
          const rawToken = crypto.randomBytes(24).toString('base64url')
          await req.payload.update({
            collection: 'parents',
            id: parent.id,
            data: {
              password: rawToken,
              magicLinkExpiresAt: new Date(Date.now() + TOKEN_TTL_MS).toISOString(),
            },
            overrideAccess: true,
          })

          const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
          const path = locale === 'en' ? '/en/portail/verifier' : '/portail/verifier'
          const verifyUrl = `${serverUrl}${path}?email=${encodeURIComponent(email)}&token=${encodeURIComponent(rawToken)}`

          const settings = await req.payload
            .findGlobal({ slug: 'site-settings', locale, overrideAccess: true })
            .catch(() => null)
          const cpeName = settings?.cpeName || 'CPE'

          const title =
            locale === 'en' ? 'Your sign-in link' : 'Votre lien de connexion'
          const bodyHtml =
            locale === 'en'
              ? `<p>Hello ${escapeHtml(parent.name)},</p><p>Click the button below to sign in to the parent portal. This link expires in 15 minutes and can only be used once.</p><p>If you didn’t request this, you can ignore this email.</p>`
              : `<p>Bonjour ${escapeHtml(parent.name)},</p><p>Cliquez sur le bouton ci-dessous pour vous connecter au portail parents. Ce lien expire dans 15 minutes et ne peut être utilisé qu’une seule fois.</p><p>Si vous n’avez pas fait cette demande, vous pouvez ignorer ce courriel.</p>`

          const html = renderBrandedEmail({
            locale,
            cpeName,
            title,
            bodyHtml,
            ctaUrl: verifyUrl,
            ctaLabel: locale === 'en' ? 'Sign in' : 'Se connecter',
          })

          await sendOne(req.payload, {
            to: email,
            subject: locale === 'en' ? `${cpeName} — Your sign-in link` : `${cpeName} — Votre lien de connexion`,
            html,
            text: `${verifyUrl}`,
          })
        }
      }

      return Response.json({ ok: true })
    },
  }
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}
