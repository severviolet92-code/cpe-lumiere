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
import { QuestionLog } from './collections/QuestionLog'
import { globals } from './globals'
import { startCampaignScheduler } from './lib/campaignScheduler'
import { checkEnvironment } from './lib/envCheck'
import { healthEndpoint, systemHealthEndpoint } from './endpoints/health'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  onInit: async (payload) => {
    checkEnvironment(payload)
    startCampaignScheduler(payload)
  },
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' — Lumière',
    },
    dateFormat: 'd MMMM yyyy',
    components: {
      // Link to the system-health dashboard from the admin home.
      beforeDashboard: ['/components/admin/SystemHealthLink#SystemHealthLink'],
    },
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
    QuestionLog,
  ],
  globals,
  endpoints: [healthEndpoint, systemHealthEndpoint],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  // Dev: local SQLite file. Production: swap to @payloadcms/db-postgres —
  //   import { postgresAdapter } from '@payloadcms/db-postgres'
  //   db: postgresAdapter({ pool: { connectionString: process.env.DATABASE_URI } })
  // Verified end-to-end against a local Postgres 16 instance: schema push,
  // full seed, auth (admin/parent/magic-link), KB search, access control,
  // campaign send, and a clean production build all work unchanged — see
  // PROJECT_MEMORY.md §3/§8. @payloadcms/db-postgres is already an installed
  // dependency, so this really is a one-line swap at deploy time.
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
