import type { Payload } from 'payload'

import { captureError, errorCountSince, isErrorReportingConfigured } from './observability'

/**
 * System health checks. Each check is cheap and side-effect-free (no test
 * email is actually sent, no upload is actually written) so the health
 * endpoint can be polled frequently by an uptime monitor without cost.
 */

export type CheckStatus = 'ok' | 'degraded' | 'down'

export type HealthCheck = {
  name: string
  status: CheckStatus
  detail: string
}

export type HealthReport = {
  status: CheckStatus
  timestamp: string
  checks: HealthCheck[]
  recentErrorCount: number // last 15 minutes
}

const FIFTEEN_MIN_MS = 15 * 60 * 1000

/**
 * Database: run a trivial read to confirm the connection is alive.
 * `capture` is false on the public liveness path so a frequently-polled uptime
 * monitor doesn't spam the error reporter with one capture per poll during an
 * outage (the 503 status and the monitor itself already surface the outage).
 */
async function checkDatabase(payload: Payload, capture: boolean): Promise<HealthCheck> {
  try {
    await payload.count({ collection: 'users', overrideAccess: true })
    const driver = process.env.DATABASE_URI?.startsWith('postgres') ? 'PostgreSQL' : 'SQLite'
    return { name: 'database', status: 'ok', detail: `Connected (${driver})` }
  } catch (err) {
    if (capture) captureError(payload, err, { scope: 'database', detail: { check: 'health' } })
    return { name: 'database', status: 'down', detail: 'Connection failed' }
  }
}

/** Email transport: report the configured provider (config only — no live send). */
function checkEmail(): HealthCheck {
  if (process.env.RESEND_API_KEY) {
    const from = process.env.CONTACT_EMAIL_FROM
    return from
      ? { name: 'email', status: 'ok', detail: 'Resend configured' }
      : { name: 'email', status: 'degraded', detail: 'Resend key set, but CONTACT_EMAIL_FROM is missing' }
  }
  return {
    name: 'email',
    status: 'degraded',
    detail: 'No provider configured — emails are logged to the server console (fine for demo, not production)',
  }
}

/**
 * Storage: confirm the local uploads directory (`media/`) is writable. If it
 * doesn't exist yet it is created — Payload needs it to exist anyway, so this
 * is a deliberate "ensure writable" check, not an incidental side effect.
 * `capture` behaves as in checkDatabase (skipped on the liveness path).
 */
async function checkStorage(payload: Payload, capture: boolean): Promise<HealthCheck> {
  try {
    const { access, mkdir, constants } = await import('fs/promises')
    await access('media', constants.W_OK).catch(() => mkdir('media', { recursive: true }))
    return { name: 'storage', status: 'ok', detail: 'Local uploads directory writable' }
  } catch (err) {
    if (capture) captureError(payload, err, { scope: 'storage', detail: { check: 'health' } })
    return { name: 'storage', status: 'down', detail: 'Uploads directory not writable' }
  }
}

/** Campaign scheduler: report whether the in-process scheduler is running. */
function checkScheduler(): HealthCheck {
  if (process.env.CAMPAIGN_SCHEDULER === 'external') {
    return {
      name: 'scheduler',
      status: 'ok',
      detail: 'External mode — an external cron must hit /api/email-campaigns/run-due',
    }
  }
  const running = Boolean(globalThis.__campaignSchedulerStarted)
  return running
    ? { name: 'scheduler', status: 'ok', detail: 'In-process scheduler running' }
    : { name: 'scheduler', status: 'degraded', detail: 'In-process scheduler not started yet' }
}

/** Error reporting sink: report whether an external reporter is wired up. */
function checkErrorReporting(): HealthCheck {
  return isErrorReportingConfigured()
    ? { name: 'error-reporting', status: 'ok', detail: 'External error reporter configured' }
    : {
        name: 'error-reporting',
        status: 'degraded',
        detail: 'No external reporter — errors are logged locally only (set ERROR_REPORTING_WEBHOOK_URL to forward)',
      }
}

function rollUp(checks: HealthCheck[]): CheckStatus {
  if (checks.some((c) => c.status === 'down')) return 'down'
  if (checks.some((c) => c.status === 'degraded')) return 'degraded'
  return 'ok'
}

/**
 * Full report for the admin system-health page: every subsystem, plus the
 * recent error count. `degraded` subsystems are expected in the demo (no email
 * provider, no external error sink) and do not make the app "down".
 */
export async function fullHealthReport(payload: Payload): Promise<HealthReport> {
  const checks = [
    await checkDatabase(payload, true),
    checkEmail(),
    await checkStorage(payload, true),
    checkScheduler(),
    checkErrorReporting(),
  ]
  return {
    status: rollUp(checks),
    timestamp: new Date().toISOString(),
    checks,
    recentErrorCount: errorCountSince(FIFTEEN_MIN_MS),
  }
}

/**
 * Minimal liveness/readiness report for an uptime monitor or load balancer.
 * Only reflects the subsystems whose failure means the app genuinely cannot
 * serve requests (database, storage) — email/scheduler/reporting being in
 * "degraded" demo state must NOT flap an uptime check.
 */
export async function livenessReport(payload: Payload): Promise<{ status: CheckStatus; checks: Record<string, CheckStatus> }> {
  // capture=false: this endpoint is polled frequently by uptime monitors, so it
  // must not emit an error capture per poll during an outage.
  const db = await checkDatabase(payload, false)
  const storage = await checkStorage(payload, false)
  const critical = [db, storage]
  return {
    status: rollUp(critical),
    checks: Object.fromEntries(critical.map((c) => [c.name, c.status])),
  }
}
