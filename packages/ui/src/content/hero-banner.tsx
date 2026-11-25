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
    <section className={cn('pt-8 pb-7 sm:pt-15 sm:pb-9', className)} {...props}>
      <ContentContainer>
        <div className="flex flex-col items-start gap-4 break-words sm:gap-5 sm:bg-primary sm:px-11 sm:py-12">
          <Text
            variant="eyebrow"
            tone="accent"
            className="w-full text-[11px] leading-[18px] font-normal tracking-normal sm:tracking-[0.12em] sm:text-primary-foreground"
          >
            {eyebrow}
          </Text>
          <Heading
            as="h1"
            size="hero"
            className="w-full whitespace-pre-line sm:text-primary-foreground"
          >
            {heading}
          </Heading>
          <Text
            tone="muted"
            className="w-full text-base leading-[1.625] whitespace-pre-line sm:leading-[1.65] sm:text-primary-foreground"
          >
            {description}
          </Text>
        </div>
      </ContentContainer>
    </section>
  )
}
