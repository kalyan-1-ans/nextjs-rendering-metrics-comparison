import type { Meta, StoryObj } from '@storybook/react-vite'
import { TextSection } from './text-section'

const meta = {
  title: 'Content/TextSection',
  component: TextSection,
  args: {
    heading: 'Nothing fancy. That’s the idea.',
    body: 'Small bites is about everyday food: a reliable bowl of pasta, a better lunch, and simple ingredients that work well together. Short recommendations, a few useful tips, and no long stories before the good part.',
  },
} satisfies Meta<typeof TextSection>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
