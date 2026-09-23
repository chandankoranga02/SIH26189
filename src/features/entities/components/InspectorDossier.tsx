import React, { useState } from 'react'
import {
  User,
  GitBranch,
  PhoneCall,
  FileText,
  HelpCircle,
  Sparkles,
  Printer,
  ChevronRight
} from 'lucide-react'
import { AnyEntity, Relationship, CdrRecord, EvidenceRecord, DateRange } from '@/types'
import { CriminalProfileView } from './CriminalProfileView'
import { CriminalRelationsView } from './CriminalRelationsView'
import { CriminalCallRecordsView } from './CriminalCallRecordsView'
import { CriminalFirsView } from './CriminalFirsView'
import { EvidenceLineageView } from './EvidenceLineageView'

export type DossierTab =
  | 'profile'
  | 'relations'
  | 'calls'
  | 'firs'
  | 'lineage'

export interface InspectorDossierProps {
  entity: AnyEntity
  selectedRel?: Relationship | null
  activeRels: Relationship[]
  activeCdrs: CdrRecord[]
  activeEvidences: EvidenceRecord[]
  bridgeScores: Record<string, number>
  onSelectEntity: (id: string) => void
  onSelectRel: (rel: Relationship) => void
  onOpenEvidence: (evId: string) => void
  onGenerateReport: (entity: AnyEntity) => void
  onToggleSpotlight?: (id: string) => void
  dateRange: DateRange
}

export const InspectorDossier: React.FC<InspectorDossierProps> = ({
  entity,
  selectedRel,
  activeRels,
  activeCdrs,
  activeEvidences,
  bridgeScores,
  onSelectEntity,
  onSelectRel,
  onOpenEvidence,
  onGenerateReport,
  onToggleSpotlight,
  dateRange
}) => {
  // Active Dossier Sub-View (Matching Wireframe Page 2 Left Column)
  const [activeTab, setActiveTab] = useState<DossierTab>('profile')

  return (
    <div className="flex flex-col h-full bg-black text-white">
      {/* Dossier Top Navigation Tabs (Matching Wireframe Page 2 Left Panel) */}
      <div className="border-b border-neutral-800 bg-[#09090B] p-2">
        <div className="flex items-center justify-between px-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-white/5" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400">
              INVESTIGATION DOSSIER
            </span>
          </div>

          <button
            onClick={() => onGenerateReport(entity)}
            className="btn-ghost text-[10px] py-1 px-2.5 flex items-center gap-1.5 hover:text-white"
            title="Generate Dossier Report"
          >
            <Printer size={11} className="text-white" />
            <span>Generate Report</span>
          </button>
        </div>

        {/* 5 Selectable Mode Tabs */}
        <div className="grid grid-cols-5 gap-1 text-[11px] font-semibold">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-1.5 px-1 rounded text-center truncate transition ${
              activeTab === 'profile'
                ? 'bg-white/5 text-white'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
            title="Criminal Profile"
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('relations')}
            className={`py-1.5 px-1 rounded text-center truncate transition ${
              activeTab === 'relations'
                ? 'bg-white/5 text-white'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
            title="Relation with different Criminals"
          >
            Relations
          </button>
          <button
            onClick={() => setActiveTab('calls')}
            className={`py-1.5 px-1 rounded text-center truncate transition ${
              activeTab === 'calls'
                ? 'bg-white/5 text-white'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
            title="Detailed Call records with audio play"
          >
            Calls (CDR)
          </button>
          <button
            onClick={() => setActiveTab('firs')}
            className={`py-1.5 px-1 rounded text-center truncate transition ${
              activeTab === 'firs'
                ? 'bg-white/5 text-white'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
            title="FIRs Records"
          >
            FIRs
          </button>
          <button
            onClick={() => setActiveTab('lineage')}
            className={`py-1.5 px-1 rounded text-center truncate transition ${
              activeTab === 'lineage'
                ? 'bg-white/5 text-white'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
            }`}
            title="Evidence Lineage: Why was this relationship found?"
          >
            Lineage
          </button>
        </div>
      </div>

      {/* Tab Content Container */}
      <div className="flex-1 p-4 overflow-y-auto">
        {activeTab === 'profile' && (
          <CriminalProfileView
            entity={entity}
            activeRels={activeRels}
            onSelectEntity={onSelectEntity}
            onSelectRel={onSelectRel}
            onSwitchTab={tab => setActiveTab(tab as DossierTab)}
          />
        )}

        {activeTab === 'relations' && (
          <CriminalRelationsView
            entity={entity}
            activeRels={activeRels}
            onSelectEntity={onSelectEntity}
            onSelectRel={onSelectRel}
          />
        )}

        {activeTab === 'calls' && (
          <CriminalCallRecordsView
            entity={entity}
            activeCdrs={activeCdrs}
            onSelectEntity={onSelectEntity}
          />
        )}

        {activeTab === 'firs' && (
          <CriminalFirsView
            entity={entity}
            onSelectEntity={onSelectEntity}
            onOpenReport={() => onGenerateReport(entity)}
          />
        )}

        {activeTab === 'lineage' && (
          <EvidenceLineageView
            entity={entity}
            selectedRel={selectedRel}
            activeRels={activeRels}
            activeCdrs={activeCdrs}
            activeEvidences={activeEvidences}
            onSelectEntity={onSelectEntity}
            onOpenEvidence={onOpenEvidence}
          />
        )}
      </div>
    </div>
  )
}
