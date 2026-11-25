import type { ComponentProps } from 'react'
import { Heading } from '../typography/heading'
import { Text } from '../typography/text'
import { cn } from '#lib/utils'

export type TextSectionProps = ComponentProps<'section'> & {
  heading: string
  body: string
}

export function TextSection({ heading, body, className, ...props }: TextSectionProps) {
  return (
    <section className={cn('flex flex-col gap-3 break-words', className)} {...props}>
      <Heading as="h2" className="text-[22px] leading-7 text-wrap sm:text-section sm:leading-[1.25]">
        {heading}
      </Heading>
      <Text className="text-base leading-[1.625] whitespace-pre-line text-prose-foreground sm:leading-[1.65]">
        {body}
      </Text>
    </section>
  )
}
