# PROJECT_MEMORY — CPE La Voie lactée (« Lumière »)

> Single source of truth for continuing this project in a new AI conversation. A new assistant should be able to read this file alone and keep working correctly, without the prior chat history.
>
> Last updated: 2026-07-13, mid Phase 3 (assistant retrieval tuning done, not yet committed).

---

## 1. Project goal

Build a **bilingual (French-first) website + communication platform** for a real Québec CPE (early-childhood daycare, *Centre de la petite enfance*) named **« La Voie lactée »**, serving children **6 months to 5 years old** (never school-age).

**Business model:** the developer (the user, a student who is still learning programming) is building this product **to sell it** to the CPE. The user is *not* the CPE's day-to-day content manager. The director is a real person, close to the user, aware this is being built, and will eventually buy the finished product.

**Current mandate:** build a **complete, polished, presentation-ready demo** using entirely fictional data, so the director can explore every feature (public site, activities, gallery, parent portal, notifications, AI assistant) before committing. Real CPE data gets entered by the director herself, through the admin CMS, only *after* she approves and buys the product. **Do not perform a real production launch. Do not fabricate real CPE information.**

**Product vision (activities-first):** the core experience is parents quickly discovering what's happening at the CPE — upcoming activities/outings (next ~15 days) with strong imagery, dates, concerned groups, what to bring, important reminders — plus a curated past-activities photo gallery, a private parent portal, admin-triggered email notifications, and a grounded FAQ assistant. It should *feel* like a polished visual feed but remain a professional CPE website, never a social-media clone.

---

## 2. Non-negotiable rules (do not violate, ever)

1. **Fictional data only, clearly labelled.** The real CPE name « La Voie lactée » may be used. Everything else — address, phone, email, staff names/bios, policies, hours — must be obviously fictional/demo (e.g. `@voielactee-demo.example`, "(démo)" suffixes, "555" numbers) until the director supplies verified information. Never present a placeholder as if it were real.
2. **No child data anywhere.** No child names, no child records in the schema, no photos that could identify a child — not in seed content, not in the data model, not in the design.
3. **Activities are private by default.** New activities default to `visibility: 'portal'` (parent portal only). The director must take an explicit action to mark one `visibility: 'public'`. Rationale: a public activity calendar discloses *where a specific group of small children will be and when* — treat this as sensitive location data about children.
4. **Gallery photos require explicit consent confirmation before publish.** Enforced **server-side** via a Payload `beforeChange` hook on `GalleryPhotos` (and similarly `StaffProfiles`) — not just a UI checkbox. Publishing without the `consentConfirmed`/`consent` flag throws an error. This has been tested and must keep passing.
5. **Parent portal is invite-only.** No self-registration. Only an admin (director/staff) can create a `parents` account. Parents authenticate but are a **separate collection** from `users` (admin/staff) — a parent must never be treated as an admin user anywhere in the code.
6. **Group-scoping is enforced at the data access layer**, in one place: `src/access/index.ts`. Never filter by group in a React component only — always in the Payload `access` function so the REST/GraphQL/Local APIs are equally protected.
7. **The AI assistant never contacts anyone and never invents information.** It only answers from `FAQEntries` that are `_status: 'published'` and audience-appropriate. If it can't find a confident match, it must refuse and redirect to the administration — never guess. High-risk topics (medication, injuries, legal/custody, complaints, pickup authorization, abuse/neglect) are hard-gated to a fixed redirect message *before* retrieval even runs, regardless of whether an FAQ might seem to answer them.
8. **Notifications require an explicit two-step human action** (preview recipients → confirm send) by an admin user. There is no code path from the AI assistant to the notification/email system. Every send is written to an append-only `NotificationLog`.
9. **Design vs. content separation.** The director/staff can edit *content* (text, images, dates) through Payload collections/globals. They can never touch layout, typography, color, component structure, or security rules — those are code, not CMS fields.
10. **Frontend data access always sets `overrideAccess: false`** (and `user` when in a portal context) when querying Payload's Local API, so page rendering enforces the exact same access rules as the public REST API. Never bypass this for convenience.
11. **Law 25 (Québec privacy law) applies** once real parent/child data enters the system. The director is the default privacy officer. A Privacy Impact Assessment is required before Phase 4 (real production launch with real parent data). Data at rest should stay in Canada (Postgres in a Canadian region in production).
12. **Work autonomously through the agreed roadmap**, testing and committing each phase as a stable milestone, and **only stop to ask the user** when a decision carries a serious security, privacy, legal, or architecture risk — not for routine implementation choices.

