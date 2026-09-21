import React from 'react'
import { DetectedPattern } from '@/types'
import { PatternCard } from './PatternCard'

export interface PatternListProps {
  patterns: DetectedPattern[]
  onSelectPattern: (pattern: DetectedPattern) => void
}

export const PatternList: React.FC<PatternListProps> = ({ patterns, onSelectPattern }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
      {patterns.map(pat => (
        <PatternCard key={pat.id} pattern={pat} onSelect={onSelectPattern} />
      ))}
    </div>
  )
}
