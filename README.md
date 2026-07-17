# Lumière — site web et plateforme de communication pour CPE

Bilingual (FR-first) public website + admin CMS for a Québec CPE (childcare centre, ages 6 months–5 years), built with Next.js and Payload CMS. Phase 1 covers the public site and the content management foundation; Phase 2 adds the parent portal with group-scoped access; Phase 3 adds the communication suite — help-centre assistant, announcements news centre, and email campaigns.

> **All seed content is fictional.** The demo CPE « Les Lucioles », its team, address, and phone number do not exist. No real child, parent, or staff data is ever used in development.

## Stack

- **Next.js (App Router)** — public site, FR at `/`, EN at `/en`
- **Payload CMS** — embedded admin at `/admin`, FR-first field localization, roles (director / staff / developer), draft → publish workflow
- **SQLite** in development (`DATABASE_URI=file:./cpe-lumiere.db`) — swap to **Postgres** in production via `@payloadcms/db-postgres` (one adapter change in `src/payload.config.ts`)
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
6. Review the privacy policy and Law 25 obligations before enabling any parent-facing feature (Phase 2).
7. Set `CAMPAIGN_CRON_SECRET` and point a scheduler (cron, GitHub Action, hosting platform cron) at `POST /api/email-campaigns/run-due` so scheduled campaigns actually send.
