import React from 'react'
import { FileText, ArrowRight } from 'lucide-react'
import { CaseEntity } from '@/types'

export interface CaseCardProps {
  caseItem: CaseEntity
  onSelect?: (id: string) => void
  isSelected?: boolean
}

export const CaseCard: React.FC<CaseCardProps> = ({
  caseItem,
  onSelect,
  isSelected = false
}) => {
  return (
    <div
      onClick={() => onSelect?.(caseItem.id)}
      className={`intel-card p-3.5 cursor-pointer transition flex items-center justify-between ${
        isSelected ? 'border-neutral-700 bg-neutral-800' : 'hover:border-white/20'
      }`}
    >
      <div className="flex items-center gap-3 truncate">
        <div className="rounded-lg p-2 bg-neutral-800 text-neutral-400 border border-neutral-700">
          <FileText size={16} />
        </div>
        <div className="truncate">
          <div className="font-bold text-white text-xs truncate">{caseItem.name}</div>
          <div className="text-[10px] text-slate-400 mt-0.5 truncate">
            {caseItem.id} • {caseItem.status}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="badge-high text-[10px]">{caseItem.basePriority}</span>
        <ArrowRight size={13} className="text-slate-500" />
      </div>
    </div>
  )
}
