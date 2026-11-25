# Small Bites CMS

Independent Payload CMS with PostgreSQL, a Next.js admin interface at `/admin`,
and a REST API at `/api`. `/` redirects to `/admin`. All CMS users are trusted
administrators. A fresh content database receives two published recipes and the
Small Bites page copy from Figma. Consumer applications and visitor-submission
storage are deferred.

## Requirements

- Node.js 24.22.3 or a newer Node 24 patch release.
- pnpm 10.34.5, as pinned by the root workspace.
- A running PostgreSQL server and an empty database owned by the connecting role.

If you use nvm, run `nvm install` and `nvm use` from the repository root.

## Local PostgreSQL with Docker

The local database uses PostgreSQL 17 in Docker. Set `POSTGRES_PASSWORD` in `.env`
to a random password and use the same password in `DATABASE_URL`, with role `cms`,
host `127.0.0.1`, port `55432` and database `rendering_metrics_cms`. If initialization
created the Docker database, these credentials are already configured locally.

With Docker running, use these commands from the repository root:

```sh
pnpm cms:db:start
pnpm cms:db:stop
```

The container is named `rendering-metrics-cms-db`. Data persists in the Docker
volume `rendering-metrics-cms-postgres` when the container is stopped or recreated.
These Docker resource names and the database name retain their original identifiers
so the Small Bites workspace continues to use existing local data.
Port `55432` is bound only to localhost to avoid existing services on `5432` and `5433`.
`POSTGRES_PASSWORD` initializes a new volume;
changing the environment file does not change an existing database password.

To register this server in pgAdmin, right-click **Servers → Register → Server**:

| Setting | Value |
| --- | --- |
| Name | Small Bites CMS |
| Host name/address | `127.0.0.1` |
| Port | `55432` |
| Maintenance database | `rendering_metrics_cms` |
| Username | `cms` |
| Password | The `POSTGRES_PASSWORD` value in `apps/cms/.env` |

## Using another PostgreSQL server

pgAdmin manages PostgreSQL servers; installing pgAdmin does not install a database
server. Connect to an existing local or hosted PostgreSQL server first.

In pgAdmin:

1. Connect to the server under **Servers**.
2. Right-click **Databases → Create → Database**.
3. Name it `rendering_metrics_cms` and choose your PostgreSQL login role as owner.
4. Save. Leave the database empty; Payload manages its tables.

Record the host, port, role and password for the connection string. A local server
typically uses `127.0.0.1:5432`. If no server is registered or reachable, set up a
PostgreSQL server before continuing, or use the Docker option above.

## Environment

From the repository root, copy the example if `.env` does not already exist:

```sh
cp -n apps/cms/.env.example apps/cms/.env
```

Set these values in `apps/cms/.env`:

| Variable | Value |
| --- | --- |
| `DATABASE_URL` | `postgresql://ROLE:PASSWORD@HOST:PORT/rendering_metrics_cms` |
| `POSTGRES_PASSWORD` | Local Docker password; must match `DATABASE_URL` (not needed for a hosted database) |
| `PAYLOAD_SECRET` | A stable random secret, generated with `openssl rand -hex 32` |
| `CMS_URL` | `http://localhost:3000` locally; the public HTTPS origin in production |

URL-encode special characters in database usernames and passwords. Keep `.env`
and production secrets out of Git. If initialization already created the local
Docker database and `.env`, its credentials and Payload secret are ready.

## Development

Run from the repository root:

```sh
pnpm install
pnpm cms:db:start
pnpm dev:cms
```

Skip `cms:db:start` when using another PostgreSQL server.
For a newly created empty database, you can apply the initial migration with
`pnpm cms:migrate` before the first development startup.

Payload synchronizes the development schema automatically. Open
<http://localhost:3000/admin> and create the first administrator using your own
email and password. Payload's first-user flow handles this bootstrap; subsequent
user creation, reading, editing, deletion and unlocking require authentication.
Administrator credentials are never seeded. The editorial content seed runs on
Payload initialization as described below.

The Users API is private. Published recipes and page Globals can be read publicly;
writes, draft previews and version history require a CMS administrator. The REST
API is enabled; GraphQL is disabled. There is no cross-origin browser allowlist yet.
Future Next.js consumers can use server-side HTTP requests; browser requests can
be allowed for specific origins when those apps exist.

