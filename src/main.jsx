import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { createRoot } from 'react-dom/client'
import * as d3 from 'd3'
import {
  Activity, AlertTriangle, ArrowRight, BarChart3, Building2, Calendar, Check,
  ChevronRight, Clock, Database, Download, Eye, EyeOff, FileText,
  Filter, FolderGit2, GitBranch, Layers, LayoutDashboard, Link2, LogOut,
  MapPin, Maximize2, Network, Phone, PhoneCall, PhoneIncoming, PhoneOutgoing,
  Printer, Radio, RefreshCw, Search, Shield, ShieldAlert, ShieldCheck,
  Sliders, Sparkles, Target, Truck, Users, X, Zap
} from 'lucide-react'
import './index.css'
import {
  entities,
  relationships,
  cdrRecords,
  evidenceRecords,
  timelineObservations,
  locationObservations,
  patternRuleDefinitions,
  DISCLAIMER_TEXT
} from './data'

// Demo Authentication Credentials
const DEMO_CREDENTIALS = [
  { user: 'investigator', pass: 'demo123' },
  { user: 'admin@example.com', pass: 'admin123' }
]

// Entity Visual Types & Colors
const ENTITY_CONFIG = {
  PERSON: {
    label: 'Person',
    color: '#38bdf8',
    bg: 'rgba(56, 189, 248, 0.15)',
    border: '#0284c7',
    icon: Users,
    baseRadius: 24,
    shape: 'circle'
  },
  PHONE: {
    label: 'Phone',
    color: '#a78bfa',
    bg: 'rgba(167, 139, 250, 0.15)',
    border: '#7c3aed',
    icon: Phone,
    baseRadius: 18,
    shape: 'rounded-rect'
  },
  LOCATION: {
    label: 'Location',
    color: '#34d399',
    bg: 'rgba(52, 211, 153, 0.15)',
    border: '#059669',
    icon: MapPin,
    baseRadius: 22,
    shape: 'pin'
  },
  CASE: {
    label: 'FIR / Case',
    color: '#f87171',
    bg: 'rgba(248, 113, 113, 0.15)',
    border: '#dc2626',
    icon: FileText,
    baseRadius: 22,
    shape: 'square'
  },
  EVENT: {
    label: 'Event',
    color: '#fbbf24',
    bg: 'rgba(251, 191, 36, 0.15)',
    border: '#d97706',
    icon: Clock,
    baseRadius: 20,
    shape: 'diamond'
  },
  VEHICLE: {
    label: 'Vehicle',
    color: '#fb923c',
    bg: 'rgba(251, 146, 60, 0.15)',
    border: '#ea580c',
    icon: Truck,
    baseRadius: 20,
    shape: 'hexagon'
  },
  ORGANIZATION: {
    label: 'Organization',
    color: '#60a5fa',
    bg: 'rgba(96, 165, 250, 0.15)',
    border: '#2563eb',
    icon: Building2,
    baseRadius: 26,
    shape: 'rect'
  }
}

// Relationship categories and styling
const REL_CATEGORY_CONFIG = {
  COMMUNICATION: { color: '#38bdf8', dash: null, width: 2 },
  ASSOCIATION: { color: '#94a3b8', dash: null, width: 1.5 },
  LOCATION: { color: '#34d399', dash: '4,4', width: 1.5 },
  CASE: { color: '#f87171', dash: null, width: 2.5 },
  EVENT: { color: '#fbbf24', dash: '2,3', width: 1.8 },
  MEMBERSHIP: { color: '#60a5fa', dash: '6,3', width: 1.8 },
  VEHICLE: { color: '#fb923c', dash: '5,3', width: 1.8 }
}

const fmtDuration = (sec) => `${Math.floor(sec / 60)}m ${sec % 60}s`
const fmtDate = (dStr) => {
  if (!dStr) return 'N/A'
  try {
    const d = new Date(dStr)
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
  } catch {
    return dStr
  }
}

// ==========================================
// ALGORITHMS & ANALYTICAL CALCULATIONS
// ==========================================

// Get dynamic connections for an entity
function getDirectNeighbors(entityId, rels) {
  const neighbors = new Set()
  rels.forEach(r => {
    const s = typeof r.source === 'object' ? r.source.id : r.source
    const t = typeof r.target === 'object' ? r.target.id : r.target
    if (s === entityId) neighbors.add(t)
    if (t === entityId) neighbors.add(s)
  })
  return Array.from(neighbors)
}

function getSecondDegreeNeighbors(entityId, rels) {
  const firstHop = new Set(getDirectNeighbors(entityId, rels))
  firstHop.add(entityId)
  const secondHop = new Set()

  firstHop.forEach(neighborId => {
    if (neighborId === entityId) return
    const nextNeighbors = getDirectNeighbors(neighborId, rels)
    nextNeighbors.forEach(n => {
      if (!firstHop.has(n)) {
        secondHop.add(n)
      }
    })
  })
  return Array.from(secondHop)
}

// Calculate dynamic Betweenness Centrality / Bridge Score
function calculateBridgeScores(activeEntities, activeRels) {
  const scores = {}
  const nodes = activeEntities.map(e => e.id)
  nodes.forEach(n => { scores[n] = 0 })

  const adj = {}
  nodes.forEach(n => { adj[n] = [] })
  activeRels.forEach(r => {
    const s = typeof r.source === 'object' ? r.source.id : r.source
    const t = typeof r.target === 'object' ? r.target.id : r.target
    if (adj[s] && adj[t]) {
      adj[s].push(t)
      adj[t].push(s)
    }
  })

  // Brandes algorithm for betweenness centrality
  nodes.forEach(s => {
    const S = []
    const P = {}
    nodes.forEach(w => { P[w] = [] })
    const sigma = {}
    nodes.forEach(w => { sigma[w] = 0 })
    sigma[s] = 1
    const d = {}
    nodes.forEach(w => { d[w] = -1 })
    d[s] = 0

    const Q = [s]
    while (Q.length > 0) {
      const v = Q.shift()
      S.push(v)
      adj[v].forEach(w => {
        if (d[w] < 0) {
          Q.push(w)
          d[w] = d[v] + 1
        }
        if (d[w] === d[v] + 1) {
          sigma[w] += sigma[v]
          P[w].push(v)
        }
      })
    }

    const delta = {}
    nodes.forEach(w => { delta[w] = 0 })
    while (S.length > 0) {
      const w = S.pop()
      P[w].forEach(v => {
        delta[v] += (sigma[v] / (sigma[w] || 1)) * (1 + delta[w])
      })
      if (w !== s) {
        scores[w] += delta[w]
      }
    }
  })

  // Normalize scores between 0 and 1
  const maxScore = Math.max(...Object.values(scores), 1)
  const normalized = {}
  Object.keys(scores).forEach(k => {
    normalized[k] = parseFloat((scores[k] / maxScore).toFixed(2))
  })
  return normalized
}

// Connected Component / Community Cluster Detection
function detectClusters(activeEntities, activeRels) {
  const visited = new Set()
  const adj = {}
  activeEntities.forEach(e => { adj[e.id] = [] })

  activeRels.forEach(r => {
    const s = typeof r.source === 'object' ? r.source.id : r.source
    const t = typeof r.target === 'object' ? r.target.id : r.target
    if (adj[s] && adj[t]) {
      adj[s].push(t)
      adj[t].push(s)
    }
  })

  const clusters = []
  activeEntities.forEach(e => {
    if (!visited.has(e.id)) {
      const clusterMembers = []
      const queue = [e.id]
      visited.add(e.id)

      while (queue.length > 0) {
        const curr = queue.shift()
        clusterMembers.push(curr)
        adj[curr].forEach(neighbor => {
          if (!visited.has(neighbor)) {
            visited.add(neighbor)
            queue.push(neighbor)
          }
        })
      }

      // Count internal relationships
      const memberSet = new Set(clusterMembers)
      const internalRels = activeRels.filter(r => {
        const s = typeof r.source === 'object' ? r.source.id : r.source
        const t = typeof r.target === 'object' ? r.target.id : r.target
        return memberSet.has(s) && memberSet.has(t)
      })

      clusters.push({
        id: `Cluster ${String(clusters.length + 1).padStart(2, '0')}`,
        entities: clusterMembers,
        entityCount: clusterMembers.length,
        relationshipCount: internalRels.length,
        primaryTypes: [...new Set(clusterMembers.map(id => entities.find(x => x.id === id)?.type).filter(Boolean))]
      })
    }
  })

  return clusters.sort((a, b) => b.entityCount - a.entityCount)
}

// Transparent Analytical Priority Calculation
function calculatePriority(entity, activeRels, activeCdrs, activeEvidences) {
  if (!entity) return { total: 0, breakdown: {} }

  const neighbors = getDirectNeighbors(entity.id, activeRels)
  const degree = neighbors.length

  // 1. Centrality: max benchmark ~ 12 connections
  const centralityScore = Math.min(Math.round((degree / 10) * 30), 30)

  // 2. Communication Activity
  const commCalls = activeCdrs.filter(c => c.caller === entity.id || c.receiver === entity.id)
  const commScore = Math.min(Math.round((commCalls.length / 12) * 20), 20)

  // 3. Case Involvement
  const linkedCases = activeRels.filter(r => {
    const s = typeof r.source === 'object' ? r.source.id : r.source
    const t = typeof r.target === 'object' ? r.target.id : r.target
    const other = s === entity.id ? t : s
    const otherEntity = entities.find(e => e.id === other)
    return (s === entity.id || t === entity.id) && otherEntity?.type === 'CASE'
  })
  const caseScore = Math.min(Math.round((linkedCases.length / 3) * 20), 20)

  // 4. Location Overlap
  const locRels = activeRels.filter(r => {
    const s = typeof r.source === 'object' ? r.source.id : r.source
    const t = typeof r.target === 'object' ? r.target.id : r.target
    const other = s === entity.id ? t : s
    const otherEntity = entities.find(e => e.id === other)
    return (s === entity.id || t === entity.id) && otherEntity?.type === 'LOCATION'
  })
  const locScore = Math.min(Math.round((locRels.length / 3) * 15), 15)

  // 5. Evidence Strength
  const subjectEvidences = activeEvidences.filter(ev => ev.linkedEntities.includes(entity.id))
  const evidenceScore = Math.min(Math.round((subjectEvidences.length / 6) * 15), 15)

  const total = Math.min(centralityScore + commScore + caseScore + locScore + evidenceScore, 100)

  return {
    total: Math.max(total, entity.basePriority ? Math.round((total + entity.basePriority) / 2) : 25),
    breakdown: {
      centrality: { score: centralityScore, max: 30, label: 'Network Centrality' },
      communication: { score: commScore, max: 20, label: 'Communication Activity' },
      caseInvolvement: { score: caseScore, max: 20, label: 'Case Involvement' },
      locationOverlap: { score: locScore, max: 15, label: 'Location Overlap' },
      evidenceStrength: { score: evidenceScore, max: 15, label: 'Evidence Strength' }
    }
  }
}

