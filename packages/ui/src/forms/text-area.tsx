import type { ComponentProps } from 'react'
import { cn } from '#lib/utils'

export type TextAreaProps = ComponentProps<'textarea'> & {
  size?: 'default' | 'lg'
}

export function TextArea({ className, size = 'default', ...props }: TextAreaProps) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'block min-h-36 w-full min-w-0 resize-y rounded-lg border border-input bg-transparent px-3 py-2 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20',
        size === 'lg' ? 'h-36 px-4 py-3 sm:text-sm' : undefined,
        className,
      )}
      {...props}
    />
  )
}
