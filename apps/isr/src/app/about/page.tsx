'use cache'

import type { Metadata } from 'next'
import { cacheLife } from 'next/cache'
import { PlaceholderPage } from '../../components/placeholder-page'

export const metadata: Metadata = { title: 'About' }

export default async function About() {
  cacheLife('max')
  return <PlaceholderPage title="About" currentHref="/about" />
}
