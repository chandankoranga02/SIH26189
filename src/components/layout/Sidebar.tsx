import React from 'react'
import {
  Filter,
  GitBranch,
  Calendar,
  Eye,
  EyeOff,
  ShieldAlert,
  Check
} from 'lucide-react'
import { ENTITY_CONFIG, REL_CATEGORY_CONFIG } from '@/lib'
import { DateRange, ViewMode, PriorityLevel, ConfidenceLevel, EntityStatus } from '@/types'

export interface SidebarProps {
  selectedEntityTypes: Set<string>
  toggleEntityType: (type: string) => void
  selectedRelCategories: Set<string>
  toggleRelCategory: (category: string) => void
  priorityFilter: PriorityLevel
  setPriorityFilter: (val: any) => void
  confidenceFilter: ConfidenceLevel
  setConfidenceFilter: (val: any) => void
  statusFilter: EntityStatus
  setStatusFilter: (val: any) => void
  dateRange: DateRange
  setDateRange: (range: DateRange | ((prev: DateRange) => DateRange)) => void
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
  showLabels: boolean
  setShowLabels: (val: boolean | ((p: boolean) => boolean)) => void
  showRelLabels: boolean
  setShowRelLabels: (val: boolean | ((p: boolean) => boolean)) => void
  showTwoHop: boolean
  setShowTwoHop: (val: boolean | ((p: boolean) => boolean)) => void
  entityCounts: Record<string, number>
}

