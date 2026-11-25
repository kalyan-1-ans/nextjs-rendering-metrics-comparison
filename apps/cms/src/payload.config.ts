import { postgresAdapter } from '@payloadcms/db-postgres'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildConfig } from 'payload'

import { Users } from './collections/Users'

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
  collections: [Users],
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
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
