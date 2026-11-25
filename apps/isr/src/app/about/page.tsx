'use cache'

import 'server-only'
import type { Metadata } from 'next'
import Link from 'next/link'
import { cacheLife } from 'next/cache'
import { getAboutContent } from '@small-bites/cms-data'
import { TextLink } from '@small-bites/ui/actions/text-link'
import { SiteLogo } from '@small-bites/ui/brand/site-logo'
import { PageIntroduction } from '@small-bites/ui/content/page-introduction'
import { TextSection } from '@small-bites/ui/content/text-section'
import { PageTimestamps } from '@small-bites/ui/data-display/page-timestamps'
import { PageContent } from '@small-bites/ui/layout/page-content'
import { PageShell } from '@small-bites/ui/layout/page-shell'
import { SiteHeader } from '@small-bites/ui/layout/site-header'
import { SiteFooter } from '@small-bites/ui/layout/site-footer'

export async function generateMetadata(): Promise<Metadata> {
  cacheLife('max')
  const { settings, about } = await getAboutContent()
  return {
    title: `About | ${settings.branding.siteName}`,
    description: about.introduction.description.replace(/\s+/g, ' ').trim(),
  }
}

export default async function About() {
  cacheLife('max')
  const { settings, about } = await getAboutContent()
  const renderedAt = new Date().toISOString()

  return (
    <PageShell
      header={
        <SiteHeader
          linkComponent={Link}
          links={settings.navigation.links}
          navigationLabel={settings.navigation.label}
          currentHref="/about"
          brand={<SiteLogo>{settings.branding.siteName}</SiteLogo>}
        />
      }
      footer={
        <SiteFooter tagline={settings.footer.tagline} copyright={settings.footer.description} />
      }
    >
      <PageContent
        timestamps={
          <PageTimestamps
            createdAt={about.createdAt ?? undefined}
            updatedAt={about.updatedAt ?? undefined}
            renderedAt={renderedAt}
            labels={{
              created: settings.timestamps.createdLabel,
              updated: settings.timestamps.updatedLabel,
              rendered: settings.timestamps.renderedLabel,
            }}
          />
        }
      >
        <PageIntroduction {...about.introduction} />
        {about.sections.map((section) => (
          <TextSection key={section.id} heading={section.heading} body={section.body} />
        ))}
        <TextLink href="/" linkComponent={Link}>
          {about.backLinkLabel}
        </TextLink>
      </PageContent>
    </PageShell>
  )
}
