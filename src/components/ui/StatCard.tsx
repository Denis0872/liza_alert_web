import type { ReactNode } from 'react'

type StatCardProps = {
  icon?: ReactNode
  label: string
  value: string
}

export function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <article className="stat">
      {icon}
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  )
}