After changing collection configuration, regenerate committed artifacts:

```sh
pnpm cms:generate:types
pnpm cms:generate:importmap
```

## Small Bites content

The CMS owns editorial content and all visitor-facing copy. Visitor comments and
submitted contact messages belong in a separate application database shared by
the future consumer apps. The CMS stores only the labels and messages used by
those forms. Administrator accounts and Payload's internal tables stay in the CMS.

### Initial content seed

`src/seed/content.ts` contains typed content from the
[Small Bites Figma design](https://www.figma.com/design/9q9fA5yK1ENwY4yCMYW4sT/small-bites?node-id=1-394):

- Two published recipes, with slugs `tomato-pasta` and `chickpea-sandwich`.
- All five published Globals, including the contact confirmation copy, navigation,
  filter labels, recipe-page headings and form messages.
- The agreed About paragraph describing the Next.js rendering comparison, replacing
  the outdated statement that the demo has no search or comments.
- Matching English copy for required states absent from Figma. The three extra
  recipe previews and sample comments shown in the design are not seeded.

Both recipes serve two. Numeric ingredient quantities are separate from names,
units and notes; ingredients without specified amounts remain unquantified.
The chickpea sandwich is tagged vegetarian. The pasta remains unclassified until
its Parmesan is checked. No vegan or free-from claims are inferred.

The seed runs automatically during every Payload process initialization in
development and production. Next.js may initialize Payload lazily on the first CMS
request rather than when `next start` prints Ready. It does not run during builds,
migrations, type generation or import-map generation. An explicit command invokes
the same function without recursively running the startup hook:

```sh
pnpm cms:seed
```

The function uses one PostgreSQL transaction and a transaction-scoped advisory
lock. After acquiring the lock, it checks the private `payload-kv` completion key
`small-bites:initial-content:v1`. If that key exists, it returns without writing.
Otherwise it checks the recipe collection and all five Globals, including saved
drafts/version history. If any editorial content exists, the entire seed is
skipped. Existing administrator accounts, preferences and other internal records
do not prevent seeding an otherwise empty content database.

Only when every editorial model is empty does it create the full dataset and
completion marker in the same transaction. Concurrent initializations cannot seed
twice. Errors roll back the seed's content, versions and marker and fail
initialization with an error; the next initialization can retry. Normal startup
and `cms:seed` never merge or overwrite existing content. Deleting a seeded recipe
does not recreate it on restart, because the completion marker remains. A fresh
start means a new or deliberately reset database, not a process restart.

The existing database schema is sufficient; no seed migration is needed. Apply
schema migrations before the first production initialization. To seed explicitly
in a production environment, provide the normal production environment variables,
including `NODE_ENV=production`, and run `pnpm cms:seed` after migrations.

The source objects omit creation/update/publication timestamps so Payload records
the real initialization time. Counts remain templates for consumers to calculate
from the two recipes; sample Figma counts and rendered timestamps are not stored.
No administrator, visitor comment, contact submission or application database is
created by the seed. Changing the seed file later never updates existing content
automatically; edit it through the CMS or explicitly reset the demo content.

### Reset demo content

For a disposable demo, edit `src/seed/content.ts` and then run from the repository
root:

```sh
pnpm cms:reset-content
```

This command permanently deletes **all recipes and all five page Globals**, their
drafts/version history, related content locks and the initial-seed marker. It then
recreates two published recipes, the five published Globals and a fresh marker
from the current seed file. IDs and timestamps are regenerated; existing content
edits and history are discarded.

Administrator accounts, login sessions, preferences, migration history, unrelated
key/value records and the database schema are preserved. The command targets the
database configured in `apps/cms/.env` or the supplied environment. Apply schema
migrations first; the reset CLI disables development schema synchronization.

Deletion and reseeding use one transaction and the same advisory lock as normal
seeding. If reseeding fails, deletion is rolled back and existing content remains.
The command is explicit-only: normal startup and `pnpm cms:seed` still preserve
content, and no reset endpoint is exposed.

Seed-copy changes do not need a content migration when using this demo-reset
workflow. Schema changes still need migrations and regenerated shared types.

### Recipes

The `recipes` collection includes:

- `title`, stable unique `slug`, listing `summary`, optional shorter
  `recommendationSummary`, and article `introduction`. Recommendation cards use
  `recommendationSummary` when non-blank, falling back to `summary`.
- `mealType`: one of `breakfast`, `brunch`, `lunch`, `dinner` or `snack`.
  `dietaryTags`: any applicable combination of `vegetarian`, `non-vegetarian`,
  `vegan`, `pescatarian`, `dairy-free` and `gluten-free`. Tags are explicitly
  assigned by the editor, not inferred from missing tags. The Any filter
  is not a stored dietary tag. Corresponding visitor-facing labels live in the
  homepage filter/recommendation groups and recipe-page metadata.
- Positive `cookingMinutes` and a positive integer `baseServings`.
- Ordered `ingredients` with a name, optional positive numeric quantity, unit and
  note. Quantities describe `baseServings`; consumers scale them for the selected
  servings. Omit quantity for an ingredient such as salt to taste, and preserve
  its name/note when scaling.
- `whyRecommended`, ordered `instructions` and an optional `tip`.
- `_status`, `publishedAt`, `createdAt` and `updatedAt`. `publishedAt` is populated
  on first publication if not supplied; later publication keeps the original
  timestamp unless an administrator explicitly changes it.

Ingredients, instructions, navigation and About sections preserve their admin
array order. No media, ingredient, category or recommendation collection is added.
Consumers query recipes for search, filters, ordering and recommendations.

### Page Globals and copy ownership

Each Global is a single document, with explicit fields in named groups:

| Global | Groups / fields |
| --- | --- |
| `site-settings` | `branding`, `navigation`, `footer`, `timestamps` |
| `home-page` | `hero`, `search`, `recommendations`, `mealFilters`, `sorting`, `recipeListing` |
| `recipe-page` | `navigation`, `metadata`, `sections`, `servings`, `recommendations`, `comments`, `commentForm` |
| `about-page` | `introduction`, ordered `sections`, `backLinkLabel` |
| `contact-page` | `introduction`, `form`, `privacyCopy`, `confirmation` |

Recipe-specific prose belongs in `recipes`; shared section headings such as the
ingredients heading belong in `recipe-page.sections`. Recipe-page recommendation
copy is independent of homepage recommendation copy. Navigation paths begin with
a single `/` so they work across independently deployed consumer apps.

Loading, empty, validation, error and success messages belong to their page or
feature. The contact success-page introduction lives in `contact-page.confirmation`.
There is no global text dictionary. Initial copy is provided by the fresh-database
seed and remains editable. All copy is plain text; consumers render it as text
rather than interpreting it as HTML.

### Personalized recommendation controls

`home-page.recommendations` supplies the copy for two selector groups:

| Group | Options | Visitor selection |
| --- | --- | --- |
| Diet style | Any, Vegetarian, Vegan, Pescatarian, Non-vegetarian | Choose one |
| Also free from | Dairy-free, Gluten-free | Choose any |

The existing API keys are retained: `preferenceLabel` now contains “Diet style” and
`everythingLabel` contains “Any”. `dietStyleHint`, `freeFromLabel` and `freeFromHint`
provide the group hints/heading. `resultHeading` labels the recommendation card;
`allRecipesMessage` supplies “Showing all recipes”. For a filtered result, replace
`{preferences}` in `filteredRecipesTemplate` with the selected option labels.

The recipe schema retains one multi-select `dietaryTags` field. The separate UI
groups control visitor selection, not recipe classification. A recipe may carry
several applicable diet styles. The shared type package exports `DietStyle`,
`FreeFromPreference` and `RecipePreferences` for this selection state:

```ts
const preferences: RecipePreferences = {
  dietStyle: 'vegetarian',
  freeFrom: ['dairy-free', 'gluten-free'],
}
```

Consumer apps require **every selected tag**. Use one AND condition per selected
tag rather than putting all tags in a single `in` condition, which matches any:

```json
{
  "and": [
    { "dietaryTags": { "in": ["vegetarian"] } },
    { "dietaryTags": { "in": ["dairy-free"] } },
    { "dietaryTags": { "in": ["gluten-free"] } }
  ]
}
```

Any adds no diet-style condition, while selected free-from conditions still apply.
Any with no free-from preferences returns all published recipes. Non-vegetarian
matches its explicit tag; absence of a Vegetarian tag does not imply a match.
Selection state and query construction belong to the future consumer apps.

The grouped-preferences migration updates existing homepage recommendation copy
and adds missing short blurbs to the two demo recipes through Payload, creating
normal versions. Other page/recipe content is preserved, and unrelated draft
edits remain unpublished. Seed content uses the new copy for fresh databases;
the original first-seed completion marker remains unchanged.

### Copy templates

Consumers replace only these named placeholders with calculated values:

| Field | Placeholders |
| --- | --- |
| `home-page.recipeListing.countSingularTemplate` / `countPluralTemplate` | `{count}` |
| `home-page.recipeListing.progressTemplate` | `{shown}`, `{total}` |
| `home-page.recommendations.filteredRecipesTemplate` | `{preferences}` |
| `recipe-page.metadata.cookingTimeTemplate` | `{minutes}` |
| `recipe-page.metadata.servingsTemplate` | `{servings}` |
| `recipe-page.servings.optionTemplate` | `{servings}` |
| `recipe-page.comments.countSingularTemplate` / `countPluralTemplate` | `{count}` |

Use the singular template for count `1` and the plural template otherwise. The CMS
stores the templates, not calculated counts, quantities or rendered timestamps.

### Publishing and REST reads

Recipes and every Global support drafts and publication. Administrators can save
incomplete drafts, then publish once required fields are complete. Public reads
are constrained to `_status=published`, including requests with `draft=true`.
Saving draft edits preserves the publicly visible published version.

REST endpoints include:

```text
GET /api/recipes
GET /api/recipes?where[slug][equals]=your-recipe-slug
GET /api/recipes?where[mealType][equals]=lunch&sort=cookingMinutes&limit=10
GET /api/globals/site-settings
GET /api/globals/home-page
GET /api/globals/recipe-page
GET /api/globals/about-page
GET /api/globals/contact-page
```

Until content is published, recipe reads return an empty `docs` array and Global
reads return an empty object. Consumers must handle these states. Version-history
endpoints remain private. For CMS Local API calls on behalf of a user or visitor,
pass `overrideAccess: false`; Local API calls otherwise bypass access control.

### Shared generated types

Payload generates types directly into the `@small-bites/cms-types` workspace
package. Its public entry exports `Recipe`, `SiteSettings`, `HomePage`, `RecipePage`,
`AboutPage`, `ContactPage`, `MealType` and `DietaryTag`:

```ts
import type { Recipe, HomePage } from '@small-bites/cms-types'
```

The package contains types only and has no runtime dependencies. The CMS uses its
`/generated` subpath for `Config` and keeps Payload module augmentation locally in
`src/payload.d.ts`. The shared generated file does not import or augment Payload.
Regenerate and commit types after schema edits; do not edit generated types or
maintain separate handwritten recipe/page interfaces in consumer apps.

## Database migrations and production

Use a separate production database. Development schema synchronization does not
replace production migrations. Schema migrations live in `src/migrations`.

For later schema changes, generate a migration and review the resulting files:

```sh
pnpm cms:migrate:create describe_schema_change
```

The initial Users/internal schema migration and the additive Small Bites content
migration are included. Existing administrator accounts are preserved.
Commit later generated migrations, snapshots and `src/migrations/index.ts` together.
On the deployment platform, set the environment variables, build the CMS, apply
migrations once as a release step, then start the app:

```sh
pnpm build:cms
pnpm cms:migrate
pnpm start:cms
```

With Vercel or Netlify, their Next.js runtime handles starting the built app;
arrange migrations as a separate controlled release step. Deployment platform
configuration is deferred. Claim the first administrator before sharing a new
deployment. An email provider for password resets is also deferred.

## Verification

```sh
pnpm lint
pnpm typecheck:cms-types
pnpm typecheck:cms
pnpm build:cms
```

A real database connection is required to verify admin login and API access.
This demo does not include or run unit or end-to-end tests.
