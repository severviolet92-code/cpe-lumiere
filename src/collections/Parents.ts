import type { CollectionConfig } from 'payload'

import { isAdminUser, isDirectorOrDev } from '../access'
import { demoSeedField } from '../fields/demoSeed'

/**
 * Parent portal accounts. Invite-only: the administration creates every account;
 * there is no self-registration, ever. Parents can read only their own record
 * and can never access the admin panel.
 * Demo uses password login; production switches to magic-link sign-in.
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
    demoSeedField,
  ],
}
