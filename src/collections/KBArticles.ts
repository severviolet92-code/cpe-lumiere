import type { CollectionConfig } from 'payload'

import { isAdminUser, kbArticlesRead } from '../access'
import { kbArticlePreviewEndpoint } from '../endpoints/kbPreview'
import { makeKBSearchEndpoint } from '../endpoints/kbSearch'
import { demoSeedField } from '../fields/demoSeed'

/**
 * Knowledge base articles: the single source the parent assistant answers from.
 * Draft → publish gives the administration a safe preview before anything is
 * visible; `enabled` allows temporarily hiding a published article without
 * losing its content or history.
 */
export const KBArticles: CollectionConfig = {
  slug: 'kb-articles',
  labels: {
    singular: { fr: 'Article (centre d’aide)', en: 'Article (help centre)' },
    plural: { fr: 'Articles du centre d’aide', en: 'Help centre articles' },
  },
  admin: {
    useAsTitle: 'question',
    group: { fr: 'Centre d’aide', en: 'Help centre' },
    defaultColumns: ['question', 'category', 'enabled', '_status'],
    description: {
      fr: 'Réponses officielles servies par l’assistant du portail parents. Enregistrez en brouillon pour prévisualiser, publiez pour rendre visible. Les mots-clés améliorent la recherche.',
      en: 'Official answers served by the parent portal assistant. Save as draft to preview, publish to make visible. Keywords improve search.',
    },
  },
  access: {
    read: kbArticlesRead,
    create: isAdminUser,
    update: isAdminUser,
    delete: isAdminUser,
  },
  versions: { drafts: true },
  endpoints: [makeKBSearchEndpoint(), kbArticlePreviewEndpoint],
  fields: [
    {
      name: 'previewAction',
      type: 'ui',
      admin: {
        position: 'sidebar',
        components: { Field: '/components/admin/KBPreviewButton#KBPreviewButton' },
      },
    },
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
      admin: {
        description: {
          fr: 'Texte riche : gras, listes et liens sont conservés dans l’assistant.',
          en: 'Rich text: bold, lists and links are preserved in the assistant.',
        },
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: { fr: 'Image d’appui (optionnelle)', en: 'Supporting image (optional)' },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'kb-categories',
      required: true,
      label: { fr: 'Catégorie', en: 'Category' },
    },
    {
      name: 'audience',
      type: 'select',
      required: true,
      defaultValue: 'public',
      label: { fr: 'Visibilité', en: 'Visibility' },
      options: [
        { label: { fr: 'Site public et portail', en: 'Public site and portal' }, value: 'public' },
        { label: { fr: 'Portail parents seulement', en: 'Parent portal only' }, value: 'portal' },
      ],
      admin: {
        position: 'sidebar',
        description: {
          fr: 'Public : répond aux visiteurs anonymes sur /faq et aux parents connectés. Portail seulement : réservé aux parents connectés.',
          en: 'Public: answers anonymous visitors on /faq and signed-in parents. Portal only: signed-in parents only.',
        },
      },
    },
    {
      // Localized at the array level (see README architecture notes):
      // French keywords and English keywords are managed independently.
      name: 'keywords',
      type: 'array',
      localized: true,
      label: { fr: 'Mots-clés de recherche', en: 'Search keywords' },
      admin: {
        description: {
          fr: 'Synonymes et variantes que les parents pourraient taper (ex. : « tarif », « prix », « paiement »).',
          en: 'Synonyms and variants parents might type (e.g. “fee”, “price”, “payment”).',
        },
      },
      fields: [{ name: 'term', type: 'text', required: true, label: { fr: 'Mot-clé', en: 'Keyword' } }],
    },
    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: true,
      label: { fr: 'Visible dans l’assistant', en: 'Visible in the assistant' },
      admin: {
        position: 'sidebar',
        description: {
          fr: 'Décochez pour retirer temporairement l’article sans le supprimer.',
          en: 'Uncheck to temporarily hide the article without deleting it.',
        },
      },
    },
    demoSeedField,
  ],
}
