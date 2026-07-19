import type { GlobalConfig } from 'payload'

import { isAdminUser } from '../access'

/**
 * Page-content globals: every public page has a fixed, designed template;
 * the director edits the words, never the design. One global per page template.
 */

const contentGroup = { fr: 'Pages du site', en: 'Site pages' }

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: { fr: 'Coordonnées et informations', en: 'Contact info & settings' },
  admin: {
    group: { fr: 'Administration', en: 'Administration' },
    description: {
      fr: 'Les coordonnées officielles du CPE, affichées partout sur le site.',
      en: 'The CPE’s official contact information, shown across the site.',
    },
  },
  access: { read: () => true, update: isAdminUser },
  fields: [
    { name: 'cpeName', type: 'text', required: true, label: { fr: 'Nom du CPE', en: 'CPE name' } },
    {
      name: 'tagline',
      type: 'text',
      localized: true,
      label: { fr: 'Devise (courte phrase)', en: 'Tagline (short phrase)' },
    },
    {
      type: 'row',
      fields: [
        { name: 'phone', type: 'text', label: { fr: 'Téléphone', en: 'Phone' } },
        { name: 'email', type: 'email', label: { fr: 'Courriel', en: 'Email' } },
      ],
    },
    {
      name: 'address',
      type: 'textarea',
      label: { fr: 'Adresse', en: 'Address' },
    },
    {
      name: 'hours',
      type: 'text',
      localized: true,
      label: { fr: 'Heures d’ouverture', en: 'Opening hours' },
      admin: { placeholder: { fr: 'ex. : Lundi au vendredi, 7 h à 18 h', en: 'e.g. Monday to Friday, 7 a.m. to 6 p.m.' } },
    },
    {
      name: 'permitNote',
      type: 'text',
      localized: true,
      label: { fr: 'Mention de permis (optionnelle)', en: 'Permit note (optional)' },
      admin: {
        description: {
          fr: 'ex. : « CPE titulaire d’un permis du ministère de la Famille » — un gage de confiance.',
          en: 'e.g. “CPE licensed by the ministère de la Famille” — a trust signal.',
        },
      },
    },
  ],
}

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: { fr: 'Page : Accueil', en: 'Page: Home' },
  admin: { group: contentGroup },
  access: { read: () => true, update: isAdminUser },
  fields: [
    {
      name: 'heroTitle',
      type: 'text',
      required: true,
      localized: true,
      label: { fr: 'Grand titre d’accueil', en: 'Hero headline' },
      admin: { description: { fr: 'Une phrase courte et chaleureuse.', en: 'One short, warm sentence.' } },
    },
    {
      name: 'heroSubtitle',
      type: 'textarea',
      localized: true,
      label: { fr: 'Sous-titre d’accueil', en: 'Hero subtitle' },
    },
    {
      name: 'introTitle',
      type: 'text',
      localized: true,
      label: { fr: 'Titre de la section de présentation', en: 'Intro section title' },
    },
    {
      name: 'introText',
      type: 'textarea',
      localized: true,
      label: { fr: 'Texte de présentation', en: 'Intro text' },
    },
    {
      name: 'highlights',
      type: 'array',
      localized: true,
      maxRows: 4,
      label: { fr: 'Points forts (3 recommandés)', en: 'Highlights (3 recommended)' },
      labels: { singular: { fr: 'Point fort', en: 'Highlight' }, plural: { fr: 'Points forts', en: 'Highlights' } },
      fields: [
        { name: 'title', type: 'text', required: true, label: { fr: 'Titre', en: 'Title' } },
        { name: 'text', type: 'textarea', required: true, label: { fr: 'Texte', en: 'Text' } },
      ],
    },
  ],
}

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: { fr: 'Page : Notre CPE', en: 'Page: Our CPE' },
  admin: { group: contentGroup },
  access: { read: () => true, update: isAdminUser },
  fields: [
    { name: 'intro', type: 'textarea', localized: true, label: { fr: 'Introduction', en: 'Introduction' } },
    {
      name: 'mission',
      type: 'textarea',
      localized: true,
      label: { fr: 'Notre mission', en: 'Our mission' },
      admin: {
        description: {
          fr: 'Une ou deux phrases fortes — la raison d’être du CPE.',
          en: 'One or two strong sentences — the CPE’s reason for being.',
        },
      },
    },
    {
      name: 'history',
      type: 'richText',
      localized: true,
      label: { fr: 'Notre histoire', en: 'Our history' },
    },
    {
      name: 'pedagogy',
      type: 'richText',
      localized: true,
      label: { fr: 'Notre approche pédagogique', en: 'Our pedagogical approach' },
    },
    {
      name: 'values',
      type: 'array',
      localized: true,
      maxRows: 6,
      label: { fr: 'Nos valeurs', en: 'Our values' },
      labels: { singular: { fr: 'Valeur', en: 'Value' }, plural: { fr: 'Valeurs', en: 'Values' } },
      fields: [
        { name: 'title', type: 'text', required: true, label: { fr: 'Titre', en: 'Title' } },
        { name: 'text', type: 'textarea', required: true, label: { fr: 'Texte', en: 'Text' } },
      ],
    },
    {
      name: 'facilities',
      type: 'richText',
      localized: true,
      label: { fr: 'Nos installations', en: 'Our facilities' },
    },
  ],
}

