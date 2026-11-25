import type { Meta, StoryObj } from '@storybook/react-vite'
import { HeroBanner } from './hero-banner'
const meta = {
  title: 'Content/HeroBanner',
  component: HeroBanner,
  parameters: { layout: 'fullscreen' },
  args: {
    eyebrow: 'GOOD FOOD. NO FUSS.',
    heading: 'A few good things to eat.',
    description:
      'Simple recommendations for everyday cravings.\nNothing fancy. Just food worth making.',
  },
} satisfies Meta<typeof HeroBanner>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const LongContent: Story = {
  args: {
    heading: 'Simple food for the days when you need a little inspiration.',
    description: 'A few thoughtful recommendations.\nIngredients you know, and meals worth making.',
  },
}
