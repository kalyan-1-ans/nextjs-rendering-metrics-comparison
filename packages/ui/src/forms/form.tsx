import type { ComponentProps } from 'react'
import { cn } from '#lib/utils'

export function Form({ className, ...props }: ComponentProps<'form'>) {
  return <form className={cn('flex flex-col gap-6', className)} {...props} />
}

export function FormRow({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn('grid gap-5 sm:min-h-25 sm:grid-cols-2 sm:gap-6', className)}
      {...props}
    />
  )
}

