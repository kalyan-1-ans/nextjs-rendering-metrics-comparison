# Shared CMS data

`@small-bites/cms-data` provides the typed Payload REST client and shared Small
Bites content queries. Apps consume the TypeScript source directly; there is no
separate package build. Generated types remain in `@small-bites/cms-types`.

## Usage

```ts
import { getHomeContent } from '@small-bites/cms-data'

const { settings, home } = await getHomeContent()
```

- `createCMSClient()` reads and validates `process.env.CMS_URL` and creates the
  official Payload SDK client, typed with the generated `Config`. Requests use
  `cache: 'no-store'` and receive a fresh 15-second timeout each time.
- `getHomeContent()` creates a client and reads published `site-settings` and
  `home-page` Globals in parallel, with relationship depth set to zero.
- `getAboutContent()` reads published `site-settings` and `about-page` Globals
  with the same uncached, parallel request pattern.
- `CMSClient` exports the shared client type for additional content queries.

## Router integration

Shared code is Node.js TypeScript with no Next.js imports, `server-only` marker,
or caching directives. Configure `CMS_URL` in each consuming app's environment;
Next.js loads that app's `.env` files. The shared client reads the variable when
called, rather than at module initialization. Each app owns server boundaries,
page caching, and publish revalidation. No request goes directly to the CMS database.

The App Router consumer in `apps/isr/src/app/page.tsx` imports `server-only` and
calls the shared query directly. The page keeps `'use cache'` and
`cacheLife('max')` around rendered output and metadata, rather than caching the
shared query.

Pages Router consumers can use the same package in `getStaticProps()` or
`getServerSideProps()`:

```ts
import { getHomeContent } from '@small-bites/cms-data'

export async function getStaticProps() {
  return { props: await getHomeContent() }
}
```

Add `@small-bites/cms-data` to the consuming app's workspace dependencies.
Keep imports and calls within the app's server-side data flow.

Run `pnpm typecheck:cms-data` from the repository root to check this package.
