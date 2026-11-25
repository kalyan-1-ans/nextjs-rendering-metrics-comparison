import type { ComponentProps } from 'react'
import { cn } from '#lib/utils'

export type PageTimestampsProps = ComponentProps<'dl'> & {
  createdAt?: string
  updatedAt?: string
  renderedAt?: string
  labels?: { created?: string; updated?: string; rendered?: string }
}

const formatter = new Intl.DateTimeFormat('en-AU', {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone: 'Australia/Brisbane',
})

export function PageTimestamps({
  createdAt,
  updatedAt,
  renderedAt,
  labels,
  className,
  ...props
}: PageTimestampsProps) {
  const entries = [
    { label: labels?.created ?? 'Created', value: createdAt },
    { label: labels?.updated ?? 'Updated', value: updatedAt },
    { label: labels?.rendered ?? 'Rendered', value: renderedAt },
  ].filter(
    (entry): entry is { label: string; value: string } =>
      Boolean(entry.value) && Number.isFinite(Date.parse(entry.value!)),
  )
  if (!entries.length) return null
  return (
    <dl
      className={cn(
        'flex flex-wrap gap-x-6 gap-y-2 text-xs leading-relaxed text-muted-foreground',
        className,
      )}
      {...props}
    >
      {entries.map(({ label, value }) => (
        <div key={label} className="flex gap-1">
          <dt>{label}:</dt>
          <dd>
            <time dateTime={value}>{formatter.format(new Date(value))}</time>
          </dd>
        </div>
      ))}
    </dl>
  )
}
