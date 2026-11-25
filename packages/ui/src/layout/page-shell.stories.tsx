import type { Meta, StoryObj } from '@storybook/react-vite'
import { PageShell } from './page-shell'
import { SiteHeader } from './site-header'
import { SiteFooter } from './site-footer'
import { HeroBanner } from '../content/hero-banner'
const meta = {
  title: 'Shared layout/PageShell',
  component: PageShell,
  parameters: { layout: 'fullscreen' },
  args: {
    header: (
      <SiteHeader
        links={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'Contact us', href: '/contact' },
        ]}
        currentHref="/"
      />
    ),
    children: (
      <HeroBanner
        eyebrow="GOOD FOOD. NO FUSS."
        heading="A few good things to eat."
        description={
          'Simple recommendations for everyday cravings.\nNothing fancy. Just food worth making.'
        }
      />
    ),
    footer: (
      <SiteFooter
        tagline="Small bites. Good food, simply put."
        copyright="A little food blog · 2026"
      />
    ),
  },
} satisfies Meta<typeof PageShell>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
