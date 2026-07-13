import type { CollectionConfig } from 'payload'

import { isAdminUser } from '../access'
import { demoSeedField } from '../fields/demoSeed'

/**
 * Downloadable documents (policies, menus, guides).
 * Public-audience documents are downloadable by anyone;
 * portal-audience documents require authentication (parents in Phase 2).
 */
export const Documents: CollectionConfig = {
  slug: 'documents',
  labels: {
    singular: { fr: 'Document', en: 'Document' },
    plural: { fr: 'Documents', en: 'Documents' },
  },
  admin: {
    useAsTitle: 'title',
    group: { fr: 'Contenu', en: 'Content' },
    defaultColumns: ['title', 'category', 'audience'],
    description: {
      fr: 'Documents téléchargeables : menus, politiques, guides. Aucun document contenant des renseignements personnels.',
      en: 'Downloadable documents: menus, policies, guides. No document may contain personal information.',
    },
  },
  access: {
    read: ({ req }) => {
      // Admin sees all; parents see all documents (portal + public) — intended;
      // the anonymous public sees public-audience documents only.
      if (req.user) return true
      return { audience: { equals: 'public' } }
    },
    create: isAdminUser,
    update: isAdminUser,
    delete: isAdminUser,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: { fr: 'Titre', en: 'Title' },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'general',
      label: { fr: 'Catégorie', en: 'Category' },
      options: [
        { label: { fr: 'Menus', en: 'Menus' }, value: 'menus' },
        { label: { fr: 'Politiques et règlements', en: 'Policies & rules' }, value: 'politiques' },
        { label: { fr: 'Guides aux parents', en: 'Parent guides' }, value: 'guides' },
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
    demoSeedField,
  ],
  upload: {
    mimeTypes: ['application/pdf'],
  },
}
