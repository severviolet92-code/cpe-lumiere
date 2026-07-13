import type { CollectionConfig } from 'payload'

import { activitiesRead, isAdminUser } from '../access'
import { makeNotifyEndpoint } from '../endpoints/notify'
import { demoSeedField } from '../fields/demoSeed'

/**
 * Group activities with preparation checklists.
 * Private by default: activities disclose where groups of children will be and when.
 * The director may explicitly mark an activity `visibility: public`; only those are
 * ever publicly readable (and only when published). Parents (Phase 2) see the
 * activities of their own groups through the portal.
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
    defaultColumns: ['title', 'date', 'groups', 'visibility', '_status'],
    description: {
      fr: 'Activités des groupes avec liste de préparation. Privées par défaut (portail parents) ; publiques seulement si vous le choisissez explicitement. N’incluez aucune information personnelle sur un enfant.',
      en: 'Group activities with preparation checklists. Private by default (parent portal); public only if you explicitly choose so. Never include personal information about a child.',
    },
  },
  access: {
    read: activitiesRead,
    create: isAdminUser,
    update: isAdminUser,
    delete: isAdminUser,
  },
  versions: { drafts: true },
  defaultSort: '-date',
  endpoints: [makeNotifyEndpoint('activity')],
  fields: [
    {
      name: 'notifyAction',
      type: 'ui',
      admin: {
        position: 'sidebar',
        components: { Field: '/components/admin/NotifyButton#NotifyButton' },
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: { fr: 'Titre', en: 'Title' },
    },
    {
      name: 'visibility',
      type: 'select',
      required: true,
      defaultValue: 'portal',
      label: { fr: 'Visibilité', en: 'Visibility' },
      options: [
        { label: { fr: 'Portail parents seulement (par défaut)', en: 'Parent portal only (default)' }, value: 'portal' },
        { label: { fr: 'Aussi sur le site public', en: 'Also on the public website' }, value: 'public' },
      ],
      admin: {
        description: {
          fr: 'Par prudence, les activités sont privées par défaut. Rendez publique uniquement une activité que vous choisissez consciemment d’afficher à tous.',
          en: 'Activities are private by default. Make an activity public only when you consciously choose to show it to everyone.',
        },
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: { fr: 'Image de l’activité', en: 'Activity image' },
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
      name: 'endDate',
      type: 'date',
      label: { fr: 'Dernier jour (si plusieurs jours)', en: 'Last day (if multi-day)' },
      admin: { date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMMM yyyy' } },
    },
    {
      name: 'importantNote',
      type: 'textarea',
      localized: true,
      label: { fr: 'Important / rappels', en: 'Important / reminders' },
      admin: {
        description: {
          fr: 'Affiché en évidence : consignes essentielles pour les parents.',
          en: 'Shown prominently: essential instructions for parents.',
        },
      },
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
