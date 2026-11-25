import type { GlobalConfig } from 'payload'

import { globalContentAccess } from '../access/content'
import { copyGroup, introduction } from '../fields/copy'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  typescript: { interface: 'HomePage' },
  admin: { group: 'Pages' },
  access: globalContentAccess,
  versions: { drafts: true },
  fields: [
    introduction('hero'),
    copyGroup('search', [
      'label', 'placeholder', 'suggestionsLabel', 'loadingMessage', 'emptyMessage', 'errorMessage',
    ]),
    copyGroup('recommendations', [
      'heading', 'description', 'preferenceLabel', 'everythingLabel', 'vegetarianLabel',
      'nonVegetarianLabel', 'veganLabel', 'pescatarianLabel', 'dairyFreeLabel', 'glutenFreeLabel',
      'readRecipeLabel', 'loadingMessage', 'emptyMessage', 'errorMessage',
    ]),
    copyGroup('mealFilters', [
      'label', 'allLabel', 'breakfastLabel', 'brunchLabel', 'lunchLabel', 'dinnerLabel', 'snackLabel',
    ]),
    copyGroup('sorting', ['label', 'newestLabel', 'oldestLabel', 'quickestLabel', 'titleLabel']),
    copyGroup('recipeListing', [
      'heading', 'countSingularTemplate', 'countPluralTemplate', 'progressTemplate',
      'readRecipeLabel', 'loadMoreLabel', 'loadingMessage', 'emptyMessage', 'errorMessage',
    ], 'Count templates support {count}; progressTemplate supports {shown} and {total}. Counts are calculated by the consumer.'),
  ],
}
