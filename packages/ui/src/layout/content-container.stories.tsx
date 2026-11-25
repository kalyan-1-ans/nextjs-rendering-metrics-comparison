import type { Meta, StoryObj } from '@storybook/react-vite'
import { ContentContainer } from './content-container'
const meta = {
  title: 'Shared layout/ContentContainer',
  component: ContentContainer,
  parameters: { layout: 'fullscreen' },
  args: {
    className: 'bg-muted py-8',
    children: 'A centered content area with responsive gutters.',
  },
} satisfies Meta<typeof ContentContainer>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Wide: Story = { args: { width: 'wide' } }
