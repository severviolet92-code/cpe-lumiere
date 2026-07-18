import { APIError } from 'payload'
import type { CollectionConfig } from 'payload'

import { isAdminUser, isDirectorOrDev } from '../access'
import { demoSeedField } from '../fields/demoSeed'
import { makeMagicLinkRequestEndpoint } from '../endpoints/magicLink'

/**
 * Parent portal accounts. Invite-only: the administration creates every account;
 * there is no self-registration, ever. Parents can read only their own record
 * and can never access the admin panel.
 * Two sign-in modes are both live: password (the original demo credentials)
 * and magic-link (the production-intended mode — see src/endpoints/magicLink.ts
 * for how it reuses the password field as a rotating one-time token, gated by
 * `magicLinkExpiresAt` and the beforeLogin/afterLogin hooks below).
 */
export const Parents: CollectionConfig = {
  slug: 'parents',
  labels: {
    singular: { fr: 'Compte parent', en: 'Parent account' },
    plural: { fr: 'Comptes parents (portail)', en: 'Parent accounts (portal)' },
  },
  admin: {
    useAsTitle: 'name',
    group: { fr: 'Administration', en: 'Administration' },
    defaultColumns: ['name', 'email', 'groups', 'active'],
    description: {
      fr: 'Comptes du portail parents, créés par l’administration uniquement. Désactivez le compte quand une famille quitte le CPE.',
      en: 'Parent portal accounts, created by the administration only. Deactivate the account when a family leaves the CPE.',
    },
  },
  auth: {
    tokenExpiration: 60 * 60 * 8, // 8h portal sessions
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000,
  },
  endpoints: [makeMagicLinkRequestEndpoint()],
  hooks: {
    beforeLogin: [
      ({ user }) => {
        // Only relevant once a magic link has actually been requested; an
        // ordinary password login is untouched (magicLinkExpiresAt is null).
        const expiresAt = (user as { magicLinkExpiresAt?: string | null }).magicLinkExpiresAt
        if (expiresAt && new Date(expiresAt).getTime() < Date.now()) {
          throw new APIError(
            'Ce lien de connexion a expiré. Demandez-en un nouveau. / This sign-in link has expired. Request a new one.',
            401,
            null,
            true,
          )
        }
        return user
      },
    ],
    afterLogin: [
      async ({ user, req }) => {
        // A magic link is single-use: once it has successfully signed someone
        // in, immediately rotate the password to a fresh, unguessable value
        // so the emailed token cannot be replayed.
        const expiresAt = (user as { magicLinkExpiresAt?: string | null }).magicLinkExpiresAt
        if (expiresAt) {
          const crypto = await import('crypto')
          await req.payload.update({
            collection: 'parents',
            id: user.id,
            data: {
              password: crypto.randomBytes(24).toString('base64url'),
              magicLinkExpiresAt: null,
            },
            overrideAccess: true,
          })
        }
      },
    ],
  },
  access: {
    create: isAdminUser,
    read: ({ req }) => {
      if (req.user?.collection === 'users') return true
      if (req.user?.collection === 'parents') return { id: { equals: req.user.id } }
      return false
    },
    update: isAdminUser,
    delete: isDirectorOrDev,
    // Parents can never enter the admin panel.
    admin: ({ req }) => req.user?.collection === 'users',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: { fr: 'Nom de la famille / du parent', en: 'Family / parent name' },
    },
    {
      name: 'language',
      type: 'select',
      required: true,
      defaultValue: 'fr',
      label: { fr: 'Langue de communication', en: 'Communication language' },
      options: [
        { label: 'Français', value: 'fr' },
        { label: 'English', value: 'en' },
      ],
    },
    {
      name: 'groups',
      type: 'relationship',
      relationTo: 'groups',
      hasMany: true,
      required: true,
      label: { fr: 'Groupe(s) de ses enfants', en: 'Their children’s group(s)' },
      admin: {
        description: {
          fr: 'Le parent ne voit dans le portail que le contenu de ces groupes.',
          en: 'The parent only sees content for these groups in the portal.',
        },
      },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      label: { fr: 'Compte actif', en: 'Active account' },
    },
    {
      // System-managed: set when a magic link is requested, cleared once it's
      // used or expired. Never edited directly by an admin.
      name: 'magicLinkExpiresAt',
      type: 'date',
      admin: { hidden: true },
    },
    demoSeedField,
  ],
}
