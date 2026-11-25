import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './button'
import { Spinner } from '../feedback/spinner'
const meta = {
  title: 'Actions/Button',
  component: Button,
  args: { children: 'Show more recipes', type: 'button' },
} satisfies Meta<typeof Button>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {(['default', 'outline', 'secondary', 'ghost', 'destructive', 'link'] as const).map(
        (variant) => (
          <Button key={variant} variant={variant}>
            {variant}
          </Button>
        ),
      )}
    </div>
  ),
}
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      {(['xs', 'sm', 'default', 'lg'] as const).map((size) => (
        <Button key={size} size={size}>
          {size}
        </Button>
      ))}
    </div>
  ),
}
export const Disabled: Story = { args: { disabled: true } }
export const Loading: Story = {
  args: {
    disabled: true,
    'aria-busy': true,
    children: (
      <>
        <Spinner aria-hidden="true" />
        Loading recipes
      </>
    ),
  },
}
