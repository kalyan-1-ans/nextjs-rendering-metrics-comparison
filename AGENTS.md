# Agent instructions

- Setup commands and project overview: [README.md](README.md).
- This is a demo app. Follow the intended tech stack in the README; listed tools are not permission to install or scaffold them.
- Keep changes inside this repo; the adjacent `nextjs-payload-cms-example` is read-only.
- Add frameworks, app/package manifests, dependencies, and deployment configuration only when requested.
- Copied skills provide guidance; they do not authorize scaffolding.
- Do not add ESLint, unit tests, end-to-end tests, testing tools, or test files. Do not run tests. Playwright is planned for metrics collection, not end-to-end tests.
- Place future apps in `apps/` and shared packages in `packages/`.
- Future package TypeScript configs should extend `tsconfig.base.json`.

## Framework documentation

- Use Context7 for library, framework, and API guidance, requesting the installed version. If that version is unavailable, verify differences against the installed documentation and types.
- For Next.js work, follow the app's `AGENTS.md` and read the relevant version-matched guide in its `node_modules/next/dist/docs/` before changing code.

## Validation

- Rely on the CMS schema and generated types for required content. Do not duplicate schema validation with field-by-field presence checks, defensive optional chaining, or fallback content unless handling a known runtime case.
- Keep necessary validation for configuration, untrusted input, and external request failures; do not repeat checks already handled by the SDK or framework.

## ISR caching

- In `apps/isr`, keep Cache Components enabled and cache CMS-driven page output and metadata with a page-file `'use cache'` directive and explicit `cacheLife('max')` calls. Do not use the legacy `dynamic` or `revalidate` route exports.
- Keep CMS requests at `cache: 'no-store'` through `@small-bites/cms-data`; do not add separate persistent caching to CMS clients or data-fetching helpers.
- Use Payload publishing to trigger `revalidatePath()` for the supplied path, or root-layout invalidation for `"all"` after shared site content changes. Vercel and Netlify handle CDN invalidation through their Next.js integrations; do not add site-wide CDN purges for individual page updates. The `max` profile remains a time-based backstop.
- Preserve automatic Next.js cache headers and the Vercel/Netlify behavior documented in [apps/isr/README.md](apps/isr/README.md). Other rendering-comparison apps may use different strategies.

## Design system

- All app-authored visual design in `apps/`, including layout, typography, spacing, and responsive behavior, must come from `@small-bites/ui` in `packages/ui`.
- Do not add app-specific CSS, Sass, CSS Modules, CSS-in-JS, Tailwind utility classes, inline styles, or styling overrides through `className` or `style` props in apps.
- App stylesheets may only import design-system styles/fonts and framework-required styles; do not define custom CSS rules or override design tokens in apps.
- Add missing styles, tokens, component variants, and layouts to `packages/ui` first. Apps compose the design system through its public component props, children, and slots.
