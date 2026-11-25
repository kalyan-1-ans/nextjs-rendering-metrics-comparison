import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card'
const meta = {
  title: 'Content/Card',
  component: Card,
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>A few good things</CardTitle>
        <CardDescription>A simple content container.</CardDescription>
      </CardHeader>
      <CardContent>Use children to compose the content.</CardContent>
    </Card>
  ),
}
export const Small: Story = { ...Default, args: { size: 'sm' } }
export const WithFooter: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Good food, simply put.</CardTitle>
      </CardHeader>
      <CardContent>Nothing fancy. Just food worth making.</CardContent>
      <CardFooter>Supporting information</CardFooter>
    </Card>
  ),
}
