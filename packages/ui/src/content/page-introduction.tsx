import type { ComponentProps } from 'react'
import { Heading } from '../typography/heading'
import { Text } from '../typography/text'
import { cn } from '#lib/utils'

export type PageIntroductionProps = ComponentProps<'header'> & {
  eyebrow: string
  heading: string
  description: string
}

export function PageIntroduction({
  eyebrow,
  heading,
  description,
  className,
  ...props
}: PageIntroductionProps) {
  return (
    <header className={cn('flex flex-col gap-4.5 break-words', className)} {...props}>
      <Text
        variant="eyebrow"
        tone="accent"
        className="text-[11px] leading-[18px] font-normal tracking-normal"
      >
        {eyebrow}
      </Text>
      <Heading as="h1" size="page" className="whitespace-pre-line">
        {heading}
      </Heading>
      <Text
        tone="muted"
        className="text-base leading-[1.625] whitespace-pre-line sm:text-body sm:leading-[1.65]"
      >
        {description}
      </Text>
    </header>
  )
}
