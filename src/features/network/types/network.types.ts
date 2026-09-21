import { AnyEntity, Relationship, NetworkCluster } from '@/types'

export interface NetworkGraphState {
  nodes: AnyEntity[]
  links: Relationship[]
  selectedEntityId: string | null
  selectedRelId: string | null
  clusters: NetworkCluster[]
}
