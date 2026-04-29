import type { Priority } from '../../types'

interface BadgeProps {
  priority: Priority
}

const STYLES: Record<Priority, string> = {
  High:   'bg-red-100 text-red-700 ring-1 ring-red-200',
  Medium: 'bg-yellow-100 text-yellow-700 ring-1 ring-yellow-200',
  Low:    'bg-green-100 text-green-700 ring-1 ring-green-200',
}

const DOTS: Record<Priority, string> = {
  High:   'bg-red-500',
  Medium: 'bg-yellow-500',
  Low:    'bg-green-500',
}

export function Badge({ priority }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${STYLES[priority]}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${DOTS[priority]}`} />
      {priority}
    </span>
  )
}
