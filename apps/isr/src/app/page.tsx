'use cache'

import 'server-only'
import type { Metadata } from 'next'
import { cacheLife } from 'next/cache'
import { getHomeContent } from '@small-bites/cms-data'
import { SiteLogo } from '@small-bites/ui/brand/site-logo'
import { HeroBanner } from '@small-bites/ui/content/hero-banner'
import { PageShell } from '@small-bites/ui/layout/page-shell'
import { SiteHeader } from '@small-bites/ui/layout/site-header'
import { SiteFooter } from '@small-bites/ui/layout/site-footer'

export async function generateMetadata(): Promise<Metadata> {
  cacheLife('max')
  const { settings, home } = await getHomeContent()
  return {
    title: `${home.hero.heading} | ${settings.branding.siteName}`,
    description: home.hero.description.replace(/\s+/g, ' ').trim(),
  }
}

export default async function Home() {
  cacheLife('max')
  const { settings, home } = await getHomeContent()
  return (
    <PageShell
      header={
        <SiteHeader
          links={settings.navigation.links}
          navigationLabel={settings.navigation.label}
          currentHref="/"
          brand={<SiteLogo>{settings.branding.siteName}</SiteLogo>}
        />
      }
      footer={
        <SiteFooter tagline={settings.footer.tagline} copyright={settings.footer.description} />
      }
    >
      <HeroBanner {...home.hero} />
    </PageShell>
  )
}
