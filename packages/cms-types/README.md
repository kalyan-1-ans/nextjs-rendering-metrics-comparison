# CMS types

Private, type-only workspace package: `@rendering-metrics/cms-types`.

Payload collection and Global definitions in the CMS are the source of truth.
`src/generated.ts` is produced by `pnpm cms:generate:types` from the repository
root. Commit it with schema changes and never edit it by hand.

The public entry point exports content types only:

```ts
import type {
  Recipe,
  HomePage,
  RecipePage,
  SiteSettings,
  AboutPage,
  ContactPage,
  MealType,
  DietaryTag,
  DietStyle,
  FreeFromPreference,
  RecipePreferences,
} from '@rendering-metrics/cms-types'
```

Add `"@rendering-metrics/cms-types": "workspace:*"` to each consumer app's
`devDependencies`. Use `import type`; the package has no JavaScript exports,
runtime dependencies, database code or Payload configuration. The CMS uses the
`@rendering-metrics/cms-types/generated` subpath to import its generated `Config`.
Payload module augmentation is confined to the CMS app.

Run `pnpm typecheck:cms-types` to check the package with no ambient dependency
types. Its TypeScript configuration extends the repository's `tsconfig.base.json`.
There is no build step: workspace consumers read the committed TypeScript source.

These are schema-derived document types, not runtime validators. Incomplete
drafts, field selections and an unpublished Global's empty response may not match
a complete document; consumers should request published content and handle
missing/selected fields before rendering. Visitor submission types belong to the
future application-data layer.

`RecipePreferences` describes the recommendation selector: one `dietStyle` (or
`any`) and zero or more `freeFrom` preferences. It is visitor selection state,
separate from the generated recipe's multi-select `dietaryTags`. Every selected
tag must match; `any` omits only the diet-style condition. This package provides
types only; selection handling, query construction and recommendation-summary
fallback belong to consumer apps.
