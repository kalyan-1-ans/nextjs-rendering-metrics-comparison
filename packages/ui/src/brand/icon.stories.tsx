import type { Meta, StoryObj } from '@storybook/react-vite'
import { SearchIcon, ArrowRightIcon, XIcon } from 'lucide-react'
import { Icon } from './icon'
const meta = {
  title: 'Brand and icons/Icon',
  component: Icon,
  args: { icon: SearchIcon },
} satisfies Meta<typeof Icon>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const WithAccessibleLabel: Story = { args: { label: 'Search' } }
export const InterfaceIcons: Story = {
  render: () => (
    <div className="flex gap-6">
      <Icon icon={SearchIcon} label="Search" />
      <Icon icon={ArrowRightIcon} label="Next" />
      <Icon icon={XIcon} label="Close" />
    </div>
  ),
}
