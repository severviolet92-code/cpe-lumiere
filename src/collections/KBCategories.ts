import type { CollectionConfig } from 'payload'

import { isAdminUser, kbCategoriesRead } from '../access'
import { demoSeedField } from '../fields/demoSeed'

/**
 * Knowledge base categories, managed entirely by the administration
 * (create / rename / reorder). Articles reference a category; the parent
 * assistant uses category names as an extra ranking signal.
 */
export const KBCategories: CollectionConfig = {
  slug: 'kb-categories',
  labels: {
    singular: { fr: 'Catégorie (centre d’aide)', en: 'Category (help centre)' },
    plural: { fr: 'Catégories du centre d’aide', en: 'Help centre categories' },
  },
  admin: {
    useAsTitle: 'name',
    group: { fr: 'Centre d’aide', en: 'Help centre' },
    defaultColumns: ['name', 'icon', 'order'],
    description: {
      fr: 'Catégories des articles du centre d’aide (ex. : Inscription, Frais, Repas). L’ordre contrôle l’affichage dans le portail.',
      en: 'Help centre article categories (e.g. Registration, Fees, Meals). Order controls display in the portal.',
    },
  },
  access: {
    read: kbCategoriesRead,
    create: isAdminUser,
    update: isAdminUser,
    delete: isAdminUser,
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      label: { fr: 'Nom', en: 'Name' },
    },
    {
      name: 'icon',
      type: 'text',
      label: { fr: 'Icône (émoji, optionnel)', en: 'Icon (emoji, optional)' },
      admin: { description: { fr: 'Un seul émoji, ex. 🍎', en: 'A single emoji, e.g. 🍎' } },
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
