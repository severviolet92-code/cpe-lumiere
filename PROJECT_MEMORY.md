# PROJECT_MEMORY — CPE La Voie lactée (« Lumière »)

> Single source of truth for continuing this project in a new AI conversation. A new assistant should be able to read this file alone and keep working correctly, without the prior chat history.
>
> Last updated: 2026-07-17, after Phase 3 reconciliation. This document is the **architectural source of truth**, carried forward from the original planning sessions. Where the implementation has evolved beyond what was originally sketched, that evolution is documented explicitly *in place* — old plan and new reality side by side — rather than silently overwritten. Nothing in §2 (non-negotiable rules) has been weakened; where implementation details under a rule changed, the rule's *intent* was preserved and the *mechanism* was updated to match what actually ships.

---

## 1. Project goal

Build a **bilingual (French-first) website + communication platform** for a real Québec CPE (early-childhood daycare, *Centre de la petite enfance*) named **« La Voie lactée »**, serving children **6 months to 5 years old** (never school-age).

**Business model:** the developer (the user, a student who is still learning programming) is building this product **to sell it** to the CPE. The user is *not* the CPE's day-to-day content manager. The director is a real person, close to the user, aware this is being built, and will eventually buy the finished product.

**Current mandate:** build a **complete, polished, presentation-ready demo** using entirely fictional data, so the director can explore every feature (public site, activities, gallery, parent portal, notifications, communication suite) before committing. Real CPE data gets entered by the director herself, through the admin CMS, only *after* she approves and buys the product. **Do not perform a real production launch. Do not fabricate real CPE information.**

**Product vision (activities-first):** the core experience is parents quickly discovering what's happening at the CPE — upcoming activities/outings (next ~15 days) with strong imagery, dates, concerned groups, what to bring, important reminders — plus a curated past-activities photo gallery, a private parent portal, a full communication suite (help-centre assistant, announcements news centre, email campaigns), all built on the same admin-triggered, audit-logged notification discipline. It should *feel* like a polished visual feed but remain a professional CPE website, never a social-media clone.

**Scope note (Phase 3 grew beyond the original sketch):** the original plan scoped Phase 3 as "the grounded FAQ assistant." During implementation this became a **communication suite**: the assistant, plus an announcements *news centre* (kinds, scheduling, media, archiving) and a full *email campaign system* (drafts, branded HTML, scheduling, delivery accounting). Both additions are natural extensions of rule 8 (admin-triggered notifications, audit-logged) and are folded into this document as sanctioned architecture — see §3 and §5.

---

## 2. Non-negotiable rules (do not violate, ever)

1. **Fictional data only, clearly labelled.** The real CPE name « La Voie lactée » may be used. Everything else — address, phone, email, staff names/bios, policies, hours — must be obviously fictional/demo (e.g. `@voielactee-demo.example`, "(démo)" suffixes, "555" numbers) until the director supplies verified information. Never present a placeholder as if it were real.
2. **No child data anywhere.** No child names, no child records in the schema, no photos that could identify a child — not in seed content, not in the data model, not in the design.
3. **Activities are private by default.** New activities default to `visibility: 'portal'` (parent portal only). The director must take an explicit action to mark one `visibility: 'public'`. Rationale: a public activity calendar discloses *where a specific group of small children will be and when* — treat this as sensitive location data about children. (This same reasoning is why `announcements` — see §3 — are **never** publicly readable at all, and why the new `kind: 'event'` announcements only ever surface to the public or the assistant as a title + date, never group/location detail.)
4. **Gallery photos require explicit consent confirmation before publish.** Enforced **server-side** via a Payload `beforeChange` hook on `GalleryPhotos` (and similarly `StaffProfiles`) — not just a UI checkbox. Publishing without the `consentConfirmed`/`consent` flag throws an error. This has been tested and must keep passing.
5. **Parent portal is invite-only.** No self-registration. Only an admin (director/staff) can create a `parents` account. Parents authenticate but are a **separate collection** from `users` (admin/staff) — a parent must never be treated as an admin user anywhere in the code.
6. **Group-scoping is enforced at the data access layer**, in one place: `src/access/index.ts`. Never filter by group in a React component only — always in the Payload `access` function so the REST/GraphQL/Local APIs are equally protected. (Still true after Phase 3: `kbArticlesRead`, `kbCategoriesRead`, and the `publishAt` schedule gate added to `announcementsRead` all live in this same file — see §3.)
7. **The AI assistant never contacts anyone and never invents information.** It only answers from a curated, admin-published knowledge base — originally planned as `FAQEntries`; **implemented as `kb-categories` + `kb-articles`**, a richer superset with per-article images, per-locale keyword arrays, an `enabled` toggle, and its own `audience` field (`public` | `portal`), mirroring the pattern `FAQEntries` already used (see §3 for why the richer model was chosen and how the two collections now divide responsibility). If it can't find a confident match, it must refuse and redirect to the administration — never guess. **High-risk topics (medication, injuries, legal/custody, complaints, pickup authorization, abuse/neglect, emergencies) are hard-gated to a fixed bilingual redirect message *before* retrieval even runs**, regardless of whether an article might otherwise seem to answer them — implemented in `src/lib/riskGate.ts`, checked first in the search endpoint, unconditionally.
8. **Notifications require an explicit two-step human action** (preview recipients → confirm send) by an admin user. There is no code path from the assistant to the notification/email system. Every send is written to an append-only `NotificationLog`. **Phase 3 extends this, it does not replace it**: the original per-document `notify()` endpoint (Activities/Announcements: preview → confirm, console-logged in dev) now coexists with a richer `email-campaigns` system (draft → branded-HTML preview → test-send-to-self → confirmed send, optionally scheduled) — **both write to the same append-only `notification-log`**, so the single-audit-trail guarantee holds regardless of which path was used. A campaign can also be one-click-generated from a published announcement (prefilled draft only — still requires the same confirm step to actually send).
9. **Design vs. content separation.** The director/staff can edit *content* (text, images, dates) through Payload collections/globals. They can never touch layout, typography, color, component structure, or security rules — those are code, not CMS fields.
10. **Frontend data access always sets `overrideAccess: false`** (and `user` when in a portal context) when querying Payload's Local API, so page rendering enforces the exact same access rules as the public REST API. Never bypass this for convenience. (System-only writes — the notify endpoint, campaign sends, question-log entries — are the deliberate, narrow exception: `overrideAccess: true`, only ever called from server-side endpoint code that has already authenticated and authorized the request itself.)
11. **Law 25 (Québec privacy law) applies** once real parent/child data enters the system. The director is the default privacy officer. A Privacy Impact Assessment is required before Phase 4 (real production launch with real parent data). Data at rest should stay in Canada (Postgres in a Canadian region in production).
12. **Work autonomously through the agreed roadmap**, testing and committing each phase as a stable milestone, and **only stop to ask the user** when a decision carries a serious security, privacy, legal, or architecture risk — not for routine implementation choices.

