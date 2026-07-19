import type { CollectionConfig } from 'payload'

import { isAdminUser, publishedOnly } from '../access'
import { demoSeedField } from '../fields/demoSeed'

/**
 * Public team presentation. Staff have privacy rights too:
 * a profile cannot be published without the person's recorded consent.
 */
export const StaffProfiles: CollectionConfig = {
  slug: 'staff-profiles',
  labels: {
    singular: { fr: 'Membre de l’équipe', en: 'Team member' },
    plural: { fr: 'Équipe (site public)', en: 'Team (public website)' },
  },
  admin: {
    useAsTitle: 'name',
    group: { fr: 'Contenu', en: 'Content' },
    defaultColumns: ['name', 'jobTitle', 'department', 'consent', '_status'],
    description: {
      fr: 'Présentation publique de l’équipe. Le consentement écrit de la personne est obligatoire avant publication.',
      en: 'Public team presentation. The person’s written consent is required before publishing.',
    },
  },
  access: {
    read: publishedOnly,
    create: isAdminUser,
    update: isAdminUser,
    delete: isAdminUser,
  },
  versions: { drafts: true },
  defaultSort: 'order',
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Hard rule: no consent, no publication. Enforced server-side, not just in the UI.
        if (data?._status === 'published' && !data?.consent) {
          throw new Error(
            'Publication impossible : le consentement de la personne doit être confirmé. / Cannot publish: the person’s consent must be confirmed.',
          )
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: { fr: 'Nom', en: 'Name' },
    },
    {
      name: 'jobTitle',
      type: 'text',
      required: true,
      localized: true,
      label: { fr: 'Fonction', en: 'Role' },
    },
    {
      name: 'department',
      type: 'select',
      required: true,
      defaultValue: 'educators',
      label: { fr: 'Secteur', en: 'Department' },
      options: [
        { label: { fr: 'Administration', en: 'Administration' }, value: 'administration' },
        { label: { fr: 'Éducatrices et éducateurs', en: 'Educators' }, value: 'educators' },
        { label: { fr: 'Cuisine', en: 'Kitchen' }, value: 'kitchen' },
        { label: { fr: 'Spécialistes et soutien', en: 'Specialists & support' }, value: 'specialists' },
      ],
      admin: {
        description: {
          fr: 'Détermine la section de la page « Notre CPE » où la personne apparaît.',
          en: 'Determines which section of the “Our CPE” page the person appears in.',
        },
      },
    },
    {
      name: 'bio',
      type: 'textarea',
      localized: true,
      label: { fr: 'Courte présentation', en: 'Short bio' },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: { fr: 'Photo (optionnelle)', en: 'Photo (optional)' },
    },
    {
      name: 'consent',
      type: 'checkbox',
      defaultValue: false,
      label: {
        fr: 'La personne a donné son consentement écrit à cette publication',
        en: 'The person has given written consent to this publication',
      },
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
