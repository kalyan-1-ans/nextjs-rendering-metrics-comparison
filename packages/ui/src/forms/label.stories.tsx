import type { Meta, StoryObj } from '@storybook/react-vite'
import { Label } from './label'
import { TextInput } from './text-input'
const meta = {
  title: 'Forms/Label',
  component: Label,
  args: { htmlFor: 'label-example', children: 'Your name' },
} satisfies Meta<typeof Label>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  render: (args) => (
    <div className="max-w-sm space-y-3">
      <Label {...args} />
      <TextInput id="label-example" autoComplete="name" />
    </div>
  ),
}
