import React, { useState, useEffect, useMemo, useCallback } from 'react'
import {
  Users,
  GitBranch,
  FileText,
  Database,
  Sparkles,
  Target,
  Network,
  MapPin,
  Activity,
  SlidersHorizontal,
  X
} from 'lucide-react'
import {
  DateRange,
  ViewMode,
  BottomTab,
  PriorityLevel,
  ConfidenceLevel,
  EntityStatus,
  AuditLogItem,
  Relationship,
  AnyEntity,
  DetectedPattern
} from '@/types'
import {
  entities,
  relationships,
  cdrRecords,
  evidenceRecords,
  locationObservations
} from '@/data'
import { ENTITY_CONFIG, REL_CATEGORY_CONFIG } from '@/lib'
import { Topbar, Sidebar } from '@/components/layout'
import { NavView } from '@/components/layout/Topbar'
import { InteractiveD3Graph } from '@/features/network/components/InteractiveD3Graph'
import { RelationshipInspector } from '@/features/network/components/RelationshipInspector'
import { useNetworkGraph } from '@/features/network/hooks/useNetworkGraph'
import { InspectorDossier } from '@/features/entities/components/InspectorDossier'
import { useEntities } from '@/features/entities/hooks/useEntities'
import { usePatterns } from '@/features/patterns/hooks/usePatterns'
import { EvidenceDrawer } from '@/features/evidence/components/EvidenceDrawer'
import { ReportModal } from '@/features/reports/components/ReportModal'
import { InvestigatorHub } from './InvestigatorHub'
import { CriminalDirectory } from '@/features/directory/components/CriminalDirectory'
import { RightIntelligencePanel } from './RightIntelligencePanel'
import { CasesListView } from '@/features/cases/components/CasesListView'
import { AuditsListView } from './AuditsListView'
import { useDashboardStats } from '../hooks/useDashboardStats'

