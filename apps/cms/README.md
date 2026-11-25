# Payload CMS

Independent Payload CMS with PostgreSQL, a Next.js admin interface at `/admin`,
and a REST API at `/api`. `/` redirects to `/admin`. All CMS users are trusted
administrators. Recipes and page copy have schemas but no seeded content.
Consumer applications and visitor-submission storage are deferred.

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
Port `55432` is bound only to localhost to avoid existing services on `5432` and `5433`.
`POSTGRES_PASSWORD` initializes a new volume;
changing the environment file does not change an existing database password.

To register this server in pgAdmin, right-click **Servers → Register → Server**:

| Setting | Value |
| --- | --- |
| Name | Rendering Metrics CMS |
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
No administrator credentials or content are seeded.

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

### Recipes

The `recipes` collection includes:

- `title`, stable unique `slug`, listing `summary` and article `introduction`.
- `mealType`: one of `breakfast`, `brunch`, `lunch`, `dinner` or `snack`.
  `dietaryTags`: any applicable combination of `vegetarian`, `non-vegetarian`,
  `vegan`, `pescatarian`, `dairy-free` and `gluten-free`. Tags are explicitly
  assigned by the editor, not inferred from missing tags. The Everything filter
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
There is no global text dictionary and no default Small Bites copy. All copy is
plain text; consumers render it as text rather than interpreting it as HTML.

### Copy templates

Consumers replace only these named placeholders with calculated values:

| Field | Placeholders |
| --- | --- |
| `home-page.recipeListing.countSingularTemplate` / `countPluralTemplate` | `{count}` |
| `home-page.recipeListing.progressTemplate` | `{shown}`, `{total}` |
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

Payload generates types directly into the `@rendering-metrics/cms-types` workspace
package. Its public entry exports `Recipe`, `SiteSettings`, `HomePage`, `RecipePage`,
`AboutPage`, `ContactPage`, `MealType` and `DietaryTag`:

```ts
import type { Recipe, HomePage } from '@rendering-metrics/cms-types'
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
