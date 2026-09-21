import React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'icon' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  children?: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  let baseClass = ''
  if (variant === 'primary') {
    baseClass = 'btn-primary'
  } else if (variant === 'ghost') {
    baseClass = 'btn-ghost'
  } else if (variant === 'icon') {
    baseClass = 'btn-icon'
  } else if (variant === 'danger') {
    baseClass = 'inline-flex items-center justify-center gap-2 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 px-3 py-1.5 text-xs font-semibold hover:bg-rose-500/30'
  }

  const sizeClass = size === 'sm' ? 'text-[11px] py-1 px-2.5' : size === 'lg' ? 'text-sm py-2.5 px-4' : ''

  return (
    <button className={cn(baseClass, sizeClass, className)} {...props}>
      {children}
    </button>
  )
}
