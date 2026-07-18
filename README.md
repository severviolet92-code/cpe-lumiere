# Lumière — site web et plateforme de communication pour CPE

Bilingual (FR-first) public website + admin CMS for a Québec CPE (childcare centre, ages 6 months–5 years), built with Next.js and Payload CMS. Phase 1 covers the public site and the content management foundation; Phase 2 adds the parent portal with group-scoped access; Phase 3 adds the communication suite — help-centre assistant, announcements news centre, and email campaigns.

> **All seed content is fictional.** The demo CPE « Les Lucioles », its team, address, and phone number do not exist. No real child, parent, or staff data is ever used in development.

## Stack

- **Next.js (App Router)** — public site, FR at `/`, EN at `/en`
- **Payload CMS** — embedded admin at `/admin`, FR-first field localization, roles (director / staff / developer), draft → publish workflow
- **SQLite** in development (`DATABASE_URI=file:./cpe-lumiere.db`) — swap to **Postgres** in production via `@payloadcms/db-postgres` (already an installed dependency; one adapter change in `src/payload.config.ts` — verified end-to-end against a real Postgres 16 instance: schema push, seed, auth, access control, campaign send, and a production build all pass unchanged)
- **Resend** (optional) for the contact form; without an API key, messages are logged server-side only

## Getting started

```bash
cp .env.example .env       # then set PAYLOAD_SECRET (see file comments)
npm install
npm run seed               # fictional demo content + demo director account (credentials printed)
npm run dev                # http://localhost:3000  ·  admin: /admin
```

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` / `start` | Production build / serve |
| `npm run seed` | Insert fictional demo content (idempotent; refuses if demo data exists) |
| `npm run seed:clear` | Delete every document flagged `demoSeed: true` (pre-handoff cleanup) |
| `npm run generate:types` | Regenerate `payload-types.ts` after schema changes |
| `npm run lint` | ESLint |

## Communication suite (Phase 3)

- **Help centre & parent assistant** (`/portail/aide`): chat-style assistant that answers only from the published knowledge base — no LLM. Admin manages categories (`kb-categories`) and articles (`kb-articles`: question, rich answer, optional image, per-locale keywords, enabled toggle, draft → publish preview). Search is deterministic: accent folding, FR/EN stopwords and synonym groups, field-weighted ranking (`src/lib/kbSearch.ts`), exact word > synonym, relevance floor. Empty result → friendly fallback with contact CTA.
- **News centre** (`/portail/annonces`): announcements have a kind (news / event / reminder / holiday), event date, image, YouTube/Vimeo embed, PDF attachments, pinning, `publishAt` scheduling (enforced in access control) and archiving (manual flag or `expiresAt`). Parents browse pinned → upcoming events → latest, plus an archive view.
- **Email campaigns** (`email-campaigns`): draft → preview (exact branded HTML) → test-to-self → confirmed send, to all parents or selected groups, each parent in their own language. Optional `scheduledAt`; scheduled sends go out when `POST /api/email-campaigns/run-due` runs (admin session or `Authorization: Bearer $CAMPAIGN_CRON_SECRET` — point an external cron at it, e.g. every 5 minutes). Delivery counters + failed addresses on the campaign; every send is written to the read-only notification log.
- **Mailer abstraction** (`src/lib/mailer.ts`): Resend HTTP API when `RESEND_API_KEY` is set, otherwise Payload's email adapter (console transport in demo). Swapping to SMTP/SendGrid is a config/adapter change — no caller changes.
- **Integrations**: a published announcement becomes a prefilled draft campaign in one click (admin sidebar); the assistant surfaces upcoming events (news-centre data, same access rules) when a question mentions outings/events.
- **Safety (assistant)**: a high-risk topic gate (`src/lib/riskGate.ts` — medication, injury, legal/custody, complaints, pickup authorization, abuse, emergency) runs *before* retrieval and always redirects to a human, regardless of whether an article might otherwise match. Every question is logged to `question-log` (PII-scrubbed) with its outcome — the director's content-gap dashboard. The assistant is rate limited (10/5min) and lives on both the public `/faq` page and the portal `/portail/aide`, with a preview action in the admin (drafts included) so answers can be checked before publishing.
- **Campaign scheduling actually runs**: an in-process scheduler (`src/lib/campaignScheduler.ts`) checks for due campaigns every few minutes while the app is running — no external cron required for a single-instance deployment. Set `CAMPAIGN_SCHEDULER=external` once running more than one instance, and point a real cron at `run-due` instead (see below).
- **Magic-link parent sign-in** (`/portail`, "Lien magique" tab): the production-intended passwordless mode, alongside the original demo password login. Single-use, 15-minute link; see `src/endpoints/magicLink.ts` for the design (the one-time token is the parent's password field for the window, consumed via the existing login endpoint, rotated immediately after use).

## Architecture notes

- **Access control lives in one place**: `src/access/index.ts` plus per-collection `access` blocks. The public can only read published, public-audience content. Activities and announcements are **never** publicly readable (they disclose where groups of children will be and when).
- **Localization**: French is canonical (`defaultLocale: 'fr'`, fallback on). Localized *arrays* are localized at the array level — do not add `localized: true` to fields nested inside a localized array.
- **Content vs design**: editors manage words through collections and page globals; layout, typography, colors, and components are code. This is by design — the director can never break the site's design.
- **Frontend data access** always passes `overrideAccess: false` so the Local API enforces the same access rules as the public REST API.
- **Demo data separation**: every seeded document carries a hidden `demoSeed: true` flag; `npm run seed:clear` removes them without touching real content. Globals are overwritten (not deleted) by the director post-handoff; demo admin accounts must be deleted manually in `/admin` after creating real ones.
- **Locale routing**: `src/proxy.ts` rewrites unprefixed paths to the internal `fr` segment and 301s `/fr/*` to the canonical unprefixed URL.

## Production checklist (handoff)

1. Provision Postgres in a Canadian region; set `DATABASE_URI`; switch the adapter in `payload.config.ts` to `@payloadcms/db-postgres`.
2. Generate a fresh `PAYLOAD_SECRET`; never reuse the development value.
3. Configure Resend (`RESEND_API_KEY`, `CONTACT_EMAIL_TO`, `CONTACT_EMAIL_FROM`) with SPF/DKIM/DMARC on the CPE's domain.
4. `npm run seed:clear`, create the director's real admin account, delete demo accounts.
5. Set `NEXT_PUBLIC_SERVER_URL` to the public domain (used by robots.txt/sitemap and email links).
6. Complete and get sign-off on `LAW25_PIA_TEMPLATE.md` (a draft/starting point, not a finished assessment) before enabling any parent-facing feature with real data.
7. Once running more than one instance, set `CAMPAIGN_SCHEDULER=external` and point a real scheduler (cron, GitHub Action, hosting platform cron) with `Authorization: Bearer $CAMPAIGN_CRON_SECRET` at `POST /api/email-campaigns/run-due` — a single instance already schedules campaigns on its own (see Communication suite above).
