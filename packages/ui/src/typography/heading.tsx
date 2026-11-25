import type { ComponentProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '#lib/utils'

const headingVariants = cva('font-serif font-normal text-foreground text-balance', {
  variants: {
    size: {
      title: 'text-3xl leading-tight sm:text-title',
      section: 'text-section',
      card: 'text-xl leading-snug',
    },
  },
  defaultVariants: { size: 'section' },
})

export type HeadingProps = ComponentProps<'h2'> &
  VariantProps<typeof headingVariants> & {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  }

export function Heading({ as: Tag = 'h2', size, className, ...props }: HeadingProps) {
  return <Tag className={cn(headingVariants({ size }), className)} {...props} />
}
