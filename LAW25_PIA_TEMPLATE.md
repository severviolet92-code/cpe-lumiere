# Évaluation des facteurs relatifs à la vie privée (ÉFVP)
### Privacy Impact Assessment — Template / Draft

> **STATUS: TEMPLATE ONLY — NOT A COMPLETED ASSESSMENT.**
> This document is a structured starting point, written by an AI coding assistant
> from the technical facts of this codebase. It is **not legal advice**, has
> **not been reviewed by qualified legal counsel**, and **does not constitute
> compliance** with the *Act respecting the protection of personal information
> in the private sector* (Law 25 / Bill 64) or any other privacy law. Every
> section marked **[TO BE COMPLETED]** requires a real decision by the CPE's
> privacy officer (by default, the director — see §2) and, for the sections
> involving legal interpretation, review by a lawyer familiar with Québec
> privacy law. **Do not treat this document as finished, and do not enable
> any real parent- or child-facing feature on real data until it actually is
> finished and approved.** This gates Phase 4 per `PROJECT_MEMORY.md` §2 rule 11.

---

## 1. Purpose of this assessment

Law 25 requires an ÉFVP before implementing an information system or
electronic service delivery project involving the collection, use, or
disclosure of personal information — which this project's Phase 2+ features
(parent portal, group-scoped content, admin-triggered email, the KB
assistant) squarely are, once real families' data is entered. This
assessment must be completed and approved **before** `npm run seed:clear` is
run and real parent accounts are created (see `PROJECT_MEMORY.md` §8).

## 2. Roles and responsibility

| Role | Who | Status |
|---|---|---|
| Privacy officer (*responsable de la protection des renseignements personnels*) | By default, the highest-ranking person in the organization — the director, unless formally delegated | **[TO BE COMPLETED]** — confirm and document who holds this role |
| System developer | The person/team building this software | Documented in `PROJECT_MEMORY.md` §1 |
| Legal reviewer | **[TO BE COMPLETED]** — name a lawyer or firm engaged to review this assessment | Not yet engaged |
| Data subjects | Parents/guardians enrolled at the CPE (never children directly — see §4) | N/A |

## 3. Project description

A bilingual (French-first) website and communication platform for a Québec
CPE, comprising: a public marketing site; an admin CMS (Payload) for staff to
manage content; a private parent portal (activities, announcements,
documents, a knowledge-base assistant); and admin-triggered parent
communications (individual notifications and email campaigns). Full
technical architecture: `PROJECT_MEMORY.md` §3.

## 4. Personal information inventory

**Non-negotiable project rule (`PROJECT_MEMORY.md` §2.2): no child data is
ever collected, stored, or displayed by this system** — no child names, no
child records, no photos that could identify a child. This materially
reduces the assessment's scope: the personal information below belongs to
adults (parents/guardians) and staff, not children, and Law 25's heightened
sensitivity toward minors' data is a design constraint already satisfied by
architecture rather than something to mitigate after the fact. **This claim
should be independently re-verified against the live schema before sign-off**
— it currently holds by inspection of every collection in
`src/collections/`, but a future schema change could violate it.

