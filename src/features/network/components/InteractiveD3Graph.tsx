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
  X,
  GitBranch,
  Layers
} from 'lucide-react'
import { AnyEntity, Relationship, DateRange, ViewMode } from '@/types'
import { ENTITY_CONFIG, REL_CATEGORY_CONFIG } from '@/lib'
import {
  getDirectNeighbors,
  getSecondDegreeNeighbors
} from '@/features/network/services/graphAnalytics'

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
}

// Shape legend config for the monochrome legend bar
const SHAPE_LEGEND: { type: string; label: string; shape: string }[] = [
  { type: 'PERSON', label: 'Person', shape: 'circle' },
  { type: 'PHONE', label: 'Phone', shape: 'rounded-rect' },
  { type: 'LOCATION', label: 'Location', shape: 'circle' },
  { type: 'CASE', label: 'FIR / Case', shape: 'square' },
  { type: 'EVENT', label: 'Event', shape: 'diamond' },
  { type: 'VEHICLE', label: 'Vehicle', shape: 'hexagon' },
  { type: 'ORGANIZATION', label: 'Organization', shape: 'rect' },
  { type: 'DOCUMENT', label: 'Document', shape: 'square' },
]

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
  dateRange
}) => {
  const containerRef = useRef(null)
  const svgRef = useRef(null)
  const zoomBehaviorRef = useRef(null)
  const simulationRef = useRef(null)

  // Local state for expand hop toggle (on-graph control)
  const [expandHop, setExpandHop] = useState(false)

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
    if (!selectedEntityId || !expandHop) return []
    return getSecondDegreeNeighbors(selectedEntityId, visibleRels)
  }, [selectedEntityId, visibleRels, expandHop])

  // Direct neighbors of spotlight entity
  const spotlightNeighbors = useMemo(() => {
    if (!spotlightEntityId) return []
    return getDirectNeighbors(spotlightEntityId, visibleRels)
  }, [spotlightEntityId, visibleRels])

  const spotlightNode = useMemo(() => {
    if (!spotlightEntityId) return null
    return visibleEntities.find(e => e.id === spotlightEntityId) || null
  }, [spotlightEntityId, visibleEntities])

  // ============================================================
  // 1-HOP FILTERED ENTITIES & RELATIONSHIPS
  // When a node is selected, show ONLY it + direct neighbors.
  // When expandHop is on, also include 2nd-hop neighbors.
  // When NO node is selected, show everything (full network).
  // ============================================================
  const { filteredEntities, filteredRels, secondHopRelSet } = useMemo(() => {
    if (!selectedEntityId) {
      return { filteredEntities: visibleEntities, filteredRels: visibleRels, secondHopRelSet: new Set<string>() }
    }

    // Always include selected + 1-hop neighbors
    const includedIds = new Set<string>([selectedEntityId, ...directNeighbors])

    // Optionally include 2-hop neighbors
    if (expandHop) {
      twoHopNeighbors.forEach(id => includedIds.add(id))
    }

    const fEntities = visibleEntities.filter(e => includedIds.has(e.id))

    // Determine which rels are 2nd-hop (between 1-hop neighbor and 2-hop neighbor)
    const firstHopIds = new Set<string>([selectedEntityId, ...directNeighbors])
    const secondHopRelIds = new Set<string>()

    const fRels = visibleRels.filter(r => {
      const s = typeof r.source === 'object' ? r.source.id : r.source
      const t = typeof r.target === 'object' ? r.target.id : r.target
      const bothIncluded = includedIds.has(s) && includedIds.has(t)
      if (!bothIncluded) return false

      // Mark as 2nd-hop if neither endpoint is the selected node AND at least one is a 2-hop node
      const isSecondHop = expandHop && (
        (!firstHopIds.has(s) || !firstHopIds.has(t))
      )
      if (isSecondHop) secondHopRelIds.add(r.id)

      return true
    })

    return { filteredEntities: fEntities, filteredRels: fRels, secondHopRelSet: secondHopRelIds }
  }, [visibleEntities, visibleRels, selectedEntityId, directNeighbors, twoHopNeighbors, expandHop])

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

    // Prepare Node and Link Data from FILTERED entities
    const nodeMap = new Map()
    filteredEntities.forEach(e => {
      const connCount = filteredRels.filter(r => r.source === e.id || r.target === e.id || r.source?.id === e.id || r.target?.id === e.id).length
      const config = ENTITY_CONFIG[e.type] || ENTITY_CONFIG.PERSON
      nodeMap.set(e.id, {
        ...e,
        connectionCount: connCount,
        radius: config.baseRadius + Math.min(connCount * 1.6, 12),
        config
      })
    })

    const nodes = Array.from(nodeMap.values())

    const links = filteredRels
      .filter(r => nodeMap.has(typeof r.source === 'object' ? r.source.id : r.source) &&
                   nodeMap.has(typeof r.target === 'object' ? r.target.id : r.target))
      .map(r => ({
        ...r,
        source: typeof r.source === 'object' ? r.source.id : r.source,
        target: typeof r.target === 'object' ? r.target.id : r.target
      }))

    // Arrow markers for links
    const defs = svg.append('defs')
    defs.append('marker')
      .attr('id', 'arrow-mono')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 24)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#818cf8')
      .attr('opacity', 0.6)

    defs.append('marker')
      .attr('id', 'arrow-indirect')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 24)
      .attr('refY', 0)
      .attr('markerWidth', 5)
      .attr('markerHeight', 5)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#555555')
      .attr('opacity', 0.4)

    // 3D Spherical Radial Gradients for ultra-premium look
    const GRADIENT_DEFINITIONS: Record<string, [string, string, string]> = {
      PERSON: ['#e0e7ff', '#6366f1', '#1e1b4b'],       // Indigo / Violet 3D sphere
      PHONE: ['#e0f2fe', '#0ea5e9', '#082f49'],        // Cyan / Sky
      LOCATION: ['#d1fae5', '#10b981', '#064e3b'],     // Emerald
      CASE: ['#fce7f3', '#ec4899', '#701a75'],         // Pink / Fuchsia
      EVENT: ['#fef3c7', '#f59e0b', '#78350f'],        // Amber / Gold
      VEHICLE: ['#ffedd5', '#f97316', '#7c2d12'],      // Orange / Coral
      ORGANIZATION: ['#f3e8ff', '#a855f7', '#581c87'], // Purple
      DOCUMENT: ['#cffafe', '#06b6d4', '#164e63']      // Cyan
    }

    Object.entries(GRADIENT_DEFINITIONS).forEach(([type, [highlight, mid, deep]]) => {
      const grad = defs.append('radialGradient')
        .attr('id', `sphere-grad-${type}`)
        .attr('cx', '35%')
        .attr('cy', '35%')
        .attr('r', '65%')

      grad.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', highlight)
        .attr('stop-opacity', '0.95')

      grad.append('stop')
        .attr('offset', '45%')
        .attr('stop-color', mid)
        .attr('stop-opacity', '0.85')

      grad.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', deep)
        .attr('stop-opacity', '0.95')
    })

    const muteGrad = defs.append('radialGradient')
      .attr('id', 'sphere-grad-muted')
      .attr('cx', '35%')
      .attr('cy', '35%')
      .attr('r', '65%')
    muteGrad.append('stop').attr('offset', '0%').attr('stop-color', '#71717a').attr('stop-opacity', '0.7')
    muteGrad.append('stop').attr('offset', '100%').attr('stop-color', '#18181b').attr('stop-opacity', '0.9')

    // Glow filter for 3D neon node effect
    const glowFilter = defs.append('filter')
      .attr('id', 'node-glow')
      .attr('x', '-50%').attr('y', '-50%')
      .attr('width', '200%').attr('height', '200%')
    glowFilter.append('feGaussianBlur')
      .attr('stdDeviation', '4')
      .attr('result', 'coloredBlur')
    const feMerge = glowFilter.append('feMerge')
    feMerge.append('feMergeNode').attr('in', 'coloredBlur')
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic')

    // Stronger glow for selected nodes
    const glowFilterStrong = defs.append('filter')
      .attr('id', 'node-glow-strong')
      .attr('x', '-60%').attr('y', '-60%')
      .attr('width', '220%').attr('height', '220%')
    glowFilterStrong.append('feGaussianBlur')
      .attr('stdDeviation', '8')
      .attr('result', 'coloredBlur')
    const feMergeS = glowFilterStrong.append('feMerge')
    feMergeS.append('feMergeNode').attr('in', 'coloredBlur')
    feMergeS.append('feMergeNode').attr('in', 'SourceGraphic')

    // ============================================================
    // RADIAL LAYOUT for selected-entity mode
    // Center the selected entity; arrange 1-hop neighbors in a ring.
    // 2-hop neighbors (if expanded) placed in an outer ring.
    // ============================================================
    const useRadialLayout = !!selectedEntityId && viewMode === 'network'

    if (useRadialLayout) {
      const cx = width / 2
      const cy = height / 2
      const firstHopRadius = Math.min(width, height) * 0.25
      const secondHopRadius = Math.min(width, height) * 0.42

      // Draw futuristic orbital guide rings for 3D depth
      const orbitGroup = g.append('g').attr('class', 'orbit-rings')
      orbitGroup.append('circle')
        .attr('cx', cx).attr('cy', cy).attr('r', firstHopRadius)
        .attr('fill', 'none')
        .attr('stroke', '#6366f1')
        .attr('stroke-width', 1.2)
        .attr('stroke-dasharray', '4,8')
        .attr('opacity', 0.22)

      if (expandHop) {
        orbitGroup.append('circle')
          .attr('cx', cx).attr('cy', cy).attr('r', secondHopRadius)
          .attr('fill', 'none')
          .attr('stroke', '#38bdf8')
          .attr('stroke-width', 1.2)
          .attr('stroke-dasharray', '6,10')
          .attr('opacity', 0.16)
      }

      nodes.forEach(n => {
        if (n.id === selectedEntityId) {
          n.x = cx
          n.y = cy
          n.fx = cx
          n.fy = cy
        }
      })

      // Position 1-hop neighbors in a circle
      const firstHopNodes = nodes.filter(n => directNeighbors.includes(n.id))
      firstHopNodes.forEach((n, i) => {
        const angle = (2 * Math.PI * i) / firstHopNodes.length - Math.PI / 2
        n.x = cx + firstHopRadius * Math.cos(angle)
        n.y = cy + firstHopRadius * Math.sin(angle)
        n.fx = n.x
        n.fy = n.y
      })

      // Position 2-hop neighbors in an outer ring
      if (expandHop) {
        const secondHopNodes = nodes.filter(n => twoHopNeighbors.includes(n.id))
        secondHopNodes.forEach((n, i) => {
          const angle = (2 * Math.PI * i) / secondHopNodes.length - Math.PI / 4
          n.x = cx + secondHopRadius * Math.cos(angle)
          n.y = cy + secondHopRadius * Math.sin(angle)
          n.fx = n.x
          n.fy = n.y
        })
      }
    } else if (viewMode === 'hierarchy') {
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
        const isIndirect = secondHopRelSet.has(d.id)
        const isSelected = selectedRelId === d.id
        const isConnected = (selectedEntityId && (d.source === selectedEntityId || d.target === selectedEntityId)) ||
                            (spotlightEntityId && (d.source === spotlightEntityId || d.target === spotlightEntityId))

        let cls = 'graph-link'
        if (isIndirect) cls += ' link-indirect'
        if (isSelected || isConnected) cls += ' link-highlighted'
        return cls
      })
      .attr('stroke', d => {
        const isIndirect = secondHopRelSet.has(d.id)
        if (isIndirect) return '#555555'
        return (REL_CATEGORY_CONFIG[d.category] || REL_CATEGORY_CONFIG.ASSOCIATION).color
      })
      .attr('stroke-width', d => {
        const isIndirect = secondHopRelSet.has(d.id)
        if (isIndirect) return 1
        if (selectedRelId === d.id) return 2.5
        if (selectedEntityId && (d.source === selectedEntityId || d.target === selectedEntityId)) return 2
        return (REL_CATEGORY_CONFIG[d.category] || REL_CATEGORY_CONFIG.ASSOCIATION).width
      })
      .attr('stroke-dasharray', d => {
        const isIndirect = secondHopRelSet.has(d.id)
        if (isIndirect) return '4,3'
        return (REL_CATEGORY_CONFIG[d.category] || REL_CATEGORY_CONFIG.ASSOCIATION).dash
      })
      .attr('stroke-opacity', d => {
        const isIndirect = secondHopRelSet.has(d.id)
        if (isIndirect) return 0.35
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
        // In radial or hierarchy mode, keep nodes pinned
        if (!useRadialLayout && viewMode !== 'hierarchy') {
          d.fx = null
          d.fy = null
        }
      })

    node.call(drag)

    // ============================================================
    // RENDER NODE SHAPES — Vibrant colored with 3D glow
    // ============================================================
    node.each(function(d) {
      const elNode = d3.select(this)
      const isSelected = d.id === selectedEntityId
      const isSpotlight = d.id === spotlightEntityId
      const isTwoHopNode = twoHopNeighbors.includes(d.id)
      const r = (isSelected || isSpotlight) ? d.radius + 5 : d.radius

      // Apply glow filter to node group for 3D depth
      if (isSelected || isSpotlight) {
        elNode.attr('filter', 'url(#node-glow-strong)')
      } else if (!isTwoHopNode) {
        elNode.attr('filter', 'url(#node-glow)')
      }

      // Selected pulsating halo ring — entity colored
      if (isSelected || isSpotlight) {
        elNode.append('circle')
          .attr('r', r + 11)
          .attr('fill', 'none')
          .attr('stroke', d.config.color)
          .attr('stroke-width', 2)
          .attr('stroke-opacity', 0.6)
          .attr('class', 'pulse-halo')
      }

      // Node stroke color: entity color for direct, gray for 2nd-hop
      const strokeColor = isTwoHopNode ? '#52525b' : d.config.color
      const strokeWidth = (isSelected || isSpotlight) ? 2.8 : isTwoHopNode ? 1.5 : 2
      const nodeFill = isTwoHopNode ? 'url(#sphere-grad-muted)' : `url(#sphere-grad-${d.type})`

      if (d.config.shape === 'circle' || d.config.shape === 'pin') {
        elNode.append('circle')
          .attr('r', r)
          .attr('fill', nodeFill)
          .attr('stroke', strokeColor)
          .attr('stroke-width', strokeWidth)
      } else if (d.config.shape === 'square') {
        elNode.append('rect')
          .attr('x', -r)
          .attr('y', -r)
          .attr('width', r * 2)
          .attr('height', r * 2)
          .attr('rx', 8)
          .attr('fill', nodeFill)
          .attr('stroke', strokeColor)
          .attr('stroke-width', strokeWidth)
      } else if (d.config.shape === 'diamond') {
        elNode.append('rect')
          .attr('x', -r)
          .attr('y', -r)
          .attr('width', r * 1.8)
          .attr('height', r * 1.8)
          .attr('rx', 6)
          .attr('transform', 'rotate(45)')
          .attr('fill', nodeFill)
          .attr('stroke', strokeColor)
          .attr('stroke-width', strokeWidth)
      } else if (d.config.shape === 'hexagon') {
        const pts = []
        for (let i = 0; i < 6; i++) {
          const angle = (i * 60 * Math.PI) / 180
          pts.push(`${(r * 1.15 * Math.cos(angle)).toFixed(1)},${(r * 1.15 * Math.sin(angle)).toFixed(1)}`)
        }
        elNode.append('polygon')
          .attr('points', pts.join(' '))
          .attr('fill', nodeFill)
          .attr('stroke', strokeColor)
          .attr('stroke-width', strokeWidth)
      } else {
        // Organization / Rounded Rect
        elNode.append('rect')
          .attr('x', -r * 1.4)
          .attr('y', -r * 0.9)
          .attr('width', r * 2.8)
          .attr('height', r * 1.8)
          .attr('rx', 10)
          .attr('fill', nodeFill)
          .attr('stroke', strokeColor)
          .attr('stroke-width', strokeWidth)
      }

      // Glyph / Code inside node — high contrast text with 3D shadow
      const displayInitials = d.type === 'PERSON'
        ? d.name.split(' ').map(x => x[0]).join('')
        : d.id
      elNode.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '.35em')
        .attr('font-size', d.radius > 22 ? 11 : 9)
        .attr('font-weight', 800)
        .attr('fill', '#ffffff')
        .style('text-shadow', '0 1px 3px rgba(0,0,0,0.9)')
        .text(displayInitials)

      // External label underneath — white
      if (showLabels) {
        const displayName = d.name.length > 18 ? `${d.name.slice(0, 16)}...` : d.name
        elNode.append('text')
          .attr('text-anchor', 'middle')
          .attr('dy', r + 13)
          .attr('font-size', 10)
          .attr('font-weight', isSelected || isSpotlight ? 700 : 500)
          .attr('fill', isSelected ? '#ffffff' : isTwoHopNode ? '#666666' : '#d4d4d8')
          .text(displayName)

        elNode.append('text')
          .attr('text-anchor', 'middle')
          .attr('dy', r + 24)
          .attr('font-size', 8)
          .attr('fill', isTwoHopNode ? '#555555' : '#71717a')
          .text(`${d.type} • ${d.connectionCount} conn`)
      }
    })

    // Setup Force Simulation
    if (viewMode === 'network' && !useRadialLayout) {
      // Full network mode — standard force-directed
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
      // Radial or hierarchy — static positions, just render
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

      // Use a gentle force simulation to resolve overlaps in radial layout
      if (useRadialLayout) {
        const simulation = d3.forceSimulation<any>(nodes)
          .force('link', d3.forceLink(links).id((d: any) => d.id).distance(100).strength(0.2))
          .force('collide', d3.forceCollide((d: any) => d.radius + 16))
          .alphaDecay(0.08)
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
      }
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
    filteredEntities,
    filteredRels,
    selectedEntityId,
    selectedRelId,
    showLabels,
    showRelLabels,
    expandHop,
    viewMode,
    directNeighbors,
    twoHopNeighbors,
    secondHopRelSet,
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
          <div className="rounded-xl border border-neutral-800/80 bg-neutral-950/85 px-3.5 py-1.5 backdrop-blur-md text-xs flex items-center gap-2 text-neutral-300 shadow-xl">
            <Network size={14} className="text-indigo-400" />
            <span className="font-semibold text-white">{filteredEntities.length}</span> Entities
            <span className="text-neutral-600">•</span>
            <span className="font-semibold text-white">{filteredRels.length}</span> Links
            {selectedEntityId && (
              <>
                <span className="text-neutral-600">•</span>
                <span className="text-indigo-300 font-medium">1-Hop Focus</span>
              </>
            )}
          </div>

          {selectedEntityId && (
            <button
              onClick={handleCenterSelected}
              className="btn-ghost rounded-xl pointer-events-auto text-[11px] py-1 px-3 bg-neutral-950/85 border-neutral-800 text-neutral-200 hover:border-indigo-500/50 hover:bg-neutral-900 transition-all shadow-lg"
            >
              <Target size={13} className="text-indigo-400" /> Focus Center
            </button>
          )}

          {/* ========== EXPAND HOP TOGGLE ========== */}
          {selectedEntityId && (
            <button
              onClick={() => setExpandHop(p => !p)}
              className={`pointer-events-auto rounded-xl px-3 py-1 text-[11px] font-medium border transition-all flex items-center gap-1.5 shadow-lg ${
                expandHop
                  ? 'border-indigo-500/60 bg-indigo-950/60 text-indigo-200 shadow-indigo-950/40'
                  : 'border-neutral-800 bg-neutral-950/85 text-neutral-300 hover:border-neutral-700 hover:bg-neutral-900'
              }`}
            >
              <Layers size={13} className={expandHop ? 'text-indigo-400' : 'text-neutral-400'} />
              {expandHop ? 'Indirect Links Active' : 'Show Indirect (2-Hop)'}
            </button>
          )}

          {spotlightEntityId && (
            <div className="rounded-xl border border-indigo-500/40 bg-indigo-950/70 px-3 py-1 text-xs flex items-center gap-2 text-indigo-100 animate-fade-in shadow-xl backdrop-blur-md">
              <Sparkles size={13} className="text-indigo-400" />
              <span>Spotlight: <strong className="text-white">{spotlightNode?.name}</strong></span>
              <button
                onClick={() => onToggleSpotlight && onToggleSpotlight(null)}
                className="ml-1 text-[10px] bg-neutral-800 hover:bg-neutral-700 px-2 py-0.5 rounded-lg text-neutral-200 transition"
              >
                Exit (Esc)
              </button>
            </div>
          )}
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-1 pointer-events-auto rounded-xl border border-neutral-800/80 bg-neutral-950/85 p-1 backdrop-blur-md shadow-xl">
          <button onClick={handleZoomIn} title="Zoom In" className="btn-icon h-7 w-7 rounded-lg text-xs font-bold hover:bg-neutral-800 hover:text-white">+</button>
          <button onClick={handleZoomOut} title="Zoom Out" className="btn-icon h-7 w-7 rounded-lg text-xs font-bold hover:bg-neutral-800 hover:text-white">-</button>
          <button onClick={handleFit} title="Fit Network" className="btn-icon h-7 w-7 rounded-lg hover:bg-neutral-800 hover:text-white"><Maximize2 size={13} /></button>
          <button onClick={() => { onSelectEntity(null); onSelectRel(null); if (onToggleSpotlight) onToggleSpotlight(null); setExpandHop(false); handleFit() }} title="Reset Network & Selection" className="btn-icon h-7 w-7 rounded-lg hover:bg-neutral-800 hover:text-white"><RefreshCw size={13} /></button>
        </div>
      </div>

      {/* SVG Canvas Container (Pure Black background) */}
      <div ref={containerRef} className="flex-1 w-full h-full min-h-[480px] bg-black" />

      {/* Color-Coded Entity Legend Bar */}
      <div className="border-t border-neutral-800/90 bg-[#09090b]/95 backdrop-blur-md px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3.5 text-[11px]">
          <span className="text-neutral-500 font-semibold uppercase tracking-wider text-[10px]">Entities:</span>
          {SHAPE_LEGEND.map(item => {
            const conf = ENTITY_CONFIG[item.type]
            return (
              <div key={item.type} className="flex items-center gap-1.5">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{
                    backgroundColor: conf?.color || '#ffffff',
                    boxShadow: `0 0 6px ${conf?.color || '#ffffff'}88`
                  }}
                />
                <span className="text-neutral-300 font-medium text-[11px]">{item.label}</span>
              </div>
            )
          })}
        </div>
        <div className="flex items-center gap-4 text-[11px] text-neutral-400">
          <span className="flex items-center gap-1.5">
            <span className="w-4 h-0.5 bg-indigo-400 inline-block rounded-full" /> Direct Link
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-4 h-0.5 border-t border-dashed border-neutral-500 inline-block" /> Indirect (2-Hop)
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
            <span className="tooltip-title text-white font-bold truncate">{hoverTooltip.node.name}</span>
            <span className="tooltip-type px-1.5 py-0.5 rounded bg-neutral-800 text-[9px] font-bold text-neutral-300">
              {hoverTooltip.node.type}
            </span>
          </div>
          <div className="text-[10px] text-neutral-400 font-mono mt-0.5">
            {hoverTooltip.node.id} • {hoverTooltip.node.role || hoverTooltip.node.status}
          </div>
          <div className="mt-2 flex items-center justify-between text-[10px] text-neutral-300">
            <span>Priority:</span>
            <span className="font-bold text-white">{hoverTooltip.node.basePriority || 50}/100</span>
          </div>
          <div className="w-full bg-neutral-800 rounded-full h-1 mt-1 overflow-hidden">
            <div
              className="h-full rounded-full transition-all bg-white"
              style={{
                width: `${hoverTooltip.node.basePriority || 50}%`
              }}
            />
          </div>
          <div className="mt-2 pt-1.5 border-t border-neutral-700 text-[9px] text-neutral-500 flex items-center justify-between">
            <span>Connections: <strong className="text-white">{hoverTooltip.node.connectionCount}</strong></span>
            <span className="text-neutral-400">Right-click for options</span>
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
          <div className="px-3 py-1.5 border-b border-neutral-800 text-[10px] font-bold text-neutral-400 uppercase tracking-wider flex items-center justify-between">
            <span className="truncate max-w-[120px] text-white">{contextMenu.node.name}</span>
            <span className="text-neutral-500 font-mono">{contextMenu.node.id}</span>
          </div>
          <div
            className="context-menu-item"
            onClick={() => {
              onSelectEntity(contextMenu.node.id)
              handleCenterNode(contextMenu.node.id)
              setContextMenu(null)
            }}
          >
            <Target size={13} className="text-white" /> Center & Focus Node
          </div>
          <div
            className="context-menu-item"
            onClick={() => {
              onSelectEntity(contextMenu.node.id)
              setContextMenu(null)
            }}
          >
            <FileText size={13} className="text-neutral-300" /> Inspect Dossier
          </div>
          <div
            className="context-menu-item"
            onClick={() => {
              if (onToggleSpotlight) onToggleSpotlight(contextMenu.node.id)
              setContextMenu(null)
            }}
          >
            <Sparkles size={13} className="text-neutral-300" /> Toggle Spotlight Mode
          </div>
          <div
            className="context-menu-item"
            onClick={() => {
              onSelectEntity(contextMenu.node.id)
              if (onGenerateReport) onGenerateReport(contextMenu.node)
              setContextMenu(null)
            }}
          >
            <Printer size={13} className="text-neutral-300" /> Generate Case Report
          </div>
          <div className="context-menu-divider" />
          <div
            className="context-menu-item text-neutral-400"
            onClick={() => {
              if (navigator.clipboard) navigator.clipboard.writeText(contextMenu.node.id)
              setContextMenu(null)
            }}
          >
            <Copy size={13} /> Copy ID ({contextMenu.node.id})
          </div>
          <div
            className="context-menu-item text-neutral-500 hover:text-neutral-300"
            onClick={() => setContextMenu(null)}
          >
            <X size={13} /> Close Menu
          </div>
        </div>
      )}
    </div>
  )
}
