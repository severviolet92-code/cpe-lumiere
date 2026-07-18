import type { Endpoint, PayloadRequest } from 'payload'

import { fullHealthReport, livenessReport, type CheckStatus } from '../lib/health'
import { recentErrors } from '../lib/observability'

/**
 * GET /api/health — minimal, unauthenticated liveness/readiness probe for an
 * uptime monitor or load balancer. Returns only the critical subsystems
 * (database, storage) as coarse statuses, plus an overall status. No secrets,
 * no detail strings, no per-subsystem config — safe to expose publicly.
 * `200` when serviceable, `503` when down.
 */
export const healthEndpoint: Endpoint = {
  path: '/health',
  method: 'get',
  handler: async (req: PayloadRequest) => {
    const report = await livenessReport(req.payload)
    const httpStatus = report.status === 'down' ? 503 : 200
    return Response.json({ status: report.status, checks: report.checks }, { status: httpStatus })
  },
}

const STATUS_COLOR: Record<CheckStatus, { bg: string; fg: string; label: string }> = {
  ok: { bg: '#e9efe4', fg: '#46603f', label: 'OK' },
  degraded: { bg: '#fbeed3', fg: '#8a5c10', label: 'DEGRADED' },
  down: { bg: '#f8e7de', fg: '#92462c', label: 'DOWN' },
}

/**
 * GET /api/system-health — admin-only rich HTML dashboard: every subsystem
 * with a human-readable status/detail, the recent error count, and the most
 * recent captured errors. Admin-gated because the detail strings describe
 * configuration state (though never secret *values*).
 */
export const systemHealthEndpoint: Endpoint = {
  path: '/system-health',
  method: 'get',
  handler: async (req: PayloadRequest) => {
    if (req.user?.collection !== 'users') {
      return Response.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const report = await fullHealthReport(req.payload)
    const errors = recentErrors().slice(0, 15)
    const overall = STATUS_COLOR[report.status]

    const rows = report.checks
      .map((c) => {
        const s = STATUS_COLOR[c.status]
        return `<tr>
          <td class="name">${escapeHtml(c.name)}</td>
          <td><span class="badge" style="background:${s.bg};color:${s.fg}">${s.label}</span></td>
          <td class="detail">${escapeHtml(c.detail)}</td>
        </tr>`
      })
      .join('')

    const errorRows = errors.length
      ? errors
          .map(
            (e) => `<tr>
              <td class="mono">${escapeHtml(e.at)}</td>
              <td><span class="badge badge--sm">${escapeHtml(e.scope)}</span></td>
              <td>${escapeHtml(e.message)}</td>
            </tr>`,
          )
          .join('')
      : `<tr><td colspan="3" class="empty">No errors captured since this instance started.</td></tr>`

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>System health — Lumière</title>
<style>
  body { margin:0; padding:2rem 1.5rem; background:#faf5ec; color:#38291a; font-family:-apple-system,'Segoe UI',Helvetica,Arial,sans-serif; }
  .wrap { max-width:820px; margin:0 auto; }
  h1 { font-family:Georgia,serif; font-size:1.6rem; margin:0 0 0.3rem; }
  .sub { color:#98836c; font-size:0.9rem; margin:0 0 1.5rem; }
  .overall { display:inline-block; border-radius:999px; padding:0.4rem 1rem; font-weight:700; margin-bottom:1.5rem; background:${overall.bg}; color:${overall.fg}; }
  table { width:100%; border-collapse:collapse; background:#fffdf8; border:1px solid rgba(56,41,26,0.1); border-radius:14px; overflow:hidden; margin-bottom:2rem; }
  th { text-align:left; font-size:0.72rem; letter-spacing:0.06em; text-transform:uppercase; color:#98836c; padding:0.7rem 1rem; border-bottom:1px solid rgba(56,41,26,0.1); }
  td { padding:0.7rem 1rem; border-bottom:1px solid rgba(56,41,26,0.06); vertical-align:top; }
  tr:last-child td { border-bottom:none; }
  .name { font-weight:700; text-transform:capitalize; }
  .detail { color:#6b5844; font-size:0.9rem; }
  .badge { display:inline-block; border-radius:999px; padding:0.15rem 0.6rem; font-size:0.72rem; font-weight:700; }
  .badge--sm { background:#efe3cf; color:#6b5844; }
  .mono { font-family:ui-monospace,Menlo,monospace; font-size:0.8rem; color:#6b5844; white-space:nowrap; }
  .empty { color:#98836c; font-style:italic; }
  .count { font-weight:700; }
  a { color:#8a5c10; }
</style>
</head>
<body>
  <div class="wrap">
    <h1>System health</h1>
    <p class="sub">${escapeHtml(report.timestamp)} · <span class="count">${report.recentErrorCount}</span> error(s) in the last 15 min</p>
    <span class="overall">Overall: ${overall.label}</span>

    <table>
      <thead><tr><th>Subsystem</th><th>Status</th><th>Detail</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>

    <h2 style="font-family:Georgia,serif;font-size:1.15rem;">Recent errors</h2>
    <table>
      <thead><tr><th>When (UTC)</th><th>Scope</th><th>Message</th></tr></thead>
      <tbody>${errorRows}</tbody>
    </table>

    <p class="sub"><a href="/admin">← Back to admin</a> · machine-readable liveness at <a href="/api/health">/api/health</a></p>
  </div>
</body>
</html>`

    return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } })
  },
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}
