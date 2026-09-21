import React from 'react'
import { cn } from '@/lib/utils'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'card' | 'panel'
  children: React.ReactNode
}

export const Card: React.FC<CardProps> = ({
  variant = 'card',
  className = '',
  children,
  ...props
}) => {
  const baseClass = variant === 'panel' ? 'intel-panel' : 'intel-card'
  return (
    <div className={cn(baseClass, className)} {...props}>
      {children}
    </div>
  )
}
