import type { LucideIcon, LucideProps } from 'lucide-react'
import { cn } from '#lib/utils'

export type IconProps = LucideProps & { icon: LucideIcon; label?: string }

export function Icon({ icon: Glyph, label, className, ...props }: IconProps) {
  return (
    <Glyph
      aria-hidden={label ? undefined : true}
      role={label ? 'img' : undefined}
      aria-label={label}
      className={cn('size-4 shrink-0', className)}
      {...props}
    />
  )
}
