'use client'

import { useMemo, useState } from 'react'
import { Button } from '../actions/button'
import { TextLink } from '../actions/text-link'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../forms/select'
import { Heading } from '../typography/heading'
import { Text } from '../typography/text'
import { ContentContainer } from '../layout/content-container'
import type { RecipeExperienceCopy, RecipeExperienceRecipe } from './recipe-experience.types'

type MealFilter = 'all' | RecipeExperienceRecipe['mealType']
type SortOption = 'newest' | 'oldest' | 'quickest' | 'title'

const mealOptions = [
  ['all', 'allLabel'],
  ['breakfast', 'breakfastLabel'],
  ['brunch', 'brunchLabel'],
  ['lunch', 'lunchLabel'],
  ['dinner', 'dinnerLabel'],
  ['snack', 'snackLabel'],
] as const satisfies [MealFilter, keyof RecipeExperienceCopy['mealFilters']][]

type RecipeBrowserProps = {
  home: RecipeExperienceCopy
  recipes: RecipeExperienceRecipe[]
  query: string
}

export function RecipeBrowser({ home, recipes, query }: RecipeBrowserProps) {
  const [meal, setMeal] = useState<MealFilter>('all')
  const [sort, setSort] = useState<SortOption>('newest')

  const filteredRecipes = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase()
    return [...recipes]
      .filter((recipe) => meal === 'all' || recipe.mealType === meal)
      .filter(
        (recipe) =>
          !normalizedQuery ||
          `${recipe.title} ${recipe.summary}`.toLocaleLowerCase().includes(normalizedQuery),
      )
      .sort((first, second) => {
        if (sort === 'quickest') return first.cookingMinutes - second.cookingMinutes
        if (sort === 'title') return first.title.localeCompare(second.title)
        const dateOrder = (first.publishedAt ?? '').localeCompare(second.publishedAt ?? '')
        return sort === 'oldest' ? dateOrder : -dateOrder
      })
  }, [meal, query, recipes, sort])

  const mealFilterLabel = home.mealFilters

  return (
    <ContentContainer width="wide" className="border-t border-border pt-8 pb-12">
      <section id="all-recipes" aria-labelledby="all-recipes-heading">
        <Heading id="all-recipes-heading" size="title" className="mb-5">
          {home.recipeListing.heading}
        </Heading>
        <div className="flex flex-wrap items-center gap-3">
          <Text tone="muted">{mealFilterLabel.label}</Text>
          <div className="flex flex-wrap gap-2" role="group" aria-label={mealFilterLabel.label}>
            {mealOptions.map(([value, labelKey]) => (
              <Button
                key={value}
                type="button"
                variant="toggle"
                aria-pressed={meal === value}
                onClick={() => setMeal(value)}
              >
                {mealFilterLabel[labelKey]}
              </Button>
            ))}
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <Text role="status" tone="muted">
            {filteredRecipes.length === 1
              ? home.recipeListing.countSingularTemplate.replace('{count}', '1')
              : home.recipeListing.countPluralTemplate.replace(
                  '{count}',
                  String(filteredRecipes.length),
                )}
          </Text>
          <label className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>{home.sorting.label}</span>
            <Select
              value={sort}
              onValueChange={(value) => {
                if (value) setSort(value as SortOption)
              }}
            >
              <SelectTrigger aria-label={home.sorting.label} className="w-52">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">{home.sorting.newestLabel}</SelectItem>
                <SelectItem value="oldest">{home.sorting.oldestLabel}</SelectItem>
                <SelectItem value="quickest">{home.sorting.quickestLabel}</SelectItem>
                <SelectItem value="title">{home.sorting.titleLabel}</SelectItem>
              </SelectContent>
            </Select>
          </label>
        </div>
        {filteredRecipes.length ? (
          <div className="mt-8 border-t border-border">
            {filteredRecipes.map((recipe) => (
              <article
                id={`recipe-${recipe.slug}`}
                key={recipe.id}
                className="border-b border-border py-6 sm:py-8"
              >
                <Text variant="eyebrow" tone="accent" className="mb-3">
                  {recipe.mealType} · {recipe.cookingMinutes} min
                </Text>
                <Heading size="title" className="mb-2">
                  {recipe.title}
                </Heading>
                <Text tone="muted" className="mb-3 max-w-3xl">
                  {recipe.summary}
                </Text>
                <TextLink href={`/recipes/${recipe.slug}`}>
                  {home.recipeListing.readRecipeLabel}
                </TextLink>
              </article>
            ))}
          </div>
        ) : (
          <Text role="status" tone="muted" className="mt-8">
            {home.recipeListing.emptyMessage}
          </Text>
        )}
      </section>
    </ContentContainer>
  )
}
