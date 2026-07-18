import type { Payload } from 'payload'

import { runDueCampaigns } from './campaigns'
import { captureError } from './observability'

/**
 * In-process scheduler for `email-campaigns.scheduledAt`.
 *
 * `POST /api/email-campaigns/run-due` (src/endpoints/campaigns.ts) does the
 * actual sending and is safe to call from anywhere — an admin session, or an
 * external cron via `Authorization: Bearer $CAMPAIGN_CRON_SECRET`. This
 * module is what makes "schedule an email" work *without* any external
 * infrastructure: while the app process is running, it calls that same
 * function on an interval.
 *
 * This is the right default for a single-instance deployment (this demo,
 * or a small real deployment). It is the *wrong* choice once there is more
 * than one server instance, because nothing here coordinates between
 * processes — two instances would both wake up and race to claim the same
 * due campaigns. `runDueCampaigns` already guards against double-sending a
 * single campaign (it flips status to `sending` before processing), so a
 * race can't send the same campaign twice, but it's still wasted work.
 * Set `CAMPAIGN_SCHEDULER=external` to disable this and rely solely on an
 * external cron hitting `run-due` — do this before scaling to >1 instance.
 */
const DEFAULT_INTERVAL_MINUTES = 5

// Guards against a duplicate interval if onInit ever fires more than once
// in the same process (observed with Next.js dev-mode hot reload).
declare global {
  var __campaignSchedulerStarted: boolean | undefined
}

export function startCampaignScheduler(payload: Payload): void {
  if (process.env.CAMPAIGN_SCHEDULER === 'external') {
    payload.logger.info('Campaign scheduler: disabled (CAMPAIGN_SCHEDULER=external) — relying on an external cron hitting /api/email-campaigns/run-due.')
    return
  }
  if (globalThis.__campaignSchedulerStarted) return
  globalThis.__campaignSchedulerStarted = true

  const minutes = Number(process.env.CAMPAIGN_SCHEDULER_INTERVAL_MINUTES) || DEFAULT_INTERVAL_MINUTES
  const intervalMs = minutes * 60 * 1000

  const tick = async () => {
    try {
      const results = await runDueCampaigns(payload)
      if (results.length > 0) {
        payload.logger.info(
          `Campaign scheduler: sent ${results.length} due campaign(s) — ${results
            .map((r) => `#${r.id} "${r.title}" (${r.outcome.delivered}/${r.outcome.recipients})`)
            .join(', ')}`,
        )
      }
    } catch (err) {
      captureError(payload, err, { scope: 'scheduler', detail: { task: 'run-due tick' } })
    }
  }

  payload.logger.info(`Campaign scheduler: checking for due campaigns every ${minutes} minute(s).`)
  setInterval(tick, intervalMs)
  // Also run once shortly after boot, so a campaign scheduled for "now"
  // during testing doesn't wait a full interval.
  setTimeout(tick, 5000)
}
