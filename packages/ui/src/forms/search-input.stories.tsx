import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { SearchInput } from './search-input'
const meta = {
  title: 'Forms/SearchInput',
  component: SearchInput,
  args: {
    value: '',
    onValueChange: () => {},
    'aria-label': 'Search recipes',
    placeholder: 'Search recipes',
  },
} satisfies Meta<typeof SearchInput>
export default meta
type Story = StoryObj<typeof meta>
function SearchExample(args: React.ComponentProps<typeof SearchInput>) {
  const [value, setValue] = useState(args.value)
  return (
    <div className="max-w-md">
      <SearchInput {...args} value={value} onValueChange={setValue} />
    </div>
  )
}
export const Default: Story = { render: (args) => <SearchExample {...args} /> }
export const WithValue: Story = {
  args: { value: 'tomato' },
  render: (args) => <SearchExample {...args} />,
}
export const Disabled: Story = { args: { value: 'tomato', disabled: true } }
export const ReadOnly: Story = { args: { value: 'tomato', readOnly: true } }
