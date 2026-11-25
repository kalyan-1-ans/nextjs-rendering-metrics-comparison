import type { ComponentProps } from 'react'
import { cn } from '#lib/utils'

export function Tag({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      className={cn(
        'inline-flex items-center border border-border bg-muted px-2 py-1 text-xs text-foreground',
        className,
      )}
      {...props}
    />
  )
}
