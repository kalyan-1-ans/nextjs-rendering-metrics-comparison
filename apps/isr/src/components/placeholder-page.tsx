import 'server-only'
import Link from 'next/link'
import { createCMSClient } from '@small-bites/cms-data'
import { SiteLogo } from '@small-bites/ui/brand/site-logo'
import { HeroBanner } from '@small-bites/ui/content/hero-banner'
import { PageShell } from '@small-bites/ui/layout/page-shell'
import { SiteHeader } from '@small-bites/ui/layout/site-header'
import { SiteFooter } from '@small-bites/ui/layout/site-footer'

interface PlaceholderPageProps {
  title: string
  currentHref: string
}

export async function PlaceholderPage({ title, currentHref }: PlaceholderPageProps) {
  const settings = await createCMSClient().findGlobal({
    slug: 'site-settings',
    depth: 0,
    draft: false,
  })

  return (
    <PageShell
      header={
        <SiteHeader
          linkComponent={Link}
          links={settings.navigation.links}
          navigationLabel={settings.navigation.label}
          currentHref={currentHref}
          brand={<SiteLogo>{settings.branding.siteName}</SiteLogo>}
        />
      }
      footer={
        <SiteFooter tagline={settings.footer.tagline} copyright={settings.footer.description} />
      }
    >
      <HeroBanner
        eyebrow="Coming soon"
        heading={title}
        description="This is a placeholder page. More content will be added soon."
      />
    </PageShell>
  )
}
