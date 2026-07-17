import type { CollectionConfig } from 'payload'

import { isAdminUser, isDirectorOrDev } from '../access'
import {
  campaignPreviewEndpoint,
  campaignRunDueEndpoint,
  campaignSendEndpoint,
} from '../endpoints/campaigns'
import { demoSeedField } from '../fields/demoSeed'

/**
 * Email campaigns: write once, preview the branded email, send to every
 * parent (or selected groups) now or on schedule. Delivery counters and the
 * notification log form the audit trail. Sending goes through the two-step
 * endpoints — never as a side effect of saving.
 */
export const EmailCampaigns: CollectionConfig = {
  slug: 'email-campaigns',
  labels: {
    singular: { fr: 'Campagne courriel', en: 'Email campaign' },
    plural: { fr: 'Campagnes courriel', en: 'Email campaigns' },
  },
  admin: {
    useAsTitle: 'title',
    group: { fr: 'Administration', en: 'Administration' },
    defaultColumns: ['title', 'audience', 'status', 'scheduledAt', 'sentAt'],
    description: {
      fr: 'Courriels aux parents : brouillon → aperçu → envoi (immédiat ou planifié). Chaque envoi est consigné au journal des notifications.',
      en: 'Emails to parents: draft → preview → send (immediate or scheduled). Every send is recorded in the notification log.',
    },
  },
  access: {
    read: isAdminUser,
    create: isAdminUser,
    update: isAdminUser,
    delete: isDirectorOrDev,
  },
  defaultSort: '-createdAt',
  endpoints: [campaignPreviewEndpoint, campaignSendEndpoint, campaignRunDueEndpoint],
  hooks: {
    beforeChange: [
      ({ data, originalDoc }) => {
        // The send engine sets sending/sent/failed explicitly — respect any
        // explicit transition. Otherwise draft ↔ scheduled simply follows
        // the presence of a scheduled send time.
        const current = originalDoc?.status
        if (data.status && data.status !== current) return data
        if (current === 'sent' || current === 'failed' || current === 'sending') return data
        data.status = data.scheduledAt ? 'scheduled' : 'draft'
        return data
      },
    ],
  },
  fields: [
    {
      name: 'campaignActions',
      type: 'ui',
      admin: {
        position: 'sidebar',
        components: { Field: '/components/admin/CampaignActions#CampaignActions' },
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: { fr: 'Nom interne', en: 'Internal name' },
      admin: {
        description: {
          fr: 'Visible seulement par l’équipe (ex. : « Rappel rentrée 2026 »).',
          en: 'Visible to the team only (e.g. “Back-to-school reminder 2026”).',
        },
      },
    },
    {
      name: 'subject',
      type: 'text',
      required: true,
      localized: true,
      label: { fr: 'Objet du courriel', en: 'Email subject' },
    },
    {
      name: 'body',
      type: 'richText',
      required: true,
      localized: true,
      label: { fr: 'Message', en: 'Message' },
      admin: {
        description: {
          fr: 'Le message est enveloppé dans le gabarit aux couleurs du CPE — utilisez l’aperçu.',
          en: 'The message is wrapped in the CPE-branded template — use the preview.',
        },
      },
    },
    {
      name: 'audience',
      type: 'select',
      required: true,
      defaultValue: 'all',
      label: { fr: 'Destinataires', en: 'Audience' },
      options: [
        { label: { fr: 'Tous les parents', en: 'All parents' }, value: 'all' },
        { label: { fr: 'Groupes précis', en: 'Specific groups' }, value: 'groups' },
      ],
    },
    {
      name: 'groups',
      type: 'relationship',
      relationTo: 'groups',
      hasMany: true,
      label: { fr: 'Groupes concernés', en: 'Groups concerned' },
      admin: { condition: (data) => data?.audience === 'groups' },
      validate: (value: unknown, { data }: { data: Partial<{ audience: string }> }) => {
        if (data?.audience === 'groups' && (!Array.isArray(value) || value.length === 0)) {
          return 'Sélectionnez au moins un groupe. / Select at least one group.'
        }
        return true
      },
    },
    {
      name: 'relatedAnnouncement',
      type: 'relationship',
      relationTo: 'announcements',
      label: { fr: 'Annonce liée (optionnel)', en: 'Related announcement (optional)' },
      admin: {
        description: {
          fr: 'Rempli automatiquement quand la campagne est créée depuis une annonce.',
          en: 'Filled automatically when the campaign is created from an announcement.',
        },
      },
    },
    {
      name: 'scheduledAt',
      type: 'date',
      label: { fr: 'Envoi planifié le (optionnel)', en: 'Scheduled send (optional)' },
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime', displayFormat: 'd MMMM yyyy HH:mm' },
        description: {
          fr: 'Laissez vide pour un envoi manuel. L’envoi planifié part au passage du planificateur.',
          en: 'Leave empty for manual send. Scheduled sends go out on the scheduler’s next pass.',
        },
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      label: { fr: 'Statut', en: 'Status' },
      options: [
        { label: { fr: 'Brouillon', en: 'Draft' }, value: 'draft' },
        { label: { fr: 'Planifiée', en: 'Scheduled' }, value: 'scheduled' },
        { label: { fr: 'Envoi en cours', en: 'Sending' }, value: 'sending' },
        { label: { fr: 'Envoyée', en: 'Sent' }, value: 'sent' },
        { label: { fr: 'Échec', en: 'Failed' }, value: 'failed' },
      ],
      admin: { position: 'sidebar', readOnly: true },
    },
    {
      name: 'sentAt',
      type: 'date',
      label: { fr: 'Envoyée le', en: 'Sent at' },
      admin: {
        position: 'sidebar',
        readOnly: true,
        date: { pickerAppearance: 'dayAndTime', displayFormat: 'd MMMM yyyy HH:mm' },
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'recipientsCount',
          type: 'number',
          label: { fr: 'Destinataires', en: 'Recipients' },
          admin: { readOnly: true },
        },
        {
          name: 'deliveredCount',
          type: 'number',
          label: { fr: 'Livrés', en: 'Delivered' },
          admin: { readOnly: true },
        },
        {
          name: 'failedCount',
          type: 'number',
          label: { fr: 'Échecs', en: 'Failed' },
          admin: { readOnly: true },
        },
      ],
    },
    {
      name: 'deliveryNote',
      type: 'textarea',
      label: { fr: 'Détails de livraison', en: 'Delivery details' },
      admin: {
        readOnly: true,
        description: {
          fr: 'Adresses en échec, le cas échéant.',
          en: 'Failed addresses, if any.',
        },
      },
    },
    demoSeedField,
  ],
}
