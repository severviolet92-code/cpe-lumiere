import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { en } from '@payloadcms/translations/languages/en'
import { fr } from '@payloadcms/translations/languages/fr'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Groups } from './collections/Groups'
import { Activities } from './collections/Activities'
import { Announcements } from './collections/Announcements'
import { ClosureDates } from './collections/ClosureDates'
import { FAQEntries } from './collections/FAQEntries'
import { Documents } from './collections/Documents'
import { StaffProfiles } from './collections/StaffProfiles'
import { JobOpenings } from './collections/JobOpenings'
import { GalleryPhotos } from './collections/GalleryPhotos'
import { Parents } from './collections/Parents'
import { NotificationLog } from './collections/NotificationLog'
import { KBCategories } from './collections/KBCategories'
import { KBArticles } from './collections/KBArticles'
import { EmailCampaigns } from './collections/EmailCampaigns'
import { globals } from './globals'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' — Lumière',
    },
    dateFormat: 'd MMMM yyyy',
  },
  // Admin UI language: French first, English available.
  i18n: {
    supportedLanguages: { fr, en },
    fallbackLanguage: 'fr',
  },
  collections: [
    Users,
    Media,
    Groups,
    Activities,
    Announcements,
    ClosureDates,
    FAQEntries,
    Documents,
    StaffProfiles,
    JobOpenings,
    GalleryPhotos,
    Parents,
    NotificationLog,
    KBCategories,
    KBArticles,
    EmailCampaigns,
  ],
  globals,
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  // Dev: local SQLite file. Production: swap to @payloadcms/db-postgres —
  //   db: postgresAdapter({ pool: { connectionString: process.env.DATABASE_URI } })
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || 'file:./cpe-lumiere.db',
    },
  }),
  sharp,
  // Content localization: French is the canonical language; English mirrors it.
  localization: {
    locales: [
      { label: 'Français', code: 'fr' },
      { label: 'English', code: 'en' },
    ],
    defaultLocale: 'fr',
    fallback: true,
  },
  upload: {
    limits: {
      fileSize: 10_000_000, // 10 MB
    },
  },
})
