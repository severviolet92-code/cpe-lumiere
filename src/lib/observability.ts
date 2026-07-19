import type { Payload } from 'payload'

/**
 * Observability foundation — structured logging + centralized error capture.
 *
 * Design goals (per the production-hardening brief):
 *  - Everything works with zero external credentials: with nothing configured,
 *    errors are structured-logged through Payload's built-in pino logger and
 *    kept in a small in-memory ring buffer that the system-health page reads.
 *  - A real error-reporting service (Sentry, Bugsnag, a log drain, etc.) slots
 *    in behind ONE env var — `ERROR_REPORTING_WEBHOOK_URL` — with no code
 *    changes at any call site. When set, every captured error is also POSTed
 *    to that URL as a JSON envelope (provider-agnostic, mirroring how
 *    `src/lib/mailer.ts` abstracts the email provider). When unset, that
 *    forwarding is simply skipped. This keeps the whole system "prepared but
 *    disabled until real production values are supplied."
 *
 * Single-process caveat (same as the rate limiter): the in-memory ring buffer
 * resets on restart and is per-instance. That is correct for this demo / a
 * single-instance deployment; a multi-instance production deployment should
 * rely on the external reporting sink, not this buffer, as the source of truth.
 */

export type ErrorScope =
  | 'email'
  | 'campaign'
  | 'scheduler'
  | 'database'
  | 'storage'
  | 'auth'
  | 'assistant'
  | 'careers'
  | 'unexpected'

export type CapturedError = {
  at: string
  scope: ErrorScope
  message: string
  detail?: Record<string, unknown>
}

const RING_BUFFER_MAX = 50
const ring: CapturedError[] = []

/** Most recent captured errors (newest first), for the system-health page. */
export function recentErrors(): CapturedError[] {
  return [...ring].reverse()
}

export function errorCountSince(sinceMs: number): number {
  const cutoff = Date.now() - sinceMs
  return ring.filter((e) => new Date(e.at).getTime() >= cutoff).length
}

function toMessage(err: unknown): string {
  if (err instanceof Error) return err.message
  if (typeof err === 'string') return err
  try {
    return JSON.stringify(err)
  } catch {
    return 'Unknown error'
  }
}

/**
 * Capture a critical/unexpected error: structured-log it, record it for the
 * health page, and forward it to the external reporter if one is configured.
 * Never throws — failing to report an error must not cascade into a second
 * failure at the call site.
 */
export function captureError(
  payload: Payload | null,
  err: unknown,
  context: { scope: ErrorScope; detail?: Record<string, unknown> },
): void {
  const entry: CapturedError = {
    at: new Date().toISOString(),
    scope: context.scope,
    message: toMessage(err),
    detail: context.detail,
  }

  ring.push(entry)
  if (ring.length > RING_BUFFER_MAX) ring.shift()

  try {
    if (payload?.logger) {
      payload.logger.error({ err, scope: context.scope, ...context.detail }, `[${context.scope}] ${entry.message}`)
    } else {
      // Outside a Payload context (rare) — fall back to console so nothing is lost.
      console.error(`[${context.scope}] ${entry.message}`, context.detail ?? '')
    }
  } catch {
    // logging must never throw
  }

  void forwardToReporter(entry)
}

async function forwardToReporter(entry: CapturedError): Promise<void> {
  const url = process.env.ERROR_REPORTING_WEBHOOK_URL
  if (!url) return // disabled until a real sink is configured
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service: 'cpe-lumiere',
        environment: process.env.NODE_ENV || 'development',
        ...entry,
      }),
      // Bound the request so a slow/hanging sink can't accumulate pending fetches.
      signal: AbortSignal.timeout(5000),
    })
  } catch {
    // A reporting-sink outage (or timeout) must never break the request that raised the error.
  }
}

/** True when an external error-reporting sink is configured (for the health page). */
export function isErrorReportingConfigured(): boolean {
  return Boolean(process.env.ERROR_REPORTING_WEBHOOK_URL)
}
