import { type MigrateUpArgs, type MigrateDownArgs, sql } from '@payloadcms/db-postgres'
import type { HomePage, Recipe } from '@small-bites/cms-types'

type MigrationContext = Pick<MigrateUpArgs, 'payload' | 'req'>

// Frozen migration copy: future seed edits must not change previously deployed migrations.
const recommendationCopy = {
  description: 'Choose a diet style, then add any “free from” preferences.',
  preferenceLabel: 'Diet style',
  everythingLabel: 'Any',
  dietStyleHint: 'choose one',
  freeFromLabel: 'Also free from',
  freeFromHint: 'choose any',
  resultHeading: 'RECOMMENDED FOR YOU',
  allRecipesMessage: 'Showing all recipes',
  filteredRecipesTemplate: 'Showing recipes matching: {preferences}',
  emptyMessage: 'No recipes match these preferences yet. Try Any or remove a free-from preference.',
} satisfies Partial<HomePage['recommendations']>

function homepageData(page: HomePage) {
  return {
    hero: page.hero,
    search: page.search,
    recommendations: { ...page.recommendations, ...recommendationCopy },
    mealFilters: page.mealFilters,
    sorting: page.sorting,
    recipeListing: page.recipeListing,
  }
}

async function updateHomepage({ payload, req }: MigrationContext) {
  const existing = await payload.db.findGlobal({ slug: 'home-page', select: { id: true }, req })
  if (!existing || !('id' in existing)) {
    return
  }

  const published = await payload.findGlobal({ slug: 'home-page', draft: false, overrideAccess: true, req })
  const latest = await payload.findGlobal({ slug: 'home-page', draft: true, overrideAccess: true, req })

  if (published._status === 'published') {
    // Payload merges updates against the latest version. Submit the whole published
    // snapshot so unrelated draft edits cannot accidentally be published.
    await payload.updateGlobal({
      slug: 'home-page',
      data: { ...homepageData(published), _status: 'published' },
      overrideAccess: true,
      overrideLock: true,
      req,
    })
  }
  if (latest._status === 'draft') {
    await payload.updateGlobal({
      slug: 'home-page',
      data: { ...homepageData(latest), _status: 'draft' },
      draft: true,
      overrideAccess: true,
      overrideLock: true,
      req,
    })
  }
}

function recipeData(recipe: Recipe, blurb: string) {
  return {
    title: recipe.title,
    slug: recipe.slug,
    summary: recipe.summary,
    recommendationSummary: blurb,
    introduction: recipe.introduction,
    mealType: recipe.mealType,
    dietaryTags: recipe.dietaryTags,
    cookingMinutes: recipe.cookingMinutes,
    baseServings: recipe.baseServings,
    ingredients: recipe.ingredients,
    whyRecommended: recipe.whyRecommended,
    instructions: recipe.instructions,
    tip: recipe.tip,
    publishedAt: recipe.publishedAt,
  }
}

async function updateRecipeBlurbs({ payload, req }: MigrationContext) {
  const blurbs: Record<string, string> = {
    'tomato-pasta': 'A comforting dinner, ready in 20 minutes.',
    'chickpea-sandwich': 'Crispy chickpeas, lemony yogurt, and something crunchy.',
  }
  const existing = await payload.find({
    collection: 'recipes',
    where: { slug: { in: Object.keys(blurbs) } },
    pagination: false,
    draft: false,
    depth: 0,
    overrideAccess: true,
    req,
  })
  for (const published of existing.docs) {
    const blurb = blurbs[published.slug]
    const latest = await payload.findByID({ collection: 'recipes', id: published.id, draft: true, depth: 0, overrideAccess: true, req })
    if (published._status === 'published' && !published.recommendationSummary) {
      await payload.update({
        collection: 'recipes',
        id: published.id,
        data: { ...recipeData(published, blurb), _status: 'published' },
        overrideAccess: true,
        overrideLock: true,
        req,
      })
    }
    if (latest._status === 'draft') {
      await payload.update({
        collection: 'recipes',
        id: published.id,
        data: { ...recipeData(latest, latest.recommendationSummary || blurb), _status: 'draft' },
        draft: true,
        overrideAccess: true,
        overrideLock: true,
        req,
      })
    }
  }
}

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "recipes" ADD COLUMN IF NOT EXISTS "recommendation_summary" varchar;
  ALTER TABLE "_recipes_v" ADD COLUMN IF NOT EXISTS "version_recommendation_summary" varchar;
  ALTER TABLE "home_page" ADD COLUMN IF NOT EXISTS "recommendations_diet_style_hint" varchar;
  ALTER TABLE "home_page" ADD COLUMN IF NOT EXISTS "recommendations_free_from_label" varchar;
  ALTER TABLE "home_page" ADD COLUMN IF NOT EXISTS "recommendations_free_from_hint" varchar;
  ALTER TABLE "home_page" ADD COLUMN IF NOT EXISTS "recommendations_result_heading" varchar;
  ALTER TABLE "home_page" ADD COLUMN IF NOT EXISTS "recommendations_all_recipes_message" varchar;
  ALTER TABLE "home_page" ADD COLUMN IF NOT EXISTS "recommendations_filtered_recipes_template" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN IF NOT EXISTS "version_recommendations_diet_style_hint" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN IF NOT EXISTS "version_recommendations_free_from_label" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN IF NOT EXISTS "version_recommendations_free_from_hint" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN IF NOT EXISTS "version_recommendations_result_heading" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN IF NOT EXISTS "version_recommendations_all_recipes_message" varchar;
  ALTER TABLE "_home_page_v" ADD COLUMN IF NOT EXISTS "version_recommendations_filtered_recipes_template" varchar;`)

  await updateHomepage({ payload, req })
  await updateRecipeBlurbs({ payload, req })
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "recipes" DROP COLUMN "recommendation_summary";
  ALTER TABLE "_recipes_v" DROP COLUMN "version_recommendation_summary";
  ALTER TABLE "home_page" DROP COLUMN "recommendations_diet_style_hint";
  ALTER TABLE "home_page" DROP COLUMN "recommendations_free_from_label";
  ALTER TABLE "home_page" DROP COLUMN "recommendations_free_from_hint";
  ALTER TABLE "home_page" DROP COLUMN "recommendations_result_heading";
  ALTER TABLE "home_page" DROP COLUMN "recommendations_all_recipes_message";
  ALTER TABLE "home_page" DROP COLUMN "recommendations_filtered_recipes_template";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_recommendations_diet_style_hint";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_recommendations_free_from_label";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_recommendations_free_from_hint";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_recommendations_result_heading";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_recommendations_all_recipes_message";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_recommendations_filtered_recipes_template";`)
}