export const Sidebar: React.FC<SidebarProps> = ({
  selectedEntityTypes,
  toggleEntityType,
  selectedRelCategories,
  toggleRelCategory,
  priorityFilter,
  setPriorityFilter,
  confidenceFilter,
  setConfidenceFilter,
  statusFilter,
  setStatusFilter,
  dateRange,
  setDateRange,
  viewMode,
  setViewMode,
  showLabels,
  setShowLabels,
  showRelLabels,
  setShowRelLabels,
  showTwoHop,
  setShowTwoHop,
  entityCounts
}) => {
  return (
    <aside className="border-r border-neutral-800 bg-black p-4 flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-110px)] text-xs text-white">
      {/* Entity Types */}
      <div>
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
          <span className="flex items-center gap-1.5 font-mono">
            <Filter size={13} className="text-[#00629B]" /> Entity Types
          </span>
          <span className="text-[10px] text-neutral-500 font-mono">
            {selectedEntityTypes.size}/{Object.keys(ENTITY_CONFIG).length}
          </span>
        </div>
        <div className="space-y-1">
          {Object.entries(ENTITY_CONFIG).map(([type, cfg]) => {
            const active = selectedEntityTypes.has(type)
            const count = entityCounts[type] || 0
            return (
              <button
                key={type}
                onClick={() => toggleEntityType(type)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-xs font-medium transition ${
                  active
                    ? 'bg-neutral-900 text-white border border-neutral-800'
                    : 'text-neutral-500 opacity-60 hover:opacity-100 hover:bg-neutral-950'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: cfg.color }} />
                  <span>{cfg.label}</span>
                </div>
                <span className="text-[10px] text-neutral-500 font-mono">{count}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Link Categories */}
      <div>
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
          <span className="flex items-center gap-1.5 font-mono">
            <GitBranch size={13} className="text-[#00629B]" /> Link Categories
          </span>
          <span className="text-[10px] text-neutral-500 font-mono">
            {selectedRelCategories.size}/{Object.keys(REL_CATEGORY_CONFIG).length}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {Object.entries(REL_CATEGORY_CONFIG).map(([cat]) => {
            const active = selectedRelCategories.has(cat)
            return (
              <button
                key={cat}
                onClick={() => toggleRelCategory(cat)}
                className={`px-2 py-1 rounded text-[10px] font-semibold border text-left truncate transition ${
                  active
                    ? 'border-[#00629B] bg-[#00629B]/20 text-white'
                    : 'border-neutral-900 bg-neutral-950 text-neutral-500 hover:text-neutral-300'
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </div>

      {/* Priority, Confidence & Status Filters */}
      <div className="space-y-2.5">
        <div>
          <label className="block text-[10px] font-semibold uppercase tracking-wider text-neutral-400 mb-1 font-mono">
            Analytical Priority
          </label>
          <select
            value={priorityFilter}
            onChange={e => setPriorityFilter(e.target.value)}
            className="intel-select w-full"
          >
            <option value="ALL">All Priorities</option>
            <option value="HIGH">High Priority (75+)</option>
            <option value="MED">Medium Priority (60–74)</option>
            <option value="LOW">Low Priority (&lt;60)</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-semibold uppercase tracking-wider text-neutral-400 mb-1 font-mono">
            Relationship Confidence
          </label>
          <select
            value={confidenceFilter}
            onChange={e => setConfidenceFilter(e.target.value)}
            className="intel-select w-full"
          >
            <option value="ALL">All Confidence Levels</option>
            <option value="90+">High Confidence (90%+)</option>
            <option value="70-90">Moderate (70%–89%)</option>
            <option value="<70">Preliminary (&lt;70%)</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-semibold uppercase tracking-wider text-neutral-400 mb-1 font-mono">
            Entity Status
          </label>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="intel-select w-full"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="UNDER_REVIEW">UNDER REVIEW</option>
            <option value="INACTIVE">INACTIVE</option>
            <option value="CLOSED">CLOSED</option>
          </select>
        </div>
      </div>

      {/* Date Range Controls */}
      <div>
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
          <span className="flex items-center gap-1.5 font-mono">
            <Calendar size={13} className="text-[#00629B]" /> Observation Range
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-[10px] text-neutral-500 font-mono">From</span>
            <input
              type="date"
              value={dateRange.from}
              onChange={e => setDateRange(prev => ({ ...prev, from: e.target.value }))}
              className="intel-input text-[11px] p-1.5 font-mono"
            />
          </div>
          <div>
            <span className="text-[10px] text-neutral-500 font-mono">To</span>
            <input
              type="date"
              value={dateRange.to}
              onChange={e => setDateRange(prev => ({ ...prev, to: e.target.value }))}
              className="intel-input text-[11px] p-1.5 font-mono"
            />
          </div>
        </div>

        <div className="mt-2 flex gap-1.5 text-[10px]">
          <button
            onClick={() => setDateRange({ from: '2026-08-25', to: '2026-09-08' })}
            className="btn-ghost flex-1 py-1 text-[10px]"
          >
            Last 14D
          </button>
          <button
            onClick={() => setDateRange({ from: '2026-08-01', to: '2026-09-15' })}
            className="btn-ghost flex-1 py-1 text-[10px]"
          >
            All Data
          </button>
        </div>
      </div>

      {/* Graph Visual Controls */}
      <div className="border-t border-neutral-900 pt-3 space-y-2">
        <div className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1 font-mono">
          Graph Visual Controls
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-neutral-300">View Mode</span>
          <div className="flex rounded border border-neutral-800 overflow-hidden">
            <button
              onClick={() => setViewMode('network')}
              className={`px-2 py-1 text-[10px] font-semibold ${
                viewMode === 'network' ? 'bg-[#00629B] text-white' : 'bg-neutral-900 text-neutral-400'
              }`}
            >
              Network
            </button>
            <button
              onClick={() => setViewMode('hierarchy')}
              className={`px-2 py-1 text-[10px] font-semibold ${
                viewMode === 'hierarchy' ? 'bg-[#00629B] text-white' : 'bg-neutral-900 text-neutral-400'
              }`}
            >
              Hierarchy
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-neutral-300">Show Node Labels</span>
          <button onClick={() => setShowLabels(p => !p)} className="text-[#00629B]" aria-label="Toggle node labels">
            {showLabels ? <Eye size={15} /> : <EyeOff size={15} className="text-neutral-500" />}
          </button>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-neutral-300">Edge Labels</span>
          <button onClick={() => setShowRelLabels(p => !p)} className="text-[#00629B]" aria-label="Toggle edge labels">
            {showRelLabels ? <Eye size={15} /> : <EyeOff size={15} className="text-neutral-500" />}
          </button>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-neutral-300">2-Hop Network</span>
          <button
            onClick={() => setShowTwoHop(p => !p)}
            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
              showTwoHop
                ? 'bg-[#00629B]/20 text-[#00629B] border border-[#00629B]/50'
                : 'bg-neutral-900 text-neutral-500'
            }`}
          >
            {showTwoHop ? 'ENABLED' : 'DISABLED'}
          </button>
        </div>
      </div>

      {/* Security Environment Card */}
      <div className="rounded border border-neutral-800 bg-[#0a0a0a] p-3 text-[10px] text-neutral-400 mt-auto space-y-1">
        <div className="font-bold text-neutral-300 uppercase tracking-wider mb-1 flex items-center gap-1.5 font-mono">
          <ShieldAlert size={12} className="text-[#00629B]" /> Operational Security
        </div>
        <div>
          Role: <span className="text-white">Senior Lead Investigator</span>
        </div>
        <div>
          Classification: <span className="text-amber-400">Restricted Police Net</span>
        </div>
        <div>
          Session: <span className="text-emerald-400">Encrypted (TLS 1.3)</span>
        </div>
      </div>
    </aside>
  )
}
