import type { Meta, StoryObj } from '@storybook/react-vite'
import { Radio, RadioGroup } from './radio'
import { Label } from './label'
const meta = {
  title: 'Forms/Radio',
  component: Radio,
  args: { value: 'any' },
} satisfies Meta<typeof Radio>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="any" aria-label="Diet style">
      <Label>
        <Radio value="any" />
        Any
      </Label>
      <Label>
        <Radio value="vegetarian" />
        Vegetarian
      </Label>
      <Label>
        <Radio value="vegan" disabled />
        Vegan (unavailable)
      </Label>
    </RadioGroup>
  ),
}
