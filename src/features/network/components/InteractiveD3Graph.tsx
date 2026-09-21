import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import * as d3 from 'd3'
import {
  Download,
  Share2,
  RefreshCw,
  Sliders,
  Sparkles,
  Maximize2,
  FileText,
  Printer,
  Copy,
  Network,
  Target,
  X
} from 'lucide-react'
import { AnyEntity, Relationship, DateRange, ViewMode } from '@/types'
import { ENTITY_CONFIG, REL_CATEGORY_CONFIG } from '@/lib'
import {
  getDirectNeighbors,
  getSecondDegreeNeighbors
} from '@/features/network/services/graphAnalytics'
import { ActivityHeatmapTimeline } from '@/features/timeline/components/ActivityHeatmapTimeline'

export interface InteractiveD3GraphProps {
  visibleEntities: AnyEntity[]
  visibleRels: Relationship[]
  selectedEntityId?: string | null
  selectedRelId?: string | null
  hoveredEntityId?: string | null
  onSelectEntity: (id: string | null) => void
  onSelectRel: (rel: Relationship | null) => void
  onHoverEntity: (ent: AnyEntity | null) => void
  showLabels: boolean
  showRelLabels: boolean
  showTwoHop: boolean
  viewMode: ViewMode
  searchFocusId?: string | null
  onClearSearchFocus?: () => void
  spotlightEntityId?: string | null
  onToggleSpotlight?: (id: string) => void
  onGenerateReport?: (entity?: AnyEntity) => void
  dateRange: DateRange
  onSelectDate: (ds: string) => void
  onPlayToggle: () => void
  isPlaying: boolean
  currentPlayDate: string | null
}

