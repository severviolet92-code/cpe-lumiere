import type { CollectionConfig } from 'payload'

import { adminOnly, isAdminUser } from '../access'
import { demoSeedField } from '../fields/demoSeed'

/**
 * Announcements to parents (whole CPE or specific groups).
 * Never public: delivered through the parent portal (Phase 2) and admin-triggered email.
 */
export const Announcements: CollectionConfig = {
  slug: 'announcements',
  labels: {
    singular: { fr: 'Annonce', en: 'Announcement' },
    plural: { fr: 'Annonces', en: 'Announcements' },
  },
  admin: {
    useAsTitle: 'title',
    group: { fr: 'Vie du CPE', en: 'CPE life' },
    defaultColumns: ['title', 'scope', 'pinned', '_status'],
    description: {
      fr: 'Annonces destinées aux parents. N’incluez aucune information personnelle sur un enfant.',
      en: 'Announcements for parents. Never include personal information about a child.',
    },
  },
  access: {
    read: adminOnly,
    create: isAdminUser,
    update: isAdminUser,
    delete: isAdminUser,
  },
  versions: { drafts: true },
  defaultSort: '-createdAt',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: { fr: 'Titre', en: 'Title' },
    },
    {
      name: 'body',
      type: 'richText',
      required: true,
      localized: true,
      label: { fr: 'Message', en: 'Message' },
    },
    {
      name: 'scope',
      type: 'select',
      required: true,
      defaultValue: 'cpe',
      label: { fr: 'Destinataires', en: 'Audience' },
      options: [
        { label: { fr: 'Tout le CPE', en: 'Whole CPE' }, value: 'cpe' },
        { label: { fr: 'Groupes précis', en: 'Specific groups' }, value: 'groups' },
      ],
    },
    {
      name: 'groups',
      type: 'relationship',
      relationTo: 'groups',
      hasMany: true,
      label: { fr: 'Groupes concernés', en: 'Groups concerned' },
      admin: { condition: (data) => data?.scope === 'groups' },
      validate: (value: unknown, { data }: { data: Partial<{ scope: string }> }) => {
        if (data?.scope === 'groups' && (!Array.isArray(value) || value.length === 0)) {
          return 'Sélectionnez au moins un groupe. / Select at least one group.'
        }
        return true
      },
    },
    {
      name: 'pinned',
      type: 'checkbox',
      defaultValue: false,
      label: { fr: 'Épinglée', en: 'Pinned' },
    },
    {
      name: 'expiresAt',
      type: 'date',
      label: { fr: 'Expire le (optionnel)', en: 'Expires on (optional)' },
      admin: { date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMMM yyyy' } },
    },
    demoSeedField,
  ],
}
