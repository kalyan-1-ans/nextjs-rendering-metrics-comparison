# Small Bites UI

Private React 19 workspace package: `@small-bites/ui`. Small Bites foundations,
components, and shared layout use Tailwind CSS v4 and Base UI-backed shadcn source.
Vite powers Storybook; consumers import TypeScript source without building a
separate JavaScript library.

## Develop

Use the root Node.js and pnpm versions. From the repository root:

```sh
pnpm install
pnpm storybook
pnpm typecheck:ui
pnpm build:storybook
```

Storybook runs on port 6006. Its production output is `storybook-static/` in this
package. Stories are component documentation and manual examples, with no testing
addons, interaction test functions, or test runner.

## Use in a future Next.js app

Add `"@small-bites/ui": "workspace:*"` to the app's dependencies and configure
`transpilePackages: ['@small-bites/ui']` in its Next.js configuration. The app
needs Tailwind v4's PostCSS integration to process the shared CSS.

Import the shared stylesheet once from the app's root stylesheet:

```css
@import '@small-bites/ui/styles.css';
/* Optional bundled, self-hosted Inter and Noto Serif fonts. */
@import '@small-bites/ui/fonts.css';
```

This stylesheet includes Tailwind's reset and utilities; avoid a second
`@import 'tailwindcss'`. Font, theme, and other visual changes belong in this
package; apps must not add custom styling or override design tokens. All font
files remain local; no browser request to Google Fonts is required. The stylesheet
supplies the existing light theme only.

Use individual component entry points:

```tsx
import { Button } from '@small-bites/ui/actions/button'
import { Heading } from '@small-bites/ui/typography/heading'
import { ContentContainer } from '@small-bites/ui/layout/content-container'

export default function Page() {
  return (
    <ContentContainer as="main" id="main-content" tabIndex={-1}>
      <Heading as="h1" size="title">
        A few good things to eat.
      </Heading>
      <Button type="submit">Search recipes</Button>
    </ContentContainer>
  )
}
```

Static components and layout are server-compatible. Interactive components have their own
`'use client'` boundary; use event handlers and controlled state from a client
component. There is no package-wide client boundary or barrel export. Storybook
builds a browser application and may report RSC directive warnings from its
bundler; the source files imported by Next.js retain those directives.

## Foundations

The Figma palette is surface `#FCFBF8`, ink `#242C26`, muted text `#626B64`, accent
`#315E43`, and border `#DCDDD5`. Noto Serif headings and Inter body text follow an
8px spacing rhythm. CSS semantic tokens cover colors, typography, borders, focus,
widths, and radii. Tailwind's responsive breakpoints and 4px spacing step support
the design's 8px rhythm and smaller control details. Motion respects
`prefers-reduced-motion`.

Default content and wide containers have readable widths of 45rem and 70rem,
with responsive gutters outside that width. Interactive input borders use a darker
token than decorative dividers.

## Component categories

Source folders, public import paths, and Storybook use functional categories:

| Category        | Import prefix    | Components                                                                                     |
| --------------- | ---------------- | ---------------------------------------------------------------------------------------------- |
| Brand and icons | `brand/`         | `SiteLogo`, `BrandWordmark`, `BrandIcon`, `Icon`                                               |
| Typography      | `typography/`    | `Heading`, `Text`                                                                              |
| Actions         | `actions/`       | `Button`, `IconButton`, `TextLink`                                                             |
| Forms           | `forms/`         | `Label`, `TextInput`, `SearchInput`, `Select`, `Radio`, `RadioGroup`, `Checkbox`, `ChoiceChip` |
| Content         | `content/`       | `Card`, `Divider`, `HeroBanner`                                                                |
| Data display    | `data-display/`  | `Tag`, `PageTimestamps`                                                                        |
| Feedback        | `feedback/`      | `Skeleton`, `Spinner`                                                                          |
| Accessibility   | `accessibility/` | `SkipLink`, `VisuallyHidden`                                                                   |
| Shared layout   | `layout/`        | `ContentContainer`, `SiteHeader`, `SiteFooter`, `PageShell`                                    |

For example, import `SearchInput` from `@small-bites/ui/forms/search-input`
and `PageTimestamps` from `@small-bites/ui/data-display/page-timestamps`.
The former `atoms/*` entry points and `layout/page-timestamps` have been replaced
by these category paths. There is no `Atoms` group in Storybook.

- `HeroBanner` receives `eyebrow`, `heading`, and `description`, preserving line breaks.
  It owns hero spacing and responsive typography; apps supply only the copy.
- `BrandWordmark` accepts a string as `children` for CMS-managed branding, with
  the existing Small Bites text as its default.
