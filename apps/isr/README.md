# Small Bites — on-demand ISR

The first consumer app renders the homepage header, hero, and footer, and the
About and Contact pages from published Payload Globals. The Contact form is UI-only.
All UI comes from `@small-bites/ui`; the app has no custom styles.

## Run locally

Use the repository's Node.js and pnpm versions. From the repository root:

```sh
pnpm install
cp -n apps/isr/.env.example apps/isr/.env.local
pnpm dev:cms
pnpm dev:isr
```

The CMS uses port 3000 and the site uses <http://localhost:3001>. `CMS_URL` is a
server-only origin and must be reachable during both build and regeneration.
The local environment files are ignored by Git.

To observe production caching, use:

```sh
pnpm build:isr
pnpm start:isr
```

Development mode is intended for editing and does not demonstrate production ISR.
Use `pnpm typecheck:isr` for TypeScript checks. No testing tools are configured.

## Content

The homepage reads `site-settings` and `home-page` through `getHomeContent()`
from `@small-bites/cms-data`. The package's `createCMSClient()` creates the
official `@payloadcms/sdk` REST client, typed with the generated `Config` in
`@small-bites/cms-types/generated`. Drafts are excluded, and each request has a
15-second timeout. The shared client reads `process.env.CMS_URL` directly, and
the page imports `server-only`. Shared querying code also supports Pages Router
server-side data functions. The frontend uses HTTP only; it does not initialize
Payload or connect to its database.

- Branding and navigation come from `site-settings.branding` and `.navigation`.
- Hero content comes from `home-page.hero`, preserving authored line breaks.
- Footer copy comes from `site-settings.footer`.
- Page title and description are also derived from the CMS.

Publish Site settings and each page Global before building. Required content is validated by Payload;
the app uses the typed SDK responses directly and lets request errors propagate.
The About page reads `site-settings` and `about-page` through `getAboutContent()`.
Its introduction, text sections, back-link label, metadata description, and timestamp
labels come from Payload. Creation/update dates come from the About Global; the
render time is captured inside the page cache boundary, so it changes when the
cached page regenerates. The existing timestamp component formats dates in
`Australia/Brisbane`.

The Contact page reads `site-settings` and `contact-page` through
`getContactContent()`. It renders the CMS introduction, field labels/placeholders,
submit label, and privacy copy. Name and email appear side by side on larger
screens and stack on mobile. The message field uses the shared `TextArea` atom.
The Contact form itself lives in `src/components/contact-form.tsx`; it composes
the shared `Form`, `FormField`, layout, and control atoms. Field selection and
dummy submission behavior belong to the app; styling stays in the UI package.
Submitting a valid form dispatches its name, email, and message through React
`useActionState` to `src/app/contact/_lib/contact.action.ts`. The dummy Server
Action waits 500ms and returns `{ success: true, data }`. The frontend navigates
to `/contact/confirmation` only after receiving success. Data is received by the
app server and returned in action state; nothing is saved or delivered.
TanStack Form and Zod validate on submit: name/message must contain non-whitespace text, and email
must be present and valid. `noValidate` disables browser validation popups so the
CMS-managed messages appear inline through `FormField`. Controls are marked
`aria-invalid` and linked to their error text. Invalid submissions focus the first
invalid control in name/email/message order after the inline errors render.
The submit button uses the shared loading state while validating, awaiting the
Server Action, or navigating. Actual message delivery remains unimplemented.

`/contact/confirmation` previews the CMS-managed message-received screen and back
link. It is excluded from indexing and is displayed after the dummy submit.
Both Contact routes cache page output and metadata with `cacheLife('max')`.
Both display CMS creation/update dates and a render timestamp captured inside
the page cache boundary, using the shared `PageTimestamps` component.

## Cache the rendered page

Cache Components and partial prefetching are enabled. A file-level `'use cache'`
directive in each completed page file caches its output and CMS-derived metadata.
Both exports use `cacheLife('max')`: background revalidation after 30 days and
expiration after one year, with a five-minute client router stale time. Payload
publishing invalidates the affected path earlier through `revalidatePath()`.

The shared CMS client and `getHomeContent()` have no cache directive. Payload
requests explicitly use `cache: 'no-store'`, so there is no separate persistent
fetch/Data Cache or `unstable_cache`. Each page/metadata cache fill reads fresh
CMS data. Next.js prerenders the complete page so its HTML and RSC output can be
served from the CDN; this uses the framework's caching and invalidation support.

The Next.js config also follows the reference app's security upgrade policy and
manual navigation insights, with Turbopack rooted at this workspace so shared
packages are available. Payload integration and its local media route settings
remain in the separate CMS app.

