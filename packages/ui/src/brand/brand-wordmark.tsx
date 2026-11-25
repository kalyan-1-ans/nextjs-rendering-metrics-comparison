import type { ComponentProps } from 'react'
import { cn } from '#lib/utils'

export type BrandWordmarkProps = Omit<ComponentProps<'span'>, 'children'> & { children?: string }

export function BrandWordmark({
  children = 'Small bites.',
  className,
  ...props
}: BrandWordmarkProps) {
  return (
    <span
      className={cn(
        'whitespace-nowrap font-serif text-2xl leading-tight text-foreground',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
