import config from '@payload-config'
import { getPayload as getPayloadInstance, type Payload } from 'payload'

/** Shared Payload Local API instance for server components. */
export async function getPayload(): Promise<Payload> {
  return getPayloadInstance({ config })
}
