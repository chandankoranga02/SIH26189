import React from 'react'
import { AnyEntity } from '@/types'
import { ENTITY_CONFIG } from '@/lib'

export interface EntityCardProps {
  entity: AnyEntity
  onSelect?: (id: string) => void
  isSelected?: boolean
  className?: string
}

export const EntityCard: React.FC<EntityCardProps> = ({
  entity,
  onSelect,
  isSelected = false,
  className = ''
}) => {
  const cfg = ENTITY_CONFIG[entity.type] || ENTITY_CONFIG.PERSON
  const Icon = cfg.icon

  return (
    <div
      onClick={() => onSelect?.(entity.id)}
      className={`intel-card p-3 cursor-pointer transition flex items-center justify-between ${
        isSelected ? 'border-white bg-white/5' : 'hover:border-neutral-700'
      } ${className}`}
    >
      <div className="flex items-center gap-2.5 truncate">
        <div
          className="rounded p-1.5 text-black font-bold"
          style={{ backgroundColor: cfg.color }}
        >
          <Icon size={14} />
        </div>
        <div className="truncate">
          <div className="font-semibold text-white text-xs truncate">{entity.name}</div>
          <div className="text-[10px] text-neutral-400 truncate">
            {entity.role || entity.type} • {entity.id}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="badge-high text-[10px]">{entity.basePriority}</span>
      </div>
    </div>
  )
}
