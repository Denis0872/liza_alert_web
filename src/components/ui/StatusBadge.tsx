import type { SearchStatus } from '../../data/mock'
import { statusLabel } from '../../data/mock'

type StatusBadgeProps = {
  status: SearchStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return <span className={`status status-${status.toLowerCase()}`}>{statusLabel[status]}</span>
}
