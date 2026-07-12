import type { CollectionConfig } from 'payload'

import { isAdminUser } from '../access'
import { demoSeedField } from '../fields/demoSeed'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: { fr: 'Image', en: 'Image' },
    plural: { fr: 'Images', en: 'Images' },
  },
  admin: {
    group: { fr: 'Contenu', en: 'Content' },
    description: {
      fr: "Images publiques du site. Ne téléversez jamais de photos permettant d'identifier un enfant.",
      en: 'Public site images. Never upload photos that could identify a child.',
    },
  },
  access: {
    read: () => true,
    create: isAdminUser,
    update: isAdminUser,
    delete: isAdminUser,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      localized: true,
      label: { fr: 'Texte alternatif (accessibilité)', en: 'Alt text (accessibility)' },
    },
    demoSeedField,
  ],
  upload: {
    mimeTypes: ['image/*'],
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 800, height: 600, position: 'centre' },
      { name: 'wide', width: 1600, height: undefined },
    ],
    focalPoint: true,
  },
}
