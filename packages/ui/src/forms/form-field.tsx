import type { ComponentProps, ReactNode } from 'react'
import { Label } from './label'
import { Text } from '../typography/text'
import { cn } from '#lib/utils'

export type FormFieldProps = ComponentProps<'div'> & {
  label: ReactNode
  htmlFor: string
  error?: string
}

export function FormField({ label, htmlFor, error, children, className, ...props }: FormFieldProps) {
  return (
    <div className={cn('flex min-w-0 flex-col gap-2', className)} {...props}>
      <Label htmlFor={htmlFor} className="text-base leading-6 font-normal sm:text-sm sm:leading-[22px]">
        {label}
      </Label>
      {children}
      {error ? (
        <Text id={`${htmlFor}-error`} variant="caption" tone="error" role="alert">
          {error}
        </Text>
      ) : null}
    </div>
  )
}
