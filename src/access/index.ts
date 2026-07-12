import type { Access, FieldAccess, Where } from 'payload'

/**
 * Access control lives here, in one place, and nowhere else.
 * Roles:
 *  - developer: full technical access (the product builder)
 *  - director:  full content + user management
 *  - staff:     content management only
 * The public (unauthenticated) can only ever read published, public-audience content.
 */

export const isAdminUser: Access = ({ req }) => Boolean(req.user)

export const isDirectorOrDev: Access = ({ req }) =>
  req.user?.role === 'director' || req.user?.role === 'developer'

export const isDeveloper: Access = ({ req }) => req.user?.role === 'developer'

/** Published content is public; drafts are visible to authenticated admin users only. */
export const publishedOnly: Access = ({ req }) => {
  if (req.user) return true
  return { _status: { equals: 'published' } }
}

/** Never readable by the public — admin users only (parent portal extends this in Phase 2). */
export const adminOnly: Access = ({ req }) => Boolean(req.user)

/** Public may read only when the document is explicitly public-audience AND published. */
export const publicAudiencePublishedOnly: Access = ({ req }) => {
  if (req.user) return true
  const where: Where = {
    and: [{ audience: { equals: 'public' } }, { _status: { equals: 'published' } }],
  }
  return where
}

export const developerFieldOnly: FieldAccess = ({ req }) => req.user?.role === 'developer'
