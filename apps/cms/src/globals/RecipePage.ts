import type { GlobalConfig } from 'payload'

import { globalContentAccess } from '../access/content'
import { copyGroup } from '../fields/copy'

export const RecipePage: GlobalConfig = {
  slug: 'recipe-page',
  typescript: { interface: 'RecipePage' },
  admin: { group: 'Pages' },
  access: globalContentAccess,
  versions: { drafts: true },
  fields: [
    copyGroup('navigation', ['backLabel']),
    copyGroup('metadata', [
      'breakfastLabel', 'brunchLabel', 'lunchLabel', 'dinnerLabel', 'snackLabel',
      'cookingTimeTemplate', 'servingsTemplate',
    ], 'cookingTimeTemplate supports {minutes}; servingsTemplate supports {servings}.'),
    copyGroup('sections', [
      'whyRecommendedHeading', 'ingredientsHeading', 'instructionsHeading', 'tipHeading',
    ]),
    copyGroup('servings', ['label', 'optionTemplate'], 'optionTemplate supports {servings}.'),
    copyGroup('recommendations', [
      'heading', 'readRecipeLabel', 'loadingMessage', 'emptyMessage', 'errorMessage',
    ]),
    copyGroup('comments', [
      'heading', 'countSingularTemplate', 'countPluralTemplate', 'loadingMessage',
      'emptyHeading', 'emptyMessage', 'errorMessage',
    ], 'Count templates support {count}. Submitted comments are stored outside the CMS.'),
    copyGroup('commentForm', [
      'heading', 'description', 'nameLabel', 'namePlaceholder', 'emailLabel', 'emailPlaceholder',
      'commentLabel', 'commentPlaceholder', 'submitLabel', 'submittingLabel', 'successMessage',
      'errorMessage', 'nameRequiredMessage', 'emailRequiredMessage', 'invalidEmailMessage',
      'commentRequiredMessage',
    ]),
  ],
}
