# Next.js rendering metrics comparison

A pnpm workspace for comparing Next.js rendering approaches and performance
metrics. Contains the workspace foundation, Oxlint, TypeScript, and an independent
Payload CMS app. The consumer Next.js apps have not been scaffolded.

This is a demo app. Do not add unit tests or end-to-end tests.

## Tech stack

The following is the intended stack for the demo. Listing a tool here does not
mean it has been installed or configured yet.

| Area | Tools |
| --- | --- |
| Monorepo | pnpm |
| Framework | Next.js 16, React 19 |
| Forms, state, and caching | TanStack Form, TanStack Query (React Query), Zustand, Next.js Cache Components |
| CMS | Payload CMS |
| Database | PostgreSQL |
| UI | Tailwind CSS, shadcn/ui |
| Coding agents | Cursor, Codex |
| Skills and MCP | Vercel, Payload |
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

## CMS

[`apps/cms`](apps/cms/README.md) is a standalone Payload CMS app backed by
PostgreSQL. It includes administrator accounts, a recipe collection, and five
Globals for Small Bites page content and interface copy. Schemas are configured;
no recipes, page copy, or visitor data are seeded.

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
| `pnpm cms:generate:types` | Regenerate Payload types |
| `pnpm cms:generate:importmap` | Regenerate admin component imports |
| `pnpm cms:migrate` | Apply committed database migrations |
| `pnpm cms:migrate:create migration_name` | Generate a schema migration |
