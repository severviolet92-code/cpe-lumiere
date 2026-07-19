'use server'

import { headers } from 'next/headers'

import { captureError } from '../../../../lib/observability'
import { getPayload } from '../../../../lib/payload'

export type ApplicationFormState = { status: 'idle' | 'ok' | 'error' | 'file-too-large' }

// Same discipline as the contact form: max 3 applications per 30 minutes per IP.
const submissions = new Map<string, number[]>()
const WINDOW_MS = 30 * 60 * 1000
const MAX_PER_WINDOW = 3

const MAX_CV_BYTES = 5 * 1024 * 1024 // 5 MB
const ALLOWED_CV_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
])

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

export async function submitApplication(
  _prev: ApplicationFormState,
  formData: FormData,
): Promise<ApplicationFormState> {
  // Honeypot: real users never fill this hidden field.
  if (formData.get('website')) return { status: 'ok' }

  const name = String(formData.get('name') || '').trim().slice(0, 200)
  const email = String(formData.get('email') || '').trim().slice(0, 200)
  const phone = String(formData.get('phone') || '').trim().slice(0, 50)
  const message = String(formData.get('message') || '').trim().slice(0, 5000)
  const jobOpeningRaw = String(formData.get('jobOpening') || '').trim()
  const cv = formData.get('cv')

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { status: 'error' }
  if (!(cv instanceof File) || cv.size === 0) return { status: 'error' }
  if (cv.size > MAX_CV_BYTES) return { status: 'file-too-large' }
  if (!ALLOWED_CV_TYPES.has(cv.type)) return { status: 'error' }

  const headerList = await headers()
  const ip = (headerList.get('x-forwarded-for') || 'local').split(',')[0].trim()
  if (isRateLimited(ip)) return { status: 'error' }

  let payloadForCapture: Awaited<ReturnType<typeof getPayload>> | null = null
  try {
    const payload = await getPayload()
    payloadForCapture = payload

    // Validate the selected opening actually exists and is published;
    // an empty/invalid selection becomes a spontaneous application.
    let jobOpening: number | undefined
    if (jobOpeningRaw && /^\d+$/.test(jobOpeningRaw)) {
      const found = await payload.find({
        collection: 'job-openings',
        where: { and: [{ id: { equals: Number(jobOpeningRaw) } }, { _status: { equals: 'published' } }] },
        limit: 1,
        overrideAccess: false,
      })
      if (found.docs.length > 0) jobOpening = found.docs[0].id
    }

    const data = Buffer.from(await cv.arrayBuffer())
    // System write: the collection has no public create access — this server
    // action is the single, validated entry point (same pattern as notify()).
    await payload.create({
      collection: 'job-applications',
      overrideAccess: true,
      data: { name, email, phone: phone || undefined, message: message || undefined, jobOpening },
      file: {
        data,
        mimetype: cv.type,
        name: cv.name || 'cv.pdf',
        size: data.length,
      },
    })
    return { status: 'ok' }
  } catch (err) {
    captureError(payloadForCapture, err, { scope: 'careers' })
    return { status: 'error' }
  }
}
