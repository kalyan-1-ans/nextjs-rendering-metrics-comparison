import type { ComponentProps } from 'react'
import { cn } from '#lib/utils'

export function BrandWordmark({ className, ...props }: Omit<ComponentProps<'span'>, 'children'>) {
  return (
    <span
      className={cn(
        'whitespace-nowrap font-serif text-2xl leading-tight text-foreground',
        className,
      )}
      {...props}
    >
      Small bites.
    </span>
  )
}
