'use client'

import { useState } from 'react'
import { RecipeBrowser } from '@small-bites/ui/content/recipe-browser'
import { RecipeRecommendations } from '@small-bites/ui/content/recipe-recommendations'
import { RecipeSearch } from '@small-bites/ui/content/recipe-search'
import { Stack } from '@small-bites/ui/layout/stack'
import type { getHomeContent, HomeRecipe } from '@small-bites/cms-data'

type RecipeExperienceProps = {
  home: Awaited<ReturnType<typeof getHomeContent>>['home']
  recipes: HomeRecipe[]
}

export function RecipeExperience({ home, recipes }: RecipeExperienceProps) {
  const [query, setQuery] = useState('')

  return (
    <Stack gap="xl">
      <RecipeSearch
        label={home.search.label}
        placeholder={home.search.placeholder}
        value={query}
        onValueChange={setQuery}
      />
      <RecipeRecommendations copy={home.recommendations} recipes={recipes} />
      <RecipeBrowser home={home} recipes={recipes} query={query} />
    </Stack>
  )
}
