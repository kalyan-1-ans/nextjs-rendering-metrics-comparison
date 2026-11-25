import type { ComponentProps } from 'react'
import { cn } from '#lib/utils'

export function SkipLink({
  href = '#main-content',
  children = 'Skip to main content',
  className,
  ...props
}: ComponentProps<'a'>) {
  return (
    <a
      href={href}
      className={cn(
        'sr-only z-100 bg-primary px-4 py-3 text-primary-foreground focus:not-sr-only focus:fixed focus:top-4 focus:left-4',
        className,
      )}
      {...props}
    >
      {children}
    </a>
  )
}
