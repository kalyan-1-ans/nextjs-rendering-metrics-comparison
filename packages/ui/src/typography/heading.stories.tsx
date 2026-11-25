import type { Meta, StoryObj } from '@storybook/react-vite'
import { Heading } from './heading'
const meta = {
  title: 'Typography/Heading',
  component: Heading,
  args: { children: 'A few good things to eat.' },
} satisfies Meta<typeof Heading>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Hero: Story = { args: { as: 'h1', size: 'hero' } }
export const Title: Story = { args: { as: 'h1', size: 'title' } }
export const Page: Story = {
  args: { as: 'h1', size: 'page', children: 'Good food. A little less overthinking.' },
}
export const Card: Story = { args: { as: 'h3', size: 'card' } }
