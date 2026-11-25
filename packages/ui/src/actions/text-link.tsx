import type { ComponentProps, ComponentType } from 'react'
import { cn } from '#lib/utils'

export type TextLinkProps = ComponentProps<'a'> & {
  href: string
  linkComponent?: 'a' | ComponentType<ComponentProps<'a'> & { href: string }>
}

export function TextLink({
  children,
  className,
  linkComponent: Link = 'a',
  ...props
}: TextLinkProps) {
  return (
    <Link
      className={cn(
        'text-primary no-underline decoration-primary/40 underline-offset-4 transition-colors hover:underline hover:decoration-primary aria-[current=page]:font-semibold',
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  )
}
