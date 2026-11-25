'use cache'

import 'server-only'
import type { Metadata } from 'next'
import Link from 'next/link'
import { cacheLife } from 'next/cache'
import { getContactContent } from '@small-bites/cms-data'
import { TextLink } from '@small-bites/ui/actions/text-link'
import { SiteLogo } from '@small-bites/ui/brand/site-logo'
import { PageIntroduction } from '@small-bites/ui/content/page-introduction'
import { PageTimestamps } from '@small-bites/ui/data-display/page-timestamps'
import { PageContent } from '@small-bites/ui/layout/page-content'
import { PageShell } from '@small-bites/ui/layout/page-shell'
import { SiteHeader } from '@small-bites/ui/layout/site-header'
import { SiteFooter } from '@small-bites/ui/layout/site-footer'

export async function generateMetadata(): Promise<Metadata> {
  cacheLife('max')
  const { settings, contact } = await getContactContent()
  return {
    title: `${contact.confirmation.introduction.heading} | ${settings.branding.siteName}`,
    description: contact.confirmation.introduction.description.replace(/\s+/g, ' ').trim(),
    robots: { index: false, follow: false },
  }
}

export default async function ContactConfirmation() {
  cacheLife('max')
  const { settings, contact } = await getContactContent()
  const renderedAt = new Date().toISOString()

  return (
    <PageShell
      header={
        <SiteHeader
          linkComponent={Link}
          links={settings.navigation.links}
          navigationLabel={settings.navigation.label}
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
            createdAt={contact.createdAt ?? undefined}
            updatedAt={contact.updatedAt ?? undefined}
            renderedAt={renderedAt}
            labels={{
              created: settings.timestamps.createdLabel,
              updated: settings.timestamps.updatedLabel,
              rendered: settings.timestamps.renderedLabel,
            }}
          />
        }
      >
        <PageIntroduction {...contact.confirmation.introduction} />
        <TextLink href="/" linkComponent={Link}>
          {contact.confirmation.backLinkLabel}
        </TextLink>
      </PageContent>
    </PageShell>
  )
}
