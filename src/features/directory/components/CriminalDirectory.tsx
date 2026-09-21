import React, { useState, useMemo } from 'react'
import { Search, Filter, ArrowRight, User, Shield, Phone, MapPin, Truck, FileText, ChevronRight } from 'lucide-react'
import { AnyEntity, Relationship, EntityType } from '@/types'
import { ENTITY_CONFIG } from '@/lib'

export interface CriminalDirectoryProps {
  entities: AnyEntity[]
  relationships: Relationship[]
  onSelectCriminal: (entityId: string) => void
}

export const CriminalDirectory: React.FC<CriminalDirectoryProps> = ({
  entities,
  relationships,
  onSelectCriminal
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState<string>('ALL')
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL')
  const [minPriority, setMinPriority] = useState<number>(0)

  // Compute relation count and case count per entity
  const entityStats = useMemo(() => {
    const stats: Record<string, { relCount: number; caseCount: number }> = {}
    entities.forEach(e => {
      stats[e.id] = { relCount: 0, caseCount: 0 }
    })

    relationships.forEach(r => {
      const s = typeof r.source === 'object' ? r.source.id : r.source
      const t = typeof r.target === 'object' ? r.target.id : r.target
      if (stats[s]) stats[s].relCount += 1
      if (stats[t]) stats[t].relCount += 1

      const targetEnt = entities.find(e => e.id === t)
      const sourceEnt = entities.find(e => e.id === s)
      if (stats[s] && targetEnt?.type === 'CASE') stats[s].caseCount += 1
      if (stats[t] && sourceEnt?.type === 'CASE') stats[t].caseCount += 1
    })

    return stats
  }, [entities, relationships])

  // Filtered directory results
  const filteredEntities = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    return entities.filter(ent => {
      // Query filter
      if (q) {
        const matchName = ent.name.toLowerCase().includes(q)
        const matchId = ent.id.toLowerCase().includes(q)
        const matchAlias = ent.aliases?.some(a => a.toLowerCase().includes(q))
        const matchRole = ent.role?.toLowerCase().includes(q)
        const matchDept = ent.department?.toLowerCase().includes(q)
        if (!matchName && !matchId && !matchAlias && !matchRole && !matchDept) return false
      }

      // Type filter
      if (selectedType !== 'ALL' && ent.type !== selectedType) return false

      // Status filter
      if (selectedStatus !== 'ALL' && ent.status !== selectedStatus) return false

      // Priority filter
      if ((ent.basePriority || 0) < minPriority) return false

      return true
    })
  }, [entities, searchQuery, selectedType, selectedStatus, minPriority])

  return (
    <div className="flex-1 p-6 bg-black flex flex-col gap-6 overflow-y-auto max-w-7xl mx-auto w-full">
      {/* Header Banner */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#00629B] font-bold">
          <Search size={14} /> CRIMINAL DIRECTORY & HETEROGENEOUS ENTITY REGISTRY
        </div>
        <h1 className="text-xl font-bold text-white mt-1">
          Search Criminal Records & Associated Subjects
        </h1>
        <p className="text-xs text-neutral-400 mt-0.5">
          Query cross-network database by Criminal ID (e.g. P001, P003), full name, alias, telephone, or fleet license
        </p>
      </div>

      {/* Search Input Bar (Matching Wireframe: [ Search Rahul or Criminal ID 🔍 ]) */}
      <div className="border border-neutral-800 bg-[#0a0a0a] rounded p-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-3 text-neutral-500" size={16} />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search Criminal ID or Name (e.g. Arjun, Sameer, P001, PH002, C004)..."
            className="w-full rounded border border-neutral-800 bg-black pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 outline-none focus:border-[#00629B] focus:ring-1 focus:ring-[#00629B]/40 font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-neutral-500 hover:text-white text-xs"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-3 mt-3 pt-3 border-t border-neutral-900 text-xs">
          <div className="flex items-center gap-1.5 text-neutral-400">
            <Filter size={12} className="text-[#00629B]" />
            <span className="font-semibold text-[11px]">Filter by:</span>
          </div>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
            className="intel-select"
          >
            <option value="ALL">All Entity Types (100)</option>
            <option value="PERSON">Persons Only (25)</option>
            <option value="PHONE">Phones (15)</option>
            <option value="LOCATION">Locations (12)</option>
            <option value="CASE">FIR Cases (18)</option>
            <option value="VEHICLE">Vehicles (10)</option>
            <option value="ORGANIZATION">Organizations (5)</option>
            <option value="EVENT">Events (15)</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            className="intel-select"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="UNDER_REVIEW">UNDER REVIEW</option>
            <option value="INACTIVE">INACTIVE</option>
            <option value="CLOSED">CLOSED</option>
          </select>

          {/* Priority Slider */}
          <div className="flex items-center gap-2 text-neutral-400 ml-auto">
            <span className="text-[11px]">Min Priority:</span>
            <input
              type="range"
              min={0}
              max={90}
              step={10}
              value={minPriority}
              onChange={e => setMinPriority(Number(e.target.value))}
              className="accent-[#00629B] h-1.5 bg-neutral-800 rounded cursor-pointer w-24"
            />
            <span className="font-mono text-white text-[11px] w-6">{minPriority}+</span>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
        <span>SEARCH RESULTS ({filteredEntities.length} matching entities)</span>
        <span>Click any subject to launch Detailed Investigation Profile</span>
      </div>

      {/* Search Results List (Matching Wireframe Page 1) */}
      <div className="space-y-2">
        {filteredEntities.length === 0 ? (
          <div className="p-12 text-center border border-neutral-800 bg-[#0a0a0a] rounded text-neutral-500">
            <User size={32} className="mx-auto mb-2 text-neutral-600" />
            <p className="text-sm">No criminal records or subjects match query "{searchQuery}"</p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedType('ALL')
                setSelectedStatus('ALL')
                setMinPriority(0)
              }}
              className="mt-3 text-xs text-[#00629B] hover:underline"
            >
              Reset all search filters
            </button>
          </div>
        ) : (
          filteredEntities.map(ent => {
            const cfg = ENTITY_CONFIG[ent.type] || ENTITY_CONFIG.PERSON
            const Icon = cfg.icon
            const stats = entityStats[ent.id] || { relCount: 0, caseCount: 0 }

            return (
              <div
                key={ent.id}
                onClick={() => onSelectCriminal(ent.id)}
                className="intel-card hover:border-[#00629B] cursor-pointer transition p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                {/* Left: Avatar & Identity */}
                <div className="flex items-center gap-3.5">
                  <div className="h-10 w-10 rounded border border-neutral-700 bg-neutral-900 flex items-center justify-center font-bold text-sm text-white shrink-0 group-hover:border-[#00629B]">
                    <Icon size={18} className="text-[#00629B]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white group-hover:text-[#00629B] transition">
                        {ent.name}
                      </h3>
                      <span className="badge-neutral text-[10px] font-mono">{ent.id}</span>
                      <span className={ent.status === 'ACTIVE' ? 'badge-high' : ent.status === 'UNDER_REVIEW' ? 'badge-med' : 'badge-low'}>
                        {ent.status}
                      </span>
                    </div>
                    <div className="text-[11px] text-neutral-400 mt-0.5 flex flex-wrap gap-x-3">
                      <span>Role: <strong className="text-neutral-300">{ent.role || ent.type}</strong></span>
                      {ent.aliases && ent.aliases.length > 0 && (
                        <span>Aliases: <strong className="text-neutral-300">{ent.aliases.join(', ')}</strong></span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Metrics & CTA matching wireframe: Cases: 04 | Relations: 17 */}
                <div className="flex items-center gap-5 shrink-0 self-end sm:self-center">
                  <div className="flex items-center gap-4 text-xs font-mono">
                    <div className="text-right">
                      <div className="text-[10px] text-neutral-500 uppercase">Cases</div>
                      <div className="font-bold text-white text-sm">
                        {String(stats.caseCount).padStart(2, '0')}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-neutral-500 uppercase">Relations</div>
                      <div className="font-bold text-white text-sm">
                        {String(stats.relCount).padStart(2, '0')}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-neutral-500 uppercase">Priority</div>
                      <div className="font-black text-[#00629B] text-sm">
                        {ent.basePriority || 50}
                      </div>
                    </div>
                  </div>

                  <button className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1 group-hover:bg-[#0077bd]">
                    <span>Inspect</span>
                    <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
