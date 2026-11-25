import type { Meta, StoryObj } from '@storybook/react-vite'
import { TextLink } from '../actions/text-link'
import { PageIntroduction } from '../content/page-introduction'
import { TextSection } from '../content/text-section'
import { PageTimestamps } from '../data-display/page-timestamps'
import { PageContent } from './page-content'

const meta = {
  title: 'Shared layout/PageContent',
  component: PageContent,
  parameters: { layout: 'fullscreen' },
  args: {
    children: (
      <>
        <PageIntroduction
          eyebrow="ABOUT SMALL BITES"
          heading={'Good food.\nA little less overthinking.'}
          description={'A small collection of things worth eating,\nfor people who just want a good meal.'}
        />
        <TextSection
          heading="Nothing fancy. That’s the idea."
          body="Small bites is about everyday food: a reliable bowl of pasta, a better lunch, and simple ingredients that work well together. Short recommendations, a few useful tips, and no long stories before the good part."
        />
        <TextSection
          heading="A small blog, on purpose."
          body="Small Bites is a demo recipe blog, built to explore different ways of rendering the same content with Next.js."
        />
        <TextLink href="#home">← Back to all recommendations</TextLink>
      </>
    ),
    timestamps: (
      <PageTimestamps
        createdAt="2026-11-01T09:05:12Z"
        updatedAt="2026-11-12T14:06:27Z"
        renderedAt="2026-11-15T10:25:43Z"
      />
    ),
  },
} satisfies Meta<typeof PageContent>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Mobile: Story = {
  parameters: {
    viewport: {
      options: {
        figmaMobile: { name: 'Figma mobile', styles: { width: '390px', height: '844px' } },
      },
    },
  },
  globals: { viewport: { value: 'figmaMobile', isRotated: false } },
}
