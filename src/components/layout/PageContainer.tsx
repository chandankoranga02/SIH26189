import React from 'react'
import { cn } from '@/lib/utils'

export interface PageContainerProps {
  children: React.ReactNode
  className?: string
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className = ''
}) => {
  return (
    <div className={cn('flex-1 grid grid-cols-1 lg:grid-cols-[260px_1fr_360px] overflow-hidden', className)}>
      {children}
    </div>
  )
}
