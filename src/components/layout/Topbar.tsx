import React from 'react'
import { Shield, Search, X, Power, SlidersHorizontal, User, Home, BookOpen, Network, FileBarChart, FolderGit2, ShieldCheck, Fingerprint } from 'lucide-react'
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

const NAV_ITEMS: { view: NavView; label: string; icon: React.ElementType }[] = [
  { view: 'hub', label: 'Command Hub', icon: Home },
  { view: 'directory', label: 'Criminal Directory', icon: Fingerprint },
  { view: 'workspace', label: 'Investigation Workspace', icon: Network },
  { view: 'cases', label: 'Assigned Cases', icon: FolderGit2 },
  { view: 'reports', label: 'Case Reports', icon: FileBarChart },
  { view: 'audits', label: 'Audit Logs', icon: ShieldCheck },
]

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
    <header className="border-b border-white/10 bg-gradient-to-r from-[#06080f]/95 via-[#080b14]/98 to-[#06080f]/95 backdrop-blur-xl sticky top-0 z-40 px-4 py-2 flex flex-col gap-1.5 shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
      {/* Top Row: Brand, Global Search, Investigator Profile, Actions */}
      <div className="flex items-center justify-between gap-4">
        {/* Brand & Platform Identifier */}
        <div className="flex items-center gap-3">
          <div
            onClick={() => onNavigate?.('hub')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.2)] group-hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-shadow">
              <Shield size={18} strokeWidth={2.2} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-black tracking-wider text-white group-hover:text-indigo-200 transition">
                  LINKTRACER
                </span>

              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                <span className="text-neutral-500 font-medium">SECURE NETWORK</span>
              </div>
            </div>
          </div>
        </div>

        {/* Global Search Bar - Premium with glow */}
        <div className="relative flex-1 max-w-md hidden md:block">
          <Search className="absolute left-3.5 top-2.5 text-indigo-300/50" size={15} />
          <input
            type="text"
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Search Criminal ID or Name (e.g. Rahul, Sameer, P001)..."
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] pl-10 pr-9 py-2 text-xs text-white placeholder-neutral-500 outline-none transition-all focus:border-indigo-400/50 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white/[0.06] focus:shadow-[0_0_20px_rgba(99,102,241,0.15)]"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-2 text-neutral-500 hover:text-white transition-colors p-0.5 rounded-md hover:bg-white/10"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}

          {/* Autocomplete Dropdown - Premium */}
          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1.5 rounded-xl border border-white/15 bg-[#0a0e18]/98 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-50 overflow-hidden divide-y divide-white/5 max-h-64 overflow-y-auto">
              {searchResults.map(res => (
                <button
                  key={res.id}
                  onClick={() => {
                    onSelectSearchResult(res)
                    onNavigate?.('workspace')
                  }}
                  className="w-full px-4 py-2.5 text-left hover:bg-indigo-500/10 flex items-center justify-between text-xs transition-colors"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span
                      className="h-2.5 w-2.5 rounded-full shadow-sm"
                      style={{ backgroundColor: ENTITY_CONFIG[res.type]?.color || '#6366f1' }}
                    />
                    <span className="font-semibold text-white">{res.name}</span>
                    <span className="text-[10px] text-indigo-300/60 font-mono">({res.id})</span>
                  </div>
                  <span className="text-[9px] uppercase font-bold text-indigo-300/50 font-mono rounded-md bg-indigo-500/10 px-1.5 py-0.5">
                    {res.type}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Section: Investigator Profile, Filter Toggle, Logout */}
        <div className="flex items-center gap-2.5">

          <div className="hidden lg:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs hover:bg-white/[0.06] transition-colors">
          </div>


          {onToggleFilters && (
            <button
              onClick={onToggleFilters}
              className={`rounded-xl px-3 py-2 text-xs font-medium flex items-center gap-1.5 transition-all border cursor-pointer ${filtersOpen
                  ? 'border-indigo-400/50 bg-indigo-500/15 text-indigo-200 shadow-[0_0_12px_rgba(99,102,241,0.2)]'
                  : 'border-white/10 bg-white/[0.04] text-neutral-400 hover:border-white/20 hover:bg-white/[0.06] hover:text-white'
                }`}
              title="Toggle Investigation Filters"
            >
              <SlidersHorizontal size={14} />
              <span className="hidden sm:inline">Filters</span>
            </button>
          )}

          {/* Logout Button - Premium with Power icon */}
          <button
            onClick={onLogout}
            title="End intelligence session"
            className="rounded-xl px-3 py-2 text-xs font-medium flex items-center gap-1.5 border border-rose-500/20 bg-rose-500/10 text-rose-300 hover:border-rose-400/40 hover:bg-rose-500/20 hover:text-rose-200 hover:shadow-[0_0_15px_rgba(244,63,94,0.2)] transition-all cursor-pointer"
            aria-label="Logout"
          >
            <Power size={14} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>

      {/* Bottom Row: Navigation Tabs - Premium pill-style */}
      <div className="flex items-center border-t border-white/[0.06] pt-1.5 overflow-x-auto scrollbar-none">
        <nav className="flex items-center gap-1">
          {NAV_ITEMS.map(({ view, label, icon: Icon }) => (
            <button
              key={view}
              onClick={() => onNavigate?.(view)}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 text-[11px] font-medium whitespace-nowrap cursor-pointer ${activeView === view
                  ? 'bg-indigo-500/15 text-indigo-200 border border-indigo-400/30 shadow-[0_0_10px_rgba(99,102,241,0.15)] font-semibold'
                  : 'text-neutral-500 hover:text-neutral-200 hover:bg-white/[0.04] border border-transparent'
                }`}
            >
              <Icon size={13} className={activeView === view ? 'text-indigo-300' : ''} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}

