# Production Activation Checklist — CPE Lumière

> Everything you (the owner) must provide or decide before this application can
> go live with real families' data. The **code is production-ready**; what
> remains is real-world inputs — accounts, domains, credentials, and one legal
> sign-off — that no developer can supply on your behalf.
>
> Legend: **[REQUIRED]** — the app cannot safely go live without it ·
> **[RECOMMENDED]** — strongly advised for a real deployment ·
> **[OPTIONAL]** — nice to have, safe to defer.
>
> Every environment variable named below is already wired into the code and
> documented in `.env.example`. Nothing is hardcoded; each is read at runtime
> and, where relevant, its presence is reported live on the admin
> **System health** page (`/api/system-health`) and checked at boot
> (`src/lib/envCheck.ts`).

---

## 1. Hosting & platform

| Item | Status | Why it's needed | Where it's used |
|---|---|---|---|
| **A Node.js host** (Vercel, Railway, Render, Fly, a VPS, AWS, etc.) | **[REQUIRED]** | This is a Next.js + Payload server app — it needs a running Node process and a persistent database. It **cannot** run on static hosting (GitHub Pages, Netlify static, S3). | The whole app. |
| **Chosen deploy region** | **[RECOMMENDED]** | Law 25 expects personal data about Quebec families to stay in Canada where practical. Pick a Canadian region for both compute and database. | Hosting + DB provisioning. |
| **Build & start commands** | **[REQUIRED]** | `npm run build` then `npm run start`. Most platforms auto-detect Next.js; confirm they run the build, not a static export. | Deploy config. |

## 2. Domain, DNS & SSL

