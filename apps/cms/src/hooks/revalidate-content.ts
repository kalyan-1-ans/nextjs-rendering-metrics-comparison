import type { CollectionAfterChangeHook, GlobalAfterChangeHook } from 'payload'
import { after } from 'next/server'

export const revalidateContent =
  (path: string): GlobalAfterChangeHook =>
  ({ doc, req, context }) => {
    if (doc._status !== 'published' || context.disableRevalidate) {
      return doc
    }

    const targets = [
      ...new Set(
        (process.env.ISR_REVALIDATION_URLS ?? '')
          .split(',')
          .map((url) => url.trim())
          .filter(Boolean),
      ),
    ]
    if (!targets.length) {
      return doc
    }

    const notify = () =>
      Promise.all(
        targets.map(async (url) => {
          try {
            const response = await fetch(url, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ path }),
              cache: 'no-store',
              signal: AbortSignal.timeout(15000),
            })
            if (!response.ok) {
              throw new Error(`Revalidation endpoint returned ${response.status}.`)
            }
            req.payload.logger.info(`Requested revalidation for ${path}: ${url}`)
          } catch (err) {
            // Publishing succeeds even when a consumer is offline. The same endpoint
            // can be called manually to retry delivery once it is available.
            req.payload.logger.error({ err, msg: `Revalidation for ${path} failed: ${url}` })
          }
        }),
      )
    try {
      // Payload's afterChange runs before the database commit. Deliver only after
      // the HTTP response, so a visitor cannot regenerate from uncommitted data.
      after(notify)
    } catch {
      // CLI/standalone Local API operations have no Next.js request lifecycle.
      // Never send before an external transaction commits; use the manual POST.
      req.payload.logger.warn(
        `Revalidation for ${path} must be triggered manually after this non-HTTP content update.`,
      )
    }
    return doc
  }

export const revalidateCollectionContent =
  (path: string): CollectionAfterChangeHook =>
  ({ doc, req, context }) => {
    if (doc._status !== 'published' || context.disableRevalidate) {
      return doc
    }

    const targets = [
      ...new Set(
        (process.env.ISR_REVALIDATION_URLS ?? '')
          .split(',')
          .map((url) => url.trim())
          .filter(Boolean),
      ),
    ]
    if (!targets.length) return doc
    const paths = [path, `/recipes/${doc.slug}`]

    const notify = () =>
      Promise.all(
        targets.flatMap((url) =>
          paths.map(async (revalidatedPath) => {
            try {
              const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ path: revalidatedPath }),
                cache: 'no-store',
                signal: AbortSignal.timeout(15000),
              })
              if (!response.ok)
                throw new Error(`Revalidation endpoint returned ${response.status}.`)
              req.payload.logger.info(`Requested revalidation for ${revalidatedPath}: ${url}`)
            } catch (err) {
              req.payload.logger.error({
                err,
                msg: `Revalidation for ${revalidatedPath} failed: ${url}`,
              })
            }
          }),
        ),
      )

    try {
      after(notify)
    } catch {
      req.payload.logger.warn(
        `Revalidation for ${paths.join(' and ')} must be triggered manually after this non-HTTP content update.`,
      )
    }
    return doc
  }