| Category of personal information | Collection | Fields | Purpose |
|---|---|---|---|
| Parent/guardian identity | `parents` | name, email | Portal account, communications |
| Parent/guardian preference | `parents` | language, active status | Correct-language communication; access control |
| Parent/guardian affiliation | `parents` | groups (which age group their child is in — no child identifier) | Scoping which content/announcements they see |
| Parent authentication | `parents` | password (bcrypt-hashed), session tokens, magic-link expiry marker | Sign-in |
| Parent-submitted contact form | (not persisted — see `src/app/(frontend)/[locale]/contact/actions.ts`) | name, email, message | One-time reply; rate-limited, not stored in a collection |
| Parent questions to the assistant | `question-log` | question text (PII-scrubbed of emails/phone numbers before storage — `src/lib/piiScrub.ts`), outcome, which parent (if signed in) | Content-gap analysis for the director |
| Staff/admin identity | `users` | name, email, role, password | Admin panel access |
| Staff bios (public-facing, opt-in) | `staff-profiles` | name, job title, bio, photo — **gated behind an explicit `consent` field, enforced server-side** | Public "our team" page |
| Email delivery records | `notification-log`, `email-campaigns` | recipient counts (not individual addresses at rest, beyond the campaign's own audience selection), delivery/failure counts, timestamps | Audit trail (rule 8) |

**What this system explicitly does not collect**, by design: child names, child photos, child health/behavioural records, government ID numbers, financial/payment details (the daily rate is government-set and paid outside this system per the public FAQ content), biometric data.

## 5. Legal basis for collection

**[TO BE COMPLETED]** — under Law 25, collection generally requires either
consent or a specific legal/contractual necessity. For a CPE, "necessity to
provide the childcare service the family has enrolled in" likely covers
account creation and portal access; email communications likely need to be
described in the enrolment agreement or a separate notice. **A lawyer should
confirm the specific basis for each category in §4** and whether a
standalone privacy notice / consent form is needed at enrolment.

## 6. Data minimization review

- The system deliberately does not collect child data at all (§4).
- `question-log` scrubs emails and phone numbers before storage.
- Contact-form submissions are not persisted to a database at all — only
  relayed to the CPE's outbound email.
- The magic-link mechanism does not add a permanent token store; it reuses
  the existing (already-necessary) password field for a 15-minute window.

**[TO BE COMPLETED]**: confirm this list is exhaustive and that no future
feature silently adds a new personal-information field without updating this
assessment — recommend making "update this section" part of the code review
checklist for any change touching `src/collections/`.

## 7. Retention

**[TO BE COMPLETED]** — no retention/deletion policy is currently
implemented in code. Decisions needed:
- How long to keep a `parents` account after a family leaves the CPE (the
  `active` flag currently just hides them from communications; it does not
  delete data).
- How long to keep `question-log` and `notification-log` entries.
- Whether `seed:clear`-style deletion tooling is needed for *real* data
  (currently `seed:clear` only targets `demoSeed: true` documents — a
  separate, deliberately more careful real-data deletion process is needed
  for actual departures/requests).

## 8. Data subject rights

Law 25 grants individuals rights to access, rectify, and request deletion of
their personal information, and (for automated decision systems) an
explanation. Relevant to this system:

- **Access/rectification**: currently handled informally (a parent contacts
  the CPE; staff edit the `parents` record in the admin panel). **[TO BE
  COMPLETED]**: document this as a real process, including a response-time
  commitment.
- **The KB assistant is not an automated decision system** in the Law 25
  sense — it answers from admin-published content verbatim, makes no
  decisions about any person, and is hard-gated away from high-risk topics
  before retrieval even runs (`src/lib/riskGate.ts`). This should still be
  described plainly to parents (e.g. in the portal's help text) so nobody
  mistakes it for something it isn't.
- **Deletion**: no self-service deletion exists yet. **[TO BE COMPLETED]**.

## 9. Third parties and cross-border data transfer

This is the section Law 25 scrutinizes most closely (§17 of the Act —
transfers outside Québec require a documented assessment that the
destination offers adequate protection).

| Third party | Data involved | Location | Status |
|---|---|---|---|
| Email provider (Resend, if configured) | Parent email addresses, message content | **[TO BE COMPLETED]** — confirm Resend's data-residency options and whether they meet Law 25's cross-border transfer test | Not yet assessed |
| Database host (production) | All personal information in §4 | **[TO BE COMPLETED]** — `PROJECT_MEMORY.md` §11 already mandates "data at rest should stay in Canada (Postgres in a Canadian region)"; confirm the actual chosen host and region here once selected | Not yet selected |
| Hosting provider (production) | Application logs, request metadata | **[TO BE COMPLETED]** | Not yet selected |

**No production hosting, database, or email-domain decision has been made
yet** (`PROJECT_MEMORY.md` §8) — this section cannot be completed until
those are chosen, and must be revisited immediately once they are.

## 10. Security measures (as implemented — verified against the code)

- Passwords bcrypt-hashed via Payload's auth system (not custom crypto).
- Group-scoped and audience-scoped access control centralized in one file
  (`src/access/index.ts`), independently re-tested after every schema change
  (`PROJECT_MEMORY.md` §7).
- Admin and parent are separate, non-overlapping account types; a parent can
  never reach the admin panel (`admin` access function on `Parents`).
- Rate limiting on the contact form, the KB assistant, and magic-link
  requests (`src/lib/rateLimit.ts`).
- Magic-link tokens are single-use (rotated immediately after consumption)
  and short-lived (15 minutes), enforced server-side via `beforeLogin`/
  `afterLogin` hooks, not merely hidden in the UI.
- Every admin-triggered parent communication requires an explicit two-step
  human confirmation and is written to an append-only audit log
  (`notification-log`) — no code path from the assistant or any automated
  process reaches parents' inboxes without that human step, **except** the
  campaign scheduler (`src/lib/campaignScheduler.ts`), which sends a
  campaign *only after* a human already confirmed it via the two-step send
  flow and merely fires the already-approved send at the scheduled time —
  **[TO BE COMPLETED]**: confirm this distinction (schedule vs. send-without-review) is acceptable, or require re-confirmation at send time.
- **[TO BE COMPLETED]**: penetration testing, dependency vulnerability
  scanning, and incident response procedures are not yet formalized.

## 11. Risk assessment

**[TO BE COMPLETED IN FULL]** — a real risk assessment requires the
organization to rate likelihood/impact for scenarios such as: a parent
portal account compromise, an admin account compromise, a database breach at
the hosting provider, an email provider breach exposing the campaign
recipient list, and a misconfigured access-control rule leaking one family's
data to another (mitigated by, but not eliminated by, the test matrix in
`PROJECT_MEMORY.md` §7). For each: likelihood, impact, existing mitigation,
residual risk, and whether that residual risk is acceptable — **that
acceptance decision belongs to the privacy officer, not to this document.**

## 12. Breach notification procedure

Law 25 requires notifying the *Commission d'accès à l'information* (CAI) and
affected individuals of any breach presenting a risk of serious injury,
"without delay." **[TO BE COMPLETED]**: no breach response procedure,
detection tooling, or notification template currently exists for this
project. This should be drafted and rehearsed before real data is entered.

## 13. Approval

| | Name | Date | Signature |
|---|---|---|---|
| Privacy officer review | **[TO BE COMPLETED]** | | |
| Legal counsel review | **[TO BE COMPLETED]** | | |
| Approved to proceed to Phase 4 | **[TO BE COMPLETED]** | | |

---

*Generated as a starting draft during Phase 3 development. Cross-reference
`PROJECT_MEMORY.md` §2 rule 11 and §8 before treating any part of this
document as final.*
