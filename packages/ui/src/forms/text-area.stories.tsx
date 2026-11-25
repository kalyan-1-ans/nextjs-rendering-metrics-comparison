import type { Meta, StoryObj } from '@storybook/react-vite'
import { useId, type ComponentProps } from 'react'
import { FormField } from './form-field'
import { TextArea } from './text-area'

function TextAreaExample(args: ComponentProps<typeof TextArea>) {
  const id = useId()
  return (
    <FormField label="Message" htmlFor={id} className="max-w-lg">
      <TextArea {...args} id={id} />
    </FormField>
  )
}

const meta = {
  title: 'Forms/TextArea',
  component: TextArea,
  args: { placeholder: 'What’s on your mind?' },
  render: (args) => <TextAreaExample {...args} />,
} satisfies Meta<typeof TextArea>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Large: Story = { args: { size: 'lg' } }
export const Disabled: Story = { args: { disabled: true } }
export const Invalid: Story = { args: { 'aria-invalid': true } }