| Item | Status | Why | Where used |
|---|---|---|---|
| **A domain name** (e.g. `voielactee.ca`) | **[REQUIRED]** | Public address of the site; also the base for email links (magic-link sign-in, campaign "open the portal" button). | `NEXT_PUBLIC_SERVER_URL` env var; robots.txt; sitemap.xml; all email links. |
| **DNS records** pointing the domain at the host | **[REQUIRED]** | So the domain resolves to your deployment. | DNS provider. |
| **SSL/TLS certificate (HTTPS)** | **[REQUIRED]** | Auth cookies and personal data must never travel over plain HTTP. Most platforms issue this automatically (Let's Encrypt); a VPS needs it configured. | Serving the whole app over `https://`. |
| `NEXT_PUBLIC_SERVER_URL` | **[REQUIRED]** | Set to the real `https://` domain. If left as localhost, sitemaps and every email link point at the wrong host (the boot check warns about this in production). | robots/sitemap/emails. |

## 3. Database

| Item | Status | Why | Where used |
|---|---|---|---|
| **A managed PostgreSQL database** (Canadian region) | **[REQUIRED]** | SQLite (the dev default) is a single local file — unsuitable for a real multi-user production deployment. The Postgres adapter swap is already verified working (schema push, seed, full app). | `DATABASE_URI`; adapter in `src/payload.config.ts`. |
| Switch the adapter in `src/payload.config.ts` to `postgresAdapter` | **[REQUIRED]** | One-line change, documented in the file; `@payloadcms/db-postgres` is already an installed dependency. | Payload DB layer. |
| `DATABASE_URI` = the Postgres connection string | **[REQUIRED]** | How the app connects. Never commit this — set it in the host's secret manager. | Payload DB layer. |
| **Automated database backups** | **[RECOMMENDED]** | Family/portal data must be recoverable. Most managed Postgres offerings include daily backups — enable and verify restore. | DB provider settings. |

## 4. Secrets & core configuration

| Item | Status | Why | Where used |
|---|---|---|---|
| `PAYLOAD_SECRET` | **[REQUIRED]** | Signs auth tokens/sessions. **Generate a fresh random value for production** — never reuse the dev value. `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`. | Payload auth. |
| Host secret manager (not a committed `.env`) | **[REQUIRED]** | All of the above must be injected as environment variables through your platform's secret store, never committed to git (`.env` is already git-ignored). | Deploy config. |

## 5. Email delivery

| Item | Status | Why | Where used |
|---|---|---|---|
| **An email provider account** (Resend is wired in; SMTP/SendGrid pluggable) | **[REQUIRED]** for parent emails | Without it, all email (magic-link sign-in, campaigns, contact form) is only written to the server console — nothing actually reaches parents. | `src/lib/mailer.ts`. |
| `RESEND_API_KEY` | **[REQUIRED]** for parent emails | Authenticates to the provider. | Mailer + contact form. |
| `CONTACT_EMAIL_FROM` | **[REQUIRED]** for parent emails | The "from" address on outgoing mail; must be on your verified domain. | Mailer + contact form. |
| `CONTACT_EMAIL_TO` | **[RECOMMENDED]** | Where public contact-form messages are delivered. | Contact form. |
| **SPF, DKIM, DMARC DNS records** on your domain | **[REQUIRED]** for deliverability | Without them, magic-link and campaign emails land in spam or are rejected. Your email provider gives you the exact records to add. | DNS + email provider. |

## 6. Scheduled email campaigns

| Item | Status | Why | Where used |
|---|---|---|---|
| Nothing, for a single instance | — | The app runs an in-process scheduler by default — scheduled campaigns send on their own while the app is running. Verified working. | `src/lib/campaignScheduler.ts`. |
| `CAMPAIGN_SCHEDULER=external` **+** an external cron | **[REQUIRED only if you run more than one instance]** | With multiple instances, disable the in-process scheduler and have a single external cron hit `POST /api/email-campaigns/run-due` instead, to avoid every instance racing. | Env + your platform's cron. |
| `CAMPAIGN_CRON_SECRET` | **[REQUIRED if using the external cron]** | The cron authenticates with `Authorization: Bearer <this>`. | `run-due` endpoint. |

## 7. Monitoring & observability

| Item | Status | Why | Where used |
|---|---|---|---|
| **Uptime monitor** pointed at `GET /api/health` | **[RECOMMENDED]** | Public, unauthenticated liveness probe (returns 200/503 for DB + storage). Any uptime service (UptimeRobot, Better Stack, your platform's health checks) can poll it. | `/api/health`. |
| `ERROR_REPORTING_WEBHOOK_URL` | **[RECOMMENDED]** | When set, every captured error is forwarded as a JSON envelope to this URL — point it at a Sentry ingest proxy, a log drain, or a small serverless function. When unset, errors are logged locally and shown on the admin System-health page only. | `src/lib/observability.ts`. |
| Log retention / drain on your host | **[RECOMMENDED]** | Structured logs (pino) go to stdout; your platform decides retention. Wire a log drain if you want history beyond the platform default. | Host logging. |
| **Analytics** (e.g. Plausible, a privacy-respecting option) | **[OPTIONAL]** | Not built in. If added, prefer a cookieless/EU-or-Canada-hosted analytics tool and disclose it in the privacy policy (Law 25). | Would be a new integration. |

## 8. Legal & privacy (Law 25)

| Item | Status | Why | Where used |
|---|---|---|---|
| **Completed & signed `LAW25_PIA_TEMPLATE.md`** | **[REQUIRED]** | Quebec's Law 25 requires a privacy impact assessment before handling real personal data. The file in this repo is a **structured draft**, not a finished assessment — the director (as privacy officer) and a lawyer familiar with Quebec privacy law must complete and approve it. | Organizational sign-off gate. |
| **A published privacy policy** | **[REQUIRED]** | Families must be told what is collected, why, and their rights. | Your site content / a policy page. |
| **Named privacy officer** | **[REQUIRED]** | Law 25 requires one; defaults to the director unless delegated. | Organizational. |
| **Retention & deletion policy for real data** | **[RECOMMENDED]** | `seed:clear` only removes demo data; real departures/deletion requests need a defined process. | Operational process. |

## 9. Go-live data steps (run in order, once the above is in place)

1. **[REQUIRED]** Provision Postgres (§3), set `DATABASE_URI`, switch the adapter.
2. **[REQUIRED]** Set a fresh `PAYLOAD_SECRET` and all other secrets in the host's secret manager.
3. **[REQUIRED]** Configure the email provider + domain auth (§5); confirm `/api/system-health` shows **email: OK**.
4. **[REQUIRED]** Deploy; confirm `/api/health` returns `200` and `/api/system-health` (as an admin) shows all subsystems OK/green.
5. **[REQUIRED]** Run `npm run seed:clear` to remove all demo content (verified safe — leaves the site globals and admin accounts intact).
6. **[REQUIRED]** Create the director's **real** admin account in `/admin`, then **delete the demo admin account** (`direction@voielactee-demo.example`) and the two demo parent accounts.
7. **[REQUIRED]** The director enters the CPE's real content (contact info, team, activities, knowledge-base articles) and real parent accounts through `/admin`.
8. **[REQUIRED]** Confirm `LAW25_PIA_TEMPLATE.md` is completed and signed off before inviting any real family.
9. **[RECOMMENDED]** Point an uptime monitor at `/api/health` and (optionally) set `ERROR_REPORTING_WEBHOOK_URL`.

---

## Quick reference — every environment variable

| Variable | Required? | Purpose |
|---|---|---|
| `PAYLOAD_SECRET` | Required | Signs auth tokens — fresh value in prod |
| `DATABASE_URI` | Required | Postgres connection string in prod |
| `NEXT_PUBLIC_SERVER_URL` | Required | Public https domain (links, sitemap) |
| `RESEND_API_KEY` | Required for email | Email provider auth |
| `CONTACT_EMAIL_FROM` | Required for email | Verified "from" address |
| `CONTACT_EMAIL_TO` | Recommended | Contact-form destination |
| `CAMPAIGN_SCHEDULER` | Only if multi-instance | Set `external` to disable in-process scheduler |
| `CAMPAIGN_SCHEDULER_INTERVAL_MINUTES` | Optional | In-process scheduler cadence (default 5) |
| `CAMPAIGN_CRON_SECRET` | Required if external cron | Bearer secret for `run-due` |
| `ERROR_REPORTING_WEBHOOK_URL` | Recommended | Forward captured errors to a sink |

*All optional variables can be left unset in development and staging; the app
degrades gracefully and the System-health page shows exactly which subsystems
are in a reduced (`degraded`) state.*
