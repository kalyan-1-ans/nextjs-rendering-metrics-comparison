import type { Meta, StoryObj } from '@storybook/react-vite'
import { SkipLink } from './skip-link'
const meta = { title: 'Accessibility/SkipLink', component: SkipLink } satisfies Meta<
  typeof SkipLink
>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  render: () => (
    <>
      <SkipLink />
      <p className="mb-8 text-sm">
        Press Tab to reveal the skip link, then Enter to jump to the main content.
      </p>
      <main id="main-content" tabIndex={-1}>
        Main content destination
      </main>
    </>
  ),
}
