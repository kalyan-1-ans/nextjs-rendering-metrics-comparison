import type { Meta, StoryObj } from '@storybook/react-vite'
import { PageIntroduction } from './page-introduction'

const meta = {
  title: 'Content/PageIntroduction',
  component: PageIntroduction,
  args: {
    eyebrow: 'ABOUT SMALL BITES',
    heading: 'Good food.\nA little less overthinking.',
    description: 'A small collection of things worth eating,\nfor people who just want a good meal.',
  },
} satisfies Meta<typeof PageIntroduction>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
