import type { CollectionConfig } from 'payload'

import { isAdminUser, publishedOnly } from '../access'
import { demoSeedField } from '../fields/demoSeed'

/** Open positions shown on the public Careers page. */
export const JobOpenings: CollectionConfig = {
  slug: 'job-openings',
  labels: {
    singular: { fr: 'Poste ouvert', en: 'Job opening' },
    plural: { fr: 'Postes ouverts (Carrières)', en: 'Job openings (Careers)' },
  },
  admin: {
    useAsTitle: 'title',
    group: { fr: 'Contenu', en: 'Content' },
    defaultColumns: ['title', 'schedule', '_status'],
    description: {
      fr: 'Postes affichés sur la page Carrières du site public.',
      en: 'Positions shown on the public Careers page.',
    },
  },
  access: {
    read: publishedOnly,
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
      label: { fr: 'Titre du poste', en: 'Position title' },
    },
    {
      name: 'schedule',
      type: 'select',
      required: true,
      defaultValue: 'full',
      label: { fr: 'Horaire', en: 'Schedule' },
      options: [
        { label: { fr: 'Temps plein', en: 'Full-time' }, value: 'full' },
        { label: { fr: 'Temps partiel', en: 'Part-time' }, value: 'part' },
        { label: { fr: 'Remplacement', en: 'Substitute' }, value: 'sub' },
      ],
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      localized: true,
      label: { fr: 'Description du poste', en: 'Position description' },
    },
    {
      name: 'qualifications',
      type: 'richText',
      localized: true,
      label: { fr: 'Qualifications recherchées', en: 'Required qualifications' },
    },
    demoSeedField,
  ],
}
