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

export type DietStyle = Extract<DietaryTag, 'vegetarian' | 'vegan' | 'pescatarian' | 'non-vegetarian'>
export type FreeFromPreference = Extract<DietaryTag, 'dairy-free' | 'gluten-free'>

// Visitor selection state; recipes retain all applicable dietary tags.
export interface RecipePreferences {
  dietStyle: DietStyle | 'any'
  freeFrom: FreeFromPreference[]
}