// Rule-Based Pattern Detection Engine
function runPatternEngine(activeEntities, activeRels, activeCdrs, activeEvidences, dateRange) {
  const detected = []

  // 1. Repeated Communication (> 3 calls between subjects)
  const callPairs = {}
  activeCdrs.forEach(c => {
    const pairKey = [c.caller, c.receiver].sort().join(' ↔ ')
    callPairs[pairKey] = (callPairs[pairKey] || 0) + 1
  })

  Object.entries(callPairs).forEach(([pair, count], idx) => {
    if (count >= 4) {
      const [idA, idB] = pair.split(' ↔ ')
      const entA = entities.find(e => e.id === idA)
      const entB = entities.find(e => e.id === idB)
      detected.push({
        id: `PAT-FREQ-${idx + 1}`,
        type: 'REPEATED_COMMUNICATION',
        name: 'Repeated Communication Frequency',
        entities: [idA, idB],
        summary: `${entA?.name || idA} ↔ ${entB?.name || idB}`,
        count: `${count} calls`,
        confidence: Math.min(75 + count * 2, 94),
        basis: `${count} CDR records recorded in observation window.`,
        category: 'COMMUNICATION'
      })
    }
  })

  // 2. Cross-Network Bridge Entities
  const bridgeScores = calculateBridgeScores(activeEntities, activeRels)
  Object.entries(bridgeScores).forEach(([id, score], idx) => {
    if (score >= 0.65) {
      const ent = entities.find(e => e.id === id)
      detected.push({
        id: `PAT-BRG-${idx + 1}`,
        type: 'BRIDGE_ENTITY',
        name: 'Cross-Cluster Bridge Connector',
        entities: [id],
        summary: `${ent?.name || id} (Score: ${score})`,
        count: `Bridge Index ${score}`,
        confidence: 92,
        basis: `High betweenness centrality connecting multiple operational sub-networks.`,
        category: 'TOPOLOGY'
      })
    }
  })

  // 3. Observed Spatial Overlap
  locationObservations.forEach((locObs, idx) => {
    locObs.overlaps.forEach(ov => {
      const entA = entities.find(e => e.id === ov.entityA)
      const entB = entities.find(e => e.id === ov.entityB)
      detected.push({
        id: `PAT-LOC-${idx + 1}-${ov.entityA}`,
        type: 'SHARED_LOCATION',
        name: 'Observed Spatial Overlap',
        entities: [ov.entityA, ov.entityB, locObs.locationId],
        summary: `${entA?.name || ov.entityA} + ${entB?.name || ov.entityB}`,
        count: `${ov.overlapCount} overlaps`,
        confidence: 86,
        basis: `${ov.overlapCount} overlapping check-ins at ${locObs.locationName}.`,
        category: 'LOCATION'
      })
    })
  })

  // 4. Case-Linked Communication
  activeRels.forEach((r, idx) => {
    if (r.category === 'CASE') {
      const s = typeof r.source === 'object' ? r.source.id : r.source
      const t = typeof r.target === 'object' ? r.target.id : r.target
      const ent = entities.find(e => e.id === s)
      const kase = entities.find(e => e.id === t)
      if (ent && kase) {
        detected.push({
          id: `PAT-CASE-${idx + 1}`,
          type: 'CASE_LINK',
          name: 'Case-Linked Operational Association',
          entities: [s, t],
          summary: `${ent.name} ↔ ${kase.name.split(':')[0]}`,
          count: 'Formal Inquiry',
          confidence: Math.round(r.confidence * 100),
          basis: `Subject formally named or examined in ${kase.caseNumber || 'case records'}.`,
          category: 'LEGAL'
        })
      }
    }
  })

  // 5. Telecommunication Surge Window (Aug 25)
  const surgeCdrs = activeCdrs.filter(c => c.timestamp.startsWith('2026-08-25'))
  if (surgeCdrs.length >= 4) {
    detected.push({
      id: 'PAT-SURGE-01',
      type: 'COMMS_SPIKE',
      name: 'Telecommunication Surge Window',
      entities: ['P001', 'P002', 'P003', 'P005', 'P010'],
      summary: '5 rapid cross-network calls in 90 mins',
      count: '5 calls / 90m',
      confidence: 95,
      basis: 'Rapid multi-party voice coordination observed around 20:00 on 25 Aug 2026.',
      category: 'TEMPORAL'
    })
  }

  // 6. Multi-Subject Vehicle Operation
  const vehicleUsage = {}
  activeRels.forEach(r => {
    if (r.category === 'VEHICLE') {
      const s = typeof r.source === 'object' ? r.source.id : r.source
      const t = typeof r.target === 'object' ? r.target.id : r.target
      vehicleUsage[t] = vehicleUsage[t] || []
      vehicleUsage[t].push(s)
    }
  })
  Object.entries(vehicleUsage).forEach(([vehId, users], idx) => {
    if (users.length >= 2) {
      const veh = entities.find(e => e.id === vehId)
      detected.push({
        id: `PAT-VEH-${idx + 1}`,
        type: 'VEHICLE_SHARING',
        name: 'Shared Vehicle Operation',
        entities: [...users, vehId],
        summary: `${veh?.name || vehId} (${users.length} operators)`,
        count: `${users.length} linked subjects`,
        confidence: 88,
        basis: `Commercial transport asset linked to multiple distinct subjects.`,
        category: 'ASSET'
      })
    }
  })

  return detected
}

// ==========================================
// LOGIN COMPONENT
// ==========================================
function Login({ onLogin }) {
  const [username, setUsername] = useState('investigator')
  const [password, setPassword] = useState('demo123')
  const [error, setError] = useState('')

  const handleAuth = (e) => {
    e.preventDefault()
    const valid = DEMO_CREDENTIALS.some(
      c => c.user.toLowerCase() === username.trim().toLowerCase() && c.pass === password
    )
    if (valid) {
      localStorage.setItem('sih-auth', 'true')
      onLogin()
    } else {
      setError('Invalid credentials. Please use investigator / demo123')
    }
  }

  return (
    <main className="min-h-screen bg-[#060e1a] text-white grid lg:grid-cols-[1.1fr_.9fr]">
      <section className="relative hidden overflow-hidden border-r border-white/10 lg:flex flex-col justify-between p-16 bg-[radial-gradient(ellipse_at_top_left,rgba(14,165,233,0.15),transparent_60%)]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold text-cyan-200">
            <ShieldCheck size={16} /> SIH26189 Demonstration Prototype
          </div>
          <h1 className="mt-8 text-4xl xl:text-5xl font-black leading-tight text-slate-100">
            Heterogeneous Criminal-Network<br />
            <span className="text-cyan-400">Intelligence Platform</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-slate-300">
            An enterprise-grade investigative workstation for linking case dossiers, cellular handsets, CDR telemetry,
            spatial overlaps, vehicles, organizations, and timeline evidence into an interactive relationship network.
          </p>

          <div className="mt-10 grid gap-3 max-w-lg sm:grid-cols-2 text-xs">
            <div className="intel-card border-white/10 flex items-center gap-3">
              <Users className="text-cyan-400 shrink-0" size={18} />
              <span>10 Normalized Demonstration Persons</span>
            </div>
            <div className="intel-card border-white/10 flex items-center gap-3">
              <Network className="text-violet-400 shrink-0" size={18} />
              <span>D3 Force-Directed Heterogeneous Graph</span>
            </div>
            <div className="intel-card border-white/10 flex items-center gap-3">
              <FileText className="text-rose-400 shrink-0" size={18} />
              <span>Explainable Rule & Confidence Engine</span>
            </div>
            <div className="intel-card border-white/10 flex items-center gap-3">
              <Printer className="text-emerald-400 shrink-0" size={18} />
              <span>Dossier & Report Generator</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 p-4 text-xs text-amber-200/90 leading-relaxed">
          <p className="font-bold uppercase tracking-wider mb-1 flex items-center gap-2">
            <AlertTriangle size={14} className="text-amber-300" />
            Notice: Prototype Demonstration Environment
          </p>
          All entities, phone numbers, addresses, FIRs, and communications are completely synthetic and for algorithmic demonstration only.
        </div>
      </section>

      <section className="flex items-center justify-center p-6 sm:p-12">
        <form onSubmit={handleAuth} className="intel-panel w-full max-w-md p-8 border-white/15">
          <div className="flex items-center gap-3 mb-6">
            <div className="rounded-xl bg-cyan-400 p-2.5 text-slate-950 font-black">
              <Shield size={24} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">SIH26189 Intel Workstation</h2>
              <p className="text-xs text-slate-400">Analyst Session Access</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">Username</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="intel-input"
                placeholder="investigator"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="intel-input"
                placeholder="demo123"
                required
              />
            </div>

            {error && (
              <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300 flex items-center gap-2">
                <AlertTriangle size={15} /> {error}
              </div>
            )}

            <button type="submit" className="btn-primary w-full py-2.5 mt-2">
              Launch Intelligence Console
            </button>
          </div>

          <div className="mt-6 rounded-lg border border-white/10 bg-white/[0.02] p-3 text-xs text-slate-400">
            <div className="font-semibold text-slate-200 mb-1">Synthetic Demo Credentials:</div>
            <div className="flex justify-between py-0.5">
              <span>Username: <code className="text-cyan-300">investigator</code></span>
              <span>Password: <code className="text-cyan-300">demo123</code></span>
            </div>
          </div>
        </form>
      </section>
    </main>
  )
}