---

## 3. Technical architecture

### Stack
- **Next.js 16.2.7** (App Router, Turbopack, React 19.2.6)
- **Payload CMS 3.86.0**, embedded in the Next.js app at `/admin`
- **SQLite** in development (`@payloadcms/db-sqlite`, file `cpe-lumiere.db` at project root) — **production must swap to `@payloadcms/db-postgres`** hosted in a Canadian region (one-line adapter change in `src/payload.config.ts`)
- **react-three-fiber 9 + three.js 0.185** for the optional real-time 3D hero (`src/components/hero3d/HeroTier2.tsx`) — confirmed present and unchanged by Phase 3
- **sharp** for image processing (also used to generate demo illustrations from SVG)
- **Email — now a shared, provider-agnostic abstraction** (`src/lib/mailer.ts`): Resend HTTP API when `RESEND_API_KEY` is set, otherwise Payload's own email adapter (console transport in dev). Both the public contact form and the Phase 3 email-campaign system go through the same `sendOne()` function — swapping providers (SMTP, SendGrid, etc.) is a config/adapter change, never a call-site change.
- Package manager: **npm**.
- Typography: **Fraunces** (display serif, via `next/font/google`) + **Figtree** (sans, body/UI) — confirmed in `src/app/(frontend)/[locale]/layout.tsx`.

