'use server'

import { headers } from 'next/headers'

export type ContactFormState = { status: 'idle' | 'ok' | 'error' }

// Simple in-memory rate limit: max 3 messages per 10 minutes per IP.
const submissions = new Map<string, number[]>()
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 3

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (submissions.get(ip) || []).filter((ts) => now - ts < WINDOW_MS)
  if (recent.length >= MAX_PER_WINDOW) {
    submissions.set(ip, recent)
    return true
  }
  recent.push(now)
  submissions.set(ip, recent)
  return false
}

export async function sendContactMessage(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Honeypot: real users never fill this hidden field.
  if (formData.get('website')) return { status: 'ok' }

  const name = String(formData.get('name') || '').trim().slice(0, 200)
  const email = String(formData.get('email') || '').trim().slice(0, 200)
  const message = String(formData.get('message') || '').trim().slice(0, 5000)

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: 'error' }
  }

  const headerList = await headers()
  const ip = (headerList.get('x-forwarded-for') || 'local').split(',')[0].trim()
  if (isRateLimited(ip)) return { status: 'error' }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_EMAIL_TO

  if (apiKey && to) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: process.env.CONTACT_EMAIL_FROM || 'site@localhost',
          to: [to],
          reply_to: email,
          subject: `[Site CPE] Message de ${name}`,
          text: `Nom: ${name}\nCourriel: ${email}\n\n${message}`,
        }),
      })
      return res.ok ? { status: 'ok' } : { status: 'error' }
    } catch {
      return { status: 'error' }
    }
  }

  // Dev fallback: no email provider configured — log server-side only.
  console.info(`[contact] message from ${name} <${email}> (${message.length} chars) — RESEND_API_KEY not set, not sent`)
  return { status: 'ok' }
}
