import React, { useState, useMemo } from 'react'
import {
  Users,
  Phone,
  MapPin,
  Truck,
  FileText,
  Calendar,
  Building,
  GitBranch,
  ChevronRight,
  Filter
} from 'lucide-react'
import { AnyEntity, Relationship } from '@/types'
import { entities } from '@/data'
import { fmtDate } from '@/lib'

export interface CriminalRelationsViewProps {
  entity: AnyEntity
  activeRels: Relationship[]
  onSelectEntity: (id: string) => void
  onSelectRel: (rel: Relationship) => void
}

export const CriminalRelationsView: React.FC<CriminalRelationsViewProps> = ({
  entity,
  activeRels,
  onSelectEntity,
  onSelectRel
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('ALL')

  // Find all relationships involving this entity
  const entityRels = useMemo(() => {
    return activeRels.filter(r => {
      const s = typeof r.source === 'object' ? r.source.id : r.source
      const t = typeof r.target === 'object' ? r.target.id : r.target
      return s === entity.id || t === entity.id
    })
  }, [entity.id, activeRels])

  // Categorize relationships by Target entity type
  const categorizedRels = useMemo(() => {
    return entityRels.map(r => {
      const s = typeof r.source === 'object' ? r.source.id : r.source
      const t = typeof r.target === 'object' ? r.target.id : r.target
      const peerId = s === entity.id ? t : s
      const peer = entities.find(e => e.id === peerId)
      const targetType = peer?.type || 'PERSON'
      const relationLabel = `${entity.type} → ${targetType}`

      return {
        relationship: r,
        peerId,
        peer,
        targetType,
        relationLabel
      }
    })
  }, [entityRels, entity.type])

  // Filtered by category
  const filteredRels = useMemo(() => {
    if (filterCategory === 'ALL') return categorizedRels
    return categorizedRels.filter(item => item.targetType === filterCategory)
  }, [categorizedRels, filterCategory])

  // Counts by target entity type
  const counts = useMemo(() => {
    const map: Record<string, number> = {
      ALL: categorizedRels.length,
      PERSON: 0,
      PHONE: 0,
      LOCATION: 0,
      VEHICLE: 0,
      CASE: 0
    }
    categorizedRels.forEach(r => {
      map[r.targetType] = (map[r.targetType] || 0) + 1
    })
    return map
  }, [categorizedRels])

  return (
    <div className="space-y-3 text-xs">
      {/* Category Tabs: Person -> Person, Person -> Phone, Person -> Location, Person -> Vehicle, Person -> Case */}
      <div className="flex flex-wrap gap-1 border-b border-neutral-800 pb-2">
        <button
          onClick={() => setFilterCategory('ALL')}
          className={`filter-chip ${filterCategory === 'ALL' ? 'active' : ''}`}
        >
          All Links ({counts.ALL})
        </button>
        <button
          onClick={() => setFilterCategory('PERSON')}
          className={`filter-chip ${filterCategory === 'PERSON' ? 'active' : ''}`}
        >
          Person → Person ({counts.PERSON || 0})
        </button>
        <button
          onClick={() => setFilterCategory('PHONE')}
          className={`filter-chip ${filterCategory === 'PHONE' ? 'active' : ''}`}
        >
          Person → Phone ({counts.PHONE || 0})
        </button>
        <button
          onClick={() => setFilterCategory('LOCATION')}
          className={`filter-chip ${filterCategory === 'LOCATION' ? 'active' : ''}`}
        >
          Person → Location ({counts.LOCATION || 0})
        </button>
        <button
          onClick={() => setFilterCategory('VEHICLE')}
          className={`filter-chip ${filterCategory === 'VEHICLE' ? 'active' : ''}`}
        >
          Person → Vehicle ({counts.VEHICLE || 0})
        </button>
        <button
          onClick={() => setFilterCategory('CASE')}
          className={`filter-chip ${filterCategory === 'CASE' ? 'active' : ''}`}
        >
          Person → Case ({counts.CASE || 0})
        </button>
      </div>

      {/* List of Relationships */}
      <div className="space-y-2">
        {filteredRels.length === 0 ? (
          <div className="p-8 text-center text-neutral-500 border border-neutral-800 bg-[#0a0a0a] rounded">
            No relationships found under category "{filterCategory}".
          </div>
        ) : (
          filteredRels.map(({ relationship: r, peerId, peer, targetType, relationLabel }) => {
            const confidencePct = Math.round((r.confidence || 0.85) * 100)

            return (
              <div
                key={r.id}
                onClick={() => onSelectRel(r)}
                className="intel-card hover:border-[#00629B] cursor-pointer transition p-3 space-y-2 group"
              >
                {/* Header: Link Label & Confidence */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[#00629B] font-bold">
                      {relationLabel}
                    </span>
                    <span className="text-[10px] text-neutral-400 font-mono">
                      {r.type.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono">
                    <span className="text-[10px] text-neutral-500">Confidence:</span>
                    <span className="font-bold text-white text-xs">{confidencePct}%</span>
                  </div>
                </div>

                {/* Peer Entity Info */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={e => {
                        e.stopPropagation()
                        onSelectEntity(peerId)
                      }}
                      className="font-bold text-neutral-200 group-hover:text-white hover:underline text-xs text-left"
                    >
                      {peer?.name || peerId}
                    </button>
                    <span className="text-[10px] text-neutral-500 font-mono">({peerId})</span>
                  </div>

                  <span className="text-[10px] text-neutral-500 font-mono">
                    {r.date ? fmtDate(r.date) : '2026-08-15'}
                  </span>
                </div>

                {/* Relationship description */}
                {r.description && (
                  <p className="text-[11px] text-neutral-400 leading-relaxed line-clamp-2">
                    {r.description}
                  </p>
                )}

                {/* Footer action */}
                <div className="pt-1.5 border-t border-neutral-900 flex items-center justify-between text-[10px] text-neutral-500 group-hover:text-neutral-300">
                  <span>Click to inspect link on network graph</span>
                  <ChevronRight size={12} className="text-[#00629B] group-hover:translate-x-0.5 transition" />
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
