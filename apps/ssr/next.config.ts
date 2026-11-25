import type { NextConfig } from 'next'
import { fileURLToPath } from 'node:url'

const nextConfig: NextConfig = {
  transpilePackages: ['@small-bites/ui', '@small-bites/cms-data'],
  turbopack: {
    root: fileURLToPath(new URL('../..', import.meta.url)),
  },
}

export default nextConfig
