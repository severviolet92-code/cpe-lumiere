import type { CollectionConfig } from 'payload'

import { announcementsRead, isAdminUser } from '../access'
import { makeNotifyEndpoint } from '../endpoints/notify'
import { demoSeedField } from '../fields/demoSeed'

/**
 * Announcements & news centre: news, events, reminders and holiday notices for
 * parents (whole CPE or specific groups). Never public: delivered through the
 * parent portal and admin-triggered email.
 * Scheduling: `publishAt` keeps a published announcement invisible to parents
 * until the chosen moment (enforced in access control, not just the UI).
 * Archiving: `archived` moves it to the portal's archive browser.
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
    defaultColumns: ['title', 'kind', 'scope', 'pinned', 'archived', '_status'],
    description: {
      fr: 'Annonces destinées aux parents. N’incluez aucune information personnelle sur un enfant.',
      en: 'Announcements for parents. Never include personal information about a child.',
    },
  },
  access: {
    read: announcementsRead,
    create: isAdminUser,
    update: isAdminUser,
    delete: isAdminUser,
  },
  versions: { drafts: true },
  defaultSort: '-createdAt',
  endpoints: [makeNotifyEndpoint('announcement')],
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
      name: 'kind',
      type: 'select',
      required: true,
      defaultValue: 'news',
      label: { fr: 'Type d’annonce', en: 'Announcement type' },
      options: [
        { label: { fr: 'Nouvelle', en: 'News' }, value: 'news' },
        { label: { fr: 'Événement', en: 'Event' }, value: 'event' },
        { label: { fr: 'Rappel important', en: 'Important reminder' }, value: 'reminder' },
        { label: { fr: 'Congé / fermeture', en: 'Holiday / closure' }, value: 'holiday' },
      ],
    },
    {
      name: 'eventDate',
      type: 'date',
      label: { fr: 'Date de l’événement', en: 'Event date' },
      admin: {
        condition: (data) => data?.kind === 'event',
        date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMMM yyyy' },
        description: {
          fr: 'Les événements à venir sont mis en avant dans le portail.',
          en: 'Upcoming events are highlighted in the portal.',
        },
      },
      validate: (value: unknown, { data }: { data: Partial<{ kind: string }> }) => {
        if (data?.kind === 'event' && !value) {
          return 'Indiquez la date de l’événement. / Provide the event date.'
        }
        return true
      },
    },
    {
      name: 'body',
      type: 'richText',
      required: true,
      localized: true,
      label: { fr: 'Message', en: 'Message' },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: { fr: 'Image (optionnelle)', en: 'Image (optional)' },
    },
    {
      name: 'videoUrl',
      type: 'text',
      label: { fr: 'Vidéo (lien YouTube ou Vimeo, optionnel)', en: 'Video (YouTube or Vimeo link, optional)' },
      admin: {
        description: {
          fr: 'Collez le lien de la vidéo (non répertoriée de préférence). Elle est intégrée dans le portail.',
          en: 'Paste the video link (preferably unlisted). It is embedded in the portal.',
        },
      },
      validate: (value: unknown) => {
        if (!value) return true
        if (typeof value === 'string' && /^https:\/\/\S+$/.test(value)) return true
        return 'Lien invalide — utilisez une adresse https. / Invalid link — use an https address.'
      },
    },
    {
      name: 'attachments',
      type: 'relationship',
      relationTo: 'documents',
      hasMany: true,
      label: { fr: 'Documents joints (PDF)', en: 'Attached documents (PDF)' },
      admin: {
        description: {
          fr: 'Téléversez d’abord le PDF dans Documents, puis joignez-le ici.',
          en: 'Upload the PDF to Documents first, then attach it here.',
        },
      },
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
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishAt',
      type: 'date',
      label: { fr: 'Publier à partir de (optionnel)', en: 'Publish from (optional)' },
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime', displayFormat: 'd MMMM yyyy HH:mm' },
        description: {
          fr: 'Publiez normalement : l’annonce reste invisible pour les parents jusqu’à ce moment.',
          en: 'Publish as usual: the announcement stays hidden from parents until this moment.',
        },
      },
    },
    {
      name: 'archived',
      type: 'checkbox',
      defaultValue: false,
      label: { fr: 'Archivée', en: 'Archived' },
      admin: {
        position: 'sidebar',
        description: {
          fr: 'L’annonce quitte le fil principal et reste consultable dans les archives du portail.',
          en: 'Leaves the main feed but remains available in the portal archives.',
        },
      },
    },
    {
      name: 'expiresAt',
      type: 'date',
      label: { fr: 'Expire le (optionnel)', en: 'Expires on (optional)' },
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMMM yyyy' },
        description: {
          fr: 'Après cette date, l’annonce est classée automatiquement aux archives.',
          en: 'After this date the announcement is automatically filed under archives.',
        },
      },
    },
    demoSeedField,
  ],
}
