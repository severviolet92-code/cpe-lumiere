# Lumière — site web et plateforme de communication pour CPE

Bilingual (FR-first) public website + admin CMS for a Québec CPE (childcare centre, ages 6 months–5 years), built with Next.js and Payload CMS. Phase 1 covers the public site and the content management foundation; the parent portal, admin-triggered email notifications, and the grounded FAQ assistant are later phases.

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
5. Set `NEXT_PUBLIC_SERVER_URL` to the public domain (used by robots.txt/sitemap).
6. Review the privacy policy and Law 25 obligations before enabling any parent-facing feature (Phase 2).
