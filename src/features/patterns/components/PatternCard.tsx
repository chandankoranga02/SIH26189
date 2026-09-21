import React from 'react'
import { DetectedPattern } from '@/types'

export interface PatternCardProps {
  pattern: DetectedPattern
  onSelect?: (pattern: DetectedPattern) => void
  className?: string
}

export const PatternCard: React.FC<PatternCardProps> = ({
  pattern,
  onSelect,
  className = ''
}) => {
  return (
    <button
      onClick={() => onSelect?.(pattern)}
      className={`intel-card p-2.5 text-left hover:border-cyan-400/30 transition group w-full ${className}`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-semibold text-white truncate group-hover:text-cyan-300">
          {pattern.name}
        </span>
        <span className="text-[10px] font-bold text-amber-300">{pattern.count}</span>
      </div>
      <div className="text-[11px] text-cyan-200 mt-0.5">{pattern.summary}</div>
      <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">{pattern.basis}</p>
    </button>
  )
}
