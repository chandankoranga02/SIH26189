export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function getPriorityColor(priority: number): string {
  if (priority >= 75) return '#f43f5e'
  if (priority >= 60) return '#fbbf24'
  return '#34d399'
}

export function getPriorityBadgeClass(priority: number): string {
  if (priority >= 75) return 'badge-high'
  if (priority >= 60) return 'badge-med'
  return 'badge-low'
}

export function getConfidenceBadgeClass(confidence: number): string {
  if (confidence >= 0.9) return 'badge-high'
  if (confidence >= 0.7) return 'badge-med'
  return 'badge-low'
}

export function getStatusBadgeClass(status: string): string {
  switch (status?.toUpperCase()) {
    case 'ACTIVE':
      return 'badge-high'
    case 'UNDER_REVIEW':
      return 'badge-med'
    case 'INACTIVE':
    case 'CLOSED':
      return 'badge-neutral'
    default:
      return 'badge-neutral'
  }
}
