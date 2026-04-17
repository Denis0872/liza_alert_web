import type { ReactNode } from 'react'

type PanelProps = {
  hero?: boolean
  children: ReactNode
}

export function Panel({ hero = false, children }: PanelProps) {
  return <section className={`panel ${hero ? 'panel-hero' : ''}`.trim()}>{children}</section>
}
