import type { Meta, StoryObj } from '@storybook/react-vite'
import { SearchIcon } from 'lucide-react'
import { IconButton } from './icon-button'
const meta = {
  title: 'Actions/IconButton',
  component: IconButton,
  args: { 'aria-label': 'Search recipes', children: <SearchIcon aria-hidden="true" /> },
} satisfies Meta<typeof IconButton>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Loading: Story = { args: { loading: true } }
export const Disabled: Story = { args: { disabled: true } }
