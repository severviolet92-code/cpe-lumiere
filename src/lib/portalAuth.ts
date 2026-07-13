import { headers } from 'next/headers'

import type { Parent } from '../payload-types'
import { getPayload } from './payload'

/** Returns the authenticated parent for this request, or null. Admin users are NOT parents. */
export async function getParentUser(): Promise<(Parent & { collection: 'parents' }) | null> {
  const payload = await getPayload()
  const { user } = await payload.auth({ headers: await headers() })
  if (user && user.collection === 'parents' && user.active) {
    return user as Parent & { collection: 'parents' }
  }
  return null
}
