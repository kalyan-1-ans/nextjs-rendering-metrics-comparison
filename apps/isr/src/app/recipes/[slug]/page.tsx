'use cache'

import 'server-only'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { cacheLife } from 'next/cache'
import { getLatestRecipeSlugs, getRecipeContent } from '@small-bites/cms-data'
import { RecipeDetail } from '@small-bites/ui/content/recipe-detail'
import { SiteLogo } from '@small-bites/ui/brand/site-logo'
import { PageShell } from '@small-bites/ui/layout/page-shell'
import { SiteHeader } from '@small-bites/ui/layout/site-header'
import { SiteFooter } from '@small-bites/ui/layout/site-footer'

type RecipeRouteProps = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getLatestRecipeSlugs()
}

export async function generateMetadata({ params }: RecipeRouteProps): Promise<Metadata> {
  cacheLife('max')
  const { slug } = await params
  const { settings, recipe } = await getRecipeContent(slug)
  if (!recipe) {
    notFound()
  }

  return {
    title: `${recipe.title} | ${settings.branding.siteName}`,
    description: recipe.summary,
  }
}

export default async function RecipePage({ params }: RecipeRouteProps) {
  cacheLife('max')
  const { slug } = await params
  const { settings, recipePage, recipe, recommendation } = await getRecipeContent(slug)
  if (!recipe) {
    notFound()
  }
  const renderedAt = new Date().toISOString()

  return (
    <PageShell
      header={
        <SiteHeader
          linkComponent={Link}
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
      <RecipeDetail
        recipe={recipe}
        recommendation={recommendation}
        copy={recipePage}
        timestampLabels={{
          created: settings.timestamps.createdLabel,
          updated: settings.timestamps.updatedLabel,
          rendered: settings.timestamps.renderedLabel,
        }}
        renderedAt={renderedAt}
        linkComponent={Link}
      />
    </PageShell>
  )
}
