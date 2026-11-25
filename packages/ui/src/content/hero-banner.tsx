import type { ComponentProps } from 'react'
import { ContentContainer } from '../layout/content-container'
import { Heading } from '../typography/heading'
import { Text } from '../typography/text'
import { cn } from '#lib/utils'

export type HeroBannerProps = ComponentProps<'section'> & {
  eyebrow: string
  heading: string
  description: string
}

export function HeroBanner({
  eyebrow,
  heading,
  description,
  className,
  ...props
}: HeroBannerProps) {
  return (
    <section className={cn('py-12 sm:py-16', className)} {...props}>
      <ContentContainer>
        <div className="space-y-5">
          <Text variant="eyebrow" tone="accent">
            {eyebrow}
          </Text>
          <Heading as="h1" size="title" className="whitespace-pre-line">
            {heading}
          </Heading>
          <Text tone="muted" className="whitespace-pre-line">
            {description}
          </Text>
        </div>
      </ContentContainer>
    </section>
  )
}
