import React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Input: React.FC<InputProps> = ({
  leftIcon,
  rightIcon,
  className = '',
  ...props
}) => {
  return (
    <div className="relative w-full">
      {leftIcon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
          {leftIcon}
        </div>
      )}
      <input
        className={cn(
          'intel-input',
          leftIcon ? 'pl-9' : '',
          rightIcon ? 'pr-8' : '',
          className
        )}
        {...props}
      />
      {rightIcon && (
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
          {rightIcon}
        </div>
      )}
    </div>
  )
}
