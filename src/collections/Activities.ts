import type { CollectionConfig } from 'payload'

import { adminOnly, isAdminUser } from '../access'
import { demoSeedField } from '../fields/demoSeed'

/**
 * Group activities with preparation checklists.
 * NEVER public: activities disclose where groups of children will be and when.
 * Phase 2 extends read access to authenticated parents of the targeted groups.
 */
export const Activities: CollectionConfig = {
  slug: 'activities',
  labels: {
    singular: { fr: 'Activité', en: 'Activity' },
    plural: { fr: 'Activités', en: 'Activities' },
  },
  admin: {
    useAsTitle: 'title',
    group: { fr: 'Vie du CPE', en: 'CPE life' },
    defaultColumns: ['title', 'date', 'groups', '_status'],
    description: {
      fr: 'Activités des groupes avec liste de préparation. Jamais visibles sur le site public. N’incluez aucune information personnelle sur un enfant.',
      en: 'Group activities with preparation checklists. Never shown on the public website. Never include personal information about a child.',
    },
  },
  access: {
    read: adminOnly,
    create: isAdminUser,
    update: isAdminUser,
    delete: isAdminUser,
  },
  versions: { drafts: true },
  defaultSort: '-date',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: { fr: 'Titre', en: 'Title' },
    },
    {
      name: 'groups',
      type: 'relationship',
      relationTo: 'groups',
      hasMany: true,
      required: true,
      label: { fr: 'Groupes concernés', en: 'Groups concerned' },
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      label: { fr: 'Date', en: 'Date' },
      admin: { date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMMM yyyy' } },
    },
    {
      name: 'description',
      type: 'richText',
      localized: true,
      label: { fr: 'Description', en: 'Description' },
    },
    {
      name: 'checklist',
      type: 'array',
      localized: true,
      label: { fr: 'À apporter / à prévoir', en: 'To bring / to prepare' },
      labels: {
        singular: { fr: 'Élément', en: 'Item' },
        plural: { fr: 'Éléments', en: 'Items' },
      },
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
          label: { fr: 'Élément', en: 'Item' },
        },
      ],
    },
    demoSeedField,
  ],
}
