import { sql } from '@payloadcms/db-postgres'
import type { PostgresAdapter } from '@payloadcms/db-postgres'
import { commitTransaction, createLocalReq, killTransaction } from 'payload'
import type { Payload, PayloadRequest } from 'payload'

import { globals, globalSlugs, recipes } from './content'

const seedKey = 'small-bites:initial-content:v1'

export type SeedResult = 'seeded' | 'reset' | 'already-seeded' | 'existing-content'

async function hasEditorialContent(payload: Payload, req: PayloadRequest): Promise<boolean> {
  const existingRecipes = await payload.find({
    collection: 'recipes',
    draft: true,
    limit: 1,
    depth: 0,
    overrideAccess: true,
    req,
  })
  if (existingRecipes.docs.length) {
    return true
  }

  const recipeVersions = await payload.findVersions({
    collection: 'recipes',
    limit: 1,
    depth: 0,
    overrideAccess: true,
    req,
  })
  if (recipeVersions.docs.length) {
    return true
  }

  for (const slug of globalSlugs) {
    // Find the actual row: the Local API fills defaults even for an unsaved Global.
    const existingGlobal = await payload.db.findGlobal({ slug, select: { id: true }, req })
    if (existingGlobal && 'id' in existingGlobal) {
      return true
    }

    const versions = await payload.findGlobalVersions({
      slug,
      limit: 1,
      depth: 0,
      overrideAccess: true,
      req,
    })
    if (versions.docs.length) {
      return true
    }
  }

  return false
}

async function initializeContent(payload: Payload, reset: boolean): Promise<SeedResult> {
  if (payload.db.name !== 'postgres') {
    throw new Error('Small Bites seeding requires the PostgreSQL adapter.')
  }
  const req = await createLocalReq({}, payload)
  // Read committed ensures a waiting initializer sees the first seed's commit.
  const transactionID = await payload.db.beginTransaction({ isolationLevel: 'read committed' })
  if (transactionID === null) {
    throw new Error('Small Bites seeding requires PostgreSQL transactions.')
  }
  req.transactionID = transactionID

  try {
    const transaction = payload.db.sessions?.[transactionID]?.db as
      | PostgresAdapter['sessions'][string]['db']
      | undefined
    if (!transaction) {
      throw new Error('Could not obtain the seed transaction.')
    }

    await transaction.execute(sql`SELECT pg_advisory_xact_lock(hashtext(${seedKey}))`)

    if (reset) {
      // Globals have no public delete operation. Scope SQL to these content models;
      // child ingredient/step/navigation rows cascade, while users and other KV data stay.
      await transaction.execute(sql`
        DELETE FROM "payload_locked_documents"
        WHERE "global_slug" IN ('site-settings', 'home-page', 'recipe-page', 'about-page', 'contact-page')
          OR "id" IN (
            SELECT "parent_id" FROM "payload_locked_documents_rels" WHERE "recipes_id" IS NOT NULL
          );
        DELETE FROM "_recipes_v";
        DELETE FROM "recipes";
        DELETE FROM "_site_settings_v";
        DELETE FROM "site_settings";
        DELETE FROM "_home_page_v";
        DELETE FROM "home_page";
        DELETE FROM "_recipe_page_v";
        DELETE FROM "recipe_page";
        DELETE FROM "_about_page_v";
        DELETE FROM "about_page";
        DELETE FROM "_contact_page_v";
        DELETE FROM "contact_page";
      `)
      await payload.delete({
        collection: 'payload-kv',
        where: { key: { equals: seedKey } },
        overrideAccess: true,
        req,
      })
    } else {
      // Use the Local API with req, rather than payload.kv, to keep the marker atomic.
      const marker = await payload.find({
        collection: 'payload-kv',
        where: { key: { equals: seedKey } },
        limit: 1,
        depth: 0,
        overrideAccess: true,
        req,
      })

      if (marker.docs.length) {
        await commitTransaction(req)
        payload.logger.info('Small Bites seed skipped: already completed.')
        return 'already-seeded'
      }

      if (await hasEditorialContent(payload, req)) {
        await commitTransaction(req)
        payload.logger.info('Small Bites seed skipped: editorial content or drafts already exist.')
        return 'existing-content'
      }
    }

    // This is trusted initialization. Every write deliberately bypasses user access
    // and shares req so content, versions and the marker commit or roll back together.
    for (const data of recipes) {
      await payload.create({ collection: 'recipes', data, overrideAccess: true, req })
    }
    for (const slug of globalSlugs) {
      await payload.updateGlobal({ slug, data: globals[slug], overrideAccess: true, req })
    }
    await payload.create({
      collection: 'payload-kv',
      data: { key: seedKey, data: { completedAt: new Date().toISOString(), version: 1 } },
      overrideAccess: true,
      req,
    })

    await commitTransaction(req)
    payload.logger.info(
      `Small Bites ${reset ? 'content reset' : 'seed'} completed: ${recipes.length} published recipes and ${globalSlugs.length} published Globals.`,
    )
    return reset ? 'reset' : 'seeded'
  } catch (error) {
    await killTransaction(req)
    throw new Error(
      `Small Bites ${reset ? 'content reset' : 'seed'} failed; the content transaction was rolled back. Ensure CMS migrations have been applied.`,
      { cause: error },
    )
  }
}

export async function seedContent(payload: Payload): Promise<SeedResult> {
  return initializeContent(payload, false)
}

// Only the explicit reset CLI calls this. Automatic startup always uses seedContent.
export async function resetContent(payload: Payload): Promise<SeedResult> {
  return initializeContent(payload, true)
}
