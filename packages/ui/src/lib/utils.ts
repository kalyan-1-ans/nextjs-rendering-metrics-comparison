import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function mergeClassNames<State>(
  base: string,
  custom: string | ((state: State) => string | undefined) | undefined,
) {
  return typeof custom === 'function' ? (state: State) => cn(base, custom(state)) : cn(base, custom)
}
