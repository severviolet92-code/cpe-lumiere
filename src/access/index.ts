import type { Access, FieldAccess, Where } from 'payload'

/**
 * Access control lives here, in one place, and nowhere else.
 * Roles:
 *  - developer: full technical access (the product builder)
 *  - director:  full content + user management
 *  - staff:     content management only
 * The public (unauthenticated) can only ever read published, public-audience content.
 */

/** Staff/admin only — parents are authenticated but are NOT admin users. */
export const isAdminUser: Access = ({ req }) => req.user?.collection === 'users'

export const isDirectorOrDev: Access = ({ req }) =>
  req.user?.collection === 'users' &&
  (req.user.role === 'director' || req.user.role === 'developer')

export const isDeveloper: Access = ({ req }) =>
  req.user?.collection === 'users' && req.user.role === 'developer'

/** Published content is public; drafts are visible to admin users only (not parents). */
export const publishedOnly: Access = ({ req }) => {
  if (req.user?.collection === 'users') return true
  return { _status: { equals: 'published' } }
}

/** Never readable by the public or by parents — admin users only. */
export const adminOnly: Access = ({ req }) => req.user?.collection === 'users'

/**
 * Audience-gated, versioned content (FAQ):
 * admin sees everything incl. drafts; parents see all *published* entries
 * (both audiences); the public sees only public-audience published entries.
 */
export const publicAudiencePublishedOnly: Access = ({ req }) => {
  if (req.user?.collection === 'users') return true
  if (req.user?.collection === 'parents') {
    const where: Where = { _status: { equals: 'published' } }
    return where
  }
  const where: Where = {
    and: [{ audience: { equals: 'public' } }, { _status: { equals: 'published' } }],
  }
  return where
}

/** Extract group ids from an authenticated parent. */
function parentGroupIds(req: { user?: unknown }): number[] {
  const groups = (req.user as { groups?: (number | { id: number })[] })?.groups || []
  return groups.map((g) => (typeof g === 'object' ? g.id : g))
}

/**
 * Announcements: admin sees all; a parent sees published announcements that are
 * CPE-wide or target one of their groups; never public.
 */
export const announcementsRead: Access = ({ req }) => {
  if (req.user?.collection === 'users') return true
  if (req.user?.collection === 'parents') {
    const where: Where = {
      and: [
        { _status: { equals: 'published' } },
        { or: [{ scope: { equals: 'cpe' } }, { groups: { in: parentGroupIds(req) } }] },
      ],
    }
    return where
  }
  return false
}

export const developerFieldOnly: FieldAccess = ({ req }) =>
  req.user?.collection === 'users' && req.user.role === 'developer'

/**
 * Activities: admin sees all; a parent sees published activities of their own
 * group(s) only; the public sees only activities the director explicitly marked
 * `visibility: public` (and published). Private by default.
 */
export const activitiesRead: Access = ({ req }) => {
  if (req.user?.collection === 'users') return true
  if (req.user?.collection === 'parents') {
    const where: Where = {
      and: [{ groups: { in: parentGroupIds(req) } }, { _status: { equals: 'published' } }],
    }
    return where
  }
  const where: Where = {
    and: [{ visibility: { equals: 'public' } }, { _status: { equals: 'published' } }],
  }
  return where
}
