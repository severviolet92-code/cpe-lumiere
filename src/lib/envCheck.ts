import type { Payload } from 'payload'

/**
 * Boot-time environment readiness check. Non-fatal by design — the app must
 * still run in the demo with a minimal `.env` — but it logs clear warnings so
 * that a production deployment missing a critical variable is obvious in the
 * logs rather than failing silently later. In production (`NODE_ENV=production`)
 * the warnings are escalated to errors in the log stream.
 */
export function checkEnvironment(payload: Payload): void {
  const isProd = process.env.NODE_ENV === 'production'
  const warnings: string[] = []

  if (!process.env.PAYLOAD_SECRET || process.env.PAYLOAD_SECRET === 'YOUR_SECRET_HERE') {
    warnings.push('PAYLOAD_SECRET is missing or still the placeholder — set a fresh random value.')
  }
  if (isProd && process.env.DATABASE_URI?.startsWith('file:')) {
    warnings.push('DATABASE_URI is SQLite in production — switch to Postgres (and the postgresAdapter in payload.config.ts).')
  }
  if (isProd && !process.env.RESEND_API_KEY) {
    warnings.push('No email provider configured (RESEND_API_KEY) — parent emails will only be logged, not sent.')
  }
  if (isProd && (!process.env.NEXT_PUBLIC_SERVER_URL || process.env.NEXT_PUBLIC_SERVER_URL.includes('localhost'))) {
    warnings.push('NEXT_PUBLIC_SERVER_URL is unset or localhost — sitemaps and magic-link emails will point at the wrong host.')
  }
  if (isProd && process.env.CAMPAIGN_SCHEDULER !== 'external' && !process.env.CAMPAIGN_CRON_SECRET) {
    // In-process scheduler is fine single-instance; only note it.
    warnings.push('Running the in-process campaign scheduler with no CAMPAIGN_CRON_SECRET — acceptable for a single instance, but set CAMPAIGN_SCHEDULER=external + a cron before scaling out.')
  }

  if (warnings.length === 0) {
    payload.logger.info('Environment check: all production-readiness variables look good.')
    return
  }

  const header = `Environment check: ${warnings.length} item(s) need attention before production:`
  if (isProd) {
    payload.logger.error(`${header}\n- ${warnings.join('\n- ')}`)
  } else {
    payload.logger.warn(`${header}\n- ${warnings.join('\n- ')}\n(These are expected in local development.)`)
  }
}
