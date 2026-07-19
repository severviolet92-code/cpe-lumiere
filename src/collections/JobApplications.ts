import type { CollectionConfig } from 'payload'

import { adminOnly, isAdminUser } from '../access'
import { demoSeedField } from '../fields/demoSeed'

/**
 * Job applications received from the public Careers page (with or without a
 * posted opening — "spontaneous" applications have no jobOpening relation).
 *
 * The uploaded file IS the CV. Security posture:
 *  - No public API access at all (create/read/update/delete are admin-gated).
 *    The public form goes through a server action that validates, rate-limits
 *    and then writes with overrideAccess — same pattern as the contact form.
 *  - CV files are served through Payload's upload endpoint, which enforces
 *    the same admin-only read access.
 *  - Contains personal information (Law 25): keep retention short; delete
 *    applications once the hiring round is closed.
 */
export const JobApplications: CollectionConfig = {
  slug: 'job-applications',
  labels: {
    singular: { fr: 'Candidature', en: 'Job application' },
    plural: { fr: 'Candidatures (Carrières)', en: 'Job applications (Careers)' },
  },
  admin: {
    useAsTitle: 'name',
    group: { fr: 'Administration', en: 'Administration' },
    defaultColumns: ['name', 'email', 'jobOpening', 'createdAt'],
    description: {
      fr: 'Candidatures reçues via la page Carrières. Renseignements personnels : à supprimer une fois l’embauche terminée.',
      en: 'Applications received via the Careers page. Personal information: delete once the hiring round is over.',
    },
  },
  access: {
    read: adminOnly,
    create: isAdminUser, // the public form writes via a server action with overrideAccess
    update: isAdminUser,
    delete: isAdminUser,
  },
  defaultSort: '-createdAt',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: { fr: 'Nom du candidat ou de la candidate', en: 'Applicant name' },
    },
    {
      type: 'row',
      fields: [
        { name: 'email', type: 'email', required: true, label: { fr: 'Courriel', en: 'Email' } },
        { name: 'phone', type: 'text', label: { fr: 'Téléphone', en: 'Phone' } },
      ],
    },
    {
      name: 'jobOpening',
      type: 'relationship',
      relationTo: 'job-openings',
      label: { fr: 'Poste visé (vide = candidature spontanée)', en: 'Position (empty = spontaneous application)' },
    },
    {
      name: 'message',
      type: 'textarea',
      label: { fr: 'Message d’accompagnement', en: 'Cover message' },
    },
    demoSeedField,
  ],
  upload: {
    staticDir: 'job-applications',
    mimeTypes: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
  },
}
