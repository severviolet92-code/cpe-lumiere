import type { CollectionConfig } from 'payload'

import { isAdminUser, isDeveloper } from '../access'

/**
 * Audit trail of every notification sent to parents.
 * Created only by the notify endpoint (system), never editable in the UI.
 */
export const NotificationLog: CollectionConfig = {
  slug: 'notification-log',
  labels: {
    singular: { fr: 'Notification envoyée', en: 'Sent notification' },
    plural: { fr: 'Journal des notifications', en: 'Notification log' },
  },
  admin: {
    useAsTitle: 'title',
    group: { fr: 'Administration', en: 'Administration' },
    defaultColumns: ['title', 'audience', 'recipients', 'createdAt'],
    description: {
      fr: 'Historique des courriels envoyés aux parents. Créé automatiquement — lecture seule.',
      en: 'History of emails sent to parents. Created automatically — read-only.',
    },
  },
  access: {
    read: isAdminUser,
    create: () => false, // system-only, via overrideAccess in the endpoint
    update: () => false,
    delete: isDeveloper,
  },
  fields: [
    { name: 'title', type: 'text', required: true, label: { fr: 'Objet', en: 'Subject' } },
    {
      name: 'sourceType',
      type: 'select',
      required: true,
      options: [
        { label: { fr: 'Activité', en: 'Activity' }, value: 'activity' },
        { label: { fr: 'Annonce', en: 'Announcement' }, value: 'announcement' },
        { label: { fr: 'Campagne courriel', en: 'Email campaign' }, value: 'campaign' },
      ],
      label: { fr: 'Type de contenu', en: 'Content type' },
    },
    { name: 'sourceId', type: 'number', required: true, admin: { hidden: true } },
    { name: 'audience', type: 'text', required: true, label: { fr: 'Destinataires (groupes)', en: 'Audience (groups)' } },
    { name: 'recipients', type: 'number', required: true, label: { fr: 'Nombre de parents', en: 'Parent count' } },
    { name: 'delivered', type: 'number', label: { fr: 'Livrés', en: 'Delivered' } },
    { name: 'failed', type: 'number', label: { fr: 'Échecs', en: 'Failed' } },
    {
      // Optional: scheduled campaign sends have no acting admin user.
      name: 'sentBy',
      type: 'relationship',
      relationTo: 'users',
      label: { fr: 'Envoyée par', en: 'Sent by' },
    },
    {
      name: 'trigger',
      type: 'select',
      defaultValue: 'manual',
      options: [
        { label: { fr: 'Envoi manuel', en: 'Manual send' }, value: 'manual' },
        { label: { fr: 'Envoi planifié', en: 'Scheduled send' }, value: 'schedule' },
      ],
      label: { fr: 'Déclencheur', en: 'Trigger' },
    },
  ],
  timestamps: true,
}
