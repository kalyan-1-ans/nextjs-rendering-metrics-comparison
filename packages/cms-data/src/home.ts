import { createCMSClient } from './client'
import type { Recipe } from '@small-bites/cms-types'

export type HomeRecipe = Pick<
  Recipe,
  | 'id'
  | 'title'
  | 'slug'
  | 'summary'
  | 'recommendationSummary'
  | 'mealType'
  | 'dietaryTags'
  | 'cookingMinutes'
  | 'publishedAt'
>

export async function getHomeContent() {
  const cms = createCMSClient()

  const [settings, home] = await Promise.all([
    cms.findGlobal({ slug: 'site-settings', depth: 0, draft: false }),
    cms.findGlobal({ slug: 'home-page', depth: 0, draft: false }),
  ])
  return { settings, home }
}

export async function getHomeRecipes(): Promise<HomeRecipe[]> {
  const cms = createCMSClient()
  const result = await cms.find({
    collection: 'recipes',
    depth: 0,
    draft: false,
    pagination: false,
    sort: '-publishedAt',
    select: {
      id: true,
      title: true,
      slug: true,
      summary: true,
      recommendationSummary: true,
      mealType: true,
      dietaryTags: true,
      cookingMinutes: true,
      publishedAt: true,
    },
  })
  return result.docs
}

export async function getLatestRecipeSlugs(): Promise<{ slug: string }[]> {
  const cms = createCMSClient()
  const result = await cms.find({
    collection: 'recipes',
    depth: 0,
    draft: false,
    limit: 10,
    sort: '-publishedAt',
    select: { slug: true },
  })
  return result.docs.map(({ slug }) => ({ slug }))
}

export async function getRecipeContent(slug: string) {
  const cms = createCMSClient()
  const [settings, recipePage, recipeResult, recommendationResult] = await Promise.all([
    cms.findGlobal({ slug: 'site-settings', depth: 0, draft: false }),
    cms.findGlobal({ slug: 'recipe-page', depth: 0, draft: false }),
    cms.find({
      collection: 'recipes',
      depth: 0,
      draft: false,
      limit: 1,
      where: { slug: { equals: slug } },
    }),
    cms.find({
      collection: 'recipes',
      depth: 0,
      draft: false,
      limit: 1,
      sort: '-publishedAt',
      where: { slug: { not_equals: slug } },
      select: {
        id: true,
        title: true,
        slug: true,
        summary: true,
        recommendationSummary: true,
        mealType: true,
        dietaryTags: true,
        cookingMinutes: true,
        publishedAt: true,
      },
    }),
  ])

  return {
    settings,
    recipePage,
    recipe: recipeResult.docs[0],
    recommendation: recommendationResult.docs[0],
  }
}
