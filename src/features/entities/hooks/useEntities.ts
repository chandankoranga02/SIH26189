import { useState, useMemo } from 'react'
import { AnyEntity } from '@/types'
import { entities } from '@/data'
import { searchEntities, getEntityById } from '../services/entityService'

export function useEntities(initialEntityId: string = 'P003') {
  const [selectedEntityId, setSelectedEntityId] = useState<string | null>(initialEntityId)
  const [searchQuery, setSearchQuery] = useState('')

  const selectedEntity = useMemo(() => {
    if (!selectedEntityId) return null
    return getEntityById(selectedEntityId, entities) || null
  }, [selectedEntityId])

  const searchResults = useMemo(() => {
    return searchEntities(searchQuery, entities)
  }, [searchQuery])

  return {
    allEntities: entities,
    selectedEntityId,
    setSelectedEntityId,
    selectedEntity,
    searchQuery,
    setSearchQuery,
    searchResults
  }
}
