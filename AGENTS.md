# Agent instructions

- Setup commands and project overview: [README.md](README.md).
- This is a demo app. Follow the intended tech stack in the README; listed tools are not permission to install or scaffold them.
- Keep changes inside this repo; the adjacent `nextjs-payload-cms-example` is read-only.
- Add frameworks, app/package manifests, dependencies, and deployment configuration only when requested.
- Copied skills provide guidance; they do not authorize scaffolding.
- Do not add ESLint, unit tests, end-to-end tests, testing tools, or test files. Do not run tests. Playwright is planned for metrics collection, not end-to-end tests.
- Place future apps in `apps/` and shared packages in `packages/`.
- Future package TypeScript configs should extend `tsconfig.base.json`.

## Design system

- All app-authored visual design in `apps/`, including layout, typography, spacing, and responsive behavior, must come from `@small-bites/ui` in `packages/ui`.
- Do not add app-specific CSS, Sass, CSS Modules, CSS-in-JS, Tailwind utility classes, inline styles, or styling overrides through `className` or `style` props in apps.
- App stylesheets may only import design-system styles/fonts and framework-required styles; do not define custom CSS rules or override design tokens in apps.
- Add missing styles, tokens, component variants, and layouts to `packages/ui` first. Apps compose the design system through its public component props, children, and slots.