---

## 3. Technical architecture

### Stack
- **Next.js 16.2.7** (App Router, Turbopack, React 19.2.6)
- **Payload CMS 3.86.0**, embedded in the Next.js app at `/admin`
- **SQLite** in development (`@payloadcms/db-sqlite`, file `cpe-lumiere.db` at project root) — **production must swap to `@payloadcms/db-postgres`** hosted in a Canadian region (one-line adapter change in `src/payload.config.ts`)
- **react-three-fiber 9 + three.js 0.185** for the optional real-time 3D hero
- **sharp** for image processing (also used to generate demo illustrations from SVG)
- **Email:** none configured in dev (Payload logs emails to console). Production should use **Resend** with SPF/DKIM/DMARC configured on the CPE's real domain.
- Package manager: **npm** (not pnpm/yarn, despite the original Payload template using pnpm workspace syntax — this was fixed during scaffolding).

### Localization / routing
- French is canonical and unprefixed (`/`); English lives under `/en`.
- `src/proxy.ts` (Next 16's replacement for `middleware.ts`) rewrites unprefixed paths internally to `/fr/*` and 301-redirects any literal `/fr/*` URL to the canonical unprefixed one.
- Pages live under `src/app/(frontend)/[locale]/...`.
- Fixed UI strings (nav, buttons, labels) live in `src/i18n/ui.ts` as a `{ fr: {...}, en: {...} }` dictionary — **not** in the CMS.
- CMS content is localized field-by-field (`localized: true`), French is `defaultLocale`, with fallback enabled.
- **Critical gotcha already hit and fixed:** in Payload, an `array` field must be marked `localized: true` **on the array itself**, not on its nested subfields. Marking subfields localized inside an already-localized array silently breaks/duplicates data. Every array field in `src/globals/index.ts` and `Activities.ts`/`checklist` follows the correct pattern now — preserve it in any new array fields.

### Data model (Payload collections & globals)
**Collections:**
- `users` — admin/staff accounts. `role`: `director` | `staff` | `developer`. Auth-enabled, 2h sessions.
- `parents` — portal accounts. Invite-only (admin creates them), 8h sessions, `groups` relationship (which child-group(s) they belong to), `active` flag, `language` preference. **Separate from `users` — always distinguish via `req.user?.collection === 'users'` vs `'parents'` in access functions.**
- `media` — general image uploads (public site imagery, staff photos).
- `groups` — the CPE's age groups (e.g. Les Poussins, Les Papillons). Publicly readable (names/age-ranges are normal public info) — **but nothing that reveals a specific group's schedule is public.**
- `activities` — the core content type. Fields: title, `visibility` (`portal`|`public`, default `portal`), `image` (upload), `groups` (relationship, many), `date`, `endDate`, `description` (richText), `importantNote`, `checklist` (array of `{item}`, localized at array level), draft/publish versions. Has a custom `/:id/notify` endpoint and an admin sidebar "Notifier les parents" button.
- `announcements` — `scope` (`cpe`|`groups`), optional `groups` relationship, `pinned`, `body` (richText). Same notify endpoint pattern.
- `closure-dates` — CPE closure days, publicly readable.
- `faq-entries` — `category`, `audience` (`public`|`portal`), draft/publish. This is the assistant's entire knowledge base — **the assistant can only ever say what exists here, published.**
- `documents` — PDF uploads, `category`, `audience` (`public`|`portal`).
- `staff-profiles` — public team bios; **cannot be published without `consent: true`** (hook-enforced).
- `job-openings` — Carrières page listings.
- `gallery-photos` — past-activity photos; **cannot be published without `consentConfirmed: true`** (hook-enforced); `takenAt`, optional `activity` relationship.
- `notification-log` — append-only audit trail of every notification sent (who, what, to how many, when). System-write-only (`create: () => false` in access; written via `overrideAccess: true` from the notify endpoint only).
- `question-log` — every question asked to the assistant, PII-scrubbed, with `outcome` (`answered`|`refused`|`gated`) and `matchedFaq`. This is the director's "what are parents actually asking that we haven't answered" dashboard — filter by `refused` to find content gaps.

**Globals** (one per public page template — the director edits words here, never layout): `site-settings`, `home-page`, `about-page`, `life-page`, `admission-page`, `careers-page`.

**Demo-data hygiene:** every seeded document carries a hidden `demoSeed: true` field. `npm run seed:clear` deletes every document with that flag across all collections — this is how the director's real content stays cleanly separable from demo content later.

### Access control (the security-critical file)
All access logic is centralized in **`src/access/index.ts`**. Key exports and what they mean:
- `isAdminUser` — true only if `req.user?.collection === 'users'` (parents never pass this).
- `isDirectorOrDev`, `isDeveloper` — role checks, narrowed to the `users` collection first (TypeScript requires this narrowing since `req.user` is a `User | Parent` union).
- `publishedOnly` — admin sees drafts; everyone else (including parents) sees only published.
- `adminOnly` — staff/admin only, not even parents.
- `activitiesRead` — admin sees all; a parent sees published activities whose `groups` intersect their own `groups`; the public sees only `visibility: 'public'` AND published.
- `announcementsRead` — admin sees all; a parent sees published announcements that are CPE-wide OR target one of their groups; never public at all.
- `publicAudiencePublishedOnly` (FAQ) — admin sees all; a parent sees all published entries (both audiences); the public sees only `audience: 'public'` AND published.

**This has been penetration-tested manually** (see §7) and every boundary currently holds. Any future schema change touching access must be re-tested the same way before being considered done.

### Notification workflow
`src/endpoints/notify.ts` exposes a two-step endpoint per content type (`/api/activities/:id/notify`, `/api/announcements/:id/notify`):
1. `POST {}` → returns `{ recipients: N, audience: "..." }` as a preview. No side effects.
2. `POST { confirm: true }` → sends (console-logged email in dev; Resend in production), writes one `notification-log` entry, returns `{ sent: N }`.
Only reachable by an authenticated `users` (admin) account — verified via a 403 test. The admin UI has a `NotifyButton` React component (`src/components/admin/NotifyButton.tsx`) wired into the collection sidebar via `admin.components.Field` + the Payload import map.

### The AI assistant (Phase 3 — in progress)
`src/endpoints/assistant.ts`, exposed as `POST /api/assistant`. Pipeline, each stage only *narrows* what can be said:
1. **Rate limit** — 10 questions / 5 minutes / IP (in-memory `Map`, resets on server restart — fine for demo, would need Redis or similar in real production).
2. **PII scrub** — strips emails/phone numbers from the stored question text before logging.
3. **High-risk topic gate** — regex patterns (medication, injury, custody/legal, complaints, pickup authorization, abuse/neglect, emergency) checked on **accent-stripped, lowercased** text. Matches short-circuit straight to a fixed bilingual redirect message — retrieval never even runs.
4. **Retrieval** — token-overlap scoring (not embeddings/vector search — this is a pragmatic demo implementation) over `faq-entries` that are published, filtered server-side by audience (`public` only for anonymous visitors; `public` + `portal` for an authenticated parent — **the client cannot request the wider scope, the server decides from the session**).
5. **Confidence floor** — a candidate is only accepted if `score >= 4` OR (`ratio >= 0.65 AND score >= 2`), where `ratio` is how much of the FAQ entry's own question vocabulary is covered by the visitor's question. This was tuned after testing revealed short/rephrased questions (e.g. "How much does it cost per day?" vs. FAQ's "Quel est le tarif ?") were being refused too aggressively — fixed by adding the coverage-ratio criterion in addition to raw score, evaluated per-candidate so a low-scoring wrong answer never wins over refusal.
6. **No generation** — the answer returned is the FAQ entry's answer text **verbatim** (extracted from Lexical rich text via `src/lib/lexicalText.ts`), with a citation (`source: <FAQ question>`). There is deliberately no LLM call in this demo — this makes hallucination structurally impossible, at the cost of the assistant being unable to rephrase or combine information. (A production version could add a Claude paraphrase step *constrained to the retrieved passage*, plus a groundedness check before responding — not built yet.)
7. **Refusal is honest and redirects**: "Je ne peux pas confirmer cette information à partir du contenu approuvé par le CPE. Veuillez écrire à l'administration." Gated-topic message is a different, more explicit "this needs a human" message.
8. **Every interaction is logged** to `question-log` (scrubbed question, language, outcome, matched FAQ if any, audience context) — this feeds the director's dashboard for closing content gaps.

Frontend: `src/components/assistant/AssistantChat.tsx` — a simple chat UI (message list + input), embedded on the public `/faq` page and on `/portail/aide` (same component, same endpoint — the endpoint itself detects the parent session and widens retrieval accordingly, so no client-side trust is involved).

### Hero visual system (3-tier)
- **Tier 0** (everyone, instant): a layered static SVG "diorama" illustration (`src/components/HeroScene.tsx`) — this *is* the page's LCP element, so it must never be blocked by JS.
- **Tier 1** (default): CSS keyframe "drift" animations + JS pointer-parallax on top of the same SVG layers.
- **Tier 2** (capable devices only, optional/progressive): a real-time procedural react-three-fiber scene (`src/components/hero3d/`) of a stylized playroom, gated behind `prefers-reduced-motion` (off), `navigator.connection.saveData` (off), `navigator.deviceMemory >= 4`, and a WebGL2 capability probe. Loads lazily after the page is interactive (idle callback), crossfades in over the Tier 0/1 still, and unmounts when scrolled out of view. Any gate failure silently falls back to Tier 0/1 — never an error state.

### Design system — "Lumière du matin"
Warm paper background (`#faf5ec`), ink-brown text (not black), one signature honey/amber hue, muted sage/terracotta/ciel/lavande as group-color accents. Typography: Fraunces (display serif, italic for emphasis) + Figtree (sans, body/UI). Small letterspaced-uppercase "eyebrow" labels above headings. One dominant subject per screen, generous whitespace, motion is slow "drift" not snappy, glass/blur used sparingly (header, buttons), WCAG AA contrast maintained throughout, `prefers-reduced-motion` respected everywhere motion appears. Full token set in `src/app/(frontend)/globals.css`.

---

## 4. Environment & repository

- **Machine:** Windows 11, Node 24.18, npm 11. No Docker, no local Postgres, no Python, no GitHub CLI (`gh`) installed.
- **Project path:** `C:\Users\user\CLAUDE PROGECT\cpe-lumiere`
- **Dev server:** configured in `.claude/launch.json` under the name `cpe-lumiere`; prefers port 3000 but auto-picks another if busy.
- **Common commands:**
  - `npm run dev` — start dev server
  - `npm run build` — production build (**note:** the script runs `next build`, not `payload build` — the original template's script was wrong for Payload 3.86 and was fixed)
  - `npm run generate:types` — regenerate `src/payload-types.ts` after any collection/global schema change
  - `npm run generate:importmap` — regenerate the admin panel's custom-component import map (needed after adding/changing admin UI components like `NotifyButton`)
  - `npm run seed` — wipe-check and insert all fictional demo content (idempotent; refuses to run if demo data already exists)
  - `npm run seed:clear` — delete every document flagged `demoSeed: true`, across all collections
  - `npx tsc --noEmit` — typecheck
  - `npm run lint` — ESLint
- **Resetting the dev database after a schema change:** stop the dev server → delete `cpe-lumiere.db`, `media/`, `documents/` → `npm run seed`.
- **GitHub repo:** `https://github.com/severviolet92-code/cpe-lumiere`, default branch is `main` (confirmed). Push access confirmed working over HTTPS from this machine.
- **Commit history so far (milestones, oldest→newest):** `da5d4f7` initial backup → `63177fd` stopped tracking the local SQLite db (added `*.db` to `.gitignore`) → `7752ba3` Phase 1 polish (SEO, mobile hero fix, lint fix, build script fix, README) → `aa630df` Phase 1A+1B (activities-first + gallery + rebrand) → `501f9d2` Phase 1C (Tier-2 3D hero) → `6ca18d3` Phase 2 (parent portal + notifications). **Phase 3 (assistant) is not committed yet** — see §6.
- `.env` and `*.db` are confirmed **not** tracked in git. `documents/` (generated demo PDFs) currently **is** tracked and probably shouldn't be — flagged as a cleanup item in §6.
- **Demo accounts** (all fictional, printed to console by `npm run seed`):
  - Admin/director: `direction@voielactee-demo.example` / `Lumiere-Demo-2026!`
  - Parent A (group: Les Papillons): `famille.tremblay@voielactee-demo.example` / `Parent-Demo-2026!`
  - Parent B (groups: Les Poussins + Les Explorateurs): `famille.nguyen@voielactee-demo.example` / `Parent-Demo-2026!`

### Known environment quirks (not application bugs)
- The in-app Browser preview pane cannot reliably take screenshots or fire certain lazy-load/paint events in this session — verification has been done via `curl` + injected JavaScript checks instead, which work fine.
- The Payload admin panel has a real cold-compile delay the first time it's hit in dev (~20–25 seconds) — this is normal Next.js dev-mode behavior, not a bug.
- Admin (`users`) and parent (`parents`) sessions use separate auth cookies scoped to different collections, but if tested in the same browser profile it's easy to confuse which session is active — always verify with a fresh `curl -c cookiejar` per persona when testing.
- Occasionally a preview-server-stop tool call fails with a transient "classifier unavailable" error in this environment — retrying after a short wait, or forcing a dev-server reload by touching a config file, both work as workarounds.

---

## 5. What's done (tested and committed)

**Phase 1 — Public bilingual site + CMS foundation.** All public pages built and verified in both locales: Accueil, Notre CPE, La vie au CPE, Admission (including an honest explanation of Québec's La Place 0-5 waitlist system), FAQ, Carrières, Contact (with a rate-limited, honeypot-protected server-action form). CMS collections/globals, role-based admin access, SEO basics (robots.txt, sitemap.xml with hreflang, favicon). Tier 0/1 hero.

**Phase 1A — Activities-first experience.** Homepage restructured so upcoming activities are the first thing after the hero. Full `/activites` page: activities in the next 15 days highlighted separately from later ones, illustrated cards (date badge, concerned groups as colored chips, description, important-note callout, "to bring" checklist pills). Rebranded from a placeholder name to the real **« La Voie lactée »**, with all contact/address/etc. kept as clearly-labelled fictional placeholders.

**Phase 1B — Consent-gated gallery.** `gallery-photos` collection with a hard server-side publish gate requiring explicit consent confirmation (tested: attempting to publish without it throws and is blocked). Polished photo grid of past activities on `/activites`.

**Phase 1C — Tier-2 3D hero.** Procedural react-three-fiber playroom scene, fully capability-gated as described in §3, verified to mount only under the right conditions and to leave zero console errors.

**Phase 2 — Parent portal + notifications.** `parents` auth collection (invite-only), full group-scoped access control at the data layer, portal pages (dashboard/"cette semaine", activités, annonces, documents), sign-in/sign-out flow, two-step admin-triggered notification workflow with an append-only audit log. **Extensively access-control tested** (see §7) — every boundary currently holds.

---

## 6. Current state — Phase 3 (grounded FAQ assistant)

**Status: code written and functionally tested via curl; NOT yet verified in the browser UI, NOT yet committed to git.**

Files already created/modified for this phase:
- `src/collections/QuestionLog.ts` — registered in `payload.config.ts`
- `src/endpoints/assistant.ts` — the retrieval/gating/logging pipeline described in §3, registered as a root endpoint in `payload.config.ts`
- `src/components/assistant/AssistantChat.tsx` — chat UI component
- `src/lib/lexicalText.ts` — Lexical rich-text → plain paragraphs extractor
- Assistant strings added to `src/i18n/ui.ts` (both locales)
- Assistant CSS added to `src/app/(frontend)/globals.css`
- `AssistantChat` embedded on the public `/faq` page (`src/app/(frontend)/[locale]/faq/page.tsx`)
- New page `src/app/(frontend)/[locale]/portail/aide/page.tsx` embedding the same component for authenticated parents

**Testing done so far (via curl against the running dev server), all passing after two rounds of fixes:**
- ✅ A clearly-answerable French question returns the correct verbatim FAQ answer with citation.
- ✅ A nonsense/off-topic question is refused (not hallucinated).
- ✅ A medication-related question is caught by the gate and returns the "needs a human" redirect, not an FAQ-derived answer.
- ✅ A portal-audience-only question (e.g. "how do I report an absence") is refused for an anonymous visitor but correctly answered for a logged-in parent — proving the server-side (not client-side) audience scoping works.
- ⚠️ **Bug found and fixed during testing:** the initial confidence threshold was too strict — short or rephrased questions (e.g. an English paraphrase of a French FAQ) were being refused even when a good match existed. Fixed by adding a "vocabulary coverage ratio" criterion evaluated per-candidate alongside the raw token-overlap score (see §3, step 5, for the exact logic). This needs one more full re-test pass after the fix (see Next Steps) before it can be trusted.
- ⚠️ **Bug found and fixed:** the high-risk gate's regex patterns originally expected accented characters (é, è) but the normalization step stripped accents first — patterns were updated to match accent-stripped text. Re-verified working after the fix.

**Not yet done in this phase:**
- Full browser-UI verification of the `AssistantChat` component itself (chat bubbles, loading state, citation rendering, portal vs. public context) — only the raw API has been curl-tested so far.
- Re-running the *complete* test matrix (answered / refused / gated / audience-scoped / rate-limited) after the latest retrieval-scoring fix, to confirm nothing regressed.
- `npm run generate:types` + `npx tsc --noEmit` + `npm run lint` full clean pass after the latest edits.
- Reseeding is likely fine as-is (no schema change since last seed, just endpoint logic) but should be double-checked.
- **No commit yet.** This is the single most important thing to not lose track of.

---

## 7. Verified security/access-control test matrix (must keep passing)

Run via `curl` with separate cookie jars per persona. Any future change touching `access/index.ts`, collections, or the notify/assistant endpoints should be re-verified against this list:

| Test | Expected result | Status |
|---|---|---|
| Anonymous GET `/api/activities` | Only `visibility:public` + published docs | ✅ Pass |
| Anonymous GET `/api/announcements` | Fully denied | ✅ Pass |
| Anonymous GET `/api/faq-entries` | Only `audience:public` + published | ✅ Pass |
| Parent A (Papillons) GET `/api/activities` | Only activities targeting her own group(s) | ✅ Pass |
| Parent B (Poussins+Explorateurs) GET `/api/activities` | Only her own groups; never sees Parent A's group-only content | ✅ Pass |
| Parent A GET `/api/announcements` | CPE-wide + her group's announcements only | ✅ Pass |
| Parent B GET `/api/announcements` | Does NOT see the Papillons-only announcement | ✅ Pass |
| Parent A GET `/api/parents` | Only her own record | ✅ Pass |
| Parent A GET `/api/users` (admin accounts) | Denied entirely | ✅ Pass (fixed during testing — was initially too permissive) |
| Parent A POST `/api/announcements` (create) | 403 | ✅ Pass |
| Parent A PATCH `/api/activities/:id` (update) | 403 | ✅ Pass |
| Parent A POST `/api/activities/:id/notify` | 403 | ✅ Pass |
| Publish `gallery-photos` without `consentConfirmed` | Server throws, publish blocked | ✅ Pass |
| Publish `staff-profiles` without `consent` | Server throws, publish blocked | ✅ Pass |
| Admin notify preview → confirm → log | Correct recipient count, correct audience label, log entry created | ✅ Pass |
| Assistant: gated topic (medication) | Redirect message, never an FAQ-derived answer | ✅ Pass |
| Assistant: portal-only question, anonymous | Refused | ✅ Pass |
| Assistant: portal-only question, authenticated parent | Answered correctly | ✅ Pass |

---

## 8. Immediate next steps (in order)

1. **Finish Phase 3 verification:**
   - Re-run the full assistant test matrix (answered/refused/gated/audience-scoped) after the retrieval-scoring fix to confirm no regression.
   - Open `/faq` and `/portail/aide` in the browser (or via JS-injection checks, given the Browser pane's screenshot limitation) and manually exercise the `AssistantChat` UI end to end in both languages.
   - Run `npm run generate:types`, `npx tsc --noEmit`, `npm run lint` and get a fully clean pass.
   - Confirm rate limiting actually triggers after 10 rapid questions and returns 429.
2. **Commit Phase 3** as its own milestone (`git add -A && git commit` with a descriptive message + `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>` trailer, matching prior commit style) and push to `main`.
3. **Final verification pass (Task #14 in the tracked task list):**
   - Spot-check every page in both FR and EN.
   - Mobile viewport check.
   - Full production build (`npm run build`) must succeed cleanly.
   - Update `README.md` to document the assistant, the parent portal, and the full list of demo accounts/credentials.
   - **Cleanup:** add `documents/` (generated demo PDFs) to `.gitignore` — it is currently tracked and shouldn't be, since it's regenerable seed output.
   - Push the final Phase-3-complete + cleanup commit.
4. **Do not proceed to Phase 4 without explicit user approval.** Phase 4 is real production launch: Postgres in a Canadian region, real hosting/domain, fresh production secrets, Resend email with SPF/DKIM/DMARC on the real domain, switching parent auth to magic-link, a completed Law 25 Privacy Impact Assessment, running `seed:clear`, creating the director's real admin account, deleting demo accounts, and the director entering real content. **This phase requires the director's approval and real data — it is explicitly out of scope until then.**

---

## 9. Working style / collaboration notes

- The user wants **rigorous, non-flattering communication**: challenge weak assumptions, don't call every idea excellent, explain technical decisions clearly (the user is a learning programmer) without dumbing down the underlying analysis or recommendations.
- The user has approved working **autonomously** through the agreed roadmap — test each phase, commit stable milestones, and only stop to ask when a decision carries genuine security/privacy/legal/architecture risk. Don't stop for routine implementation choices.
- Commit messages follow a consistent style: a short imperative title, a bulleted body explaining *what* and *why* (especially security-relevant decisions), ending with `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.
- This file (`PROJECT_MEMORY.md`) should be **kept up to date** as work progresses — treat it as the persistent handoff document between conversations, separate from (and more detailed/current than) any memory stored outside the repository.
