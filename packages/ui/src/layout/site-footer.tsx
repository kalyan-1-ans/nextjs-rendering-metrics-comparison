import type { ComponentProps, ReactNode } from 'react'
import { ContentContainer } from './content-container'
import { TextLink } from '../actions/text-link'
import type { NavigationItem } from './site-header'
import { cn } from '#lib/utils'

export type SiteFooterProps = ComponentProps<'footer'> & {
  tagline: ReactNode
  copyright: ReactNode
  links?: readonly NavigationItem[]
  navigationLabel?: string
}

export function SiteFooter({
  tagline,
  copyright,
  links = [],
  navigationLabel = 'Footer navigation',
  className,
  ...props
}: SiteFooterProps) {
  return (
    <footer className={cn('py-8 text-sm text-muted-foreground', className)} {...props}>
      <ContentContainer>
        <div className="flex flex-col justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-start">
          <div className="space-y-3">
            <p>{tagline}</p>
            {links.length ? (
              <nav aria-label={navigationLabel}>
                <ul className="flex flex-wrap gap-x-5 gap-y-2">
                  {links.map(({ href, label }) => (
                    <li key={href}>
                      <TextLink href={href}>{label}</TextLink>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}
          </div>
          <p>{copyright}</p>
        </div>
      </ContentContainer>
    </footer>
  )
}
