import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './button'
const meta = {
  title: 'Actions/Button',
  component: Button,
  args: { children: 'Show more recipes', type: 'button' },
} satisfies Meta<typeof Button>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Compact: Story = { args: { fullWidthOnMobile: false } }
export const Mobile: Story = {
  parameters: {
    viewport: {
      options: {
        mobile: { name: 'Mobile', styles: { width: '390px', height: '844px' } },
      },
    },
  },
  globals: { viewport: { value: 'mobile', isRotated: false } },
}
export const CompactOnMobile: Story = {
  ...Mobile,
  args: { fullWidthOnMobile: false },
}
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
    loading: true,
    children: 'Loading recipes',
  },
}
