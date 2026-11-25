'use client'

import type { ReactNode } from 'react'
import { Radio as RadioPrimitive } from '@base-ui/react/radio'
import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox'
import { mergeClassNames } from '#lib/utils'

type RadioChipProps = Omit<RadioPrimitive.Root.Props, 'children'> & {
  type: 'radio'
  children: ReactNode
}
type CheckboxChipProps = Omit<CheckboxPrimitive.Root.Props, 'children'> & {
  type: 'checkbox'
  children: ReactNode
}
export type ChoiceChipProps = RadioChipProps | CheckboxChipProps

const chipStyles =
  'inline-flex min-h-11 cursor-pointer items-center justify-center border border-border bg-background px-4 py-2 text-base text-foreground transition-colors hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground data-disabled:cursor-not-allowed data-disabled:opacity-50 aria-invalid:border-destructive'

export function ChoiceChip(props: ChoiceChipProps) {
  if (props.type === 'radio') {
    const { type: _type, className, children, ...rest } = props
    return (
      <RadioPrimitive.Root className={mergeClassNames(chipStyles, className)} {...rest}>
        {children}
      </RadioPrimitive.Root>
    )
  }
  const { type: _type, className, children, ...rest } = props
  return (
    <CheckboxPrimitive.Root className={mergeClassNames(chipStyles, className)} {...rest}>
      {children}
    </CheckboxPrimitive.Root>
  )
}
