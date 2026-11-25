import { PayloadSDK } from '@payloadcms/sdk'
import type { Config } from '@small-bites/cms-types/generated'

export type CMSClient = PayloadSDK<Config>

export function createCMSClient() {
  const origin = process.env.CMS_URL
  if (!origin) {
    throw new Error('CMS_URL is required. Configure it in the consuming app.')
  }

  return new PayloadSDK<Config>({
    baseURL: new URL('/api', origin).toString(),
    baseInit: { cache: 'no-store' },
    fetch: (url, init) => fetch(url, { ...init, signal: AbortSignal.timeout(15000) }),
  })
}
