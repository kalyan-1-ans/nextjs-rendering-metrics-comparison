import type { ComponentProps } from 'react'
import brandIcon from '../assets/brand/icon.svg'
import { cn } from '#lib/utils'

// Vite imports SVGs as URLs; Next.js may return static-image metadata.
const source = typeof brandIcon === 'string' ? brandIcon : (brandIcon as { src: string }).src

export type BrandIconProps = Omit<ComponentProps<'img'>, 'src'>

export function BrandIcon({
  alt = 'Small Bites',
  width = 48,
  height = 48,
  className,
  ...props
}: BrandIconProps) {
  return (
    <img
      src={source}
      alt={alt}
      width={width}
      height={height}
      className={cn('shrink-0', className)}
      {...props}
    />
  )
}
