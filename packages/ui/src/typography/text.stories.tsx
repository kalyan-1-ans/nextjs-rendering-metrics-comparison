import type { Meta, StoryObj } from '@storybook/react-vite'
import { Text } from './text'
const meta = {
  title: 'Typography/Text',
  component: Text,
  args: { children: 'Good food, simply put.' },
} satisfies Meta<typeof Text>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Muted: Story = { args: { tone: 'muted' } }
export const Caption: Story = { args: { variant: 'caption' } }
export const Eyebrow: Story = {
  args: { variant: 'eyebrow', tone: 'accent', children: 'Good food. No fuss.' },
}
