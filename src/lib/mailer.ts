import type { Payload } from 'payload'

import { captureError } from './observability'

/**
 * Provider-agnostic outgoing email.
 * Selection order:
 *   1. Resend HTTP API when RESEND_API_KEY is set (same service as the
 *      public contact form).
 *   2. Payload's configured email adapter otherwise — console transport in
 *      demo; production can plug @payloadcms/email-nodemailer (SMTP) or any
 *      other adapter into payload.config without touching callers.
 * Every caller goes through sendOne(), so swapping providers is a config
 * change, never an architecture change.
 */
export type OutgoingEmail = {
  to: string
  subject: string
  html: string
  text: string
}

export type SendResult = { ok: true } | { ok: false; error: string }

export async function sendOne(payload: Payload, message: OutgoingEmail): Promise<SendResult> {
  const resendKey = process.env.RESEND_API_KEY

  if (resendKey) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: process.env.CONTACT_EMAIL_FROM || 'cpe@localhost',
          to: [message.to],
          subject: message.subject,
          html: message.html,
          text: message.text,
        }),
        // Fail fast rather than hang the whole campaign send if Resend stalls.
        signal: AbortSignal.timeout(10000),
      })
      if (res.ok) return { ok: true }
      const error = `Resend HTTP ${res.status}`
      captureError(payload, error, { scope: 'email', detail: { provider: 'resend', to: message.to } })
      return { ok: false, error }
    } catch (err) {
      captureError(payload, err, { scope: 'email', detail: { provider: 'resend', to: message.to } })
      return { ok: false, error: err instanceof Error ? err.message : 'Resend request failed' }
    }
  }

  try {
    await payload.sendEmail({
      to: message.to,
      subject: message.subject,
      html: message.html,
      text: message.text,
    })
    return { ok: true }
  } catch (err) {
    captureError(payload, err, { scope: 'email', detail: { provider: 'adapter', to: message.to } })
    return { ok: false, error: err instanceof Error ? err.message : 'Email adapter failed' }
  }
}
