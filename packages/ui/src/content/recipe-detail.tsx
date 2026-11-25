import type { ComponentType, ComponentProps } from 'react'
import { TextLink } from '../actions/text-link'
import { Divider } from './divider'
import { Heading } from '../typography/heading'
import { Text } from '../typography/text'
import { PageTimestamps } from '../data-display/page-timestamps'
import { PageContent } from '../layout/page-content'

export type RecipeDetailData = {
  id: number
  title: string
  slug: string
  summary: string
  introduction: string
  mealType: 'breakfast' | 'brunch' | 'lunch' | 'dinner' | 'snack'
  cookingMinutes: number
  ingredients: {
    id?: string | null
    name: string
    quantity?: number | null
    unit?: string | null
    note?: string | null
  }[]
  whyRecommended: string
  instructions: { id?: string | null; instruction: string }[]
  tip?: string | null
  createdAt: string
  updatedAt: string
}

export type RecipeRecommendationData = {
  title: string
  slug: string
  summary: string
  recommendationSummary?: string | null
}

type RecipeDetailCopy = {
  navigation: { backLabel: string }
  metadata: {
    breakfastLabel: string
    brunchLabel: string
    lunchLabel: string
    dinnerLabel: string
    snackLabel: string
    cookingTimeTemplate: string
  }
  sections: {
    whyRecommendedHeading: string
    ingredientsHeading: string
    instructionsHeading: string
    tipHeading: string
  }
  recommendations: {
    heading: string
    readRecipeLabel: string
    emptyMessage: string
  }
}

type RecipeDetailProps = {
  recipe: RecipeDetailData
  recommendation: RecipeRecommendationData | undefined
  copy: RecipeDetailCopy
  timestampLabels: { created: string; updated: string; rendered: string }
  renderedAt: string
  linkComponent: ComponentType<ComponentProps<'a'> & { href: string }>
}

const mealTypeKeys = {
  breakfast: 'breakfastLabel',
  brunch: 'brunchLabel',
  lunch: 'lunchLabel',
  dinner: 'dinnerLabel',
  snack: 'snackLabel',
} as const

const numberFormatter = new Intl.NumberFormat('en-AU', { maximumFractionDigits: 2 })

export function RecipeDetail({
  recipe,
  recommendation,
  copy,
  timestampLabels,
  renderedAt,
  linkComponent,
}: RecipeDetailProps) {
  const mealLabel = copy.metadata[mealTypeKeys[recipe.mealType]]

  return (
    <PageContent
      timestamps={
        <PageTimestamps
          createdAt={recipe.createdAt}
          updatedAt={recipe.updatedAt}
          renderedAt={renderedAt}
          labels={timestampLabels}
        />
      }
    >
      <TextLink href="/" linkComponent={linkComponent}>
        {copy.navigation.backLabel}
      </TextLink>
      <article className="flex flex-col gap-7 sm:gap-9.5">
        <header className="flex flex-col gap-3">
          <Text variant="eyebrow" tone="accent">
            {mealLabel} ·{' '}
            {copy.metadata.cookingTimeTemplate.replace('{minutes}', String(recipe.cookingMinutes))}
          </Text>
          <Heading as="h1" size="page" className="whitespace-pre-line">
            {recipe.title}
          </Heading>
          <Text tone="muted" className="max-w-prose">
            {recipe.introduction}
          </Text>
        </header>

        <section className="flex flex-col gap-3" aria-labelledby="why-recommended-heading">
          <Heading as="h2" id="why-recommended-heading" size="section">
            {copy.sections.whyRecommendedHeading}
          </Heading>
          <Text className="text-prose-foreground">{recipe.whyRecommended}</Text>
        </section>

        <section className="flex flex-col gap-3" aria-labelledby="ingredients-heading">
          <Heading as="h2" id="ingredients-heading" size="section">
            {copy.sections.ingredientsHeading}
          </Heading>
          <ul className="list-disc space-y-1 pl-5 text-prose-foreground">
            {recipe.ingredients.map((ingredient) => {
              const amount =
                ingredient.quantity === null || ingredient.quantity === undefined
                  ? ''
                  : `${numberFormatter.format(ingredient.quantity)}${ingredient.unit ? ` ${ingredient.unit}` : ''} `
              return (
                <li key={ingredient.id ?? ingredient.name}>
                  {amount}
                  {ingredient.name}
                  {ingredient.note ? `, ${ingredient.note}` : ''}
                </li>
              )
            })}
          </ul>
        </section>

        <section className="flex flex-col gap-3" aria-labelledby="instructions-heading">
          <Heading as="h2" id="instructions-heading" size="section">
            {copy.sections.instructionsHeading}
          </Heading>
          <ol className="list-decimal space-y-3 pl-5 text-prose-foreground">
            {recipe.instructions.map((step, index) => (
              <li key={step.id ?? index}>{step.instruction}</li>
            ))}
          </ol>
        </section>

        {recipe.tip ? (
          <aside className="flex flex-col gap-2 bg-muted p-4" aria-labelledby="recipe-tip-heading">
            <Heading as="h2" id="recipe-tip-heading" size="card">
              {copy.sections.tipHeading}
            </Heading>
            <Text tone="muted">{recipe.tip}</Text>
          </aside>
        ) : null}

        <Divider />
        <section className="flex flex-col gap-3" aria-labelledby="more-recipes-heading">
          <Text variant="eyebrow" tone="accent">
            {copy.recommendations.heading}
          </Text>
          {recommendation ? (
            <>
              <Heading as="h2" size="section">
                {recommendation.title}
              </Heading>
              <Text tone="muted">
                {recommendation.recommendationSummary || recommendation.summary}
              </Text>
              <TextLink href={`/recipes/${recommendation.slug}`} linkComponent={linkComponent}>
                {copy.recommendations.readRecipeLabel}
              </TextLink>
            </>
          ) : (
            <Text tone="muted">{copy.recommendations.emptyMessage}</Text>
          )}
        </section>
      </article>
    </PageContent>
  )
}
