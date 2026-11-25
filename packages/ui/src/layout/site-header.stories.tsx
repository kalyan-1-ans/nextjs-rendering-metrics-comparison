import type { Meta, StoryObj } from '@storybook/react-vite'
import { useId, type ComponentProps } from 'react'
import { ContentContainer } from './content-container'
import { SiteHeader } from './site-header'
import { BrandIcon } from '../brand/brand-icon'
import { BrandWordmark } from '../brand/brand-wordmark'
const meta = {
  title: 'Shared layout/SiteHeader',
  component: SiteHeader,
  parameters: { layout: 'fullscreen' },
  args: {
    currentHref: '/',
    links: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Contact us', href: '/contact' },
    ],
  },
} satisfies Meta<typeof SiteHeader>
export default meta
type Story = StoryObj<typeof meta>
function HeaderExample(args: ComponentProps<typeof SiteHeader>) {
  const id = useId()
  return (
    <>
      <SiteHeader {...args} mainContentId={id} />
      <ContentContainer as="main" id={id} tabIndex={-1} className="py-8">
        Main content
      </ContentContainer>
    </>
  )
}
export const Default: Story = { render: (args) => <HeaderExample {...args} /> }
export const WithBrandIcon: Story = {
  ...Default,
  args: {
    brand: (
      <span className="flex items-center gap-3">
        <BrandIcon alt="" />
        <BrandWordmark />
      </span>
    ),
  },
}
