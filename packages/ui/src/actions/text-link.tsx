import type { ComponentProps } from 'react'
import { cn } from '#lib/utils'

export function TextLink({ className, ...props }: ComponentProps<'a'>) {
  return (
    <a
      className={cn(
        'text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:decoration-primary aria-[current=page]:font-semibold',
        className,
      )}
      {...props}
    />
  )
}
