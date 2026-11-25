import type { ComponentProps, ReactNode } from 'react'
import { SiteLogo } from '../brand/site-logo'
import { SkipLink } from '../accessibility/skip-link'
import { ContentContainer } from './content-container'
import { cn } from '#lib/utils'

export interface NavigationItem {
  label: string
  href: string
}
export type SiteHeaderProps = ComponentProps<'header'> & {
  links: readonly NavigationItem[]
  currentHref?: string
  homeHref?: string
  brand?: ReactNode
  navigationLabel?: string
  skipLinkLabel?: string
  mainContentId?: string
}

export function SiteHeader({
  links,
  currentHref,
  homeHref = '/',
  brand = <SiteLogo />,
  navigationLabel = 'Main navigation',
  skipLinkLabel = 'Skip to main content',
  mainContentId = 'main-content',
  className,
  ...props
}: SiteHeaderProps) {
  return (
    <header className={cn('py-6 sm:py-8', className)} {...props}>
      <SkipLink href={`#${mainContentId}`}>{skipLinkLabel}</SkipLink>
      <ContentContainer className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
        <a href={homeHref}>{brand}</a>
        <nav aria-label={navigationLabel}>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            {links.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  aria-current={href === currentHref ? 'page' : undefined}
                  className="text-muted-foreground underline-offset-8 hover:text-primary hover:underline aria-[current=page]:text-primary aria-[current=page]:underline"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </ContentContainer>
    </header>
  )
}
