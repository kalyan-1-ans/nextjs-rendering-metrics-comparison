export type RecipeExperienceRecipe = {
  id: number
  title: string
  slug: string
  summary: string
  recommendationSummary?: string | null
  mealType: 'breakfast' | 'brunch' | 'lunch' | 'dinner' | 'snack'
  dietaryTags?:
    | ('vegetarian' | 'non-vegetarian' | 'vegan' | 'pescatarian' | 'dairy-free' | 'gluten-free')[]
    | null
  cookingMinutes: number
  publishedAt?: string | null
}

export type RecipeExperienceCopy = {
  search: { label: string; placeholder: string }
  recommendations: {
    heading: string
    description: string
    preferenceLabel: string
    freeFromLabel: string
    everythingLabel: string
    vegetarianLabel: string
    nonVegetarianLabel: string
    veganLabel: string
    pescatarianLabel: string
    dairyFreeLabel: string
    glutenFreeLabel: string
    resultHeading: string
    readRecipeLabel: string
    emptyMessage: string
  }
  mealFilters: {
    label: string
    allLabel: string
    breakfastLabel: string
    brunchLabel: string
    lunchLabel: string
    dinnerLabel: string
    snackLabel: string
  }
  sorting: {
    label: string
    newestLabel: string
    oldestLabel: string
    quickestLabel: string
    titleLabel: string
  }
  recipeListing: {
    heading: string
    countSingularTemplate: string
    countPluralTemplate: string
    readRecipeLabel: string
    emptyMessage: string
  }
}