// ==========================================
// D3 INTERACTIVE NETWORK GRAPH COMPONENT
// ==========================================
function InteractiveD3Graph({
  visibleEntities,
  visibleRels,
  selectedEntityId,
  selectedRelId,
  hoveredEntityId,
  onSelectEntity,
  onSelectRel,
  onHoverEntity,
  showLabels,
  showRelLabels,
  showTwoHop,
  viewMode, // 'network' or 'hierarchy'
  searchFocusId,
  onClearSearchFocus
}) {
  const containerRef = useRef(null)
  const svgRef = useRef(null)
  const zoomBehaviorRef = useRef(null)
  const simulationRef = useRef(null)

  // Direct and 2-hop neighbors of selected entity
  const directNeighbors = useMemo(() => {
    if (!selectedEntityId) return []
    return getDirectNeighbors(selectedEntityId, visibleRels)
  }, [selectedEntityId, visibleRels])

  const twoHopNeighbors = useMemo(() => {
    if (!selectedEntityId || !showTwoHop) return []
    return getSecondDegreeNeighbors(selectedEntityId, visibleRels)
  }, [selectedEntityId, visibleRels, showTwoHop])

  // D3 Rendering & Simulation Lifecycle
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    el.innerHTML = ''

    const width = el.clientWidth || 900
    const height = el.clientHeight || 640

    // Setup SVG Canvas
    const svg = d3.select(el)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('class', 'd3-graph-svg')

    svgRef.current = svg

    // Zoom container
    const g = svg.append('g')

    // Setup Zoom Behavior
    const zoom = d3.zoom()
      .scaleExtent([0.2, 4])
      .on('zoom', (event) => {
        g.attr('transform', event.transform)
      })

    svg.call(zoom)
    zoomBehaviorRef.current = zoom

    // Click background to clear selection
    svg.on('click', (event) => {
      if (event.target.tagName === 'svg' || event.target.tagName === 'g') {
        onSelectEntity(null)
        onSelectRel(null)
      }
    })

    // Prepare Node and Link Data
    const nodeMap = new Map()
    visibleEntities.forEach(e => {
      const connCount = visibleRels.filter(r => r.source === e.id || r.target === e.id || r.source?.id === e.id || r.target?.id === e.id).length
      const config = ENTITY_CONFIG[e.type] || ENTITY_CONFIG.PERSON
      nodeMap.set(e.id, {
        ...e,
        connectionCount: connCount,
        radius: config.baseRadius + Math.min(connCount * 1.6, 12),
        config
      })
    })

    const nodes = Array.from(nodeMap.values())

    const links = visibleRels
      .filter(r => nodeMap.has(typeof r.source === 'object' ? r.source.id : r.source) &&
                   nodeMap.has(typeof r.target === 'object' ? r.target.id : r.target))
      .map(r => ({
        ...r,
        source: typeof r.source === 'object' ? r.source.id : r.source,
        target: typeof r.target === 'object' ? r.target.id : r.target
      }))

    // Arrow markers for links
    const defs = svg.append('defs')
    Object.entries(REL_CATEGORY_CONFIG).forEach(([cat, cfg]) => {
      defs.append('marker')
        .attr('id', `arrow-${cat}`)
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 24)
        .attr('refY', 0)
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', cfg.color)
        .attr('opacity', 0.6)
    })

    // Hierarchy View positioning vs Force Layout
    if (viewMode === 'hierarchy') {
      // Stratify / Level layout derived from relationships (LEADS, WORKS_FOR, MEMBER_OF)
      const levelMap = { ORGANIZATION: 1, PERSON: 2, CASE: 2, EVENT: 3, PHONE: 3, VEHICLE: 4, LOCATION: 4 }
      const levelY = { 1: height * 0.18, 2: height * 0.40, 3: height * 0.65, 4: height * 0.88 }

      const countByLevel = { 1: 0, 2: 0, 3: 0, 4: 0 }
      nodes.forEach(n => {
        const lvl = levelMap[n.type] || 3
        countByLevel[lvl] = (countByLevel[lvl] || 0) + 1
      })

      const assignedByLevel = { 1: 0, 2: 0, 3: 0, 4: 0 }
      nodes.forEach(n => {
        const lvl = levelMap[n.type] || 3
        const totalInLvl = countByLevel[lvl]
        assignedByLevel[lvl] += 1
        n.x = (width / (totalInLvl + 1)) * assignedByLevel[lvl]
        n.y = levelY[lvl]
        n.fx = n.x
        n.fy = n.y
      })
    }

    // Links group
    const linkGroup = g.append('g').attr('class', 'links')
    const link = linkGroup.selectAll('line')
      .data(links)
      .join('line')
      .attr('class', d => {
        const isSelected = selectedRelId === d.id
        const isConnected = selectedEntityId && (d.source === selectedEntityId || d.target === selectedEntityId)
        const isDimmed = selectedEntityId && !isConnected && !isSelected
        return `graph-link ${isSelected || isConnected ? 'link-highlighted' : ''} ${isDimmed ? 'link-dimmed' : ''}`
      })
      .attr('stroke', d => (REL_CATEGORY_CONFIG[d.category] || REL_CATEGORY_CONFIG.ASSOCIATION).color)
      .attr('stroke-width', d => (REL_CATEGORY_CONFIG[d.category] || REL_CATEGORY_CONFIG.ASSOCIATION).width)
      .attr('stroke-dasharray', d => (REL_CATEGORY_CONFIG[d.category] || REL_CATEGORY_CONFIG.ASSOCIATION).dash)
      .attr('stroke-opacity', 0.5)
      .style('cursor', 'pointer')
      .on('click', (event, d) => {
        event.stopPropagation()
        onSelectRel(d)
      })

    // Edge text labels
    let edgeLabels = null
    if (showRelLabels) {
      const edgeLabelGroup = g.append('g').attr('class', 'edge-labels')
      edgeLabels = edgeLabelGroup.selectAll('text')
        .data(links)
        .join('text')
        .attr('class', 'edge-label-text')
        .attr('text-anchor', 'middle')
        .text(d => d.type.replace(/_/g, ' '))
    }

    // Nodes group
    const nodeGroup = g.append('g').attr('class', 'nodes')
    const node = nodeGroup.selectAll('g')
      .data(nodes)
      .join('g')
      .attr('class', d => {
        const isSelected = d.id === selectedEntityId
        const isDirect = directNeighbors.includes(d.id)
        const isTwoHop = twoHopNeighbors.includes(d.id)
        const isDimmed = selectedEntityId && !isSelected && !isDirect && !isTwoHop
        return `graph-node ${isSelected ? 'node-selected' : ''} ${isDirect ? 'node-neighbor' : ''} ${isTwoHop ? 'node-second-degree' : ''} ${isDimmed ? 'node-dimmed' : ''}`
      })
      .on('click', (event, d) => {
        event.stopPropagation()
        onSelectEntity(d.id)
        onSelectRel(null)
      })
      .on('mouseenter', (event, d) => {
        onHoverEntity(d)
      })
      .on('mouseleave', () => {
        onHoverEntity(null)
      })

    // Drag behavior for nodes
    const drag = d3.drag()
      .on('start', (event, d) => {
        if (!event.active && simulationRef.current) simulationRef.current.alphaTarget(0.3).restart()
        d.fx = d.x
        d.fy = d.y
      })
      .on('drag', (event, d) => {
        d.fx = event.x
        d.fy = event.y
      })
      .on('end', (event, d) => {
        if (!event.active && simulationRef.current) simulationRef.current.alphaTarget(0)
        if (viewMode !== 'hierarchy') {
          d.fx = null
          d.fy = null
        }
      })

    node.call(drag)

    // Render node shapes based on entity category
    node.each(function(d) {
      const elNode = d3.select(this)
      const isSelected = d.id === selectedEntityId
      const r = isSelected ? d.radius + 5 : d.radius

      // Selected pulsating halo ring
      if (isSelected) {
        elNode.append('circle')
          .attr('r', r + 10)
          .attr('fill', 'none')
          .attr('stroke', d.config.color)
          .attr('stroke-width', 2)
          .attr('class', 'pulse-halo')
      }

      if (d.config.shape === 'circle' || d.config.shape === 'pin') {
        elNode.append('circle')
          .attr('r', r)
          .attr('fill', d.config.bg)
          .attr('stroke', isSelected ? '#ffffff' : d.config.color)
          .attr('stroke-width', isSelected ? 3 : 2)
      } else if (d.config.shape === 'square') {
        elNode.append('rect')
          .attr('x', -r)
          .attr('y', -r)
          .attr('width', r * 2)
          .attr('height', r * 2)
          .attr('rx', 4)
          .attr('fill', d.config.bg)
          .attr('stroke', isSelected ? '#ffffff' : d.config.color)
          .attr('stroke-width', isSelected ? 3 : 2)
      } else if (d.config.shape === 'diamond') {
        elNode.append('rect')
          .attr('x', -r)
          .attr('y', -r)
          .attr('width', r * 1.8)
          .attr('height', r * 1.8)
          .attr('rx', 3)
          .attr('transform', 'rotate(45)')
          .attr('fill', d.config.bg)
          .attr('stroke', isSelected ? '#ffffff' : d.config.color)
          .attr('stroke-width', isSelected ? 3 : 2)
      } else if (d.config.shape === 'hexagon') {
        // SVG Polygon for vehicle hexagon
        const pts = []
        for (let i = 0; i < 6; i++) {
          const angle = (i * 60 * Math.PI) / 180
          pts.push(`${(r * 1.15 * Math.cos(angle)).toFixed(1)},${(r * 1.15 * Math.sin(angle)).toFixed(1)}`)
        }
        elNode.append('polygon')
          .attr('points', pts.join(' '))
          .attr('fill', d.config.bg)
          .attr('stroke', isSelected ? '#ffffff' : d.config.color)
          .attr('stroke-width', isSelected ? 3 : 2)
      } else {
        // Organization / Rounded Rect
        elNode.append('rect')
          .attr('x', -r * 1.4)
          .attr('y', -r * 0.9)
          .attr('width', r * 2.8)
          .attr('height', r * 1.8)
          .attr('rx', 8)
          .attr('fill', d.config.bg)
          .attr('stroke', isSelected ? '#ffffff' : d.config.color)
          .attr('stroke-width', isSelected ? 3 : 2)
      }

      // Glyph / Code inside node
      const displayInitials = d.type === 'PERSON'
        ? d.name.split(' ').map(x => x[0]).join('')
        : d.id
      elNode.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '.35em')
        .attr('font-size', d.radius > 22 ? 11 : 9)
        .attr('font-weight', 800)
        .attr('fill', isSelected ? '#ffffff' : d.config.color)
        .text(displayInitials)

      // External label underneath
      if (showLabels) {
        const displayName = d.name.length > 18 ? `${d.name.slice(0, 16)}...` : d.name
        elNode.append('text')
          .attr('text-anchor', 'middle')
          .attr('dy', r + 13)
          .attr('font-size', 10)
          .attr('font-weight', isSelected ? 700 : 500)
          .attr('fill', isSelected ? '#38bdf8' : '#cbd5e1')
          .text(displayName)

        elNode.append('text')
          .attr('text-anchor', 'middle')
          .attr('dy', r + 24)
          .attr('font-size', 8)
          .attr('fill', '#64748b')
          .text(`${d.type} • ${d.connectionCount} conn`)
      }
    })

    // Setup Force Simulation if in Network mode
    if (viewMode === 'network') {
      const simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links).id(d => d.id).distance(120).strength(0.8))
        .force('charge', d3.forceManyBody().strength(-340))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collide', d3.forceCollide(d => d.radius + 28))
        .on('tick', () => {
          link
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y)

          if (edgeLabels) {
            edgeLabels
              .attr('x', d => (d.source.x + d.target.x) / 2)
              .attr('y', d => (d.source.y + d.target.y) / 2)
          }

          node.attr('transform', d => `translate(${d.x},${d.y})`)
        })

      simulationRef.current = simulation
    } else {
      // Static hierarchy positions
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y)

      if (edgeLabels) {
        edgeLabels
          .attr('x', d => (d.source.x + d.target.x) / 2)
          .attr('y', d => (d.source.y + d.target.y) / 2)
      }

      node.attr('transform', d => `translate(${d.x},${d.y})`)
    }

    // Auto-focus searched node
    if (searchFocusId && nodeMap.has(searchFocusId)) {
      const targetNode = nodeMap.get(searchFocusId)
      const scale = 1.4
      const transform = d3.zoomIdentity
        .translate(width / 2 - targetNode.x * scale, height / 2 - targetNode.y * scale)
        .scale(scale)

      svg.transition().duration(750).call(zoom.transform, transform)
      onClearSearchFocus()
    }

    return () => {
      if (simulationRef.current) simulationRef.current.stop()
    }
  }, [
    visibleEntities,
    visibleRels,
    selectedEntityId,
    selectedRelId,
    showLabels,
    showRelLabels,
    showTwoHop,
    viewMode,
    directNeighbors,
    twoHopNeighbors,
    searchFocusId
  ])

  // Zoom control helpers
  const handleZoomIn = () => {
    if (svgRef.current && zoomBehaviorRef.current) {
      svgRef.current.transition().duration(300).call(zoomBehaviorRef.current.scaleBy, 1.3)
    }
  }

  const handleZoomOut = () => {
    if (svgRef.current && zoomBehaviorRef.current) {
      svgRef.current.transition().duration(300).call(zoomBehaviorRef.current.scaleBy, 0.77)
    }
  }

  const handleFit = () => {
    if (svgRef.current && zoomBehaviorRef.current) {
      const el = containerRef.current
      const width = el.clientWidth || 900
      const height = el.clientHeight || 640
      const transform = d3.zoomIdentity.translate(0, 0).scale(1)
      svgRef.current.transition().duration(500).call(zoomBehaviorRef.current.transform, transform)
    }
  }

  const handleCenterSelected = () => {
    if (!selectedEntityId || !svgRef.current || !zoomBehaviorRef.current) return
    const el = containerRef.current
    const width = el.clientWidth || 900
    const height = el.clientHeight || 640

    // Find node coordinates in simulation
    const targetNode = simulationRef.current?.nodes().find(n => n.id === selectedEntityId)
    if (targetNode) {
      const scale = 1.5
      const transform = d3.zoomIdentity
        .translate(width / 2 - targetNode.x * scale, height / 2 - targetNode.y * scale)
        .scale(scale)
      svgRef.current.transition().duration(600).call(zoomBehaviorRef.current.transform, transform)
    }
  }

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Top Graph Overlay Bar */}
      <div className="absolute top-3 left-3 right-3 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="rounded-lg border border-white/10 bg-[#071220]/90 px-3 py-1.5 backdrop-blur text-xs flex items-center gap-2 text-slate-300">
            <Network size={14} className="text-cyan-400" />
            <span className="font-semibold text-white">{visibleEntities.length}</span> Entities
            <span className="text-slate-600">•</span>
            <span className="font-semibold text-white">{visibleRels.length}</span> Links
          </div>

          {selectedEntityId && (
            <button onClick={handleCenterSelected} className="btn-ghost pointer-events-auto text-[11px] py-1 bg-[#0a1626]/90 border-cyan-400/30 text-cyan-200">
              <Target size={13} className="text-cyan-400" /> Focus Selected
            </button>
          )}
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-1.5 pointer-events-auto rounded-lg border border-white/10 bg-[#071220]/90 p-1 backdrop-blur shadow-lg">
          <button onClick={handleZoomIn} title="Zoom In" className="btn-icon h-7 w-7 text-xs font-bold">+</button>
          <button onClick={handleZoomOut} title="Zoom Out" className="btn-icon h-7 w-7 text-xs font-bold">-</button>
          <button onClick={handleFit} title="Fit Network" className="btn-icon h-7 w-7"><Maximize2 size={13} /></button>
          <button onClick={() => { onSelectEntity(null); onSelectRel(null); handleFit() }} title="Reset Network & Selection" className="btn-icon h-7 w-7"><RefreshCw size={13} /></button>
        </div>
      </div>

      {/* SVG Canvas Container */}
      <div ref={containerRef} className="flex-1 w-full h-full min-h-[520px] bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.04),transparent_70%)]" />

      {/* Compact Interactive Legend Bar */}
      <div className="border-t border-white/[0.08] bg-[#071220]/95 px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 text-[11px]">
          <span className="text-slate-500 font-semibold uppercase tracking-wider">Legend:</span>
          {Object.entries(ENTITY_CONFIG).map(([type, cfg]) => {
            const Icon = cfg.icon
            return (
              <div key={type} className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: cfg.color }} />
                <span className="text-slate-300 font-medium">{cfg.label}</span>
              </div>
            )
          })}
        </div>
        <div className="flex items-center gap-4 text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-5 h-0.5 bg-sky-400 inline-block" /> Solid: Call
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-5 h-0.5 border-t border-dashed border-emerald-400 inline-block" /> Dashed: Loc
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-5 h-1 bg-rose-400 inline-block" /> Bold: Case
          </span>
        </div>
      </div>
    </div>
  )
}

