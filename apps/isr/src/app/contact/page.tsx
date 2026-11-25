'use cache'

import type { Metadata } from 'next'
import { cacheLife } from 'next/cache'
import { PlaceholderPage } from '../../components/placeholder-page'

export const metadata: Metadata = { title: 'Contact us' }

export default async function Contact() {
  cacheLife('max')
  return <PlaceholderPage title="Contact us" currentHref="/contact" />
}
