import type { CheckboxField } from 'payload'

/**
 * Marks documents created by the demo seed script.
 * Hidden from editors. `npm run seed:clear` deletes every document where this is true,
 * so demo content is cleanly separable from the CPE's real production data.
 */
export const demoSeedField: CheckboxField = {
  name: 'demoSeed',
  type: 'checkbox',
  defaultValue: false,
  admin: { hidden: true },
}
