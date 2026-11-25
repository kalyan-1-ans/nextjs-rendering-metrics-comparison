'use client'

import { useMemo, useState } from 'react'
import { Button } from '../actions/button'
import { TextLink } from '../actions/text-link'
import { Heading } from '../typography/heading'
import { Text } from '../typography/text'
import { ContentContainer } from '../layout/content-container'
import type { RecipeExperienceCopy, RecipeExperienceRecipe } from './recipe-experience.types'

type DietStyle = 'any' | 'vegetarian' | 'non-vegetarian' | 'vegan' | 'pescatarian'
type FreeFrom = 'dairy-free' | 'gluten-free'

const dietOptions = [
  ['any', 'everythingLabel'],
  ['vegetarian', 'vegetarianLabel'],
  ['non-vegetarian', 'nonVegetarianLabel'],
  ['vegan', 'veganLabel'],
  ['pescatarian', 'pescatarianLabel'],
] as const satisfies [DietStyle, keyof RecipeExperienceCopy['recommendations']][]

const freeFromOptions = [
  ['dairy-free', 'dairyFreeLabel'],
  ['gluten-free', 'glutenFreeLabel'],
] as const satisfies [FreeFrom, keyof RecipeExperienceCopy['recommendations']][]

type RecipeRecommendationsProps = {
  copy: RecipeExperienceCopy['recommendations']
  recipes: RecipeExperienceRecipe[]
}

export function RecipeRecommendations({ copy, recipes }: RecipeRecommendationsProps) {
  const [dietStyle, setDietStyle] = useState<DietStyle>('any')
  const [freeFrom, setFreeFrom] = useState<FreeFrom[]>([])
  const recommendedRecipes = useMemo(
    () =>
      recipes.filter((recipe) => {
        const tags = recipe.dietaryTags ?? []
        return (
          (dietStyle === 'any' || tags.includes(dietStyle)) &&
          freeFrom.every((tag) => tags.includes(tag))
        )
      }),
    [dietStyle, freeFrom, recipes],
  )
  const featuredRecipe = recommendedRecipes[0]

  return (
    <ContentContainer width="wide">
      <section
        aria-labelledby="recipe-preferences-heading"
        className="border border-border p-5 sm:p-8"
      >
        <Heading id="recipe-preferences-heading" size="section" className="mb-5">
          {copy.heading}
        </Heading>
        <Text tone="muted" className="mb-6">
          {copy.description}
        </Text>
        <fieldset className="space-y-3">
          <legend className="mb-3 text-sm font-medium">{copy.preferenceLabel}</legend>
          <div className="flex flex-wrap gap-2">
            {dietOptions.map(([value, labelKey]) => (
              <Button
                key={value}
                type="button"
                variant={dietStyle === value ? 'default' : 'outline'}
                aria-pressed={dietStyle === value}
                onClick={() => setDietStyle(value)}
              >
                {copy[labelKey]}
              </Button>
            ))}
          </div>
        </fieldset>
        <fieldset className="mt-5 space-y-3">
          <legend className="mb-3 text-sm font-medium">{copy.freeFromLabel}</legend>
          <div className="flex flex-wrap gap-2">
            {freeFromOptions.map(([value, labelKey]) => {
              const checked = freeFrom.includes(value)
              return (
                <Button
                  key={value}
                  type="button"
                  variant={checked ? 'default' : 'outline'}
                  aria-pressed={checked}
                  onClick={() =>
                    setFreeFrom((current) =>
                      checked ? current.filter((tag) => tag !== value) : [...current, value],
                    )
                  }
                >
                  {copy[labelKey]}
                </Button>
              )
            })}
          </div>
        </fieldset>
        <div className="mt-8 border-t border-border pt-6">
          <Text variant="eyebrow" tone="accent" className="mb-2">
            {copy.resultHeading}
          </Text>
          {featuredRecipe ? (
            <>
              <Heading size="title" className="mb-2">
                {featuredRecipe.title}
              </Heading>
              <Text tone="muted" className="mb-3">
                {featuredRecipe.recommendationSummary || featuredRecipe.summary}
              </Text>
              <TextLink href={`/recipes/${featuredRecipe.slug}`}>{copy.readRecipeLabel}</TextLink>
            </>
          ) : (
            <Text role="status" tone="muted">
              {copy.emptyMessage}
            </Text>
          )}
        </div>
      </section>
    </ContentContainer>
  )
}
