import React from 'react'
import { cn } from '@/lib/utils'

export interface TabItem {
  id: string
  label: React.ReactNode
  icon?: React.ReactNode
  count?: number | string
}

export interface TabsProps {
  tabs: TabItem[]
  activeTab: string
  onChange: (id: string) => void
  className?: string
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className = ''
}) => {
  return (
    <div className={cn('flex items-center border-b border-white/10 px-4 text-xs font-semibold overflow-x-auto', className)}>
      {tabs.map(tab => {
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn('tab-btn flex items-center gap-1.5 whitespace-nowrap', isActive && 'tab-btn-active')}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className="text-[10px] opacity-75">({tab.count})</span>
            )}
          </button>
        )
      })}
    </div>
  )
}
