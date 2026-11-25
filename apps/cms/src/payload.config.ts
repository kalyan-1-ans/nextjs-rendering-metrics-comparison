import { postgresAdapter } from '@payloadcms/db-postgres'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildConfig } from 'payload'
import { PHASE_PRODUCTION_BUILD } from 'next/constants.js'

import { Users } from './collections/Users'
import { Recipes } from './collections/Recipes'
import { AboutPage } from './globals/AboutPage'
import { ContactPage } from './globals/ContactPage'
import { HomePage } from './globals/HomePage'
import { RecipePage } from './globals/RecipePage'
import { SiteSettings } from './globals/SiteSettings'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const databaseURL = process.env.DATABASE_URL
const secret = process.env.PAYLOAD_SECRET

if (!databaseURL) {
  throw new Error('DATABASE_URL is required. Configure apps/cms/.env before starting Payload.')
}

if (!secret) {
  throw new Error('PAYLOAD_SECRET is required. Configure apps/cms/.env with a random secret.')
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: dirname,
    },
  },
  collections: [Users, Recipes],
  globals: [SiteSettings, HomePage, RecipePage, AboutPage, ContactPage],
  onInit: async (payload) => {
    if (
      process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD ||
      process.env.PAYLOAD_MIGRATING === 'true' ||
      process.argv.some((arg) => arg.startsWith('generate:') || arg === 'migrate' || arg.startsWith('migrate:'))
    ) {
      return
    }

    const { seedContent } = await import('./seed/index')
    await seedContent(payload)
  },
  db: postgresAdapter({
    pool: {
      connectionString: databaseURL,
    },
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  graphQL: {
    disable: true,
  },
  secret,
  serverURL: process.env.CMS_URL || 'http://localhost:3000',
  telemetry: false,
  typescript: {
    declare: false,
    outputFile: path.resolve(dirname, '../../../packages/cms-types/src/generated.ts'),
  },
})
