import type { CollectionConfig } from 'payload'

import { isDirectorOrDev } from '../access'
import { demoSeedField } from '../fields/demoSeed'

/**
 * Age groups of the CPE (6 months – 5 years).
 * Group names are visible in the admin and, later, in the parent portal.
 * Group-level schedules are NEVER exposed on the public website.
 */
export const Groups: CollectionConfig = {
  slug: 'groups',
  labels: {
    singular: { fr: 'Groupe', en: 'Group' },
    plural: { fr: 'Groupes', en: 'Groups' },
  },
  admin: {
    useAsTitle: 'name',
    group: { fr: 'Vie du CPE', en: 'CPE life' },
    description: {
      fr: 'Les groupes d’âge du CPE. Le nom des enfants ne doit jamais apparaître ici.',
      en: 'The CPE’s age groups. Children’s names must never appear here.',
    },
  },
  access: {
    // Group names and age ranges are standard public information on CPE sites.
    // What must NEVER be public is group-linked scheduling (Activities/Announcements).
    read: () => true,
    create: isDirectorOrDev,
    update: isDirectorOrDev,
    delete: isDirectorOrDev,
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      label: { fr: 'Nom du groupe', en: 'Group name' },
    },
    {
      name: 'ageRange',
      type: 'text',
      required: true,
      localized: true,
      label: { fr: 'Tranche d’âge', en: 'Age range' },
      admin: { placeholder: { fr: 'ex. : 18 mois à 2 ans', en: 'e.g. 18 months to 2 years' } },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      label: { fr: 'Description du groupe (site public)', en: 'Group description (public site)' },
      admin: {
        description: {
          fr: 'Ce que vivent les enfants de ce groupe : rythme, apprentissages, ratio. Aucune information sur un enfant précis.',
          en: 'What children in this group experience: rhythm, learning, ratio. No information about any specific child.',
        },
      },
    },
    {
      name: 'color',
      type: 'select',
      required: true,
      defaultValue: 'miel',
      label: { fr: 'Couleur du groupe', en: 'Group colour' },
      options: [
        { label: { fr: 'Miel', en: 'Honey' }, value: 'miel' },
        { label: { fr: 'Sauge', en: 'Sage' }, value: 'sauge' },
        { label: { fr: 'Terracotta', en: 'Terracotta' }, value: 'terracotta' },
        { label: { fr: 'Ciel', en: 'Sky' }, value: 'ciel' },
        { label: { fr: 'Lavande', en: 'Lavender' }, value: 'lavande' },
      ],
      admin: {
        description: {
          fr: 'Choisie parmi la palette du site — la cohérence visuelle est automatique.',
          en: 'Chosen from the site palette — visual consistency is automatic.',
        },
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      label: { fr: 'Ordre d’affichage', en: 'Display order' },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      label: { fr: 'Groupe actif', en: 'Active group' },
    },
    demoSeedField,
  ],
}
