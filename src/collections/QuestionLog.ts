import type { CollectionConfig } from 'payload'

import { isAdminUser, isDirectorOrDev } from '../access'

/**
 * Audit trail of every question asked to the parent assistant, PII-scrubbed
 * before storage. System-write-only (the search endpoint writes with
 * overrideAccess: true; nothing else may create a row). Purpose: the
 * director's "what are parents asking that we haven't answered" dashboard —
 * filter by outcome `refused` to find real content gaps.
 */
export const QuestionLog: CollectionConfig = {
  slug: 'question-log',
  labels: {
    singular: { fr: 'Question posée', en: 'Asked question' },
    plural: { fr: 'Journal des questions', en: 'Question log' },
  },
  admin: {
    useAsTitle: 'question',
    group: { fr: 'Administration', en: 'Administration' },
    defaultColumns: ['question', 'outcome', 'audience', 'createdAt'],
    description: {
      fr: 'Questions posées à l’assistant, épurées de tout renseignement personnel. Filtrez par « Refusée » pour repérer les manques de contenu.',
      en: 'Questions asked to the assistant, scrubbed of personal information. Filter by “Refused” to spot content gaps.',
    },
  },
  access: {
    read: isAdminUser,
    create: () => false,
    update: () => false,
    delete: isDirectorOrDev,
  },
  fields: [
    { name: 'question', type: 'text', required: true, label: { fr: 'Question (épurée)', en: 'Question (scrubbed)' } },
    {
      name: 'locale',
      type: 'select',
      required: true,
      options: [
        { label: 'Français', value: 'fr' },
        { label: 'English', value: 'en' },
      ],
      label: { fr: 'Langue', en: 'Language' },
    },
    {
      name: 'audience',
      type: 'select',
      required: true,
      options: [
        { label: { fr: 'Public (anonyme)', en: 'Public (anonymous)' }, value: 'public' },
        { label: { fr: 'Portail (parent connecté)', en: 'Portal (signed-in parent)' }, value: 'portal' },
      ],
      label: { fr: 'Contexte', en: 'Context' },
    },
    {
      name: 'outcome',
      type: 'select',
      required: true,
      options: [
        { label: { fr: 'Répondue', en: 'Answered' }, value: 'answered' },
        { label: { fr: 'Refusée (aucune correspondance fiable)', en: 'Refused (no confident match)' }, value: 'refused' },
        { label: { fr: 'Bloquée (sujet sensible)', en: 'Gated (sensitive topic)' }, value: 'gated' },
      ],
      label: { fr: 'Résultat', en: 'Outcome' },
    },
    {
      name: 'matchedArticles',
      type: 'relationship',
      relationTo: 'kb-articles',
      hasMany: true,
      label: { fr: 'Articles retournés', en: 'Returned articles' },
    },
    {
      name: 'askedBy',
      type: 'relationship',
      relationTo: 'parents',
      label: { fr: 'Posée par (si connecté)', en: 'Asked by (if signed in)' },
    },
  ],
  timestamps: true,
}
