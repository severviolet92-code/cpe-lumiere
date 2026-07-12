import type { CollectionConfig } from 'payload'

import { isAdminUser } from '../access'
import { demoSeedField } from '../fields/demoSeed'

/**
 * CPE closure dates (holidays, pedagogical days).
 * Public: knowing the CPE is closed on a date reveals nothing about any child or group.
 */
export const ClosureDates: CollectionConfig = {
  slug: 'closure-dates',
  labels: {
    singular: { fr: 'Fermeture', en: 'Closure' },
    plural: { fr: 'Fermetures', en: 'Closures' },
  },
  admin: {
    useAsTitle: 'label',
    group: { fr: 'Vie du CPE', en: 'CPE life' },
    description: {
      fr: 'Jours de fermeture du CPE (fériés, journées pédagogiques).',
      en: 'CPE closure days (holidays, pedagogical days).',
    },
  },
  access: {
    read: () => true,
    create: isAdminUser,
    update: isAdminUser,
    delete: isAdminUser,
  },
  defaultSort: 'startDate',
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      localized: true,
      label: { fr: 'Motif', en: 'Reason' },
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
      label: { fr: 'Premier jour', en: 'First day' },
      admin: { date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMMM yyyy' } },
    },
    {
      name: 'endDate',
      type: 'date',
      label: { fr: 'Dernier jour (si plusieurs jours)', en: 'Last day (if multi-day)' },
      admin: { date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMMM yyyy' } },
    },
    demoSeedField,
  ],
}
