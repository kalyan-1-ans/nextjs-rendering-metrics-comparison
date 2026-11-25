import type { Meta, StoryObj } from '@storybook/react-vite'
import { useId, type ComponentProps } from 'react'
import { TextInput } from './text-input'
import { Label } from './label'

function InputExample(args: ComponentProps<typeof TextInput>) {
  const id = useId()
  const invalid = Boolean(args['aria-invalid'])
  return (
    <div className="max-w-sm space-y-3">
      <Label htmlFor={id}>Email</Label>
      <TextInput {...args} id={id} aria-describedby={invalid ? `${id}-error` : undefined} />
      {invalid ? (
        <p id={`${id}-error`} className="text-sm text-destructive">
          Enter a valid email address.
        </p>
      ) : null}
    </div>
  )
}
const meta = {
  title: 'Forms/TextInput',
  component: TextInput,
  args: { type: 'email', placeholder: 'you@example.com' },
  render: (args) => <InputExample {...args} />,
} satisfies Meta<typeof TextInput>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Disabled: Story = { args: { disabled: true } }
export const Invalid: Story = { args: { 'aria-invalid': true } }
