import type { Meta, StoryObj } from '@storybook/react-vite'
import { useId, type ComponentProps } from 'react'
import { ContentContainer } from '../layout/content-container'
import { Button } from '../actions/button'
import { Form, FormRow } from './form'
import { Stack } from '../layout/stack'
import { FormField } from './form-field'
import { TextInput } from './text-input'
import { TextArea } from './text-area'
import { Text } from '../typography/text'

function FormExample(args: ComponentProps<typeof Form>) {
  const id = useId()
  return (
    <ContentContainer>
      <Form {...args} aria-describedby={`${id}-description`}>
        <FormRow>
          <FormField label="Name" htmlFor={`${id}-name`}>
            <TextInput id={`${id}-name`} name="name" autoComplete="name" size="lg" required />
          </FormField>
          <FormField label="Email" htmlFor={`${id}-email`}>
            <TextInput id={`${id}-email`} name="email" type="email" autoComplete="email" size="lg" required />
          </FormField>
        </FormRow>
        <FormField label="About you" htmlFor={`${id}-bio`}>
          <TextArea id={`${id}-bio`} name="bio" size="lg" rows={5} />
        </FormField>
        <Stack gap="sm" align="start">
          <Button type="submit" size="lg">Save details</Button>
          <Text id={`${id}-description`} variant="caption" tone="muted">
            This example does not save your details.
          </Text>
        </Stack>
      </Form>
    </ContentContainer>
  )
}

const meta = {
  title: 'Forms/Form',
  component: Form,
  args: {
    'aria-label': 'Example form',
    onSubmit: (event) => event.preventDefault(),
  },
  render: (args) => <FormExample {...args} />,
} satisfies Meta<typeof Form>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Mobile: Story = {
  parameters: {
    viewport: {
      options: {
        mobile: { name: 'Mobile', styles: { width: '390px', height: '844px' } },
      },
    },
  },
  globals: { viewport: { value: 'mobile', isRotated: false } },
}
