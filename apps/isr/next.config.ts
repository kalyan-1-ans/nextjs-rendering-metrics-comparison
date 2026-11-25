import type { NextConfig } from 'next'
import { fileURLToPath } from 'node:url'

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    agentUpgrade: 'security',
    instantInsights: {
      validationLevel: 'manual-warning',
    },
  },
  transpilePackages: ['@small-bites/ui', '@small-bites/cms-data'],
  turbopack: {
    root: fileURLToPath(new URL('../..', import.meta.url)),
  },
}

export default nextConfig
