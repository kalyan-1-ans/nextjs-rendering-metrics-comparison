import type { Meta, StoryObj } from '@storybook/react-vite'
import { TextLink } from './text-link'
const meta = {
  title: 'Actions/TextLink',
  component: TextLink,
  args: { href: '#recipe', children: 'Read recommendation →' },
} satisfies Meta<typeof TextLink>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Current: Story = { args: { 'aria-current': 'page', children: 'Home' } }
