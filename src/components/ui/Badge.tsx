import React from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'high' | 'med' | 'low' | 'neutral' | 'info'
  children: React.ReactNode
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  className = '',
  children,
  ...props
}) => {
  const variantClass =
    variant === 'high'
      ? 'badge-high'
      : variant === 'med'
      ? 'badge-med'
      : variant === 'low'
      ? 'badge-low'
      : variant === 'info'
      ? 'border border-neutral-700 bg-neutral-800 text-white'
      : 'badge-neutral'

  return (
    <span className={cn('text-[10px] font-semibold px-2 py-0.5 rounded', variantClass, className)} {...props}>
      {children}
    </span>
  )
}
