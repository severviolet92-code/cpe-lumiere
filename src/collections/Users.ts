import type { CollectionConfig } from 'payload'

import { isDirectorOrDev } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: { fr: 'Utilisateur (administration)', en: 'User (administration)' },
    plural: { fr: 'Utilisateurs (administration)', en: 'Users (administration)' },
  },
  admin: {
    useAsTitle: 'name',
    group: { fr: 'Administration', en: 'Administration' },
    description: {
      fr: 'Comptes du personnel autorisé. Les comptes parents (portail) sont gérés séparément.',
      en: 'Authorized staff accounts. Parent (portal) accounts are managed separately.',
    },
  },
  auth: {
    tokenExpiration: 60 * 60 * 2, // 2h admin sessions
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000,
  },
  access: {
    // Only the director (or developer) manages accounts; staff can read the team list.
    create: isDirectorOrDev,
    read: ({ req }) => Boolean(req.user),
    update: ({ req, id }) => {
      if (!req.user) return false
      if (req.user.role === 'director' || req.user.role === 'developer') return true
      return req.user.id === id // staff can edit their own profile only
    },
    delete: isDirectorOrDev,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: { fr: 'Nom', en: 'Name' },
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'staff',
      label: { fr: 'Rôle', en: 'Role' },
      options: [
        { label: { fr: 'Direction', en: 'Director' }, value: 'director' },
        { label: { fr: 'Personnel administratif', en: 'Administrative staff' }, value: 'staff' },
        { label: { fr: 'Développeur', en: 'Developer' }, value: 'developer' },
      ],
      access: {
        // Nobody can grant themselves a higher role: only director/developer set roles.
        update: ({ req }) => req.user?.role === 'director' || req.user?.role === 'developer',
      },
    },
  ],
  versions: false,
}
