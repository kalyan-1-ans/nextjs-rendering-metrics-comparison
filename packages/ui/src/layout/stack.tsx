import type { ComponentProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '#lib/utils'

const stackVariants = cva('flex flex-col', {
  variants: {
    gap: {
      none: 'gap-0',
      xs: 'gap-2',
      sm: 'gap-3.5',
      md: 'gap-6',
      lg: 'gap-8',
      xl: 'gap-12 sm:gap-16',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
    },
  },
  defaultVariants: { gap: 'md', align: 'stretch' },
})

export type StackProps = ComponentProps<'div'> & VariantProps<typeof stackVariants>

export function Stack({ gap, align, className, ...props }: StackProps) {
  return <div className={cn(stackVariants({ gap, align }), className)} {...props} />
}
