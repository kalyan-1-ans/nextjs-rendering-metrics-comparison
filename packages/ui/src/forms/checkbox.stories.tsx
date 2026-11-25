import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox } from './checkbox'
import { Label } from './label'
const meta = {
  title: 'Forms/Checkbox',
  component: Checkbox,
  decorators: [
    (Story) => (
      <Label>
        <Story />
        Dairy-free
      </Label>
    ),
  ],
} satisfies Meta<typeof Checkbox>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Checked: Story = { args: { defaultChecked: true } }
export const Indeterminate: Story = { args: { indeterminate: true } }
export const Disabled: Story = { args: { disabled: true } }
export const Invalid: Story = { args: { 'aria-invalid': true } }
