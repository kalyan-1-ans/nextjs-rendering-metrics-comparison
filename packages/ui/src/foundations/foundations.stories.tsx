import type { Meta, StoryObj } from '@storybook/react-vite'
import { Heading } from '../typography/heading'
import { Text } from '../typography/text'
import { BrandWordmark } from '../brand/brand-wordmark'
import { BrandIcon } from '../brand/brand-icon'
const meta = { title: 'Foundations/Design tokens' } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>
export const Colors: Story = {
  render: () => (
    <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-5">
      {[
        { token: 'background', name: 'Surface', value: '#FCFBF8' },
        { token: 'foreground', name: 'Ink', value: '#242C26' },
        { token: 'muted-foreground', name: 'Secondary text', value: '#626B64' },
        { token: 'primary', name: 'Accent', value: '#315E43' },
        { token: 'border', name: 'Border', value: '#DCDDD5' },
      ].map((color) => (
        <div key={color.token} className="space-y-2">
          <div
            className="h-20 border border-border"
            style={{ backgroundColor: `var(--${color.token})` }}
          />
          <Text variant="caption">{color.name}</Text>
          <Text variant="caption" tone="muted">
            {color.value}
          </Text>
        </div>
      ))}
    </div>
  ),
}
export const Typography: Story = {
  render: () => (
    <div className="max-w-content space-y-6">
      <Text variant="eyebrow" tone="accent">
        Good food. No fuss.
      </Text>
      <Heading as="h1" size="title">
        A few good things to eat.
      </Heading>
      <Heading>Your next weeknight tomato pasta</Heading>
      <Heading as="h3" size="card">
        Simple food, made well.
      </Heading>
      <Text>Good food, simply put. Body text uses Inter at 17px.</Text>
      <Text variant="caption" tone="muted">
        Supporting copy, links, and metadata use the smaller text scale.
      </Text>
    </div>
  ),
}
export const Spacing: Story = {
  render: () => (
    <div className="space-y-4">
      <Heading size="card">8px spacing rhythm</Heading>
      {[8, 16, 24, 32, 40, 56].map((size) => (
        <div key={size} className="flex items-center gap-4">
          <span className="w-12 text-sm">{size}px</span>
          <div className="h-4 bg-primary" style={{ width: size }} />
        </div>
      ))}
    </div>
  ),
}
export const Brand: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <BrandIcon />
      <BrandWordmark />
    </div>
  ),
}
export const BordersAndFocus: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="max-w-sm border border-border bg-card p-6">
        Square borders and generous spacing.
      </div>
      <a href="#example" className="inline-block text-primary underline underline-offset-4">
        Tab here to inspect the focus outline
      </a>
    </div>
  ),
}
