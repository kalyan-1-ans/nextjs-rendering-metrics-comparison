import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChoiceChip } from './choice-chip'
import { RadioGroup } from './radio'
const meta = {
  title: 'Forms/ChoiceChip',
  component: ChoiceChip,
  args: { type: 'checkbox', children: 'Dairy-free' },
} satisfies Meta<typeof ChoiceChip>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Selected: Story = { args: { type: 'checkbox', defaultChecked: true } }
export const Disabled: Story = { args: { disabled: true } }
export const SingleChoice: Story = {
  render: () => (
    <RadioGroup defaultValue="any" aria-label="Diet style" className="flex flex-wrap gap-2">
      {['Any', 'Vegetarian', 'Vegan', 'Pescatarian', 'Non-vegetarian'].map((label) => (
        <ChoiceChip key={label} type="radio" value={label.toLowerCase()}>
          {label}
        </ChoiceChip>
      ))}
    </RadioGroup>
  ),
}
export const MultipleChoice: Story = {
  render: () => (
    <fieldset className="space-y-3">
      <legend className="text-sm font-medium">Also free from</legend>
      <div className="flex flex-wrap gap-2">
        <ChoiceChip type="checkbox" name="freeFrom" value="dairy-free">
          Dairy-free
        </ChoiceChip>
        <ChoiceChip type="checkbox" name="freeFrom" value="gluten-free">
          Gluten-free
        </ChoiceChip>
      </div>
    </fieldset>
  ),
}
