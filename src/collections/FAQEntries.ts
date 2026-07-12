import type { CollectionConfig } from 'payload'

import { isAdminUser, publicAudiencePublishedOnly } from '../access'
import { demoSeedField } from '../fields/demoSeed'

/**
 * FAQ entries. Public-audience entries feed the public FAQ page;
 * portal-audience entries stay behind authentication.
 * In Phase 3 this collection becomes the chatbot's primary knowledge source.
 */
export const FAQEntries: CollectionConfig = {
  slug: 'faq-entries',
  labels: {
    singular: { fr: 'Question fréquente', en: 'FAQ entry' },
    plural: { fr: 'Questions fréquentes', en: 'FAQ entries' },
  },
  admin: {
    useAsTitle: 'question',
    group: { fr: 'Contenu', en: 'Content' },
    defaultColumns: ['question', 'category', 'audience', '_status'],
    description: {
      fr: 'Réponses officielles aux questions des parents. Seul le contenu publié ici est visible.',
      en: 'Official answers to parents’ questions. Only published content is visible.',
    },
  },
  access: {
    read: publicAudiencePublishedOnly,
    create: isAdminUser,
    update: isAdminUser,
    delete: isAdminUser,
  },
  versions: { drafts: true },
  defaultSort: 'order',
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
      localized: true,
      label: { fr: 'Question', en: 'Question' },
    },
    {
      name: 'answer',
      type: 'richText',
      required: true,
      localized: true,
      label: { fr: 'Réponse', en: 'Answer' },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'general',
      label: { fr: 'Catégorie', en: 'Category' },
      options: [
        { label: { fr: 'Admission et inscription', en: 'Admission & registration' }, value: 'admission' },
        { label: { fr: 'Vie quotidienne', en: 'Daily life' }, value: 'quotidien' },
        { label: { fr: 'Santé et sécurité', en: 'Health & safety' }, value: 'sante' },
        { label: { fr: 'Alimentation', en: 'Meals' }, value: 'alimentation' },
        { label: { fr: 'Général', en: 'General' }, value: 'general' },
      ],
    },
    {
      name: 'audience',
      type: 'select',
      required: true,
      defaultValue: 'public',
      label: { fr: 'Visibilité', en: 'Visibility' },
      options: [
        { label: { fr: 'Site public', en: 'Public website' }, value: 'public' },
        { label: { fr: 'Portail parents seulement', en: 'Parent portal only' }, value: 'portal' },
      ],
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      label: { fr: 'Ordre d’affichage', en: 'Display order' },
    },
    demoSeedField,
  ],
}
