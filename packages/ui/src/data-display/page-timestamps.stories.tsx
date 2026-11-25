import type { Meta, StoryObj } from '@storybook/react-vite'
import { PageTimestamps } from './page-timestamps'
const meta = {
  title: 'Data display/PageTimestamps',
  component: PageTimestamps,
  args: {
    createdAt: '2026-11-20T00:00:00Z',
    updatedAt: '2026-11-24T04:30:00Z',
    renderedAt: '2026-11-25T05:00:00Z',
  },
} satisfies Meta<typeof PageTimestamps>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const CreatedOnly: Story = { args: { updatedAt: undefined, renderedAt: undefined } }
export const CustomLabels: Story = {
  args: { labels: { created: 'Published', updated: 'Last edited', rendered: 'Page generated' } },
}
export const MissingDates: Story = {
  args: { createdAt: undefined, updatedAt: undefined, renderedAt: undefined },
}
export const InvalidDate: Story = {
  args: { createdAt: 'invalid', updatedAt: undefined, renderedAt: undefined },
}
