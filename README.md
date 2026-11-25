# Small Bites

Small Bites is a demo recipe blog built to compare Next.js rendering approaches
and performance metrics using the same content and design. This pnpm workspace
contains the workspace foundation, Oxlint, TypeScript, an independent Payload
CMS app, a shared design system, and the first Next.js consumer using on-demand ISR.

This is a demo app. Do not add unit tests or end-to-end tests.

## Tech stack

The following is the intended stack for the demo. Listing a tool here does not
mean it has been installed or configured yet.

| Area | Tools |
| --- | --- |
| Monorepo | pnpm |
| Framework | Next.js 16, React 19, Vite |
| Forms, state, and caching | TanStack Form, Zod, TanStack Query (React Query), Zustand, Next.js Cache Components |
| CMS | Payload CMS |
| Database | PostgreSQL |
| UI | Tailwind CSS v4, Base UI, shadcn/ui |
| Coding agents | Cursor, Codex |
| Skills and MCP | Vercel, Payload, Context7 |
| Linting and formatting | Oxlint, Oxfmt, TypeScript |
| Demos and metrics | Storybook, Playwright |

Playwright is intended for collecting rendering metrics, and Storybook for
component demos. Neither calls for unit or end-to-end test suites.

## Setup

Use Node.js 24.22.3 (see `.nvmrc`) and pnpm 10.34.5.

```sh
pnpm install
pnpm lint
```

Use `pnpm lint:fix` to apply automatic lint fixes.

Oxlint checks correctness with the TypeScript, Unicorn, Oxc, React (including
Hooks), JSX accessibility, import, and Promise plugins. Next.js checks apply only
to `apps/`, so shared UI stays framework-independent. Braces and Hooks ordering
are errors; Hook dependency checks are warnings. The configuration lives in
[.oxlintrc.json](.oxlintrc.json).

## Shared UI

[`@small-bites/ui`](packages/ui/README.md) contains the Small Bites design
foundations, components grouped by purpose, shared layout, and original brand assets. It uses Base UI-backed
shadcn component source and Tailwind CSS v4, with Vite-powered Storybook.
Future Next.js apps consume the TypeScript source directly without a UI build step.

```sh
pnpm storybook
pnpm typecheck:ui
pnpm build:storybook
```

Storybook runs at <http://localhost:6006>. Its static build is generated in
`packages/ui/storybook-static`. Stories document component states and responsive
layout; no test runner or testing addons are configured.

## ISR app

[`@small-bites/cms-data`](packages/cms-data/README.md) provides the typed Payload
REST client and shared content queries, including `getHomeContent()`,
`getAboutContent()`, and `getContactContent()`. The package
reads `CMS_URL` from the consuming app's environment. App Router and Pages Router
consumers own their server boundaries and caching strategy. Run `pnpm typecheck:cms-data` to
check the package.

[`apps/isr`](apps/isr/README.md) is the first consumer, serving the CMS-backed
homepage, About, and Contact pages on <http://localhost:3001>. The Contact form
has a dummy Server Action that waits briefly, returns success, and opens the
acknowledgment page. Messages are not stored or delivered.

```sh
cp -n apps/isr/.env.example apps/isr/.env.local
pnpm dev:isr
# Production behavior:
pnpm build:isr
pnpm start:isr
```

Cache Components and partial prefetching are enabled. Each page file caches
its rendered output and metadata with `'use cache'` and `cacheLife('max')`;
Payload reads use `cache: 'no-store'`. Publishing Home, About, or Contact notifies
the endpoints in the CMS's `ISR_REVALIDATION_URLS` with each affected route's path.
Contact also invalidates its confirmation preview. Site settings sends
`{ "path": "all" }`. Manual `POST /api/revalidate` requests use
the same JSON body to invalidate one route or every route.
Vercel and Netlify manage CDN invalidation through their Next.js integrations.
Netlify build settings live in [apps/isr/netlify.toml](apps/isr/netlify.toml);
select `apps/isr` as the package directory when connecting the repository.
The app is not deployed by setup.
Use `pnpm typecheck:isr` for its TypeScript check.

## CMS

[`apps/cms`](apps/cms/README.md) is a standalone Payload CMS app backed by
PostgreSQL. It includes administrator accounts, a recipe collection, and five
Globals for Small Bites page content and interface copy. On a fresh content
database, Payload seeds two published recipes and the page copy from Figma.
Restarts preserve existing content and edits. Visitor data is not seeded.

[`packages/cms-types`](packages/cms-types/README.md) provides generated content
types shared by the CMS and future consumer apps. Collection definitions and
database code remain inside the CMS.

Follow the [CMS setup instructions](apps/cms/README.md) to configure `apps/cms/.env`
and use either the local Docker database or another PostgreSQL server. With the
Docker option, run:

```sh
pnpm cms:db:start
pnpm dev:cms
```

Open <http://localhost:3000/admin> to create the first administrator. Future
consumer apps will access the CMS over HTTP and can be deployed independently.

Useful root commands:

| Command | Purpose |
| --- | --- |
| `pnpm dev:cms` | Start the CMS in development |
| `pnpm build:cms` | Build the CMS for production |
| `pnpm start:cms` | Start the production build |
| `pnpm typecheck:cms` | Check CMS TypeScript |
| `pnpm typecheck:cms-types` | Check shared content types without Payload dependencies |
| `pnpm cms:db:start` | Start the local Docker PostgreSQL database |
| `pnpm cms:db:stop` | Stop the local database while retaining data |
| `pnpm cms:seed` | Seed an empty content database; safely skip existing content |
| `pnpm cms:reset-content` | Delete editorial content/history and recreate it from the seed; preserve administrators |
| `pnpm cms:generate:types` | Regenerate Payload types |
| `pnpm cms:generate:importmap` | Regenerate admin component imports |
| `pnpm cms:migrate` | Apply committed database migrations |
| `pnpm cms:migrate:create migration_name` | Generate a schema migration |
