import type { CollectionConfig } from 'payload'

import { isAdminUser, publishedOnly } from '../access'
import { demoSeedField } from '../fields/demoSeed'

/**
 * Past-activity gallery images ("la vie au CPE").
 * Hidden by default (draft). A photo can only be PUBLISHED after the editor
 * explicitly confirms it shows no identifiable child and its distribution is
 * authorized — enforced server-side by a hook, not just in the UI.
 */
export const GalleryPhotos: CollectionConfig = {
  slug: 'gallery-photos',
  labels: {
    singular: { fr: 'Photo de la galerie', en: 'Gallery photo' },
    plural: { fr: 'Galerie (souvenirs)', en: 'Gallery (memories)' },
  },
  admin: {
    useAsTitle: 'caption',
    group: { fr: 'Vie du CPE', en: 'CPE life' },
    defaultColumns: ['caption', 'takenAt', 'consentConfirmed', '_status'],
    description: {
      fr: 'Images des activités passées, visibles publiquement UNIQUEMENT après confirmation qu’aucun enfant n’est identifiable et que la diffusion est autorisée.',
      en: 'Images of past activities, publicly visible ONLY after confirming no child is identifiable and distribution is authorized.',
    },
  },
  access: {
    read: publishedOnly,
    create: isAdminUser,
    update: isAdminUser,
    delete: isAdminUser,
  },
  versions: { drafts: true },
  defaultSort: '-takenAt',
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data?._status === 'published' && !data?.consentConfirmed) {
          throw new Error(
            'Publication impossible : confirmez d’abord qu’aucun enfant n’est identifiable et que la diffusion est autorisée. / Cannot publish: first confirm no child is identifiable and distribution is authorized.',
          )
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'caption',
      type: 'text',
      required: true,
      localized: true,
      label: { fr: 'Légende', en: 'Caption' },
    },
    {
      name: 'takenAt',
      type: 'date',
      required: true,
      label: { fr: 'Date de l’activité', en: 'Activity date' },
      admin: { date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMMM yyyy' } },
    },
    {
      name: 'activity',
      type: 'relationship',
      relationTo: 'activities',
      label: { fr: 'Activité liée (optionnel)', en: 'Related activity (optional)' },
    },
    {
      name: 'consentConfirmed',
      type: 'checkbox',
      defaultValue: false,
      label: {
        fr: 'Je confirme qu’aucun enfant n’est identifiable sur cette image et que sa diffusion publique est autorisée',
        en: 'I confirm no child is identifiable in this image and its public distribution is authorized',
      },
    },
    demoSeedField,
  ],
  upload: {
    mimeTypes: ['image/*'],
    imageSizes: [
      { name: 'card', width: 800, height: 600, position: 'centre' },
      { name: 'large', width: 1400, height: undefined },
    ],
    focalPoint: true,
  },
}
