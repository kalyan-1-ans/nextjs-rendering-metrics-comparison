import type { Meta, StoryObj } from '@storybook/react-vite'
import { useId, type ComponentProps } from 'react'
import { FormField } from './form-field'
import { TextInput } from './text-input'

function FieldExample(args: ComponentProps<typeof FormField>) {
  const id = useId()
  return (
    <FormField {...args} htmlFor={id} className="max-w-sm">
      <TextInput
        id={id}
        type="email"
        autoComplete="email"
        placeholder="alex@example.com"
        aria-invalid={Boolean(args.error)}
        aria-describedby={args.error ? `${id}-error` : undefined}
      />
    </FormField>
  )
}

const meta = {
  title: 'Forms/FormField',
  component: FormField,
  args: { label: 'Email address', htmlFor: 'email-example' },
  render: (args) => <FieldExample {...args} />,
} satisfies Meta<typeof FormField>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Error: Story = { args: { error: 'Please enter a valid email address.' } }