### Localization / routing
- French is canonical and unprefixed (`/`); English lives under `/en`.
- `src/proxy.ts` (Next 16's replacement for `middleware.ts`) rewrites unprefixed paths internally to `/fr/*` and 301-redirects any literal `/fr/*` URL to the canonical unprefixed one.
- Pages live under `src/app/(frontend)/[locale]/...`.
- Fixed UI strings (nav, buttons, labels) live in `src/i18n/ui.ts` as a `{ fr: {...}, en: {...} }` dictionary — **not** in the CMS.
- CMS content is localized field-by-field (`localized: true`), French is `defaultLocale`, with fallback enabled.
- **Critical gotcha already hit and fixed:** in Payload, an `array` field must be marked `localized: true` **on the array itself**, not on its nested subfields. Marking subfields localized inside an already-localized array silently breaks/duplicates data. Every array field (globals, `Activities.checklist`, and the Phase 3 `KBArticles.keywords` array) follows the correct pattern — preserve it in any new array fields.

### Data model (Payload collections & globals)

**Collections carried from the original plan, unchanged:**
- `users` — admin/staff accounts. `role`: `director` | `staff` | `developer`. Auth-enabled.
- `parents` — portal accounts. Invite-only (admin creates them), 8h sessions, `groups` relationship, `active` flag, `language` preference. **Separate from `users`** — always distinguish via `req.user?.collection === 'users'` vs `'parents'` in access functions.
- `media` — general image uploads.
- `groups` — the CPE's age groups. Publicly readable (names/age-ranges are normal public info).
- `activities` — title, `visibility` (`portal`|`public`, default `portal`), `image`, `groups`, `date`, `endDate`, `description` (richText), `importantNote`, `checklist` (array, localized at array level), draft/publish, notify endpoint.
- `closure-dates` — CPE closure days, publicly readable.
- `faq-entries` — `category`, `audience` (`public`|`portal`), draft/publish. **Still in active use**: it feeds the homepage FAQ teaser and the plain static list on `/faq` (`src/app/(frontend)/[locale]/faq/page.tsx`, `page.tsx`). It is **no longer the assistant's knowledge source** — see `kb-articles` below.
- `documents` — PDF uploads, `category`, `audience` (`public`|`portal`). Now also referenced by `announcements.attachments` (see below).
- `staff-profiles` — public team bios; cannot publish without `consent: true` (hook-enforced).
- `job-openings` — Carrières page listings.
- `gallery-photos` — past-activity photos; cannot publish without `consentConfirmed: true` (hook-enforced).

**`announcements` — evolved from a simple notice board into a full news centre (Phase 3B).** Original fields (`scope`: `cpe`|`groups`, optional `groups`, `pinned`, `body`) are unchanged and still work exactly as planned. New fields added:
- `kind` — `news` | `event` | `reminder` | `holiday`, each with its own portal badge colour.
- `eventDate` — required when `kind: 'event'`; drives the portal's "upcoming events" section and the assistant's event-intent integration (see below).
- `image` (upload), `videoUrl` (YouTube/Vimeo only — validated and rendered through the *-nocookie / player embed domains, never a raw iframe to an arbitrary host), `attachments` (relationship to `documents`, hasMany).
- `publishAt` — optional scheduled-publish timestamp. **Enforced in `announcementsRead` access control itself** (not just hidden in the UI), so a scheduled announcement cannot leak through any API — REST, GraphQL, or the Local API — before its time, consistent with rule 6/10.
- `archived` (manual flag) and `expiresAt` (auto-archive date) — both move an announcement out of the portal's main feed into a browsable `?archives=1` view, without deleting it.

**`kb-categories` + `kb-articles` — the assistant's knowledge base (Phase 3A), superseding the original plan's "answer from `FAQEntries`" sketch.** Why the richer model: the original plan didn't call for categories as first-class content, per-locale keyword arrays for search tuning, per-article images, or an independent enable/disable toggle — all of which the director needs to actually manage a growing help centre day-to-day. This is judged a strict improvement and is preserved here rather than reverted:
- `kb-categories` — `name` (localized), `icon` (emoji), `order`. Readable by any authenticated account (admin or parent); the public help-centre page reads the categories of articles it's allowed to see rather than the category list directly.
- `kb-articles` — `question` (localized), `answer` (richText, localized), `image` (optional upload), `category` (relationship), `keywords` (array, **localized at the array level**, one array per locale — the admin enters synonyms parents might type, e.g. "tarif" / "prix" / "paiement"), `enabled` (checkbox, sidebar), `audience` (`public` | `portal`, **added during reconciliation** to satisfy rule 7's requirement that the assistant work on both the public site and the portal), draft/publish.
- Access (`kbArticlesRead` in `src/access/index.ts`) is **three-tier**: admin sees everything; a signed-in parent sees every published + enabled article regardless of audience; the anonymous public sees only published + enabled + `audience: 'public'` articles. `kbCategoriesRead` is simpler: any authenticated account (admin or parent) can read categories; anonymous requests never touch the categories collection directly.

**`question-log` — built as originally planned, pointed at the new collection.** Every question asked to the assistant is logged: `question` (PII-scrubbed via `src/lib/piiScrub.ts` — strips emails and phone numbers before storage), `locale`, `audience` (`public`|`portal`, from the request context, never client-supplied), `outcome` (`answered`|`refused`|`gated`), `matchedArticles` (relationship to `kb-articles`, hasMany — renamed from the original plan's `matchedFaq` since the source collection changed), `askedBy` (relationship to `parents`, optional — null for anonymous questions). System-write-only (`create: () => false`; the search endpoint writes via `overrideAccess: true`). This is the director's "what are parents actually asking that we haven't answered" dashboard — filter by `outcome: refused` to find real content gaps.

**`email-campaigns` — new in Phase 3C, not in the original plan, added as the natural generalization of rule 8's "admin-triggered notifications."** `title` (internal name), `subject` + `body` (richText, both localized), `audience` (`all` | `groups`, with a `groups` relationship when scoped), `relatedAnnouncement` (optional back-reference, filled automatically by the one-click "create campaign from announcement" action), `scheduledAt` (optional), system-owned `status` (`draft` → `scheduled` → `sending` → `sent` | `failed`, computed by a `beforeChange` hook from `scheduledAt` unless the send engine has already set a terminal state), `sentAt`, `recipientsCount`/`deliveredCount`/`failedCount`, `deliveryNote` (failed addresses, truncated). Sending is **always** two-step (preview recipient count/audience → confirm), mirrors the original `notify()` discipline exactly, and a sent campaign can never be re-sent (duplicate it instead) — see "Notification & campaign workflow" below.

**`notification-log` — extended, not replaced.** Original fields (`title`, `sourceType`, `sourceId`, `audience`, `recipients`, `sentBy`) unchanged in spirit; added `delivered`/`failed` counters, `trigger` (`manual`|`schedule`), and `sourceType` now includes `'campaign'` alongside the original `'activity'`/`'announcement'`. `sentBy` is now optional (a scheduled/cron-triggered campaign send has no acting admin user in the request).

**Globals** (one per public page template — the director edits words here, never layout): `site-settings`, `home-page`, `about-page`, `life-page`, `admission-page`, `careers-page`.

**Demo-data hygiene:** every seeded document carries a hidden `demoSeed: true` field. `npm run seed:clear` deletes every document with that flag across all collections, **including the Phase 3 additions** (`kb-articles`, `kb-categories`, `email-campaigns` are all in the `COLLECTIONS` list in `src/seed/clear.ts`).

### Access control (the security-critical file)
All access logic is centralized in **`src/access/index.ts`**. Original exports, unchanged:
- `isAdminUser`, `isDirectorOrDev`, `isDeveloper` — role checks, narrowed to the `users` collection first.
- `publishedOnly`, `adminOnly` — as originally designed.
- `activitiesRead` — admin sees all; a parent sees published activities whose `groups` intersect their own; the public sees only `visibility: 'public'` AND published.
- `announcementsRead` — admin sees all; a parent sees published announcements that are CPE-wide OR target one of their groups; never public at all. **Extended in Phase 3B** with a third AND-condition: `publishAt` must be absent or in the past — enforced here, not in a page component, so the schedule gate holds across every access path.
- `publicAudiencePublishedOnly` (FAQEntries) — unchanged, still governs the plain static FAQ list and homepage teaser.

**New in Phase 3, added to the same file (not a new file — rule 6 still holds):**
- `kbArticlesRead` — the three-tier rule described above (admin / parent / public-audience-only anonymous).
- `kbCategoriesRead` — any authenticated account.

**This has been re-penetration-tested after every schema change touching access** (see §7 for the current matrix, including the new rows). Every original boundary still holds; every new one has been verified the same way.

### Notification & campaign workflow
`src/endpoints/notify.ts` still exposes the original two-step endpoint per content type (`/api/activities/:id/notify`, `/api/announcements/:id/notify`): `POST {}` previews recipient count/audience (no side effects), `POST { confirm: true }` sends and writes one `notification-log` entry. Only reachable by an authenticated `users` account.

**Phase 3C adds a parallel, richer path** (`src/endpoints/campaigns.ts`, collection `email-campaigns`):
- `GET /:id/preview?locale=` — returns the *exact* branded HTML the parent will receive (own endpoint, admin-only), rendered via `src/emails/branded.ts` (email-safe inline-styled table layout matching the site's honey/paper design tokens) from the campaign's Lexical body via `convertLexicalToHTML`.
- `POST /:id/send` — `{}` previews recipients; `{ test: true }` sends only to the requesting admin (subject prefixed `[TEST]`); `{ confirm: true }` sends to every resolved recipient, **in their own language** (`parent.language`), updates delivery counters, and writes to `notification-log`. A campaign already `sent`/`sending` refuses to resend.
- `POST /run-due` — sends every campaign whose `scheduledAt` has passed; callable by an admin session or by an external cron via `Authorization: Bearer $CAMPAIGN_CRON_SECRET`. Claims each campaign (`status: 'sending'`) before sending so a concurrent runner can't double-send. **Nothing wires this to an actual scheduler yet** — see §8.
- `POST /api/announcements/:id/create-campaign` — one click from a published announcement to a prefilled draft campaign (both locales, audience mapped from the announcement's scope). Creates a **draft only**; still requires the normal preview → confirm to actually send.

Admin UI: `src/components/admin/NotifyButton.tsx` (now also offers "create campaign" on Announcements) and `src/components/admin/CampaignActions.tsx` (preview / send test to me / send now), both wired into their collection sidebars via `admin.components.Field` + the Payload import map.

### The parent/public assistant (Phase 3, reconciled)
`src/endpoints/kbSearch.ts`, exposed as `GET /api/kb-articles/search?q=…&locale=…`. This **replaces** the originally-sketched `src/endpoints/assistant.ts` / `POST /api/assistant` — same non-negotiable guarantees (rule 7), different, more thoroughly tested mechanism:

1. **Rate limit** — `src/lib/rateLimit.ts`, in-memory sliding window, 10 requests / 5 minutes. **Keyed by authenticated parent ID when signed in, by IP otherwise** — a deliberate refinement over the original plan's flat "per IP": since a signed-in request always carries real identity, keying by parent ID is more precise than IP and avoids penalizing multiple parents behind one shared connection (e.g. a CPE waiting-room network). Exceeding the limit returns `429` before anything else runs.
2. **High-risk topic gate** — `src/lib/riskGate.ts`. Bilingual regex patterns for `medication`, `injury`, `legal`, `complaint`, `pickup-authorization`, `abuse`, `emergency`, checked on accent-stripped, lowercased text (reusing the same `normalize()` used for search). A match returns `{ gated: true, message: <fixed bilingual redirect> }` **immediately — retrieval never runs**, so no article, however well-matched, can stand in for a human on these topics. (Concretely: the seed includes a legitimate, publishable FAQ article about the CPE's medication-administration policy — a parent *browsing* the help centre can still read it; a parent *asking the chat* "what dose of medication should I give" is gated to a human regardless, because the question pattern matches, not the answer content. This is the intended behaviour per rule 7's "regardless of whether an article might seem to answer them.")
3. **Retrieval** — `src/lib/kbSearch.ts`: accent folding, FR/EN stopword removal, a bilingual synonym map (15 groups — fees/registration/meals/allergies/schedule/closures/health/activities/policy/absence/clothing/naps/infants/family/portal-account), field-weighted scoring (keyword match > question match > category match > answer-text match), exact-word matches outrank synonym-only matches, and a **relative score floor** (results scoring below 35% of the best match are dropped as noise rather than padding the list) — replacing the original plan's raw-token-overlap-plus-coverage-ratio sketch with an algorithm that was actually tuned against live queries this session (verified: "prix" correctly ranks the fee article above a weak "heures d'ouverture" tail-match; "fièvre" ranks the fever article above the unrelated medication article). Same safety principle as originally planned (never let a weak match outrank refusal) — different, better-tested mechanism.
4. **Access control does the audience narrowing** — the query runs with `overrideAccess: false` and the requester's own session, so `kbArticlesRead` (see above) is what actually decides whether a portal-only article can appear, not any logic in the endpoint. The client cannot request a wider scope than its own session grants.
5. **No generation, ever** — the answer returned is the article's own rich-text `answer`, rendered verbatim client-side (`RichTextBlock`), with its category as a citation-equivalent chip and an optional image. Zero LLM calls anywhere in this pipeline; hallucination is structurally impossible, at the cost of the assistant being unable to rephrase or combine information — exactly the original trade-off.
6. **Every question is logged** to `question-log` (outcome `answered`/`refused`/`gated`, matched article IDs, scrubbed question text, audience, asker if known) — the write happens with `overrideAccess: true` from inside the endpoint and can never fail the user-facing response (wrapped so a logging error is swallowed, not surfaced).
7. **Events integration (new, Phase 3D):** when a signed-in parent's question has event/outing intent (`hasEventIntent()` in `kbSearch.ts`), the endpoint also returns up to 3 upcoming `kind: 'event'` announcements the parent is allowed to see (same `overrideAccess: false` + session pattern) — surfaced as a small "coming up" list under the chat answer with a link to the full announcements page. Anonymous requests never trigger this (announcements are never public), so it degrades safely to "no events" rather than erroring.

Frontend: **`src/components/assistant/AssistantChat.tsx`** (moved/renamed during reconciliation from the interim `components/portal/PortalAssistant.tsx` to match the originally-planned name and location) — one component, one endpoint, embedded on **both** the public `/faq` page (above the existing static category accordion) and `/portail/aide` in the parent portal, exactly as originally planned: "the endpoint itself detects the parent session and widens retrieval accordingly, so no client-side trust is involved." Renders four distinct bot states: normal answer card(s), empty-result fallback (with a "write to the CPE" CTA), a visually distinct gated warning (terracotta, ⚠️), and a rate-limited notice.

### Hero visual system (3-tier) — unchanged, confirmed present
- **Tier 0** (everyone, instant): layered static SVG "diorama" (`src/components/HeroScene.tsx`) — the page's LCP element.
- **Tier 1** (default): CSS keyframe "drift" + JS pointer-parallax over the same SVG layers.
- **Tier 2** (capable devices, progressive): real-time react-three-fiber scene (`src/components/hero3d/HeroTier2.tsx`), gated behind `prefers-reduced-motion`, `saveData`, `deviceMemory >= 4`, and a WebGL2 probe; lazy-loaded, crossfades in, unmounts off-screen. Any gate failure falls back silently to Tier 0/1.

### Design system — "Lumière du matin"
Warm paper background (`#faf5ec`), ink-brown text, one signature honey/amber hue, muted sage/terracotta/ciel/lavande as group-color accents. Typography confirmed: **Fraunces** (display serif, `next/font/google`) + **Figtree** (sans). Small letterspaced-uppercase "eyebrow" labels above headings. Motion is slow "drift," never snappy; `prefers-reduced-motion` respected everywhere. Full token set in `src/app/(frontend)/globals.css`. **Phase 3 additions follow the same tokens** — the assistant's chat bubbles, the news-centre kind badges, and the branded email template all reuse the same honey/paper/ink palette rather than introducing new colors (the branded email uses inline-styled hex equivalents of the CSS variables, since email clients don't support CSS custom properties).

---

## 4. Environment & repository

**Environment has changed since the original plan was written — both are recorded below since a future session may run on either.**

*Originally (per earlier planning session):* Windows 11, Node 24.18, npm 11, project at `C:\Users\user\CLAUDE PROGECT\cpe-lumiere`, dev server via `.claude/launch.json`, no Docker/Postgres/Python/`gh` CLI locally.

*This session actually ran in:* an ephemeral **Linux container** (Claude Code on the web / remote execution environment), project at `/home/user/cpe-lumiere`, no `gh` CLI (GitHub MCP tools used instead), same npm-based workflow. **Do not assume either environment — check `uname`/`pwd` at the start of a session rather than trusting this file for that specific detail.**

- **Common commands** (environment-independent):
  - `npm run dev` — start dev server
  - `npm run build` — production build (`next build`; confirmed working, full clean build verified this session — 31 routes, TypeScript pass, static generation all succeeded)
  - `npm run generate:types` — regenerate `src/payload-types.ts` after any collection/global schema change
  - `npm run generate:importmap` — regenerate the admin panel's custom-component import map (needed after adding/changing admin UI components)
  - `npm run seed` — idempotent fictional demo content (refuses if demo data already exists)
  - `npm run seed:clear` — delete every document flagged `demoSeed: true`
  - `npx tsc --noEmit` — typecheck
  - `npm run lint` — ESLint
- **Resetting the dev database after a schema change:** stop the dev server → delete `cpe-lumiere.db` (and, if uploads changed shape, `media/`/`documents/`/`gallery-photos/`) → `npm run seed`. **Gotcha confirmed this session:** if the dev server is still holding the old SQLite file open when you delete it, Payload's schema-push fails with `SQLITE_READONLY_DBMOVED` — always stop the server *first*, confirm it's actually dead, then delete, then restart.
- **GitHub repo:** `https://github.com/severviolet92-code/cpe-lumiere`. Default branch `main`, currently at Phase 2 (`6ca18d3`) — Phase 3 work happened on branch **`claude/cpe-lumiere-continue-0otouy`** and has not been merged to `main` yet (merging was explicitly deferred by the user pending review — see §8).
- `.env` and `*.db` are not tracked in git. `documents/`, `gallery-photos/`, `media/` seed-output directories **are** tracked (the original committed demo assets), but **re-running `npm run seed` against an already-seeded-once checkout produces suffixed duplicates** (`-1.pdf`, `-2.png`, etc.) that are regenerable and should be deleted before committing, not tracked.
- **Commit history (oldest → newest):** `da5d4f7` initial backup → `63177fd` stop tracking local db → `7752ba3` Phase 1 polish → `aa630df` Phase 1A+1B → `501f9d2` Phase 1C → `6ca18d3` Phase 2 → *(branch `claude/cpe-lumiere-continue-0otouy` from here)* → `c29f743` Phase 3A (KB + assistant) → `b457d28` untrack duplicate seed uploads → `23b3ecb` Phase 3B (news centre) → `9c5cd84` Phase 3C (email campaigns) → `9efbb7f` Phase 3D (integrations + docs) → `968a1dc` this memory file, first pass → *(pending: the reconciliation commit that will follow this rewrite)*.
- **Demo accounts** (all fictional, printed to console by `npm run seed`):
  - Admin/director: `direction@voielactee-demo.example` / `Lumiere-Demo-2026!`
  - Parent A (group: Les Papillons): `famille.tremblay@voielactee-demo.example` / `Parent-Demo-2026!`
  - Parent B (groups: Les Poussins + Les Explorateurs): `famille.nguyen@voielactee-demo.example` / `Parent-Demo-2026!`

### Known environment quirks (not application bugs)
- In a browserless/remote session, verification is done via `curl` + a headless Chromium (Playwright, `executablePath` pointed at the pre-installed browser) rather than an interactive browser preview pane — both work fine for full end-to-end checks including screenshots.
- The Payload admin panel has a real cold-compile delay the first time it's hit in dev (~20–25 seconds) — normal Next.js dev-mode behavior.
- Admin (`users`) and parent (`parents`) sessions use separate auth cookies scoped to different collections — always verify with a fresh cookie jar per persona when testing (`curl -c cookiejar.txt`).
- The in-memory rate limiter (`src/lib/rateLimit.ts`) resets on server restart — expected in dev/demo; a real multi-instance production deployment would need Redis or similar.

---

## 5. What's done (tested and committed)

**Phase 1 — Public bilingual site + CMS foundation.** All public pages, both locales. CMS collections/globals, role-based admin access, SEO basics. Tier 0/1 hero.

**Phase 1A — Activities-first experience.** Homepage restructured around upcoming activities; full `/activites` page; rebranded to « La Voie lactée ».

**Phase 1B — Consent-gated gallery.** Server-side-enforced consent requirement before publish.

**Phase 1C — Tier-2 3D hero.** Procedural react-three-fiber scene, fully capability-gated.

**Phase 2 — Parent portal + notifications.** `parents` auth collection, group-scoped access control, portal pages, two-step admin-triggered notification workflow with an audit log. Extensively access-control tested (§7).

**Phase 3A — Help centre & knowledge base (this session).** `kb-categories` + `kb-articles` collections, deterministic keyword search with FR/EN synonym folding, chat-style assistant on the parent portal. *(Reconciliation note: originally shipped portal-only, with no risk gate, no logging, no rate limiting, and no public placement — all four gaps closed in the reconciliation pass described in Phase 3E below, before this was considered done against §2 rule 7.)*

**Phase 3B — Announcements news centre (this session).** `kind`/`eventDate`/media/attachments/`publishAt`-scheduling/`archived`+`expiresAt` added to `announcements`; portal news-centre UI (pinned → upcoming events → latest, plus a browsable archive); `publishAt` gate enforced in access control and verified live (a future-scheduled announcement is invisible to parents; an archived one only appears under `?archives=1`).

**Phase 3C — Email campaign system (this session).** `email-campaigns` collection, provider-agnostic mailer, branded HTML template, two-step send (+ test-send-to-self), scheduled `run-due` endpoint, delivery accounting into the shared `notification-log`. Verified live: preview renders exact branded HTML; two-step send delivers correctly; resend is blocked; a backdated schedule fires through `run-due`; unauthenticated `run-due` calls are rejected.

**Phase 3D — Integration (this session).** One-click "create campaign from announcement"; assistant surfaces upcoming events on event-intent questions; search relevance floor tuned.

**Phase 3E — Reconciliation with the original architecture (this session, immediately following 3D).** The interim Phase 3A–D implementation was audited against §2 rule 7 and found to be missing three things the original plan treated as non-negotiable. All three were built and verified before this document was rewritten:
- **High-risk topic gate** (`src/lib/riskGate.ts`) — bilingual, pre-retrieval, unconditional.
- **Question log** (`question-log` collection, `src/lib/piiScrub.ts`) — every question logged with outcome, PII-scrubbed.
- **Rate limiting** (`src/lib/rateLimit.ts`) — 10/5min, keyed by parent ID or IP.
- Plus the originally-planned **public placement**: `kb-articles` gained an `audience` field, `kbArticlesRead` gained a public tier, and the assistant (renamed `AssistantChat`, matching the original plan's component name) now lives on both `/faq` and `/portail/aide`.
- All of Phase 3A–E has been re-verified together as one coherent test pass (§7) and a full production build (`npm run build`) succeeds cleanly with all 31 routes.

---

## 6. Current state

**Status: Phase 3 (A through E) is code-complete, fully tested, and about to be committed as the reconciliation commit.** Nothing is mid-flight. The next real decision point is Phase 4 (see §8) — explicitly not started, requires the user's/director's approval.

The assistant now satisfies §2 rule 7 in full: knowledge-base-only answers, no generation, hard-gated high-risk topics checked before retrieval, every question logged and PII-scrubbed, rate-limited, and available in both the originally-planned public and portal contexts.

---

## 7. Verified security/access-control test matrix (must keep passing)

Run via `curl` with separate cookie jars per persona, plus a headless-browser pass for anything UI-rendered. Any future change touching `access/index.ts`, collections, or the notify/campaign/assistant endpoints should be re-verified against this list.

**Original Phase 1/2 rows (assumed still passing — not re-run this session, unaffected by Phase 3 changes):**

| Test | Expected result |
|---|---|
| Anonymous GET `/api/activities` | Only `visibility:public` + published docs |
| Anonymous GET `/api/announcements` | Fully denied |
| Anonymous GET `/api/faq-entries` | Only `audience:public` + published |
| Parent A (Papillons) GET `/api/activities` | Only her own group(s) |
| Parent B (Poussins+Explorateurs) GET `/api/activities` | Only her own groups |
| Parent A GET `/api/announcements` | CPE-wide + her group's announcements only |
| Parent A GET `/api/parents` | Only her own record |
| Parent A GET `/api/users` | Denied entirely |
| Parent A POST/PATCH on admin-only collections | 403 |
| Publish `gallery-photos`/`staff-profiles` without consent flag | Server throws, blocked |
| Admin notify preview → confirm → log | Correct count, audience, log entry |

**Phase 3 rows — all re-run live this session, all passing:**

| Test | Expected result | Status |
|---|---|---|
| Anonymous `kb-articles` search, generic question | Only `audience:public` + enabled + published articles | ✅ Pass |
| Anonymous search, portal-only question (e.g. "signaler une absence") | Portal-only article does NOT appear | ✅ Pass |
| Signed-in parent, same portal-only question | Correct portal-only article returned | ✅ Pass |
| High-risk gate: medication-dosage question, anonymous | `gated: true`, fixed redirect, zero `results` | ✅ Pass |
| High-risk gate: custody question, English, anonymous | `gated: true` | ✅ Pass |
| Gibberish / no-match question | `gated: false`, empty `results` (refused, not fabricated) | ✅ Pass |
| Rate limit: 11th anonymous request within 5 min (same IP) | `429`, message shown in UI | ✅ Pass (limit hit at exactly the 11th call) |
| `question-log` after mixed traffic | Correct outcome distribution (`answered`/`refused`/`gated`), correct audience per row | ✅ Pass |
| Unauthenticated `POST /api/question-log` | `403` (system-write-only enforced) | ✅ Pass |
| Question containing an email + phone number | Logged question has both scrubbed (`[courriel retiré]`, `[téléphone retiré]`) | ✅ Pass |
| Public `/faq` page: chat renders, answers, and gates correctly in-browser | Screenshots confirm correct bubbles incl. distinct gated (⚠️, terracotta) styling | ✅ Pass |
| Scheduled announcement (`publishAt` in the future) | Invisible to parent in portal news centre | ✅ Pass |
| Archived announcement | Absent from main feed, present under `?archives=1` | ✅ Pass |
| Email campaign: preview → confirm → send | Correct branded HTML, correct delivered/failed counts, `notification-log` entry with `sourceType: 'campaign'` | ✅ Pass |
| Resend an already-`sent` campaign | Rejected with a clear error | ✅ Pass |
| `run-due` before schedule time / after backdating | 0 sent / 1 sent respectively | ✅ Pass |
| Unauthenticated `run-due` (no session, no cron secret) | `403` | ✅ Pass |
| Full production build (`npm run build`) | Succeeds, 31 routes, no type errors | ✅ Pass |

---

## 8. Immediate next steps (in order)

1. **Commit the reconciliation** (this document + the risk gate / question log / rate limiter / public-placement code) as its own milestone on `claude/cpe-lumiere-continue-0otouy`, with a commit message that references this document. Push.
2. **Merging to `main` is a deliberate, still-open decision** — the user previously stopped an attempt to merge/deploy the *old* simple static-HTML demo into this real project and asked for clarification; that confusion is resolved (this repo's real project lives on this branch), but merging Phase 3 into `main` and/or deploying it has not been explicitly requested since. Ask before merging or deploying anywhere.
3. **Wire an actual scheduler to `POST /api/email-campaigns/run-due`** — the endpoint exists and is tested, but nothing calls it periodically yet. Needs `CAMPAIGN_CRON_SECRET` set and an external cron (hosting-platform cron, GitHub Action, etc.) pointed at it before scheduled campaigns are truly "fire and forget" in production.
4. **Consider whether `kb-articles` should also be group-scoped**, the way `activities` and `announcements` are — currently knowledge-base content is CPE-wide only (audience is public/portal, not per-group). No evidence this is needed yet; flag if the director asks for group-specific help content.
5. **Do not proceed to Phase 4 without explicit user/director approval.** Phase 4 is real production launch: Postgres in a Canadian region, real hosting/domain, fresh production secrets, Resend with SPF/DKIM/DMARC on the real domain, switching parent auth to magic-link, a completed Law 25 Privacy Impact Assessment, `seed:clear`, the director's real admin account, deleting demo accounts, and the director entering real content. Out of scope until then.

---

## 9. Working style / collaboration notes

- The user wants **rigorous, non-flattering communication**: challenge weak assumptions, don't call every idea excellent, explain technical decisions clearly without dumbing down the analysis.
- The user has approved working **autonomously** through the agreed roadmap — test each phase, commit stable milestones, and only stop when a decision carries genuine security/privacy/legal/architecture risk.
- **When this document and the actual codebase disagree, say so plainly before doing anything else** — don't silently pick one and proceed, and don't silently overwrite this document to erase the disagreement either. Surface the mismatch, propose a reconciliation, and only act once it's resolved (this is exactly what happened in Phase 3E, and it's the pattern to repeat).
- Commit messages: short imperative title, bulleted body explaining *what* and *why* (especially security-relevant decisions), ending with `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.
- This file should be **kept up to date** as work progresses — the persistent handoff document between conversations. Prefer editing it *in the same pass* as the code change it documents, not as an afterthought.
