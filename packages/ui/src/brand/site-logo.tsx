import type { ComponentProps } from 'react'
import { BrandIcon } from './brand-icon'
import { BrandWordmark } from './brand-wordmark'
import { cn } from '#lib/utils'

export type SiteLogoProps = Omit<ComponentProps<'span'>, 'children'> & { children?: string }

export function SiteLogo({ children, className, ...props }: SiteLogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-3', className)} {...props}>
      <BrandIcon alt="" />
      <BrandWordmark>{children}</BrandWordmark>
    </span>
  )
}