```text
Publish in Payload
  -> POST /api/revalidate with { path } on each configured consumer
  -> Next.js invalidates that route, or all routes when path is "all"
  -> Vercel or Netlify's Next.js integration invalidates the corresponding CDN content
  -> the next visit regenerates using fresh Payload reads
  -> the generated page is cached again
```

The endpoint accepts POST with a JSON body containing `path`, and requires no
authentication for this demo. An app-relative path invalidates that route;
`"all"` calls `revalidatePath('/', 'layout')` to invalidate all routes under the
root layout. Missing or invalid paths and malformed JSON return 400.

For example, invalidate the homepage:

```sh
curl -X POST http://localhost:3001/api/revalidate \
  -H 'Content-Type: application/json' \
  -d '{"path":"/"}'
```

Or invalidate every route after changing shared site content:

```sh
curl -X POST http://localhost:3001/api/revalidate \
  -H 'Content-Type: application/json' \
  -d '{"path":"all"}'
```

Its response reports `revalidated` and the requested `path`. An acknowledgment
means the requested scope was invalidated; it does not mean regeneration has finished.
If regeneration fails, Next.js retains the last successful cached page.

## Connect Payload publishing

Set this in the CMS environment and restart its process:

```dotenv
ISR_REVALIDATION_URLS=http://localhost:3001/api/revalidate
```

Publishing Home page sends `{ "path": "/" }`; About page sends
`{ "path": "/about" }`. Publishing Contact page sends separate notifications for
`/contact` and `/contact/confirmation`. Publishing Site settings sends
`{ "path": "all" }` because branding, navigation, and footer content are shared
across pages. All use the `revalidateContent(path)` hook factory. Draft-only
saves do not trigger delivery. Failures are logged without blocking publication; retry the
POST manually after restoring the consumer. The hook schedules delivery with Next.js `after()` after the HTTP response, so
Payload has committed the publish before cache invalidation. Standalone CLI or
Local API writes without a Next.js request lifecycle require a manual POST after
the operation completes, using the same path body; the CMS logs that instruction.

To update both deployments, provide both origins:

```dotenv
ISR_REVALIDATION_URLS=https://YOUR-VERCEL-SITE/api/revalidate,https://YOUR-NETLIFY-SITE.netlify.app/api/revalidate
```

Other Globals and recipes do not invalidate these pages. Seeding and migrations
remain owned by the CMS; the app never connects directly to PostgreSQL.

## Hosting

### Vercel

Deploy this app as a Next.js project with root directory `apps/isr` and workspace
packages available. Configure `CMS_URL` to a CMS origin reachable by the build and
runtime. Vercel integrates Next.js route invalidation with its managed ISR/CDN
cache; no custom CDN cache headers or purge token are needed.

### Netlify

Connect this repository and select `apps/isr` as the site's package directory.
Keep the base directory at the repository root so pnpm installs the workspace
dependencies and Netlify reads the root `.nvmrc` and package-manager version.
Netlify reads [netlify.toml](netlify.toml) from the package directory; it sets:

- Build command: `pnpm build:isr`, run from the repository root.
- Publish directory: `apps/isr/.next`, relative to that root.

Set `CMS_URL` in Netlify's environment for both builds and functions, pointing
to the independently deployed CMS. Netlify automatically uses its current
Next.js/OpenNext adapter; keep that managed integration enabled. The adapter
provisions the runtime and coordinates path-based and tag-based revalidation
with the CDN. There is no separate purge helper, purge token, or `next start`
command for this deployment, and the app does not call Netlify's whole-site
purge API.

Configure `ISR_REVALIDATION_URLS` in the CMS with this site's
`https://YOUR-SITE.netlify.app/api/revalidate` endpoint. Publishing Home page
invalidates only `/`; publishing About page invalidates `/about`; publishing
Contact page invalidates `/contact` and `/contact/confirmation`; publishing
Site settings sends `"all"` and invalidates
all routes under the root layout. Other cached routes remain intact for a
single-path request.

Confirm deployed behavior with Netlify's `Cache-Status` header or Vercel's
`x-vercel-cache`: warm a route, publish through Payload, and revisit it. Local
`next start` checks only verify the Next.js cache, not either provider's CDN.
The current homepage is fully cached; partial prefetching is enabled, but no
uncached streaming section is implemented yet.

References: [Next.js Cache Components](https://nextjs.org/docs/app/api-reference/directives/use-cache),
[Vercel ISR](https://vercel.com/docs/incremental-static-regeneration),
[Next.js on Netlify](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/),
and [Netlify monorepos](https://docs.netlify.com/build/configure-builds/monorepos/).
