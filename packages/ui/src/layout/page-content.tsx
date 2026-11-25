import type { ReactNode } from 'react'
import { ContentContainer, type ContentContainerProps } from './content-container'
import { cn } from '#lib/utils'

export type PageContentProps = ContentContainerProps & {
  timestamps?: ReactNode
}

export function PageContent({ children, timestamps, className, ...props }: PageContentProps) {
  return (
    <ContentContainer className={cn('pb-6', className)} {...props}>
      <div className="flex min-h-[35.25rem] flex-col gap-7 pt-8 pb-10 sm:min-h-[46.5rem] sm:gap-9.5 sm:pt-15 sm:pb-16">
        {children}
      </div>
      {timestamps}
    </ContentContainer>
  )
}
