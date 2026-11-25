import type { Meta, StoryObj } from '@storybook/react-vite'
import { SiteFooter } from './site-footer'
const meta = {
  title: 'Shared layout/SiteFooter',
  component: SiteFooter,
  parameters: { layout: 'fullscreen' },
  args: { tagline: 'Small bites. Good food, simply put.', copyright: 'A little food blog · 2026' },
} satisfies Meta<typeof SiteFooter>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const WithLinks: Story = {
  args: {
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact us', href: '/contact' },
    ],
  },
}
