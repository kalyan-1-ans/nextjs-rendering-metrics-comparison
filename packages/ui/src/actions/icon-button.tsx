'use client'

import type { ComponentProps } from 'react'
import { Button } from './button'

export type IconButtonProps = ComponentProps<typeof Button> & { 'aria-label': string }

export function IconButton({ size = 'icon', type = 'button', ...props }: IconButtonProps) {
  return <Button size={size} type={type} {...props} />
}
