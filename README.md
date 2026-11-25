# Small Bites

Small Bites is a demo recipe blog built to compare Next.js rendering approaches
and performance metrics using the same content and design. This pnpm workspace
contains the workspace foundation, Oxlint, TypeScript, and an independent Payload
CMS app. The consumer Next.js apps have not been scaffolded.

This is a demo app. Do not add unit tests or end-to-end tests.

## Tech stack

The following is the intended stack for the demo. Listing a tool here does not
mean it has been installed or configured yet.

| Area | Tools |
| --- | --- |
| Monorepo | pnpm |
| Framework | Next.js 16, React 19, Vite |
| Forms, state, and caching | TanStack Form, TanStack Query (React Query), Zustand, Next.js Cache Components |
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
