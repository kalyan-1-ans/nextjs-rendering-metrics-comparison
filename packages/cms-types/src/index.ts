export type {
  AboutPage,
  ContactPage,
  HomePage,
  Recipe,
  RecipePage,
  SiteSettings,
} from './generated.js'

import type { Recipe } from './generated.js'

export type MealType = Recipe['mealType']
export type DietaryTag = NonNullable<Recipe['dietaryTags']>[number]