- `SiteLogo` always combines `BrandIcon` and `BrandWordmark`, including their
  alignment and spacing. Pass a string as `children` for CMS-managed branding.
- `Heading` separates semantic level (`as`) from visual size. `Text` supports
  body, caption, and eyebrow variants with default, muted, and accent tones.
- `IconButton` requires `aria-label`. Interface `Icon` uses Lucide and is
  decorative unless given `label`. Give `BrandIcon` `alt=""` beside the wordmark.
- `SearchInput` is controlled with `value` and `onValueChange`. Its clear action
  restores input focus. Supply a visible label or `aria-label`. Search queries
  and suggestions belong to the app.
- `Radio` and radio `ChoiceChip` belong inside the exported `RadioGroup`.
  `ChoiceChip type="checkbox"` supports independent selections through
  `checked`/`onCheckedChange` or `defaultChecked`. Label groups with a legend or
  `aria-label` and use `Label` for standalone radios and checkboxes.
- `Select` exports its trigger, value, content, item, group, label, and separator
  parts. Supply its accessible label on `SelectTrigger` and map option labels
  through the Base UI `items` prop. The popup is portaled above page content.
- `Card` has optional header, title, description, content, action, and footer
  parts. It is a visual container; add explicit links or buttons for actions.
- Base UI state-dependent `className` callbacks remain supported for styling
  within the design system. Apps use public variants and composition instead of
  styling overrides. Native props, ARIA attributes, and React 19 refs are forwarded.

## Shared layout

- `PageShell`: `header`, `children`, and `footer` slots with optional
  `mainContentId`. It supplies the main landmark, skip-link destination, and
  viewport-height layout without app-authored styling.
- `ContentContainer`: `as="div" | "main" | "section"`, and
  `width="content" | "wide"`, plus native element props.
- `SiteHeader`: required `links` (`{ label, href }[]`); optional `currentHref`,
  `homeHref`, `brand` slot, `navigationLabel`, `skipLinkLabel`, and
  `mainContentId`. The app supplies its active route. Native anchors work without
  a router dependency. Its default brand is `SiteLogo`; use
  `brand={<SiteLogo>{siteName}</SiteLogo>}` for a CMS-managed name. Point the skip
  link at a main element with `tabIndex={-1}`.
- `SiteFooter`: required `tagline` and `copyright` content; optional footer
  `links` and `navigationLabel`. The app supplies the copyright year.

Layouts do not import Payload, Next.js routing, or data-fetching code. The first
ISR app composes the shared shell and hero with the existing header and footer;
recipe browsing and personalized sections remain future work.

## Data display

- `PageTimestamps`: optional ISO `createdAt`, `updatedAt`, and `renderedAt`
  strings plus label overrides. Missing or invalid dates are omitted. Values are
  formatted consistently in `en-AU` and `Australia/Brisbane` on server and client.
  The app supplies rendering time; the component never reads the current clock.

## Original brand assets

`src/assets/brand/icon.svg` and `favicon.svg` are the supplied originals, copied
unchanged. `BrandIcon` renders the icon; Storybook uses the favicon and brand
symbol. Raw files are exported at `@small-bites/ui/assets/brand/*`.

For a future Next.js app, copy the shared `favicon.svg` to `src/app/icon.svg`.
Next.js discovers it as file-based metadata. Keep the shared asset as the source
when updating app copies. SVG assets are not `.ico` files and must not be renamed
to `favicon.ico` without conversion.

## Adding components

`components.json` configures Base UI (`base-nova`) and package-local aliases.
The `#components/*` alias resolves from `src/`, including category paths.
Always choose the component's functional category with `--path`; for example,
from the repository root:

```sh
pnpm --filter @small-bites/ui exec shadcn add COMPONENT --path src/forms --dry-run
```

Review the dry run before removing `--dry-run`. Use `src/actions`, `src/content`,
or another category when appropriate. The CLI has one default UI alias; update
generated imports to their category paths, including imports of dependencies
installed in another category. Adapt the source to the shared tokens, public names,
and client boundaries. Do not overwrite existing customized components. Generated
Base UI state class-name callbacks should use the local `mergeClassNames` helper.

The initial Button, Card, Input, Checkbox, RadioGroup, Select, Label, Skeleton,
and Spinner source was generated with shadcn 4.23.0 from its `base-nova` registry,
then customized. shadcn/ui is MIT-licensed; see `LICENSE.shadcn`.

The project Tailwind skill is pinned with provenance under
`.agents/skills/tailwind-design-system`. Base UI, the Figma design, and the root
repository instructions take precedence over its generic Radix examples.