export const LifePage: GlobalConfig = {
  slug: 'life-page',
  label: { fr: 'Page : La vie au CPE', en: 'Page: Life at the CPE' },
  admin: { group: contentGroup },
  access: { read: () => true, update: isAdminUser },
  fields: [
    { name: 'intro', type: 'textarea', localized: true, label: { fr: 'Introduction', en: 'Introduction' } },
    {
      name: 'dailySchedule',
      type: 'array',
      localized: true,
      label: { fr: 'Une journée type', en: 'A typical day' },
      labels: { singular: { fr: 'Moment', en: 'Moment' }, plural: { fr: 'Moments', en: 'Moments' } },
      fields: [
        { name: 'time', type: 'text', required: true, label: { fr: 'Heure', en: 'Time' }, admin: { width: '30%' } },
        { name: 'moment', type: 'text', required: true, label: { fr: 'Moment de la journée', en: 'Moment of the day' } },
      ],
      admin: {
        description: {
          fr: 'Horaire générique et rassurant — aucun détail propre à un groupe précis.',
          en: 'Generic, reassuring schedule — no details specific to one group.',
        },
      },
    },
    {
      name: 'groupsIntro',
      type: 'textarea',
      localized: true,
      label: { fr: 'Introduction de la section « Nos groupes »', en: '“Our groups” section intro' },
    },
    {
      name: 'development',
      type: 'richText',
      localized: true,
      label: { fr: 'Le développement de l’enfant (objectifs d’apprentissage)', en: 'Child development (learning objectives)' },
    },
    { name: 'meals', type: 'richText', localized: true, label: { fr: 'Alimentation', en: 'Meals' } },
    {
      name: 'naps',
      type: 'richText',
      localized: true,
      label: { fr: 'Sieste et repos', en: 'Naps & rest' },
    },
    {
      name: 'outdoor',
      type: 'richText',
      localized: true,
      label: { fr: 'Jeux extérieurs', en: 'Outdoor play' },
    },
    {
      name: 'activities',
      type: 'richText',
      localized: true,
      label: { fr: 'Nos activités (description générale)', en: 'Our activities (general description)' },
    },
    {
      name: 'safety',
      type: 'richText',
      localized: true,
      label: { fr: 'Santé et sécurité', en: 'Health & safety' },
    },
  ],
}

