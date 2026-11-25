'use client'

import { useRef, type ComponentProps } from 'react'
import { SearchIcon, XIcon } from 'lucide-react'
import { TextInput } from './text-input'
import { IconButton } from '../actions/icon-button'
import { cn } from '#lib/utils'

export type SearchInputProps = Omit<
  ComponentProps<typeof TextInput>,
  'type' | 'value' | 'defaultValue'
> & {
  value: string
  onValueChange: (value: string) => void
  clearLabel?: string
}

export function SearchInput({
  value,
  onValueChange,
  onChange,
  clearLabel = 'Clear search',
  className,
  ref,
  disabled,
  readOnly,
  ...props
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  return (
    <div className="relative w-full">
      <SearchIcon
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
      />
      <TextInput
        {...props}
        ref={(node) => {
          inputRef.current = node
          if (typeof ref === 'function') return ref(node)
          if (ref) ref.current = node
        }}
        type="search"
        value={value}
        disabled={disabled}
        readOnly={readOnly}
        className={cn('pr-12 pl-10 [&::-webkit-search-cancel-button]:appearance-none', className)}
        onChange={(event) => {
          onChange?.(event)
          onValueChange(event.currentTarget.value)
        }}
      />
      {value && !disabled && !readOnly ? (
        <IconButton
          aria-label={clearLabel}
          variant="ghost"
          className="absolute top-0 right-0 size-11"
          onClick={() => {
            onValueChange('')
            inputRef.current?.focus()
          }}
        >
          <XIcon aria-hidden="true" className="size-4" />
        </IconButton>
      ) : null}
    </div>
  )
}