export interface DashboardPageProps {
  onLogout: () => void
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onLogout }) => {
  // Navigation & View Mode
  const [activeView, setActiveView] = useState<NavView>('hub')
  const [viewMode, setViewMode] = useState<ViewMode>('network')
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false)

  // Entity Selection & Search via useEntities
  const {
    selectedEntityId,
    setSelectedEntityId,
    selectedEntity,
    searchQuery,
    setSearchQuery,
    searchResults
  } = useEntities('P003')

  const [selectedRel, setSelectedRel] = useState<Relationship | null>(null)
  const [hoveredEntity, setHoveredEntity] = useState<AnyEntity | null>(null)
  const [activeEvidenceId, setActiveEvidenceId] = useState<string | null>(null)
  const [reportModalOpen, setReportModalOpen] = useState<boolean>(false)
  const [searchFocusId, setSearchFocusId] = useState<string | null>(null)

  // Display toggles
  const [showLabels, setShowLabels] = useState(true)
  const [showRelLabels, setShowRelLabels] = useState(false)
  const [showTwoHop, setShowTwoHop] = useState(false)

  // Filters State
  const [selectedEntityTypes, setSelectedEntityTypes] = useState<Set<string>>(
    () => new Set(Object.keys(ENTITY_CONFIG))
  )
  const [selectedRelCategories, setSelectedRelCategories] = useState<Set<string>>(
    () => new Set(Object.keys(REL_CATEGORY_CONFIG))
  )
  const [priorityFilter, setPriorityFilter] = useState<PriorityLevel>('ALL')
  const [confidenceFilter, setConfidenceFilter] = useState<ConfidenceLevel>('ALL')
  const [statusFilter, setStatusFilter] = useState<EntityStatus>('ALL')
  const [dateRange, setDateRange] = useState<DateRange>({
    from: '2026-08-01',
    to: '2026-09-15'
  })
  const [spotlightEntityId, setSpotlightEntityId] = useState<string | null>(null)
  const [isTimelinePlaying, setIsTimelinePlaying] = useState(false)
  const [currentPlayDate, setCurrentPlayDate] = useState<string | null>(null)

  // Session Activity Stream
  const [auditLog, setAuditLog] = useState<AuditLogItem[]>([
    { time: '18:30:12', text: 'Analyst session initialized with synthetic demonstration dataset.' },
    { time: '18:30:20', text: 'Focused bridge entity P003 (Sameer Khan).' }
  ])

  const logActivity = useCallback((actionText: string) => {
    const time = new Date().toTimeString().slice(0, 8)
    setAuditLog(prev => [{ time, text: actionText }, ...prev.slice(0, 24)])
  }, [])

  // Day-by-day Investigation Playback Simulation
  useEffect(() => {
    if (!isTimelinePlaying) return
    const dates: string[] = []
    let d = new Date('2026-08-01')
    const end = new Date('2026-09-15')
    while (d <= end) {
      dates.push(d.toISOString().slice(0, 10))
      d.setDate(d.getDate() + 1)
    }
    let idx = dates.indexOf(currentPlayDate || '2026-08-01')
    if (idx === -1 || idx >= dates.length - 1) idx = 0

    const interval = setInterval(() => {
      idx = (idx + 1) % dates.length
      const nextDate = dates[idx]
      setCurrentPlayDate(nextDate)
      setDateRange({ from: '2026-08-01', to: nextDate })
      logActivity(`Investigation playback step: ${nextDate}`)
    }, 650)

    return () => clearInterval(interval)
  }, [isTimelinePlaying, currentPlayDate, logActivity])

  const handleToggleSpotlight = (id: string) => {
    setSpotlightEntityId(prev => (prev === id ? null : id))
    if (id) {
      const ent = entities.find(e => e.id === id)
      logActivity(`Toggled Spotlight Ego Mode on ${id} (${ent?.name || ''})`)
    } else {
      logActivity('Exited Spotlight Mode')
    }
  }

  const handleSelectDateFromHeatmap = (ds: string) => {
    setDateRange({ from: ds, to: ds })
    setCurrentPlayDate(ds)
    logActivity(`Heatmap filtered to ${ds}`)
  }

  const handlePlayTimelineToggle = () => {
    setIsTimelinePlaying(p => !p)
  }

  // Use Network Graph Hook for filtered entities, relationships, bridge scores, and clusters
  const { visibleEntities, visibleRels, bridgeScores, clusters } = useNetworkGraph({
    entities,
    relationships,
    selectedEntityTypes,
    selectedRelCategories,
    priorityFilter,
    confidenceFilter,
    statusFilter,
    dateRange,
    spotlightEntityId
  })

  // Filtered CDRs and Evidences in date range
  const visibleCdrs = useMemo(() => {
    return cdrRecords.filter(c => {
      const d = c.timestamp.slice(0, 10)
      if (dateRange.from && d < dateRange.from) return false
      if (dateRange.to && d > dateRange.to) return false
      return true
    })
  }, [dateRange])

  const visibleEvidences = useMemo(() => {
    return evidenceRecords.filter(ev => {
      const d = ev.dateCollected || (ev as any).date
      if (d) {
        if (dateRange.from && d < dateRange.from) return false
        if (dateRange.to && d > dateRange.to) return false
      }
      return true
    })
  }, [dateRange])

  // Pattern Detection Hook
  const { patterns: detectedPatterns } = usePatterns({
    activeEntities: visibleEntities,
    activeRels: visibleRels,
    activeCdrs: visibleCdrs,
    activeEvidences: visibleEvidences,
    dateRange,
    locationObservations,
    allEntities: entities
  })

  // Dashboard Stats Hook
  const { kpis } = useDashboardStats({
    entities,
    relationships,
    visibleEntities,
    visibleRels,
    evidences: visibleEvidences,
    patterns: detectedPatterns,
    clusters
  })

  const toggleEntityType = (type: string) => {
    setSelectedEntityTypes(prev => {
      const next = new Set(prev)
      if (next.has(type)) {
        if (next.size > 1) next.delete(type)
      } else {
        next.add(type)
      }
      return next
    })
  }

  const toggleRelCategory = (cat: string) => {
    setSelectedRelCategories(prev => {
      const next = new Set(prev)
      if (next.has(cat)) {
        if (next.size > 1) next.delete(cat)
      } else {
        next.add(cat)
      }
      return next
    })
  }

  const handleSelectEntity = (id: string) => {
    setSelectedEntityId(id)
    setSelectedRel(null)
    const ent = entities.find(e => e.id === id)
    logActivity(`Selected Subject ${id} (${ent?.name || ''})`)
  }

  const handleSelectRel = (rel: Relationship) => {
    setSelectedRel(rel)
    logActivity(`Inspected Relationship ${rel.id} (${rel.type})`)
  }

  const handleSelectSearchResult = (ent: AnyEntity) => {
    setSelectedEntityId(ent.id)
    setSearchFocusId(ent.id)
    setSearchQuery('')
    setActiveView('workspace')
    logActivity(`Search navigated to ${ent.id} (${ent.name})`)
  }

  const handleSelectPattern = (pat: DetectedPattern) => {
    if (pat.entities[0]) {
      handleSelectEntity(pat.entities[0])
      setActiveView('workspace')
    }
    logActivity(`Investigating pattern ${pat.name}: ${pat.summary}`)
  }

  const entityCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    entities.forEach(e => {
      counts[e.type] = (counts[e.type] || 0) + 1
    })
    return counts
  }, [])

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-[#00629B]/40 selection:text-white">
      {/* 1. TOP OPERATIONAL HEADER (Wireframe Header with LinkTracer, Search, Links, Logout) */}
      <Topbar
        activeView={activeView}
        onNavigate={view => {
          if (view === 'reports') {
            setReportModalOpen(true)
          } else {
            setActiveView(view)
          }
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchResults={searchResults}
        onSelectSearchResult={handleSelectSearchResult}
        onToggleFilters={() => setFiltersOpen(!filtersOpen)}
        filtersOpen={filtersOpen}
        onLogout={onLogout}
      />

      {/* 2. MAIN APPLICATION VIEWS */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* VIEW A: INVESTIGATOR COMMAND HUB */}
        {activeView === 'hub' && (
          <InvestigatorHub
            onNavigate={view => {
              if (view === 'reports') {
                setReportModalOpen(true)
              } else {
                setActiveView(view)
              }
            }}
            onSelectEntity={id => {
              handleSelectEntity(id)
              setActiveView('workspace')
            }}
            assignedCasesCount={kpis.activeCases}
            totalEntitiesCount={entities.length}
            totalRelsCount={relationships.length}
            highPriorityCount={kpis.highPriorityCount}
            patternsCount={detectedPatterns.length}
            recentCriminals={entities.filter(e => e.type === 'PERSON').slice(0, 5)}
          />
        )}

        {/* VIEW B: CRIMINAL DIRECTORY (Wireframe Page 1: Search Criminal Directory) */}
        {activeView === 'directory' && (
          <CriminalDirectory
            entities={entities}
            relationships={relationships}
            onSelectCriminal={id => {
              handleSelectEntity(id)
              setActiveView('workspace')
            }}
          />
        )}

        {/* VIEW C: ASSIGNED CASES EXPLORER */}
        {activeView === 'cases' && (
          <CasesListView
            onSelectCase={id => {
              handleSelectEntity(id)
              setActiveView('workspace')
            }}
            onOpenWorkspace={() => setActiveView('workspace')}
          />
        )}

        {/* VIEW D: SECURITY AUDIT LOGS */}
        {activeView === 'audits' && (
          <AuditsListView auditLog={auditLog} />
        )}

        {/* VIEW E: DETAILED INVESTIGATION WORKSPACE (Wireframe Page 2: 3-Column Architecture) */}
        {activeView === 'workspace' && (
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-[380px_1fr_340px] overflow-hidden w-full">
            {/* LEFT COLUMN: INVESTIGATION DOSSIER & SUBVIEWS */}
            <section className="border-r border-neutral-800 bg-[#050505] flex flex-col overflow-hidden max-h-[calc(100vh-80px)]">
              {selectedEntity ? (
                <InspectorDossier
                  entity={selectedEntity}
                  selectedRel={selectedRel}
                  activeRels={visibleRels}
                  activeCdrs={visibleCdrs}
                  activeEvidences={visibleEvidences}
                  bridgeScores={bridgeScores}
                  onSelectEntity={handleSelectEntity}
                  onSelectRel={handleSelectRel}
                  onOpenEvidence={evId => setActiveEvidenceId(evId)}
                  onGenerateReport={() => setReportModalOpen(true)}
                  onToggleSpotlight={handleToggleSpotlight}
                  dateRange={dateRange}
                />
              ) : selectedRel ? (
                <RelationshipInspector
                  relationship={selectedRel}
                  onSelectEntity={handleSelectEntity}
                  onOpenEvidence={evId => setActiveEvidenceId(evId)}
                  onClose={() => setSelectedRel(null)}
                />
              ) : (
                <div className="p-8 text-center flex flex-col items-center justify-center h-full text-neutral-500">
                  <Target size={36} className="text-neutral-600 mb-3" />
                  <h3 className="text-sm font-bold text-neutral-300 uppercase tracking-wider font-mono">
                    Select a Subject
                  </h3>
                  <p className="text-xs text-neutral-500 mt-2 max-w-xs leading-relaxed">
                    Click any criminal, vehicle, location, or phone in the network visualization to inspect its full dossier, registered FIRs, wiretap CDRs, and evidence lineage.
                  </p>
                </div>
              )}
            </section>

            {/* CENTER COLUMN: PURE BLACK D3 RELATION GRAPH VISUALIZATION */}
            <main className="relative flex flex-col bg-black overflow-hidden min-h-[500px]">
              <InteractiveD3Graph
                visibleEntities={visibleEntities}
                visibleRels={visibleRels}
                selectedEntityId={selectedEntityId}
                selectedRelId={selectedRel?.id}
                hoveredEntityId={hoveredEntity?.id}
                onSelectEntity={handleSelectEntity}
                onSelectRel={handleSelectRel}
                onHoverEntity={setHoveredEntity}
                showLabels={showLabels}
                showRelLabels={showRelLabels}
                showTwoHop={showTwoHop}
                viewMode={viewMode}
                searchFocusId={searchFocusId}
                onClearSearchFocus={() => setSearchFocusId(null)}
                spotlightEntityId={spotlightEntityId}
                onToggleSpotlight={handleToggleSpotlight}
                onGenerateReport={() => setReportModalOpen(true)}
                dateRange={dateRange}
                onSelectDate={handleSelectDateFromHeatmap}
                onPlayToggle={handlePlayTimelineToggle}
                isPlaying={isTimelinePlaying}
                currentPlayDate={currentPlayDate}
              />
            </main>

            {/* RIGHT COLUMN: RIGHT INTELLIGENCE PANEL */}
            <RightIntelligencePanel
              patterns={detectedPatterns}
              clusters={clusters}
              selectedEntity={selectedEntity}
              bridgeScores={bridgeScores}
              onSelectPattern={handleSelectPattern}
              onSelectEntity={handleSelectEntity}
              onGenerateReport={() => setReportModalOpen(true)}
            />
          </div>
        )}

        {/* FILTER SLIDE-OUT PANEL (Triggered from Topbar "Filters") */}
        {filtersOpen && (
          <div className="fixed inset-y-0 left-0 z-50 w-80 shadow-2xl bg-black border-r border-neutral-800 flex flex-col animate-fade-in">
            <div className="flex items-center justify-between p-3 border-b border-neutral-800 bg-[#050505]">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={14} className="text-[#00629B]" />
                <span className="font-mono text-xs font-bold uppercase text-white">
                  INVESTIGATION FILTERS
                </span>
              </div>
              <button
                onClick={() => setFiltersOpen(false)}
                className="btn-icon"
                aria-label="Close filters"
              >
                <X size={14} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <Sidebar
                selectedEntityTypes={selectedEntityTypes}
                toggleEntityType={toggleEntityType}
                selectedRelCategories={selectedRelCategories}
                toggleRelCategory={toggleRelCategory}
                priorityFilter={priorityFilter}
                setPriorityFilter={setPriorityFilter}
                confidenceFilter={confidenceFilter}
                setConfidenceFilter={setConfidenceFilter}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                dateRange={dateRange}
                setDateRange={setDateRange}
                viewMode={viewMode}
                setViewMode={setViewMode}
                showLabels={showLabels}
                setShowLabels={setShowLabels}
                showRelLabels={showRelLabels}
                setShowRelLabels={setShowRelLabels}
                showTwoHop={showTwoHop}
                setShowTwoHop={setShowTwoHop}
                entityCounts={entityCounts}
              />
            </div>
          </div>
        )}
      </div>

      {/* 3. BOTTOM OPERATIONAL STATUS BAR */}
      <footer className="border-t border-neutral-800 bg-black px-4 py-1.5 text-[11px] flex flex-wrap items-center justify-between gap-4 text-neutral-400 font-mono">
        <div className="flex items-center gap-4">
          <span>
            Entities: <strong className="text-white">{visibleEntities.length}</strong> / {entities.length}
          </span>
          <span>
            Relationships: <strong className="text-white">{visibleRels.length}</strong> / {relationships.length}
          </span>
          <span>
            CDRs: <strong className="text-white">{visibleCdrs.length}</strong>
          </span>
          <span>
            Evidences: <strong className="text-white">{visibleEvidences.length}</strong>
          </span>
        </div>

        <div className="flex items-center gap-4">
          {selectedEntity && (
            <span>
              Target: <strong className="text-[#00629B]">{selectedEntity.name} ({selectedEntity.id})</strong>
            </span>
          )}
          <span>
            Console: <strong className="text-emerald-400 font-semibold">ACTIVE</strong>
          </span>
          <span>
            Classification: <strong className="text-amber-400">DEMO INTEL</strong>
          </span>
        </div>
      </footer>

      {/* Evidence Drawer Overlay */}
      {activeEvidenceId && (
        <EvidenceDrawer
          evidenceId={activeEvidenceId}
          onClose={() => setActiveEvidenceId(null)}
          onSelectEntity={handleSelectEntity}
          onSelectRel={handleSelectRel}
        />
      )}

      {/* Report Modal Overlay */}
      {reportModalOpen && (
        <ReportModal
          entity={selectedEntity}
          activeRels={visibleRels}
          activeCdrs={visibleCdrs}
          activeEvidences={visibleEvidences}
          onClose={() => setReportModalOpen(false)}
        />
      )}
    </div>
  )
}
