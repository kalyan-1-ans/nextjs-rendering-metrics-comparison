import type { Meta, StoryObj } from '@storybook/react-vite'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './select'
const meta = { title: 'Forms/Select', component: Select } satisfies Meta<typeof Select>
export default meta
type Story = StoryObj<typeof meta>
const options = [
  { value: 'newest', label: 'Newest first' },
  { value: 'quickest', label: 'Quickest first' },
]
function SortExample({ disabled = false }: { disabled?: boolean }) {
  return (
    <Select items={options} defaultValue="newest" disabled={disabled}>
      <SelectTrigger aria-label="Sort recipes">
        <SelectValue />
      </SelectTrigger>
      <SelectContent alignItemWithTrigger={false}>
        {options.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
export const Default: Story = { render: () => <SortExample /> }
export const Disabled: Story = { render: () => <SortExample disabled /> }
