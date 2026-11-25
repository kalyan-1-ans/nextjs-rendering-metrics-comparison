import type { Meta, StoryObj } from '@storybook/react-vite'
import { BrandIcon } from './brand-icon'
const meta = { title: 'Brand and icons/BrandIcon', component: BrandIcon } satisfies Meta<
  typeof BrandIcon
>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Decorative: Story = { args: { alt: '' } }
