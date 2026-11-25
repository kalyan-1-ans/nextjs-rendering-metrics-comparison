import type { ComponentProps } from 'react'
import { cn } from '#lib/utils'

export type ContentContainerProps = ComponentProps<'div'> & {
  as?: 'div' | 'main' | 'section'
  width?: 'content' | 'wide'
}

export function ContentContainer({
  as: Tag = 'div',
  width = 'content',
  className,
  ...props
}: ContentContainerProps) {
  return (
    <Tag
      className={cn(
        'mx-auto w-full px-6 sm:px-8',
        width === 'wide'
          ? 'max-w-[calc(var(--container-wide)+4rem)]'
          : 'max-w-[calc(var(--container-content)+4rem)]',
        className,
      )}
      {...props}
    />
  )
}
