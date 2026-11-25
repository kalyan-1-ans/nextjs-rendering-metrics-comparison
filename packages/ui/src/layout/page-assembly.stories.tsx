import type { Meta, StoryObj } from '@storybook/react-vite'
import { SiteHeader } from './site-header'
import { SiteFooter } from './site-footer'
import { ContentContainer } from './content-container'
import { PageTimestamps } from '../data-display/page-timestamps'
import { Heading } from '../typography/heading'
import { Text } from '../typography/text'
import { Divider } from '../content/divider'
const meta = {
  title: 'Shared layout/Page assembly',
  parameters: { layout: 'fullscreen' },
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  render: () => (
    <>
      <SiteHeader
        currentHref="/"
        links={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'Contact us', href: '/contact' },
        ]}
      />
      <ContentContainer as="main" id="main-content" tabIndex={-1} className="space-y-6 py-12">
        <Text variant="eyebrow" tone="accent">
          Good food. No fuss.
        </Text>
        <Heading as="h1" size="title">
          A few good things to eat.
        </Heading>
        <Text tone="muted">Simple recommendations for everyday cravings.</Text>
        <Divider />
        <PageTimestamps
          createdAt="2026-11-20T00:00:00Z"
          updatedAt="2026-11-24T04:30:00Z"
          renderedAt="2026-11-25T05:00:00Z"
        />
      </ContentContainer>
      <SiteFooter
        tagline="Small bites. Good food, simply put."
        copyright="A little food blog · 2026"
      />
    </>
  ),
}