export const NutritionPage: GlobalConfig = {
  slug: 'nutrition-page',
  label: { fr: 'Page : Cuisine et nutrition', en: 'Page: Kitchen & nutrition' },
  admin: { group: contentGroup },
  access: { read: () => true, update: isAdminUser },
  fields: [
    { name: 'intro', type: 'textarea', localized: true, label: { fr: 'Introduction', en: 'Introduction' } },
    {
      name: 'philosophy',
      type: 'richText',
      localized: true,
      label: { fr: 'Notre philosophie alimentaire', en: 'Our food philosophy' },
    },
    {
      name: 'weeklyMenu',
      type: 'array',
      localized: true,
      maxRows: 5,
      label: { fr: 'Menu de la semaine (exemple type)', en: 'Weekly menu (typical example)' },
      labels: { singular: { fr: 'Journée', en: 'Day' }, plural: { fr: 'Journées', en: 'Days' } },
      fields: [
        { name: 'day', type: 'text', required: true, label: { fr: 'Jour', en: 'Day' }, admin: { width: '20%' } },
        { name: 'snackAm', type: 'text', label: { fr: 'Collation du matin', en: 'Morning snack' } },
        { name: 'lunch', type: 'text', required: true, label: { fr: 'Dîner', en: 'Lunch' } },
        { name: 'snackPm', type: 'text', label: { fr: 'Collation de l’après-midi', en: 'Afternoon snack' } },
      ],
      admin: {
        description: {
          fr: 'Un exemple de semaine — le menu détaillé à jour est joint en PDF ci-dessous.',
          en: 'A sample week — the up-to-date detailed menu is attached as a PDF below.',
        },
      },
    },
    {
      name: 'allergies',
      type: 'richText',
      localized: true,
      label: { fr: 'Allergies et intolérances', en: 'Allergies & intolerances' },
    },
    {
      name: 'menuDocument',
      type: 'relationship',
      relationTo: 'documents',
      label: { fr: 'Menu téléchargeable (PDF)', en: 'Downloadable menu (PDF)' },
      admin: {
        description: {
          fr: 'Le document doit être public pour être téléchargeable depuis le site.',
          en: 'The document must be public to be downloadable from the website.',
        },
      },
    },
    {
      name: 'photos',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
      maxRows: 6,
      label: { fr: 'Photos de repas (illustrations)', en: 'Meal photos (illustrations)' },
    },
  ],
}

export const AdmissionPage: GlobalConfig = {
  slug: 'admission-page',
  label: { fr: 'Page : Admission', en: 'Page: Admission' },
  admin: { group: contentGroup },
  access: { read: () => true, update: isAdminUser },
  fields: [
    { name: 'intro', type: 'richText', localized: true, label: { fr: 'Introduction', en: 'Introduction' } },
    {
      name: 'steps',
      type: 'array',
      localized: true,
      label: { fr: 'Les étapes d’admission', en: 'Admission steps' },
      labels: { singular: { fr: 'Étape', en: 'Step' }, plural: { fr: 'Étapes', en: 'Steps' } },
      fields: [
        { name: 'title', type: 'text', required: true, label: { fr: 'Titre', en: 'Title' } },
        { name: 'text', type: 'textarea', required: true, label: { fr: 'Texte', en: 'Text' } },
      ],
    },
    {
      name: 'laPlaceUrl',
      type: 'text',
      defaultValue: 'https://www.laplace0-5.com',
      label: { fr: 'Lien vers La Place 0-5', en: 'La Place 0-5 link' },
    },
    {
      name: 'note',
      type: 'textarea',
      localized: true,
      label: { fr: 'Note complémentaire (optionnelle)', en: 'Additional note (optional)' },
    },
  ],
}

export const CareersPage: GlobalConfig = {
  slug: 'careers-page',
  label: { fr: 'Page : Carrières', en: 'Page: Careers' },
  admin: { group: contentGroup },
  access: { read: () => true, update: isAdminUser },
  fields: [
    { name: 'intro', type: 'richText', localized: true, label: { fr: 'Pourquoi travailler chez nous', en: 'Why work with us' } },
    {
      name: 'perks',
      type: 'array',
      localized: true,
      maxRows: 6,
      label: { fr: 'Ce que nous offrons', en: 'What we offer' },
      labels: { singular: { fr: 'Avantage', en: 'Perk' }, plural: { fr: 'Avantages', en: 'Perks' } },
      fields: [
        { name: 'text', type: 'text', required: true, label: { fr: 'Texte', en: 'Text' } },
      ],
    },
  ],
}

export const globals = [SiteSettings, HomePage, AboutPage, LifePage, NutritionPage, AdmissionPage, CareersPage]
