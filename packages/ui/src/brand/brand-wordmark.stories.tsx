import type { Meta, StoryObj } from '@storybook/react-vite'
import { BrandWordmark } from './brand-wordmark'
const meta = { title: 'Brand and icons/BrandWordmark', component: BrandWordmark } satisfies Meta<
  typeof BrandWordmark
>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}

export const CustomName: Story = { args: { children: 'Small bites from the CMS.' } }
