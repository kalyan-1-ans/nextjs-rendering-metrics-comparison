import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tag } from './tag'
const meta = {
  title: 'Data display/Tag',
  component: Tag,
  args: { children: 'Vegetarian' },
} satisfies Meta<typeof Tag>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
