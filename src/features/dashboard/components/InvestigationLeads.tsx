import React from 'react'
import { Target, ArrowRight } from 'lucide-react'
import { AnyEntity } from '@/types'
import { ENTITY_CONFIG } from '@/lib'

export interface InvestigationLeadsProps {
  highPriorityEntities: AnyEntity[]
  onSelectEntity: (entityId: string) => void
}

export const InvestigationLeads: React.FC<InvestigationLeadsProps> = ({
  highPriorityEntities,
  onSelectEntity
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
        <span className="flex items-center gap-1.5">
          <Target size={14} className="text-neutral-400" /> High-Priority Investigative Leads
        </span>
        <span className="text-[10px] text-slate-500">{highPriorityEntities.length} flagged subjects</span>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {highPriorityEntities.slice(0, 8).map(entity => {
          const cfg = ENTITY_CONFIG[entity.type] || ENTITY_CONFIG.PERSON
          const Icon = cfg.icon
          return (
            <button
              key={entity.id}
              onClick={() => onSelectEntity(entity.id)}
              className="intel-card p-2.5 text-left flex items-center justify-between hover:border-neutral-700 transition group"
            >
              <div className="flex items-center gap-2.5 truncate">
                <div
                  className="rounded-lg p-1.5 text-slate-950 font-bold"
                  style={{ backgroundColor: cfg.color }}
                >
                  <Icon size={14} />
                </div>
                <div className="truncate">
                  <div className="font-semibold text-white group-hover:text-white text-xs truncate">
                    {entity.name}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">{entity.role || entity.id}</div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className="badge-high text-[10px]">{entity.basePriority}</span>
                <ArrowRight size={12} className="text-slate-500 group-hover:text-white transition" />
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