// ==========================================
// EVIDENCE DRAWER & LINEAGE COMPONENT
// ==========================================
function EvidenceDrawer({ evidenceId, onClose, onSelectEntity, onSelectRel }) {
  const evidence = evidenceRecords.find(e => e.id === evidenceId)
  if (!evidence) return null

  const linkedEnts = entities.filter(e => evidence.linkedEntities.includes(e.id))
  const linkedRels = relationships.filter(r => evidence.linkedRelationships.includes(r.id))

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-lg border-l border-white/10 bg-[#071220] shadow-2xl p-6 flex flex-col overflow-y-auto">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-cyan-400/10 p-2 text-cyan-300 border border-cyan-400/20">
            <Database size={20} />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold tracking-widest text-cyan-300">Evidence Record</div>
            <h3 className="text-lg font-bold text-white">{evidence.id}</h3>
          </div>
        </div>
        <button onClick={onClose} className="btn-icon"><X size={16} /></button>
      </div>

      <div className="mt-6 space-y-5 flex-1">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Title</span>
          <p className="text-base font-semibold text-slate-100 mt-1">{evidence.title}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="intel-card">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">Evidence Type</div>
            <div className="text-sm font-bold text-cyan-300 mt-1">{evidence.type}</div>
          </div>
          <div className="intel-card">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">Verification Reliability</div>
            <div className="text-sm font-bold text-emerald-400 mt-1">{Math.round(evidence.reliability * 100)}% Verified</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="intel-card">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">Observation Date</div>
            <div className="text-xs font-semibold text-slate-300 mt-1 flex items-center gap-1.5">
              <Calendar size={13} className="text-cyan-400" /> {fmtDate(evidence.date)}
            </div>
          </div>
          <div className="intel-card">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">Data Source</div>
            <div className="text-xs font-semibold text-slate-300 mt-1 truncate">{evidence.source}</div>
          </div>
        </div>

        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Description & Context</span>
          <p className="mt-1.5 text-xs text-slate-300 leading-relaxed bg-[#0a1626] p-3 rounded-lg border border-white/5">
            {evidence.description}
          </p>
        </div>

        {/* Evidence Lineage Chain */}
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <FolderGit2 size={13} className="text-cyan-400" /> Provenance Lineage
          </span>
          <div className="mt-2 rounded-xl border border-cyan-400/20 bg-cyan-400/[0.03] p-4 text-xs space-y-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              <span className="text-slate-400 font-mono">{evidence.id}</span>
              <span className="text-slate-500">→</span>
              <span className="text-slate-200 font-medium">{evidence.source}</span>
            </div>
            <div className="flex items-center gap-2 pl-4 border-l border-cyan-400/20">
              <span className="h-2 w-2 rounded-full bg-violet-400" />
              <span className="text-slate-400">Captured Telemetry</span>
              <span className="text-slate-500">→</span>
              <span className="text-cyan-300 font-medium">{evidence.linkedEntities.join(', ')}</span>
            </div>
            <div className="flex items-center gap-2 pl-8 border-l border-cyan-400/20">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-slate-400">Substantiated Link</span>
              <span className="text-slate-500">→</span>
              <span className="text-emerald-300 font-medium">{evidence.linkedRelationships.join(', ')}</span>
            </div>
          </div>
        </div>

        {/* Linked Entities */}
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Linked Entities</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {linkedEnts.map(ent => (
              <button
                key={ent.id}
                onClick={() => onSelectEntity(ent.id)}
                className="filter-chip hover:border-cyan-400/40 text-[11px]"
              >
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: ENTITY_CONFIG[ent.type]?.color }} />
                {ent.name} ({ent.id})
              </button>
            ))}
          </div>
        </div>

        {/* Linked Relationships */}
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Linked Relationships</span>
          <div className="mt-2 space-y-1.5">
            {linkedRels.map(rel => (
              <button
                key={rel.id}
                onClick={() => onSelectRel(rel)}
                className="w-full text-left p-2 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2 truncate">
                  <Link2 size={13} className="text-cyan-400 shrink-0" />
                  <span className="text-slate-300 font-medium">{rel.id}</span>
                  <span className="text-slate-500">({rel.type})</span>
                </div>
                <span className="text-cyan-300 font-bold">{Math.round(rel.confidence * 100)}%</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-white/10 mt-6">
        <button onClick={onClose} className="btn-ghost w-full py-2">
          Close Evidence Dossier
        </button>
      </div>
    </div>
  )
}

// ==========================================
// INVESTIGATION REPORT MODAL COMPONENT
// ==========================================
function ReportModal({ entity, activeRels, activeCdrs, activeEvidences, onClose }) {
  if (!entity) return null

  const priority = calculatePriority(entity, activeRels, activeCdrs, activeEvidences)
  const neighbors = getDirectNeighbors(entity.id, activeRels)
  const subjectCdrs = activeCdrs.filter(c => c.caller === entity.id || c.receiver === entity.id)
  const totalDuration = subjectCdrs.reduce((acc, c) => acc + c.durationSeconds, 0)
  const subjectEvidences = activeEvidences.filter(ev => ev.linkedEntities.includes(entity.id))
  const subjectTimeline = timelineObservations.filter(t => t.entityId === entity.id || t.relatedEntityId === entity.id)

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="intel-panel w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#071220] border-white/20 shadow-2xl printable-report">
        {/* Modal Header */}
        <div className="intel-header no-print">
          <div className="flex items-center gap-2">
            <FileText size={18} className="text-cyan-400" />
            <span className="text-sm font-bold text-white">Investigation Dossier & Report Preview</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handlePrint} className="btn-primary text-xs py-1.5">
              <Printer size={14} /> Print / Export PDF
            </button>
            <button onClick={onClose} className="btn-icon"><X size={16} /></button>
          </div>
        </div>

        {/* Report Content Body */}
        <div className="p-8 overflow-y-auto space-y-6 text-slate-200">
          {/* Official Banner */}
          <div className="border-b-2 border-cyan-500/40 pb-5 flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="text-[11px] font-black uppercase tracking-[0.25em] text-cyan-400">SIH26189 • Case Dossier Report</div>
              <h1 className="text-2xl font-black text-white mt-1">Investigation Intelligence Briefing</h1>
              <p className="text-xs text-slate-400 mt-1">Synthesized Cross-Domain Criminal-Network Assessment</p>
            </div>
            <div className="text-right">
              <div className="inline-block rounded-md border border-rose-500/30 bg-rose-500/10 px-3 py-1 text-xs font-bold text-rose-300">
                PROTOTYPE DEMONSTRATION ONLY
              </div>
              <div className="text-[11px] text-slate-400 mt-1">Date Generated: {new Date().toLocaleDateString('en-GB')}</div>
            </div>
          </div>

          {/* Subject Overview Card */}
          <div className="grid md:grid-cols-[1fr_220px] gap-6 p-5 rounded-xl border border-white/10 bg-[#0a1626]">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-white">{entity.name}</h2>
                <span className="badge-neutral text-xs">{entity.id}</span>
                <span className="badge-high text-xs">{entity.status}</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Aliases: <span className="text-slate-200 font-semibold">{entity.aliases?.join(', ') || 'None'}</span> •
                Role: <span className="text-slate-200 font-semibold">{entity.role || entity.type}</span>
              </p>
              <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                {entity.description}
              </p>
            </div>

            <div className="rounded-lg border border-cyan-400/20 bg-cyan-400/5 p-4 text-center flex flex-col justify-center">
              <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Analytical Priority</div>
              <div className="text-4xl font-black text-cyan-300 mt-1">{priority.total} / 100</div>
              <div className="text-[10px] text-slate-400 mt-1">Weighted Centrality & Signal Index</div>
            </div>
          </div>

          {/* Priority Breakdown Matrix */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Priority Score Factor Decomposition</h3>
            <div className="grid sm:grid-cols-5 gap-3">
              {Object.entries(priority.breakdown).map(([key, item]) => (
                <div key={key} className="intel-card p-3">
                  <div className="text-[10px] text-slate-400 truncate">{item.label}</div>
                  <div className="text-base font-black text-slate-100 mt-1">{item.score} <span className="text-xs font-normal text-slate-500">/ {item.max}</span></div>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${(item.score / item.max) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="intel-card">
              <div className="text-[10px] text-slate-400 uppercase">Direct Network Peers</div>
              <div className="text-2xl font-bold text-white mt-1">{neighbors.length}</div>
            </div>
            <div className="intel-card">
              <div className="text-[10px] text-slate-400 uppercase">Total Call Interactions</div>
              <div className="text-2xl font-bold text-cyan-300 mt-1">{subjectCdrs.length}</div>
            </div>
            <div className="intel-card">
              <div className="text-[10px] text-slate-400 uppercase">Aggregate Talk Duration</div>
              <div className="text-2xl font-bold text-white mt-1">{fmtDuration(totalDuration)}</div>
            </div>
            <div className="intel-card">
              <div className="text-[10px] text-slate-400 uppercase">Linked Evidence Records</div>
              <div className="text-2xl font-bold text-emerald-400 mt-1">{subjectEvidences.length}</div>
            </div>
          </div>

          {/* Key Findings */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Key Analytical Findings</h3>
            <div className="space-y-2 text-xs">
              <div className="intel-card flex items-start gap-3">
                <Check size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                <span>Subject maintains <strong className="text-white">{neighbors.length} heterogeneous links</strong> across operational entities, phones, and locations.</span>
              </div>
              <div className="intel-card flex items-start gap-3">
                <Check size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                <span>Observed in <strong className="text-white">{subjectCdrs.length} recorded telecommunication events</strong> totaling {fmtDuration(totalDuration)} of airtime.</span>
              </div>
              <div className="intel-card flex items-start gap-3">
                <Check size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                <span>Substantiated by <strong className="text-white">{subjectEvidences.length} independent synthetic evidence records</strong> across carrier CDRs, gate manifests, and FIR dossiers.</span>
              </div>
            </div>
          </div>

          {/* Timeline Excerpt */}
          {subjectTimeline.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Chronological Observation Timeline</h3>
              <div className="border border-white/10 rounded-xl bg-[#0a1626] divide-y divide-white/5 text-xs">
                {subjectTimeline.slice(0, 6).map(tl => (
                  <div key={tl.id} className="p-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono text-cyan-300">{fmtDate(tl.date)} {tl.time}</span>
                      <span className="font-semibold text-white">{tl.title}</span>
                    </div>
                    <span className="badge-neutral text-[10px]">{tl.eventType}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mandatory Report Disclaimer */}
          <div className="rounded-xl border border-white/10 bg-black/40 p-4 text-[11px] text-slate-400 leading-relaxed">
            <p className="font-bold text-slate-300 uppercase tracking-wider mb-1">DEMONSTRATION REPORT DISCLAIMER</p>
            {DISCLAIMER_TEXT}
          </div>
        </div>
      </div>
    </div>
  )
}

// ==========================================
// MAIN DASHBOARD APPLICATION
// ==========================================
function IntelligenceDashboard({ onLogout }) {
  // Navigation & View Mode
  const [viewMode, setViewMode] = useState('network') // 'network' or 'hierarchy'
  const [activeBottomTab, setActiveBottomTab] = useState('patterns') // 'patterns', 'clusters', 'locations', 'audit'

  // Selection States
  const [selectedEntityId, setSelectedEntityId] = useState('P003') // Default Sameer Khan (Bridge)
  const [selectedRel, setSelectedRel] = useState(null)
  const [hoveredEntity, setHoveredEntity] = useState(null)
  const [activeEvidenceId, setActiveEvidenceId] = useState(null)
  const [reportModalOpen, setReportModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchFocusId, setSearchFocusId] = useState(null)

  // Display toggles
  const [showLabels, setShowLabels] = useState(true)
  const [showRelLabels, setShowRelLabels] = useState(false)
  const [showTwoHop, setShowTwoHop] = useState(false)

  // Filters State
  const [selectedEntityTypes, setSelectedEntityTypes] = useState(new Set(Object.keys(ENTITY_CONFIG)))
  const [selectedRelCategories, setSelectedRelCategories] = useState(new Set(Object.keys(REL_CATEGORY_CONFIG)))
  const [priorityFilter, setPriorityFilter] = useState('ALL') // 'ALL', 'HIGH', 'MED', 'LOW'
  const [confidenceFilter, setConfidenceFilter] = useState('ALL') // 'ALL', '90+', '70-90', '<70'
  const [statusFilter, setStatusFilter] = useState('ALL') // 'ALL', 'ACTIVE', 'UNDER_REVIEW', 'INACTIVE'
  const [dateRange, setDateRange] = useState({ from: '2026-08-01', to: '2026-09-15' })

  // Session Activity Stream
  const [auditLog, setAuditLog] = useState([
    { time: '18:30:12', text: 'Analyst session initialized with synthetic demonstration dataset.' },
    { time: '18:30:20', text: 'Focused bridge entity P003 (Sameer Khan).' }
  ])

  const logActivity = useCallback((actionText) => {
    const time = new Date().toTimeString().slice(0, 8)
    setAuditLog(prev => [{ time, text: actionText }, ...prev.slice(0, 24)])
  }, [])

  // Filtered Entities Calculation
  const visibleEntities = useMemo(() => {
    return entities.filter(e => {
      // 1. Entity type filter
      if (!selectedEntityTypes.has(e.type)) return false

      // 2. Status filter
      if (statusFilter !== 'ALL' && e.status !== statusFilter) return false

      // 3. Priority filter
      if (priorityFilter === 'HIGH' && (e.basePriority || 0) < 75) return false
      if (priorityFilter === 'MED' && ((e.basePriority || 0) < 60 || (e.basePriority || 0) >= 75)) return false
      if (priorityFilter === 'LOW' && (e.basePriority || 0) >= 60) return false

      return true
    })
  }, [selectedEntityTypes, statusFilter, priorityFilter])

  const visibleEntityIdSet = useMemo(() => new Set(visibleEntities.map(e => e.id)), [visibleEntities])

  // Filtered Relationships Calculation
  const visibleRels = useMemo(() => {
    return relationships.filter(r => {
      const s = typeof r.source === 'object' ? r.source.id : r.source
      const t = typeof r.target === 'object' ? r.target.id : r.target

      // Endpoints must be visible
      if (!visibleEntityIdSet.has(s) || !visibleEntityIdSet.has(t)) return false

      // Relationship category filter
      if (!selectedRelCategories.has(r.category)) return false

      // Confidence filter
      if (confidenceFilter === '90+' && r.confidence < 0.90) return false
      if (confidenceFilter === '70-90' && (r.confidence < 0.70 || r.confidence >= 0.90)) return false
      if (confidenceFilter === '<70' && r.confidence >= 0.70) return false

      // Date range filter
      if (dateRange.from && r.date < dateRange.from) return false
      if (dateRange.to && r.date > dateRange.to) return false

      return true
    })
  }, [visibleEntityIdSet, selectedRelCategories, confidenceFilter, dateRange])

  // Filtered CDRs
  const visibleCdrs = useMemo(() => {
    return cdrRecords.filter(c => {
      const d = c.timestamp.slice(0, 10)
      if (dateRange.from && d < dateRange.from) return false
      if (dateRange.to && d > dateRange.to) return false
      return true
    })
  }, [dateRange])

  // Filtered Evidences
  const visibleEvidences = useMemo(() => {
    return evidenceRecords.filter(ev => {
      if (dateRange.from && ev.date < dateRange.from) return false
      if (dateRange.to && ev.date > dateRange.to) return false
      return true
    })
  }, [dateRange])

  // Dynamic Clusters & Patterns
  const clusters = useMemo(() => detectClusters(visibleEntities, visibleRels), [visibleEntities, visibleRels])
  const detectedPatterns = useMemo(() => runPatternEngine(visibleEntities, visibleRels, visibleCdrs, visibleEvidences, dateRange), [visibleEntities, visibleRels, visibleCdrs, visibleEvidences, dateRange])
  const bridgeScores = useMemo(() => calculateBridgeScores(visibleEntities, visibleRels), [visibleEntities, visibleRels])

  // Selected Entity Dossier
  const selectedEntity = useMemo(() => {
    return entities.find(e => e.id === selectedEntityId) || null
  }, [selectedEntityId])

  // KPI Calculations
  const kpis = useMemo(() => {
    const totalEnt = entities.length
    const totalRel = relationships.length
    const persons = entities.filter(e => e.type === 'PERSON').length
    const activeCases = entities.filter(e => e.type === 'CASE' && e.status === 'ACTIVE').length
    const totalEvidence = evidenceRecords.length
    const patternsCount = detectedPatterns.length
    const highPriorityCount = entities.filter(e => (e.basePriority || 0) >= 75).length
    const clustersCount = clusters.length

    return { totalEnt, totalRel, persons, activeCases, totalEvidence, patternsCount, highPriorityCount, clustersCount }
  }, [detectedPatterns, clusters])

  // Selection Handlers
  const handleSelectEntity = (id) => {
    setSelectedEntityId(id)
    if (id) {
      const ent = entities.find(e => e.id === id)
      logActivity(`Inspected Entity ${id} (${ent?.name || ''})`)
    }
  }

  const handleSelectRel = (rel) => {
    setSelectedRel(rel)
    if (rel) {
      logActivity(`Inspected Relationship ${rel.id} (${rel.type})`)
    }
  }

  // Filter toggles
  const toggleEntityType = (type) => {
    setSelectedEntityTypes(prev => {
      const next = new Set(prev)
      if (next.has(type)) next.delete(type)
      else next.add(type)
      return next
    })
    logActivity(`Toggled Entity Type: ${type}`)
  }

  const toggleRelCategory = (cat) => {
    setSelectedRelCategories(prev => {
      const next = new Set(prev)
      if (next.has(cat)) next.delete(cat)
      else next.add(cat)
      return next
    })
    logActivity(`Toggled Relationship Category: ${cat}`)
  }

  // Search autocomplete
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return []
    const q = searchQuery.toLowerCase()
    return entities.filter(e =>
      e.name.toLowerCase().includes(q) ||
      e.id.toLowerCase().includes(q) ||
      e.aliases?.some(a => a.toLowerCase().includes(q)) ||
      e.role?.toLowerCase().includes(q)
    ).slice(0, 8)
  }, [searchQuery])

  const handleSelectSearchResult = (ent) => {
    setSelectedEntityId(ent.id)
    setSearchFocusId(ent.id)
    setSearchQuery('')
    logActivity(`Search navigated to ${ent.id} (${ent.name})`)
  }

  return (
    <div className="min-h-screen bg-[#060e1a] text-slate-100 flex flex-col selection:bg-cyan-500/30">
      {/* 1. TOP ENTERPRISE HEADER */}
      <header className="border-b border-white/10 bg-[#071220]/95 backdrop-blur-md sticky top-0 z-30 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="rounded-lg bg-cyan-400 p-1.5 text-slate-950 font-black shadow-md shadow-cyan-500/20">
              <Shield size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black tracking-tight text-white">SIH26189</span>
                <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase hidden sm:inline">Heterogeneous Criminal-Network Intelligence</span>
              </div>
              <div className="flex items-center gap-2 text-[10px]">
                <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> SYSTEM ONLINE
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-amber-300/90 font-medium">DEMO DATASET</span>
              </div>
            </div>
          </div>

          <div className="hidden md:inline-flex rounded-full border border-amber-400/20 bg-amber-400/10 px-2.5 py-0.5 text-[10px] font-bold text-amber-300">
            ALL DATA IS SYNTHETIC AND FOR DEMONSTRATION ONLY
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="relative w-72 lg:w-96">
          <Search className="absolute left-3 top-2.5 text-slate-500" size={15} />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search person, phone, FIR, vehicle, org..."
            className="intel-input pl-9 pr-8"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-2.5 text-slate-500 hover:text-white">
              <X size={14} />
            </button>
          )}

          {/* Autocomplete Dropdown */}
          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1.5 rounded-xl border border-white/10 bg-[#071220] shadow-2xl z-40 overflow-hidden divide-y divide-white/5">
              {searchResults.map(res => (
                <button
                  key={res.id}
                  onClick={() => handleSelectSearchResult(res)}
                  className="w-full px-3 py-2 text-left hover:bg-cyan-400/10 flex items-center justify-between text-xs transition"
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: ENTITY_CONFIG[res.type]?.color }} />
                    <span className="font-semibold text-slate-200">{res.name}</span>
                    <span className="text-[10px] text-slate-500">({res.id})</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">{res.type}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Analyst & Logout */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right text-xs">
            <div className="font-semibold text-slate-200">Investigator Console</div>
            <div className="text-[10px] text-slate-500">Session: Demo Operator</div>
          </div>
          <button onClick={onLogout} title="Logout" className="btn-icon">
            <LogOut size={16} />
          </button>
        </div>
      </header>

      {/* 2. TOP KPI CARDS */}
      <section className="border-b border-white/10 bg-[#081424] px-4 py-2.5 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        <KpiItem label="Total Entities" value={kpis.totalEnt} hint="normalized" icon={Users} color="#38bdf8" />
        <KpiItem label="Relationships" value={kpis.totalRel} hint="heterogeneous" icon={GitBranch} color="#a78bfa" />
        <KpiItem label="Persons" value={kpis.persons} hint="fictional subjects" icon={Users} color="#38bdf8" />
        <KpiItem label="Active Cases" value={kpis.activeCases} hint="FIR dossiers" icon={FileText} color="#f87171" />
        <KpiItem label="Evidence Records" value={kpis.totalEvidence} hint="provenance logs" icon={Database} color="#34d399" />
        <KpiItem label="Detected Patterns" value={kpis.patternsCount} hint="rule signals" icon={Sparkles} color="#fbbf24" />
        <KpiItem label="High Priority" value={kpis.highPriorityCount} hint="centrality index" icon={Target} color="#f43f5e" />
        <KpiItem label="Network Clusters" value={kpis.clustersCount} hint="communities" icon={Network} color="#60a5fa" />
      </section>

      {/* 3. MAIN WORKSPACE GRID: LEFT FILTERS | CENTER D3 GRAPH | RIGHT INSPECTOR */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[260px_1fr_360px] overflow-hidden">
        {/* LEFT PANEL: FILTERS & CONTROLS */}
        <aside className="border-r border-white/10 bg-[#071220]/95 p-4 flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-140px)]">
          <div>
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              <span className="flex items-center gap-1.5"><Filter size={13} className="text-cyan-400" /> Entity Types</span>
              <span className="text-[10px] text-slate-500">{selectedEntityTypes.size}/{Object.keys(ENTITY_CONFIG).length}</span>
            </div>
            <div className="space-y-1">
              {Object.entries(ENTITY_CONFIG).map(([type, cfg]) => {
                const active = selectedEntityTypes.has(type)
                const count = entities.filter(e => e.type === type).length
                return (
                  <button
                    key={type}
                    onClick={() => toggleEntityType(type)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition ${
                      active ? 'bg-white/[0.05] text-slate-200 border border-white/10' : 'text-slate-500 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: cfg.color }} />
                      <span>{cfg.label}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">{count}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              <span className="flex items-center gap-1.5"><GitBranch size={13} className="text-cyan-400" /> Link Categories</span>
              <span className="text-[10px] text-slate-500">{selectedRelCategories.size}/{Object.keys(REL_CATEGORY_CONFIG).length}</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {Object.entries(REL_CATEGORY_CONFIG).map(([cat, cfg]) => {
                const active = selectedRelCategories.has(cat)
                return (
                  <button
                    key={cat}
                    onClick={() => toggleRelCategory(cat)}
                    className={`px-2 py-1 rounded text-[10px] font-semibold border text-left truncate transition ${
                      active ? 'border-cyan-400/30 bg-cyan-400/10 text-cyan-200' : 'border-white/5 bg-white/[0.02] text-slate-500'
                    }`}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Priority & Confidence & Status Filters */}
          <div className="space-y-2.5">
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1">Analytical Priority</label>
              <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)} className="intel-select w-full">
                <option value="ALL">All Priorities</option>
                <option value="HIGH">High Priority (75+)</option>
                <option value="MED">Medium Priority (60–74)</option>
                <option value="LOW">Low Priority (&lt;60)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1">Relationship Confidence</label>
              <select value={confidenceFilter} onChange={e => setConfidenceFilter(e.target.value)} className="intel-select w-full">
                <option value="ALL">All Confidence Levels</option>
                <option value="90+">High Confidence (90%+)</option>
                <option value="70-90">Moderate (70%–89%)</option>
                <option value="<70">Preliminary (&lt;70%)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1">Entity Status</label>
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="intel-select w-full">
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
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              <span className="flex items-center gap-1.5"><Calendar size={13} className="text-cyan-400" /> Observation Range</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[10px] text-slate-500">From</span>
                <input
                  type="date"
                  value={dateRange.from}
                  onChange={e => setDateRange(prev => ({ ...prev, from: e.target.value }))}
                  className="intel-input text-[11px] p-1.5"
                />
              </div>
              <div>
                <span className="text-[10px] text-slate-500">To</span>
                <input
                  type="date"
                  value={dateRange.to}
                  onChange={e => setDateRange(prev => ({ ...prev, to: e.target.value }))}
                  className="intel-input text-[11px] p-1.5"
                />
              </div>
            </div>

            <div className="mt-2 flex gap-1.5 text-[10px]">
              <button onClick={() => setDateRange({ from: '2026-08-25', to: '2026-09-08' })} className="btn-ghost flex-1 py-1 text-[10px]">
                Last 14D
              </button>
              <button onClick={() => setDateRange({ from: '2026-08-01', to: '2026-09-15' })} className="btn-ghost flex-1 py-1 text-[10px]">
                All Data
              </button>
            </div>
          </div>

          {/* Graph View Switches */}
          <div className="border-t border-white/10 pt-3 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Graph Visual Controls</div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300">View Mode</span>
              <div className="flex rounded border border-white/10 overflow-hidden">
                <button
                  onClick={() => setViewMode('network')}
                  className={`px-2 py-1 text-[10px] font-semibold ${viewMode === 'network' ? 'bg-cyan-500 text-slate-950' : 'bg-[#0a1626] text-slate-400'}`}
                >
                  Network
                </button>
                <button
                  onClick={() => setViewMode('hierarchy')}
                  className={`px-2 py-1 text-[10px] font-semibold ${viewMode === 'hierarchy' ? 'bg-cyan-500 text-slate-950' : 'bg-[#0a1626] text-slate-400'}`}
                >
                  Hierarchy
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300">Show Node Labels</span>
              <button onClick={() => setShowLabels(p => !p)} className="text-cyan-400">
                {showLabels ? <Eye size={15} /> : <EyeOff size={15} className="text-slate-500" />}
              </button>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300">Edge Labels</span>
              <button onClick={() => setShowRelLabels(p => !p)} className="text-cyan-400">
                {showRelLabels ? <Eye size={15} /> : <EyeOff size={15} className="text-slate-500" />}
              </button>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300">2-Hop Network</span>
              <button
                onClick={() => setShowTwoHop(p => !p)}
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${showTwoHop ? 'bg-cyan-400/20 text-cyan-300 border border-cyan-400/40' : 'bg-white/5 text-slate-500'}`}
              >
                {showTwoHop ? 'ENABLED' : 'DISABLED'}
              </button>
            </div>
          </div>

          {/* Security Environment Card */}
          <div className="rounded-lg border border-white/10 bg-black/30 p-3 text-[10px] text-slate-400 mt-auto">
            <div className="font-bold text-slate-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <ShieldAlert size={12} className="text-amber-400" /> Environment Security
            </div>
            <div>Auth: <span className="text-slate-200">Demo Role-Based</span></div>
            <div>Classification: <span className="text-cyan-300">Synthetic Demo Data</span></div>
            <div>Audit: <span className="text-emerald-400">Active Logging</span></div>
          </div>
        </aside>

        {/* CENTER: LARGE D3 INTERACTIVE RELATIONSHIP GRAPH */}
        <main className="relative flex flex-col bg-[#050b14] overflow-hidden min-h-[500px]">
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
          />

          {/* Bottom Analytical Panel Toggleable Drawer */}
          <div className="border-t border-white/10 bg-[#071220]/95 backdrop-blur-md">
            <div className="flex items-center border-b border-white/10 px-4 text-xs font-semibold overflow-x-auto">
              <button
                onClick={() => setActiveBottomTab('patterns')}
                className={`tab-btn flex items-center gap-1.5 ${activeBottomTab === 'patterns' ? 'tab-btn-active' : ''}`}
              >
                <Sparkles size={13} className="text-amber-400" />
                Detected Patterns ({detectedPatterns.length})
              </button>
              <button
                onClick={() => setActiveBottomTab('clusters')}
                className={`tab-btn flex items-center gap-1.5 ${activeBottomTab === 'clusters' ? 'tab-btn-active' : ''}`}
              >
                <Network size={13} className="text-cyan-400" />
                Network Clusters ({clusters.length})
              </button>
              <button
                onClick={() => setActiveBottomTab('locations')}
                className={`tab-btn flex items-center gap-1.5 ${activeBottomTab === 'locations' ? 'tab-btn-active' : ''}`}
              >
                <MapPin size={13} className="text-emerald-400" />
                Shared Location Overlaps ({locationObservations.reduce((s, x) => s + x.overlaps.length, 0)})
              </button>
              <button
                onClick={() => setActiveBottomTab('audit')}
                className={`tab-btn flex items-center gap-1.5 ${activeBottomTab === 'audit' ? 'tab-btn-active' : ''}`}
              >
                <Activity size={13} className="text-violet-400" />
                Session Audit Log ({auditLog.length})
              </button>
            </div>

            <div className="p-3 max-h-48 overflow-y-auto">
              {/* Patterns Tab */}
              {activeBottomTab === 'patterns' && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
                  {detectedPatterns.map(pat => (
                    <button
                      key={pat.id}
                      onClick={() => {
                        if (pat.entities[0]) handleSelectEntity(pat.entities[0])
                        logActivity(`Clicked Pattern ${pat.name} for ${pat.summary}`)
                      }}
                      className="intel-card p-2.5 text-left hover:border-cyan-400/30 transition group"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-white truncate group-hover:text-cyan-300">{pat.name}</span>
                        <span className="text-[10px] font-bold text-amber-300">{pat.count}</span>
                      </div>
                      <div className="text-[11px] text-cyan-200 mt-0.5">{pat.summary}</div>
                      <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">{pat.basis}</p>
                    </button>
                  ))}
                </div>
              )}

              {/* Clusters Tab */}
              {activeBottomTab === 'clusters' && (
                <div className="grid sm:grid-cols-3 gap-3 text-xs">
                  {clusters.map((cls, idx) => (
                    <button
                      key={cls.id}
                      onClick={() => {
                        if (cls.entities[0]) handleSelectEntity(cls.entities[0])
                        logActivity(`Focused ${cls.id}`)
                      }}
                      className="intel-card p-3 text-left hover:border-cyan-400/30"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-cyan-300">{cls.id}</span>
                        <span className="badge-neutral text-[10px]">{cls.entityCount} Entities</span>
                      </div>
                      <div className="text-[11px] text-slate-300 mt-1">
                        {cls.relationshipCount} Internal Relationships
                      </div>
                      <div className="text-[10px] text-slate-500 mt-1">
                        Types: {cls.primaryTypes.join(', ')}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Shared Locations Tab */}
              {activeBottomTab === 'locations' && (
                <div className="space-y-2 text-xs">
                  <div className="text-[11px] text-amber-300/80 bg-amber-400/5 p-2 rounded border border-amber-400/15">
                    Disclaimer: Shared location observations indicate spatial overlap only and do not independently establish association.
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {locationObservations.flatMap(loc =>
                      loc.overlaps.map((ov, oIdx) => {
                        const entA = entities.find(e => e.id === ov.entityA)
                        const entB = entities.find(e => e.id === ov.entityB)
                        return (
                          <div key={`${loc.id}-${oIdx}`} className="intel-card p-2.5 flex items-center justify-between">
                            <div>
                              <div className="font-semibold text-white">{entA?.name} ↔ {entB?.name}</div>
                              <div className="text-[10px] text-slate-400">{loc.locationName}</div>
                            </div>
                            <span className="badge-med text-[10px]">{ov.overlapCount} overlaps</span>
                          </div>
                        )
                      })
                    )}
                  </div>
                </div>
              )}

              {/* Session Audit Log Tab */}
              {activeBottomTab === 'audit' && (
                <div className="font-mono text-xs space-y-1">
                  {auditLog.map((log, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-slate-400">
                      <span className="text-cyan-400 text-[10px] shrink-0">{log.time}</span>
                      <span className="text-slate-200">{log.text}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>

        {/* RIGHT PANEL: INVESTIGATION INSPECTOR */}
        <aside className="border-l border-white/10 bg-[#071220]/95 flex flex-col overflow-y-auto max-h-[calc(100vh-140px)]">
          {selectedEntity ? (
            <InspectorDossier
              entity={selectedEntity}
              activeRels={visibleRels}
              activeCdrs={visibleCdrs}
              activeEvidences={visibleEvidences}
              bridgeScores={bridgeScores}
              onSelectEntity={handleSelectEntity}
              onSelectRel={handleSelectRel}
              onOpenEvidence={(evId) => setActiveEvidenceId(evId)}
              onGenerateReport={() => setReportModalOpen(true)}
              dateRange={dateRange}
            />
          ) : selectedRel ? (
            <RelationshipInspector
              relationship={selectedRel}
              onSelectEntity={handleSelectEntity}
              onOpenEvidence={(evId) => setActiveEvidenceId(evId)}
              onClose={() => setSelectedRel(null)}
            />
          ) : (
            <div className="p-8 text-center flex flex-col items-center justify-center h-full text-slate-500">
              <Target size={36} className="text-slate-600 mb-3" />
              <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Select an Entity</h3>
              <p className="text-xs text-slate-500 mt-2 max-w-xs leading-relaxed">
                Click any subject, phone, case, vehicle, or organization in the 2D relationship network to inspect its dossier, linked evidence, and analytical priority.
              </p>
            </div>
          )}
        </aside>
      </div>

      {/* 4. BOTTOM STATUS BAR */}
      <footer className="border-t border-white/10 bg-[#071220] px-4 py-1.5 text-[11px] flex flex-wrap items-center justify-between gap-4 text-slate-400">
        <div className="flex items-center gap-4">
          <span>Entities: <strong className="text-slate-200">{visibleEntities.length}</strong> / {entities.length}</span>
          <span>Relationships: <strong className="text-slate-200">{visibleRels.length}</strong> / {relationships.length}</span>
          <span>CDRs: <strong className="text-slate-200">{visibleCdrs.length}</strong></span>
          <span>Evidences: <strong className="text-slate-200">{visibleEvidences.length}</strong></span>
        </div>

        <div className="flex items-center gap-4">
          {selectedEntity && (
            <span>Selected: <strong className="text-cyan-300">{selectedEntity.name} ({selectedEntity.id})</strong></span>
          )}
          <span>System: <strong className="text-emerald-400 font-semibold">ACTIVE</strong></span>
          <span>Classification: <strong className="text-amber-300">SYNTHETIC DEMO</strong></span>
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

// Small KPI component
function KpiItem({ label, value, hint, icon: Icon, color }) {
  return (
    <div className="intel-card p-2 flex items-center justify-between">
      <div>
        <div className="text-[9px] uppercase font-semibold tracking-wider text-slate-500 truncate">{label}</div>
        <div className="text-base font-black text-white">{value}</div>
        <div className="text-[9px] text-slate-500 truncate">{hint}</div>
      </div>
      <div className="rounded-md p-1.5 bg-white/[0.03]" style={{ color }}>
        <Icon size={16} />
      </div>
    </div>
  )
}

// ==========================================
// INVESTIGATION INSPECTOR DOSSIER COMPONENT
// ==========================================
function InspectorDossier({
  entity,
  activeRels,
  activeCdrs,
  activeEvidences,
  bridgeScores,
  onSelectEntity,
  onSelectRel,
  onOpenEvidence,
  onGenerateReport,
  dateRange
}) {
  const [tab, setTab] = useState('overview') // 'overview', 'relationships', 'timeline', 'evidence', 'analytics'

  const priority = useMemo(() => {
    return calculatePriority(entity, activeRels, activeCdrs, activeEvidences)
  }, [entity, activeRels, activeCdrs, activeEvidences])

  const directNeighbors = useMemo(() => {
    return getDirectNeighbors(entity.id, activeRels)
  }, [entity.id, activeRels])

  const subjectRels = useMemo(() => {
    return activeRels.filter(r => {
      const s = typeof r.source === 'object' ? r.source.id : r.source
      const t = typeof r.target === 'object' ? r.target.id : r.target
      return s === entity.id || t === entity.id
    })
  }, [entity.id, activeRels])

  const subjectCdrs = useMemo(() => {
    return activeCdrs.filter(c => c.caller === entity.id || c.receiver === entity.id)
  }, [entity.id, activeCdrs])

  const subjectEvidences = useMemo(() => {
    return activeEvidences.filter(ev => ev.linkedEntities.includes(entity.id))
  }, [entity.id, activeEvidences])

  const subjectTimeline = useMemo(() => {
    return timelineObservations.filter(t => t.entityId === entity.id || t.relatedEntityId === entity.id)
  }, [entity.id])

  // Count by entity type
  const networkSummary = useMemo(() => {
    const summary = { PERSON: 0, PHONE: 0, LOCATION: 0, CASE: 0, EVENT: 0, VEHICLE: 0, ORGANIZATION: 0 }
    directNeighbors.forEach(nId => {
      const ent = entities.find(e => e.id === nId)
      if (ent && summary[ent.type] !== undefined) {
        summary[ent.type] += 1
      }
    })
    return summary
  }, [directNeighbors])

  // CDR Frequency ranking
  const commFrequency = useMemo(() => {
    const counts = {}
    subjectCdrs.forEach(c => {
      const peer = c.caller === entity.id ? c.receiver : c.caller
      counts[peer] = (counts[peer] || 0) + 1
    })
    return Object.entries(counts)
      .map(([peerId, count]) => {
        const peer = entities.find(e => e.id === peerId)
        return { peerId, peerName: peer?.name || peerId, count }
      })
      .sort((a, b) => b.count - a.count)
  }, [subjectCdrs, entity.id])

  return (
    <div className="flex flex-col h-full">
      {/* Dossier Header */}
      <div className="border-b border-white/10 p-4 bg-[#0a1626]">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl border flex items-center justify-center font-black text-sm"
              style={{
                backgroundColor: ENTITY_CONFIG[entity.type]?.bg,
                borderColor: ENTITY_CONFIG[entity.type]?.border,
                color: ENTITY_CONFIG[entity.type]?.color
              }}
            >
              {entity.type === 'PERSON' ? entity.name.split(' ').map(x => x[0]).join('') : entity.id.slice(0, 3)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-white truncate max-w-[170px]">{entity.name}</h2>
                <span className="badge-neutral text-[10px]">{entity.id}</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">{entity.role || entity.type}</p>
            </div>
          </div>

          <span className={entity.status === 'ACTIVE' ? 'badge-high' : entity.status === 'UNDER_REVIEW' ? 'badge-med' : 'badge-low'}>
            {entity.status}
          </span>
        </div>

        {/* Priority Gauge Card */}
        <div className="mt-3 rounded-lg border border-white/10 bg-[#0d1d33] p-3 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Analytical Priority</div>
            <div className="text-xs text-slate-500 mt-0.5">Synthetic weighted indicator</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-black text-cyan-300">{priority.total} <span className="text-xs font-normal text-slate-500">/ 100</span></div>
          </div>
        </div>

        {/* Action Button: Generate Report */}
        <button onClick={onGenerateReport} className="btn-primary w-full mt-3 text-xs py-2">
          <FileText size={14} /> Generate Investigation Report
        </button>
      </div>

      {/* Tabs Strip */}
      <div className="flex border-b border-white/10 px-2 text-xs font-semibold overflow-x-auto bg-[#071220]">
        <button onClick={() => setTab('overview')} className={`tab-btn ${tab === 'overview' ? 'tab-btn-active' : ''}`}>Overview</button>
        <button onClick={() => setTab('relationships')} className={`tab-btn ${tab === 'relationships' ? 'tab-btn-active' : ''}`}>Rels ({subjectRels.length})</button>
        <button onClick={() => setTab('timeline')} className={`tab-btn ${tab === 'timeline' ? 'tab-btn-active' : ''}`}>Timeline ({subjectTimeline.length})</button>
        <button onClick={() => setTab('evidence')} className={`tab-btn ${tab === 'evidence' ? 'tab-btn-active' : ''}`}>Evidence ({subjectEvidences.length})</button>
        <button onClick={() => setTab('analytics')} className={`tab-btn ${tab === 'analytics' ? 'tab-btn-active' : ''}`}>Analytics</button>
      </div>

      {/* Tab Content */}
      <div className="p-4 flex-1 overflow-y-auto space-y-4 text-xs">
        {/* OVERVIEW TAB */}
        {tab === 'overview' && (
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Subject Description</span>
              <p className="mt-1 text-slate-300 leading-relaxed bg-[#0a1626] p-3 rounded-lg border border-white/5">
                {entity.description}
              </p>
            </div>

            {/* Network Summary Counter Grid */}
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Direct Network Breakdown</span>
              <div className="grid grid-cols-2 gap-2 mt-1.5">
                <div className="intel-card p-2">
                  <div className="text-[9px] text-slate-400 uppercase">People</div>
                  <div className="text-base font-bold text-white">{networkSummary.PERSON}</div>
                </div>
                <div className="intel-card p-2">
                  <div className="text-[9px] text-slate-400 uppercase">Phones</div>
                  <div className="text-base font-bold text-violet-300">{networkSummary.PHONE}</div>
                </div>
                <div className="intel-card p-2">
                  <div className="text-[9px] text-slate-400 uppercase">Locations</div>
                  <div className="text-base font-bold text-emerald-300">{networkSummary.LOCATION}</div>
                </div>
                <div className="intel-card p-2">
                  <div className="text-[9px] text-slate-400 uppercase">FIR / Cases</div>
                  <div className="text-base font-bold text-rose-300">{networkSummary.CASE}</div>
                </div>
                <div className="intel-card p-2">
                  <div className="text-[9px] text-slate-400 uppercase">Vehicles</div>
                  <div className="text-base font-bold text-orange-300">{networkSummary.VEHICLE}</div>
                </div>
                <div className="intel-card p-2">
                  <div className="text-[9px] text-slate-400 uppercase">Events</div>
                  <div className="text-base font-bold text-amber-300">{networkSummary.EVENT}</div>
                </div>
              </div>
            </div>

            {/* Priority Score Breakdown */}
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Priority Components</span>
              <div className="mt-2 space-y-2">
                {Object.entries(priority.breakdown).map(([k, item]) => (
                  <div key={k}>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-400">{item.label}</span>
                      <span className="font-bold text-slate-200">{item.score} / {item.max}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${(item.score / item.max) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-[10px] text-slate-500 italic">
              "Analytical priority is a synthetic demonstration metric and does not establish criminality or guilt."
            </div>
          </div>
        )}

        {/* RELATIONSHIPS TAB */}
        {tab === 'relationships' && (
          <div className="space-y-2">
            {subjectRels.length === 0 ? (
              <div className="text-center py-6 text-slate-500">No relationships match current filters.</div>
            ) : (
              subjectRels.map(r => {
                const s = typeof r.source === 'object' ? r.source.id : r.source
                const t = typeof r.target === 'object' ? r.target.id : r.target
                const peerId = s === entity.id ? t : s
                const peer = entities.find(e => e.id === peerId)
                return (
                  <button
                    key={r.id}
                    onClick={() => onSelectRel(r)}
                    className="w-full text-left p-3 rounded-lg border border-white/5 bg-[#0a1626] hover:border-cyan-400/30 transition group space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-200 group-hover:text-cyan-300">{peer?.name || peerId}</span>
                        <span className="text-[10px] text-slate-500 font-mono">({peerId})</span>
                      </div>
                      <span className="text-xs font-black text-cyan-400">{Math.round(r.confidence * 100)}%</span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span className="font-semibold text-slate-300">{r.type.replace(/_/g, ' ')}</span>
                      <span>{fmtDate(r.date)}</span>
                    </div>

                    <p className="text-[10px] text-slate-500 line-clamp-1">{r.description}</p>
                  </button>
                )
              })
            )}
          </div>
        )}

        {/* TIMELINE TAB */}
        {tab === 'timeline' && (
          <div className="space-y-3">
            {subjectTimeline.length === 0 ? (
              <div className="text-center py-6 text-slate-500">No timeline records for this entity.</div>
            ) : (
              <div className="relative border-l border-white/10 ml-2 space-y-4 py-1">
                {subjectTimeline.map(tl => (
                  <div key={tl.id} className="relative pl-5">
                    <span className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full border-2 border-[#071220] bg-cyan-400" />
                    <div className="text-[10px] font-mono text-cyan-300">{fmtDate(tl.date)} {tl.time}</div>
                    <div className="font-bold text-slate-200 text-xs mt-0.5">{tl.title}</div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{tl.description}</p>
                    {tl.evidenceId && (
                      <button
                        onClick={() => onOpenEvidence(tl.evidenceId)}
                        className="mt-1 text-[10px] text-cyan-400 hover:underline flex items-center gap-1"
                      >
                        <Database size={10} /> View Evidence {tl.evidenceId}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* EVIDENCE TAB */}
        {tab === 'evidence' && (
          <div className="space-y-2">
            {subjectEvidences.length === 0 ? (
              <div className="text-center py-6 text-slate-500">No linked evidence records.</div>
            ) : (
              subjectEvidences.map(ev => (
                <button
                  key={ev.id}
                  onClick={() => onOpenEvidence(ev.id)}
                  className="w-full text-left p-3 rounded-lg border border-white/5 bg-[#0a1626] hover:border-cyan-400/30 transition space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-cyan-300">{ev.id}</span>
                    <span className="text-emerald-400 font-bold text-[10px]">{Math.round(ev.reliability * 100)}% reliability</span>
                  </div>
                  <div className="font-semibold text-slate-200 text-xs truncate">{ev.title}</div>
                  <div className="text-[10px] text-slate-500 flex justify-between">
                    <span>{ev.type}</span>
                    <span>{fmtDate(ev.date)}</span>
                  </div>
                </button>
              ))
            )}
          </div>
        )}

        {/* ANALYTICS TAB */}
        {tab === 'analytics' && (
          <div className="space-y-4">
            {/* CDR Summary Card */}
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">CDR Telephony Summary</span>
              <div className="grid grid-cols-2 gap-2 mt-1.5">
                <div className="intel-card p-2">
                  <div className="text-[9px] text-slate-400 uppercase">Total Interactions</div>
                  <div className="text-base font-bold text-white">{subjectCdrs.length}</div>
                </div>
                <div className="intel-card p-2">
                  <div className="text-[9px] text-slate-400 uppercase">Unique Contacts</div>
                  <div className="text-base font-bold text-cyan-300">{commFrequency.length}</div>
                </div>
                <div className="intel-card p-2">
                  <div className="text-[9px] text-slate-400 uppercase">Total Duration</div>
                  <div className="text-base font-bold text-white">
                    {fmtDuration(subjectCdrs.reduce((s, c) => s + c.durationSeconds, 0))}
                  </div>
                </div>
                <div className="intel-card p-2">
                  <div className="text-[9px] text-slate-400 uppercase">Peak Period</div>
                  <div className="text-xs font-bold text-amber-300 mt-1">18:00 – 22:00</div>
                </div>
              </div>
            </div>

            {/* Communication Frequency Bar Chart */}
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Contact Frequency</span>
              <div className="mt-2 space-y-2">
                {commFrequency.length === 0 ? (
                  <div className="text-slate-500">No calls recorded.</div>
                ) : (
                  commFrequency.map(item => (
                    <div key={item.peerId} className="space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="font-semibold text-slate-300">{item.peerName}</span>
                        <span className="text-cyan-400 font-bold">{item.count} calls</span>
                      </div>
                      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-cyan-400 rounded-full"
                          style={{ width: `${Math.min((item.count / 10) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Bridge Score Display */}
            <div className="intel-card p-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-slate-400">Bridge Centrality Index</span>
                <span className="text-base font-black text-amber-300">{bridgeScores[entity.id] || 0}</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                Potential connector between otherwise separated network clusters.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ==========================================
// RELATIONSHIP INSPECTOR DETAIL COMPONENT
// ==========================================
function RelationshipInspector({ relationship, onSelectEntity, onOpenEvidence, onClose }) {
  const sId = typeof relationship.source === 'object' ? relationship.source.id : relationship.source
  const tId = typeof relationship.target === 'object' ? relationship.target.id : relationship.target
  const entA = entities.find(e => e.id === sId)
  const entB = entities.find(e => e.id === tId)

  // Transparent Confidence Model
  const evidenceScore = relationship.evidenceSupport || 36
  const commScore = relationship.commSupport || 23
  const tempScore = relationship.tempConsistency || 18
  const sourceScore = relationship.sourceRel || 14

  return (
    <div className="flex flex-col h-full p-4 space-y-4 overflow-y-auto text-xs">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div>
          <div className="text-[10px] uppercase font-bold tracking-widest text-cyan-300">Relationship Analysis</div>
          <h3 className="text-sm font-bold text-white mt-0.5">{relationship.id}</h3>
        </div>
        <button onClick={onClose} className="btn-icon"><X size={14} /></button>
      </div>

      {/* Connected Entities Link Card */}
      <div className="p-3 rounded-xl border border-white/10 bg-[#0a1626] space-y-3">
        <button
          onClick={() => onSelectEntity(sId)}
          className="w-full text-left p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: ENTITY_CONFIG[entA?.type]?.color }} />
            <span className="font-semibold text-white">{entA?.name || sId}</span>
          </div>
          <span className="badge-neutral text-[10px]">{sId}</span>
        </button>

        <div className="flex items-center justify-center gap-2 text-cyan-400 font-bold text-[11px]">
          <Link2 size={13} />
          <span>{relationship.type.replace(/_/g, ' ')}</span>
          <ArrowRight size={13} />
        </div>

        <button
          onClick={() => onSelectEntity(tId)}
          className="w-full text-left p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: ENTITY_CONFIG[entB?.type]?.color }} />
            <span className="font-semibold text-white">{entB?.name || tId}</span>
          </div>
          <span className="badge-neutral text-[10px]">{tId}</span>
        </button>
      </div>

      {/* Confidence Model Breakdown */}
      <div className="intel-card p-3 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Relationship Confidence</span>
          <span className="text-xl font-black text-cyan-300">{Math.round(relationship.confidence * 100)}%</span>
        </div>

        <div className="space-y-2 text-[11px]">
          <div>
            <div className="flex justify-between text-slate-400 mb-1">
              <span>Evidence Support (40%)</span>
              <span className="font-bold text-slate-200">{evidenceScore} / 40</span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-cyan-400" style={{ width: `${(evidenceScore / 40) * 100}%` }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-slate-400 mb-1">
              <span>Communication Support (25%)</span>
              <span className="font-bold text-slate-200">{commScore} / 25</span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-violet-400" style={{ width: `${(commScore / 25) * 100}%` }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-slate-400 mb-1">
              <span>Temporal Consistency (20%)</span>
              <span className="font-bold text-slate-200">{tempScore} / 20</span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-400" style={{ width: `${(tempScore / 20) * 100}%` }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-slate-400 mb-1">
              <span>Source Reliability (15%)</span>
              <span className="font-bold text-slate-200">{sourceScore} / 15</span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-amber-400" style={{ width: `${(sourceScore / 15) * 100}%` }} />
            </div>
          </div>
        </div>

        <div className="text-[10px] text-slate-500 uppercase tracking-wider pt-1">
          Demo Analytical Confidence Model
        </div>
      </div>

      {/* Description & Date */}
      <div>
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Description</span>
        <p className="mt-1 text-slate-300 leading-relaxed bg-[#0a1626] p-3 rounded-lg border border-white/5">
          {relationship.description}
        </p>
        <div className="text-[10px] text-slate-500 mt-1">Recorded: {fmtDate(relationship.date)}</div>
      </div>

      {/* Linked Evidences */}
      {relationship.evidenceIds && relationship.evidenceIds.length > 0 && (
        <div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Substantiating Evidence</span>
          <div className="mt-1.5 space-y-1">
            {relationship.evidenceIds.map(evId => (
              <button
                key={evId}
                onClick={() => onOpenEvidence(evId)}
                className="w-full text-left p-2 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] flex items-center justify-between text-xs"
              >
                <span className="font-bold text-cyan-300">{evId}</span>
                <span className="text-slate-400 text-[11px] flex items-center gap-1">
                  Inspect <ChevronRight size={12} />
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ==========================================
// APP ROOT WITH AUTH
// ==========================================
function App() {
  const [auth, setAuth] = useState(localStorage.getItem('sih-auth') === 'true')

  const handleLogin = () => setAuth(true)
  const handleLogout = () => {
    localStorage.removeItem('sih-auth')
    setAuth(false)
  }

  return auth ? (
    <IntelligenceDashboard onLogout={handleLogout} />
  ) : (
    <Login onLogin={handleLogin} />
  )
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
