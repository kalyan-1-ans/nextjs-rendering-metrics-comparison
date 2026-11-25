import type { Meta, StoryObj } from '@storybook/react-vite'
import { Heading } from '../typography/heading'
import { Text } from '../typography/text'
import { Stack } from './stack'

const meta = {
  title: 'Shared layout/Stack',
  component: Stack,
  args: {
    gap: 'md',
    align: 'stretch',
    children: (
      <>
        <Heading>Good food, simply put.</Heading>
        <Text tone="muted">A few useful ideas for your next meal.</Text>
      </>
    ),
  },
} satisfies Meta<typeof Stack>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const SmallGap: Story = { args: { gap: 'sm' } }
export const Centered: Story = { args: { align: 'center' } }
