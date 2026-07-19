/**
 * Removes every document flagged `demoSeed: true`.
 * Run before handoff so the CPE starts with a clean database.
 * Note: globals (page texts, contact info) are not deleted — the director
 * overwrites them with real content in the admin. Demo admin accounts must be
 * deleted manually from the admin UI after creating the real director account.
 */
import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config'

const COLLECTIONS = [
  'email-campaigns',
  'kb-articles',
  'kb-categories',
  'parents',
  'gallery-photos',
  'activities',
  'announcements',
  'closure-dates',
  'faq-entries',
  'staff-profiles',
  'job-applications',
  'job-openings',
  'documents',
  'media',
  'groups',
] as const

async function run() {
  const payload = await getPayload({ config })
  for (const collection of COLLECTIONS) {
    const result = await payload.delete({
      collection,
      where: { demoSeed: { equals: true } },
    })
    console.log(`${collection}: ${result.docs.length} demo document(s) removed`)
  }
  console.log('\n✔ Demo content cleared. Remember to delete demo admin accounts in the admin UI.')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
