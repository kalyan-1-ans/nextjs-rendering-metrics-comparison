import type { ReactNode } from 'react'

export interface PageShellProps {
  header: ReactNode
  children: ReactNode
  footer: ReactNode
  mainContentId?: string
}

export function PageShell({
  header,
  children,
  footer,
  mainContentId = 'main-content',
}: PageShellProps) {
  return (
    <div className="flex min-h-svh flex-col">
      {header}
      <main id={mainContentId} tabIndex={-1} className="flex-1">
        {children}
      </main>
      {footer}
    </div>
  )
}
