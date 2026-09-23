import React from 'react'
import { DetectedPattern } from '@/types'

export interface DetectedPatternsProps {
  patterns: DetectedPattern[]
  onSelectPattern: (pattern: DetectedPattern) => void
}

export const DetectedPatterns: React.FC<DetectedPatternsProps> = ({
  patterns,
  onSelectPattern
}) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
      {patterns.map(pat => (
        <button
          key={pat.id}
          onClick={() => onSelectPattern(pat)}
          className="intel-card p-2.5 text-left hover:border-neutral-700 transition group"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="font-semibold text-white truncate group-hover:text-white">
              {pat.name}
            </span>
            <span className="text-[10px] font-bold text-neutral-400">{pat.count}</span>
          </div>
          <div className="text-[11px] text-white mt-0.5">{pat.summary}</div>
          <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">{pat.basis}</p>
        </button>
      ))}
    </div>
  )
}