export const InteractiveD3Graph: React.FC<InteractiveD3GraphProps> = ({
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
  viewMode,
  searchFocusId,
  onClearSearchFocus,
  spotlightEntityId,
  onToggleSpotlight,
  onGenerateReport,
  dateRange,
  onSelectDate,
  onPlayToggle,
  isPlaying,
  currentPlayDate
}) => {
  const containerRef = useRef(null)
  const svgRef = useRef(null)
  const zoomBehaviorRef = useRef(null)
  const simulationRef = useRef(null)

  // Floating Context Menu state
  const [contextMenu, setContextMenu] = useState(null)
  // Hover Tooltip state
  const [hoverTooltip, setHoverTooltip] = useState(null)

  // Direct and 2-hop neighbors of selected entity
  const directNeighbors = useMemo(() => {
    if (!selectedEntityId) return []
    return getDirectNeighbors(selectedEntityId, visibleRels)
  }, [selectedEntityId, visibleRels])

  const twoHopNeighbors = useMemo(() => {
    if (!selectedEntityId || !showTwoHop) return []
    return getSecondDegreeNeighbors(selectedEntityId, visibleRels)
  }, [selectedEntityId, visibleRels, showTwoHop])

  // Direct neighbors of spotlight entity
  const spotlightNeighbors = useMemo(() => {
    if (!spotlightEntityId) return []
    return getDirectNeighbors(spotlightEntityId, visibleRels)
  }, [spotlightEntityId, visibleRels])

  const spotlightNode = useMemo(() => {
    if (!spotlightEntityId) return null
    return visibleEntities.find(e => e.id === spotlightEntityId) || null
  }, [spotlightEntityId, visibleEntities])

  // Escape key & Click listener for context menu & spotlight
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (contextMenu) setContextMenu(null)
        if (spotlightEntityId && onToggleSpotlight) onToggleSpotlight(null)
      }
    }
    const handleWindowClick = () => {
      setContextMenu(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('click', handleWindowClick)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('click', handleWindowClick)
    }
  }, [contextMenu, spotlightEntityId, onToggleSpotlight])

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

    // Click background to clear selection & context menu
    svg.on('click', (event: any) => {
      const targetTag = (event?.target as HTMLElement)?.tagName
      if (targetTag === 'svg' || targetTag === 'g') {
        onSelectEntity(null)
        onSelectRel(null)
        setContextMenu(null)
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
      const levelMap = { ORGANIZATION: 1, PERSON: 2, CASE: 2, DOCUMENT: 2, EVENT: 3, PHONE: 3, VEHICLE: 4, LOCATION: 4 }
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
        const isConnected = (selectedEntityId && (d.source === selectedEntityId || d.target === selectedEntityId)) ||
                            (spotlightEntityId && (d.source === spotlightEntityId || d.target === spotlightEntityId))
        const isDimmed = (selectedEntityId && !isConnected && !isSelected) ||
                         (spotlightEntityId && !isConnected)
        return `graph-link ${isSelected || isConnected ? 'link-flowing link-highlighted' : ''} ${isDimmed ? 'link-dimmed' : ''}`
      })
      .attr('stroke', d => (REL_CATEGORY_CONFIG[d.category] || REL_CATEGORY_CONFIG.ASSOCIATION).color)
      .attr('stroke-width', d => {
        if (selectedRelId === d.id) return 3
        if (selectedEntityId && (d.source === selectedEntityId || d.target === selectedEntityId)) return 2.5
        return (REL_CATEGORY_CONFIG[d.category] || REL_CATEGORY_CONFIG.ASSOCIATION).width
      })
      .attr('stroke-dasharray', d => {
        const isConnected = selectedEntityId && (d.source === selectedEntityId || d.target === selectedEntityId)
        if (isConnected) return '8,4'
        return (REL_CATEGORY_CONFIG[d.category] || REL_CATEGORY_CONFIG.ASSOCIATION).dash
      })
      .attr('stroke-opacity', d => {
        if (spotlightEntityId && d.source !== spotlightEntityId && d.target !== spotlightEntityId) return 0.03
        return 0.55
      })
      .style('cursor', 'pointer')
      .on('click', (event, d) => {
        event.stopPropagation()
        onSelectRel(d)
        setContextMenu(null)
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
        const isSpotlight = d.id === spotlightEntityId
        const isDirect = directNeighbors.includes(d.id)
        const isTwoHop = twoHopNeighbors.includes(d.id)
        const isSpotlightDirect = spotlightEntityId ? (spotlightNeighbors.includes(d.id) || d.id === spotlightEntityId) : true

        let cls = 'graph-node'
        if (isSpotlight) cls += ' node-spotlight'
        else if (isSelected) cls += ' node-selected'
        else if (isDirect) cls += ' node-neighbor'
        else if (isTwoHop) cls += ' node-second-degree'

        if (spotlightEntityId && !isSpotlightDirect) {
          cls += ' node-dimmed-deep'
        } else if (selectedEntityId && !isSelected && !isDirect && !isTwoHop) {
          cls += ' node-dimmed'
        }
        return cls
      })
      .on('click', (event, d) => {
        event.stopPropagation()
        onSelectEntity(d.id)
        onSelectRel(null)
        setContextMenu(null)
      })
      .on('dblclick', (event, d) => {
        event.stopPropagation()
        if (onToggleSpotlight) onToggleSpotlight(d.id)
      })
      .on('contextmenu', (event, d) => {
        event.preventDefault()
        event.stopPropagation()
        setContextMenu({
          x: event.clientX,
          y: event.clientY,
          node: d
        })
      })
      .on('mouseenter', (event, d) => {
        onHoverEntity(d)
        setHoverTooltip({
          x: event.clientX,
          y: event.clientY,
          node: d
        })
      })
      .on('mousemove', (event) => {
        setHoverTooltip(prev => prev ? { ...prev, x: event.clientX, y: event.clientY } : null)
      })
      .on('mouseleave', () => {
        onHoverEntity(null)
        setHoverTooltip(null)
      })

    // Drag behavior for nodes
    const drag = d3.drag<any, any>()
      .on('start', (event: any, d: any) => {
        if (!event.active && simulationRef.current) simulationRef.current.alphaTarget(0.3).restart()
        d.fx = d.x
        d.fy = d.y
      })
      .on('drag', (event: any, d: any) => {
        d.fx = event.x
        d.fy = event.y
      })
      .on('end', (event: any, d: any) => {
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
      const isSpotlight = d.id === spotlightEntityId
      const isHighPriority = (d.basePriority || 0) >= 75
      const r = (isSelected || isSpotlight) ? d.radius + 5 : d.radius

      // Double pulse ring on high-priority entities
      if (isHighPriority && !isSelected && !isSpotlight) {
        elNode.append('circle')
          .attr('r', r + 6)
          .attr('fill', 'none')
          .attr('stroke', '#f43f5e')
          .attr('stroke-width', 1.2)
          .attr('stroke-dasharray', '3,3')
          .attr('class', 'pulse-halo-priority')
      }

      // Selected or Spotlight pulsating halo ring
      if (isSelected || isSpotlight) {
        elNode.append('circle')
          .attr('r', r + 11)
          .attr('fill', 'none')
          .attr('stroke', isSpotlight ? '#fbbf24' : '#00629B')
          .attr('stroke-width', 3)
          .attr('class', 'pulse-halo')
      }

      if (d.config.shape === 'circle' || d.config.shape === 'pin') {
        elNode.append('circle')
          .attr('r', r)
          .attr('fill', d.config.bg)
          .attr('stroke', isSpotlight ? '#fbbf24' : isSelected ? '#ffffff' : d.config.color)
          .attr('stroke-width', (isSelected || isSpotlight) ? 3 : 2)
      } else if (d.config.shape === 'square') {
        elNode.append('rect')
          .attr('x', -r)
          .attr('y', -r)
          .attr('width', r * 2)
          .attr('height', r * 2)
          .attr('rx', 4)
          .attr('fill', d.config.bg)
          .attr('stroke', isSpotlight ? '#fbbf24' : isSelected ? '#ffffff' : d.config.color)
          .attr('stroke-width', (isSelected || isSpotlight) ? 3 : 2)
      } else if (d.config.shape === 'diamond') {
        elNode.append('rect')
          .attr('x', -r)
          .attr('y', -r)
          .attr('width', r * 1.8)
          .attr('height', r * 1.8)
          .attr('rx', 3)
          .attr('transform', 'rotate(45)')
          .attr('fill', d.config.bg)
          .attr('stroke', isSpotlight ? '#fbbf24' : isSelected ? '#ffffff' : d.config.color)
          .attr('stroke-width', (isSelected || isSpotlight) ? 3 : 2)
      } else if (d.config.shape === 'hexagon') {
        const pts = []
        for (let i = 0; i < 6; i++) {
          const angle = (i * 60 * Math.PI) / 180
          pts.push(`${(r * 1.15 * Math.cos(angle)).toFixed(1)},${(r * 1.15 * Math.sin(angle)).toFixed(1)}`)
        }
        elNode.append('polygon')
          .attr('points', pts.join(' '))
          .attr('fill', d.config.bg)
          .attr('stroke', isSpotlight ? '#fbbf24' : isSelected ? '#ffffff' : d.config.color)
          .attr('stroke-width', (isSelected || isSpotlight) ? 3 : 2)
      } else {
        elNode.append('rect')
          .attr('x', -r * 1.4)
          .attr('y', -r * 0.9)
          .attr('width', r * 2.8)
          .attr('height', r * 1.8)
          .attr('rx', 8)
          .attr('fill', d.config.bg)
          .attr('stroke', isSpotlight ? '#fbbf24' : isSelected ? '#ffffff' : d.config.color)
          .attr('stroke-width', (isSelected || isSpotlight) ? 3 : 2)
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
        .attr('fill', isSpotlight ? '#fbbf24' : isSelected ? '#ffffff' : d.config.color)
        .text(displayInitials)

      // External label underneath
      if (showLabels) {
        const displayName = d.name.length > 18 ? `${d.name.slice(0, 16)}...` : d.name
        elNode.append('text')
          .attr('text-anchor', 'middle')
          .attr('dy', r + 13)
          .attr('font-size', 10)
          .attr('font-weight', isSelected || isSpotlight ? 700 : 500)
          .attr('fill', isSpotlight ? '#fbbf24' : isSelected ? '#38bdf8' : '#cbd5e1')
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
      const simulation = d3.forceSimulation<any>(nodes)
        .force('link', d3.forceLink(links).id((d: any) => d.id).distance(120).strength(0.8))
        .force('charge', d3.forceManyBody().strength(-340))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collide', d3.forceCollide((d: any) => d.radius + 28))
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
    spotlightEntityId,
    spotlightNeighbors,
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
      const transform = d3.zoomIdentity.translate(0, 0).scale(1)
      svgRef.current.transition().duration(500).call(zoomBehaviorRef.current.transform, transform)
    }
  }

  const handleCenterNode = (id) => {
    if (!id || !svgRef.current || !zoomBehaviorRef.current) return
    const el = containerRef.current
    const width = el?.clientWidth || 900
    const height = el?.clientHeight || 640
    const targetNode = simulationRef.current?.nodes().find(n => n.id === id)
    if (targetNode) {
      const scale = 1.6
      const transform = d3.zoomIdentity
        .translate(width / 2 - targetNode.x * scale, height / 2 - targetNode.y * scale)
        .scale(scale)
      svgRef.current.transition().duration(600).call(zoomBehaviorRef.current.transform, transform)
    }
  }

  const handleCenterSelected = () => {
    handleCenterNode(selectedEntityId)
  }

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Top Graph Overlay Bar */}
      <div className="absolute top-3 left-3 right-3 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="rounded-lg border border-white/10 bg-[#071220]/90 px-3 py-1.5 backdrop-blur text-xs flex items-center gap-2 text-slate-300 shadow-md">
            <Network size={14} className="text-cyan-400" />
            <span className="font-semibold text-white">{visibleEntities.length}</span> Entities
            <span className="text-slate-600">•</span>
            <span className="font-semibold text-white">{visibleRels.length}</span> Links
          </div>

          {selectedEntityId && (
            <button onClick={handleCenterSelected} className="btn-ghost pointer-events-auto text-[11px] py-1 bg-[#0a1626]/90 border-cyan-400/30 text-cyan-200 hover:bg-cyan-500/20">
              <Target size={13} className="text-cyan-400" /> Focus Selected
            </button>
          )}

          {spotlightEntityId && (
            <div className="rounded-lg border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-xs flex items-center gap-2 text-amber-200 animate-fade-in shadow-lg">
              <Sparkles size={13} className="text-amber-300" />
              <span>Spotlight: <strong>{spotlightNode?.name}</strong></span>
              <button
                onClick={() => onToggleSpotlight && onToggleSpotlight(null)}
                className="ml-1 text-[10px] bg-amber-400/20 hover:bg-amber-400/30 px-1.5 py-0.5 rounded text-amber-100"
              >
                Exit (Esc)
              </button>
            </div>
          )}
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-1.5 pointer-events-auto rounded-lg border border-white/10 bg-[#071220]/90 p-1 backdrop-blur shadow-lg">
          <button onClick={handleZoomIn} title="Zoom In" className="btn-icon h-7 w-7 text-xs font-bold">+</button>
          <button onClick={handleZoomOut} title="Zoom Out" className="btn-icon h-7 w-7 text-xs font-bold">-</button>
          <button onClick={handleFit} title="Fit Network" className="btn-icon h-7 w-7"><Maximize2 size={13} /></button>
          <button onClick={() => { onSelectEntity(null); onSelectRel(null); if (onToggleSpotlight) onToggleSpotlight(null); handleFit() }} title="Reset Network & Selection" className="btn-icon h-7 w-7"><RefreshCw size={13} /></button>
        </div>
      </div>

      {/* SVG Canvas Container (Pure Black background as specified) */}
      <div ref={containerRef} className="flex-1 w-full h-full min-h-[480px] bg-black" />

      {/* Activity Heatmap Timeline Strip */}
      <ActivityHeatmapTimeline
        dateRange={dateRange}
        onSelectDate={onSelectDate}
        onPlayToggle={onPlayToggle}
        isPlaying={isPlaying}
        currentPlayDate={currentPlayDate}
      />

      {/* Compact Interactive Legend Bar */}
      <div className="border-t border-neutral-800 bg-[#050505] px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 text-[11px]">
          <span className="text-slate-500 font-semibold uppercase tracking-wider">Legend:</span>
          {Object.entries(ENTITY_CONFIG).map(([type, cfg]) => (
            <div key={type} className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: cfg.color }} />
              <span className="text-slate-300 font-medium">{cfg.label}</span>
            </div>
          ))}
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

      {/* Node Hover Tooltip Card */}
      {hoverTooltip && !contextMenu && (
        <div
          className="graph-tooltip pointer-events-none"
          style={{
            left: Math.min(hoverTooltip.x + 14, (typeof window !== 'undefined' ? window.innerWidth : 1200) - 260),
            top: Math.min(hoverTooltip.y + 14, (typeof window !== 'undefined' ? window.innerHeight : 800) - 180)
          }}
        >
          <div className="flex items-center justify-between gap-2">
            <span className="tooltip-title text-cyan-300 font-bold truncate">{hoverTooltip.node.name}</span>
            <span className="tooltip-type px-1.5 py-0.5 rounded bg-white/10 text-[9px] font-bold" style={{ color: hoverTooltip.node.config.color }}>
              {hoverTooltip.node.type}
            </span>
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-0.5">
            {hoverTooltip.node.id} • {hoverTooltip.node.role || hoverTooltip.node.status}
          </div>
          <div className="mt-2 flex items-center justify-between text-[10px] text-slate-300">
            <span>Priority Centrality:</span>
            <span className="font-bold text-amber-300">{hoverTooltip.node.basePriority || 50}/100</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-1 mt-1 overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${hoverTooltip.node.basePriority || 50}%`,
                backgroundColor: hoverTooltip.node.basePriority >= 75 ? '#f43f5e' : hoverTooltip.node.basePriority >= 60 ? '#fbbf24' : '#38bdf8'
              }}
            />
          </div>
          <div className="mt-2 pt-1.5 border-t border-white/10 text-[9px] text-slate-400 flex items-center justify-between">
            <span>Connections: <strong className="text-white">{hoverTooltip.node.connectionCount}</strong></span>
            <span className="text-cyan-400">Right-click for options</span>
          </div>
        </div>
      )}

      {/* Floating Right-Click Context Menu */}
      {contextMenu && (
        <div
          className="context-menu shadow-2xl animate-fade-in"
          style={{
            left: Math.min(contextMenu.x, (typeof window !== 'undefined' ? window.innerWidth : 1200) - 210),
            top: Math.min(contextMenu.y, (typeof window !== 'undefined' ? window.innerHeight : 800) - 260)
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-3 py-1.5 border-b border-white/10 text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span className="truncate max-w-[120px] text-white">{contextMenu.node.name}</span>
            <span className="text-cyan-400 font-mono">{contextMenu.node.id}</span>
          </div>
          <div
            className="context-menu-item"
            onClick={() => {
              onSelectEntity(contextMenu.node.id)
              handleCenterNode(contextMenu.node.id)
              setContextMenu(null)
            }}
          >
            <Target size={13} className="text-cyan-400" /> Center & Focus Node
          </div>
          <div
            className="context-menu-item"
            onClick={() => {
              onSelectEntity(contextMenu.node.id)
              setContextMenu(null)
            }}
          >
            <FileText size={13} className="text-sky-400" /> Inspect Dossier
          </div>
          <div
            className="context-menu-item"
            onClick={() => {
              if (onToggleSpotlight) onToggleSpotlight(contextMenu.node.id)
              setContextMenu(null)
            }}
          >
            <Sparkles size={13} className="text-amber-400" /> Toggle Spotlight Mode
          </div>
          <div
            className="context-menu-item"
            onClick={() => {
              onSelectEntity(contextMenu.node.id)
              if (onGenerateReport) onGenerateReport(contextMenu.node)
              setContextMenu(null)
            }}
          >
            <Printer size={13} className="text-emerald-400" /> Generate Case Report
          </div>
          <div className="context-menu-divider" />
          <div
            className="context-menu-item text-slate-400"
            onClick={() => {
              if (navigator.clipboard) navigator.clipboard.writeText(contextMenu.node.id)
              setContextMenu(null)
            }}
          >
            <Copy size={13} /> Copy ID ({contextMenu.node.id})
          </div>
          <div
            className="context-menu-item text-rose-400 hover:text-rose-300"
            onClick={() => setContextMenu(null)}
          >
            <X size={13} /> Close Menu
          </div>
        </div>
      )}
    </div>
  )
}
