import React from 'react'
import { Shield, Search, X, LogOut, SlidersHorizontal, User, Home, BookOpen, Network, FileText, Database, ShieldAlert } from 'lucide-react'
import { AnyEntity } from '@/types'
import { ENTITY_CONFIG } from '@/lib'

export type NavView = 'hub' | 'directory' | 'workspace' | 'cases' | 'reports' | 'audits'

export interface TopbarProps {
  activeView?: NavView
  onNavigate?: (view: NavView) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  searchResults: AnyEntity[]
  onSelectSearchResult: (entity: AnyEntity) => void
  onToggleFilters?: () => void
  filtersOpen?: boolean
  onLogout: () => void
}

export const Topbar: React.FC<TopbarProps> = ({
  activeView = 'workspace',
  onNavigate,
  searchQuery,
  onSearchChange,
  searchResults,
  onSelectSearchResult,
  onToggleFilters,
  filtersOpen = false,
  onLogout
}) => {
  return (
    <header className="border-b border-neutral-800 bg-black sticky top-0 z-40 px-4 py-2 flex flex-col gap-2">
      {/* Top Row: Brand, Global Search, Investigator Profile, Logout */}
      <div className="flex items-center justify-between gap-4">
        {/* Brand & Platform Identifier */}
        <div className="flex items-center gap-3">
          <div
            onClick={() => onNavigate?.('hub')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="h-8 w-8 rounded bg-white/5 flex items-center justify-center font-bold text-white shadow-sm border border-neutral-800">
              <Database size={18} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-black tracking-wider text-white group-hover:text-neutral-300 transition">
                  LINKTRACER
                </span>
                <span className="text-[10px] text-neutral-400 font-mono hidden sm:inline">
                  / INVESTIGATION DASHBOARD
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono">
                <span className="text-neutral-500 font-medium">INTERNAL NETWORK</span>
              </div>
            </div>
          </div>
        </div>

        {/* Global Search Bar (Matching Wireframe Page 2 Header) */}
        <div className="relative flex-1 max-w-md hidden md:block">
          <Search className="absolute left-3 top-2.5 text-neutral-500" size={14} />
          <input
            type="text"
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Search Criminal ID or Name (e.g. Rahul, Sameer, P001)..."
            className="w-full rounded border border-neutral-800 bg-[#09090B] pl-9 pr-8 py-1.5 text-xs text-white placeholder-neutral-500 outline-none focus:border-white focus:ring-1 focus:ring-[#00629B]/40"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-2 text-neutral-500 hover:text-white"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}

          {/* Autocomplete Dropdown */}
          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 rounded border border-neutral-800 bg-[#09090B] shadow-2xl z-50 overflow-hidden divide-y divide-neutral-900 max-h-60 overflow-y-auto">
              {searchResults.map(res => (
                <button
                  key={res.id}
                  onClick={() => {
                    onSelectSearchResult(res)
                    onNavigate?.('workspace')
                  }}
                  className="w-full px-3 py-2 text-left hover:bg-white/5 flex items-center justify-between text-xs transition"
                >
                  <div className="flex items-center gap-2 truncate">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: ENTITY_CONFIG[res.type]?.color || '#00629B' }}
                    />
                    <span className="font-semibold text-white">{res.name}</span>
                    <span className="text-[10px] text-neutral-400 font-mono">({res.id})</span>
                  </div>
                  <span className="text-[9px] uppercase font-bold text-neutral-400 font-mono">
                    {res.type}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Section: Active Investigator & Logout */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2.5 px-2.5 py-1 rounded bg-[#09090B] border border-neutral-800 text-xs">
            <div className="h-6 w-6 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center text-neutral-300">
              <User size={13} />
            </div>
            <div>
              <div className="font-semibold text-white leading-tight text-[11px]">
                Off. Vikramaditya Sen
              </div>
              <div className="text-[9px] text-neutral-500 font-mono leading-tight">
                INV-88201 • Central Crime
              </div>
            </div>
          </div>

          {onToggleFilters && (
            <button
              onClick={onToggleFilters}
              className={`btn-ghost text-xs py-1.5 px-2.5 flex items-center gap-1.5 ${filtersOpen ? 'border-white bg-white/5 text-white' : ''
                }`}
              title="Toggle Investigation Filters"
            >
              <SlidersHorizontal size={13} className="text-white" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          )}

          <button
            onClick={onLogout}
            title="Logout from intelligence session"
            className="btn-ghost text-xs py-1.5 px-2.5 text-neutral-400 hover:text-neutral-400 hover:border-neutral-700"
            aria-label="Logout"
          >
            <LogOut size={13} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>

      {/* Bottom Row: Navigation Links for Other Pages (Wireframe Page 2 Header) */}
      <div className="flex items-center justify-between border-t border-neutral-900 pt-1.5 text-xs font-semibold overflow-x-auto">
        <nav className="flex items-center gap-1">
          <button
            onClick={() => onNavigate?.('hub')}
            className={`px-3 py-1 rounded transition flex items-center gap-1.5 text-[11px] ${activeView === 'hub'
                ? 'bg-white/5 text-white font-bold'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
          >
            <Home size={12} />
            <span>Command Hub</span>
          </button>

          <button
            onClick={() => onNavigate?.('directory')}
            className={`px-3 py-1 rounded transition flex items-center gap-1.5 text-[11px] ${activeView === 'directory'
                ? 'bg-white/5 text-white font-bold'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
          >
            <BookOpen size={12} />
            <span>Criminal Directory</span>
          </button>

          <button
            onClick={() => onNavigate?.('workspace')}
            className={`px-3 py-1 rounded transition flex items-center gap-1.5 text-[11px] ${activeView === 'workspace'
                ? 'bg-white/5 text-white font-bold'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
          >
            <Network size={12} />
            <span>Investigation Workspace</span>
          </button>

          <button
            onClick={() => onNavigate?.('cases')}
            className={`px-3 py-1 rounded transition flex items-center gap-1.5 text-[11px] ${activeView === 'cases'
                ? 'bg-white/5 text-white font-bold'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
          >
            <FileText size={12} />
            <span>Assigned Cases</span>
          </button>

          <button
            onClick={() => onNavigate?.('reports')}
            className={`px-3 py-1 rounded transition flex items-center gap-1.5 text-[11px] ${activeView === 'reports'
                ? 'bg-white/5 text-white font-bold'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
          >
            <FileText size={12} />
            <span>Case Reports</span>
          </button>

          <button
            onClick={() => onNavigate?.('audits')}
            className={`px-3 py-1 rounded transition flex items-center gap-1.5 text-[11px] ${activeView === 'audits'
                ? 'bg-white/5 text-white font-bold'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
          >
            <Database size={12} />
            <span>Audit Logs</span>
          </button>
        </nav>

        {activeView === 'workspace' && (
          <button
            onClick={() => onNavigate?.('hub')}
            className="text-[11px] text-neutral-400 hover:text-white font-mono shrink-0 transition"
          >
            ← Back to Homepage option
          </button>
        )}
      </div>
    </header>
  )
}
