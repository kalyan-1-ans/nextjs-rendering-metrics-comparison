import type { Meta, StoryObj } from '@storybook/react-vite'
import { SiteLogo } from './site-logo'

const meta = {
  title: 'Brand and icons/SiteLogo',
  component: SiteLogo,
} satisfies Meta<typeof SiteLogo>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const CustomName: Story = { args: { children: 'Small bites kitchen.' } }
