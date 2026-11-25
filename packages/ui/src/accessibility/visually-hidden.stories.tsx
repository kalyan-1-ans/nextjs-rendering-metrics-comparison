import type { Meta, StoryObj } from '@storybook/react-vite'
import { VisuallyHidden } from './visually-hidden'
const meta = {
  title: 'Accessibility/VisuallyHidden',
  component: VisuallyHidden,
  args: { children: 'Additional screen-reader context' },
} satisfies Meta<typeof VisuallyHidden>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  render: (args) => (
    <p>
      Visible content.
      <VisuallyHidden {...args} />
    </p>
  ),
}
