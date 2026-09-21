import { AnyEntity, Relationship, NetworkCluster } from '@/types'

export function getDirectNeighbors(entityId: string, rels: Relationship[]): string[] {
  const neighbors = new Set<string>()
  rels.forEach(r => {
    const s = typeof r.source === 'object' ? r.source.id : r.source
    const t = typeof r.target === 'object' ? r.target.id : r.target
    if (s === entityId) neighbors.add(t)
    if (t === entityId) neighbors.add(s)
  })
  return Array.from(neighbors)
}

export function getSecondDegreeNeighbors(entityId: string, rels: Relationship[]): string[] {
  const firstHop = new Set(getDirectNeighbors(entityId, rels))
  firstHop.add(entityId)
  const secondHop = new Set<string>()

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
export function calculateBridgeScores(
  activeEntities: AnyEntity[],
  activeRels: Relationship[]
): Record<string, number> {
  const scores: Record<string, number> = {}
  const nodes = activeEntities.map(e => e.id)
  nodes.forEach(n => {
    scores[n] = 0
  })

  const adj: Record<string, string[]> = {}
  nodes.forEach(n => {
    adj[n] = []
  })
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
    const S: string[] = []
    const P: Record<string, string[]> = {}
    nodes.forEach(w => {
      P[w] = []
    })
    const sigma: Record<string, number> = {}
    nodes.forEach(w => {
      sigma[w] = 0
    })
    sigma[s] = 1
    const d: Record<string, number> = {}
    nodes.forEach(w => {
      d[w] = -1
    })
    d[s] = 0

    const Q: string[] = [s]
    while (Q.length > 0) {
      const v = Q.shift()!
      S.push(v)
      adj[v]?.forEach(w => {
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

    const delta: Record<string, number> = {}
    nodes.forEach(w => {
      delta[w] = 0
    })
    while (S.length > 0) {
      const w = S.pop()!
      P[w]?.forEach(v => {
        delta[v] += (sigma[v] / (sigma[w] || 1)) * (1 + delta[w])
      })
      if (w !== s) {
        scores[w] += delta[w]
      }
    }
  })

  // Normalize scores between 0 and 1
  const maxScore = Math.max(...Object.values(scores), 1)
  const normalized: Record<string, number> = {}
  Object.keys(scores).forEach(k => {
    normalized[k] = parseFloat((scores[k] / maxScore).toFixed(2))
  })
  return normalized
}

// Connected Component / Community Cluster Detection
export function detectClusters(
  activeEntities: AnyEntity[],
  activeRels: Relationship[],
  allEntities: AnyEntity[] = activeEntities
): NetworkCluster[] {
  const visited = new Set<string>()
  const adj: Record<string, string[]> = {}
  activeEntities.forEach(e => {
    adj[e.id] = []
  })

  activeRels.forEach(r => {
    const s = typeof r.source === 'object' ? r.source.id : r.source
    const t = typeof r.target === 'object' ? r.target.id : r.target
    if (adj[s] && adj[t]) {
      adj[s].push(t)
      adj[t].push(s)
    }
  })

  const clusters: NetworkCluster[] = []
  activeEntities.forEach(e => {
    if (!visited.has(e.id)) {
      const clusterMembers: string[] = []
      const queue = [e.id]
      visited.add(e.id)

      while (queue.length > 0) {
        const curr = queue.shift()!
        clusterMembers.push(curr)
        adj[curr]?.forEach(neighbor => {
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
        primaryTypes: [
          ...new Set(
            clusterMembers
              .map(id => allEntities.find(x => x.id === id)?.type)
              .filter(Boolean) as string[]
          )
        ]
      })
    }
  })

  return clusters.sort((a, b) => b.entityCount - a.entityCount)
}
