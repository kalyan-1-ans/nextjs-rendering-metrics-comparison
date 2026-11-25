import type { ComponentProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '#lib/utils'

const textVariants = cva('', {
  variants: {
    variant: {
      body: 'text-body',
      caption: 'text-sm leading-relaxed',
      eyebrow: 'text-xs leading-relaxed font-medium tracking-widest uppercase',
    },
    tone: { default: 'text-foreground', muted: 'text-muted-foreground', accent: 'text-primary' },
  },
  defaultVariants: { variant: 'body', tone: 'default' },
})

export type TextProps = ComponentProps<'p'> &
  VariantProps<typeof textVariants> & {
    as?: 'p' | 'span' | 'div'
  }

export function Text({ as: Tag = 'p', variant, tone, className, ...props }: TextProps) {
  return <Tag className={cn(textVariants({ variant, tone }), className)} {...props} />
}
