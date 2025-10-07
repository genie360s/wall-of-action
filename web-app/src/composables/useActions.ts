// src/composables/useActions.ts
import { ref, reactive, type Ref } from 'vue'
import { supabase } from '@/lib/supabase'
import type { ActionRecord } from '@/types/database'

export interface PaginationState {
  currentPage: number
  totalPages: number
  totalCount: number
  pageSize: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export interface UseActionsReturn {
  actions: Ref<ActionRecord[]>
  loading: Ref<boolean>
  error: Ref<string | null>
  pagination: PaginationState
  fetchActions: (page?: number, limit?: number) => Promise<void>
  fetchLatestActions: (limit?: number) => Promise<void>
  refreshActions: () => Promise<void>
}

export function useActions(): UseActionsReturn {
  const actions = ref<ActionRecord[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  const pagination = reactive<PaginationState>({
    currentPage: 1,
    totalPages: 0,
    totalCount: 0,
    pageSize: 20,
    hasNextPage: false,
    hasPreviousPage: false
  })

  /**
   * Fetch actions with pagination
   * @param page - Page number (1-based)
   * @param limit - Number of items per page (default: 20)
   */
  const fetchActions = async (page = 1, limit = 20): Promise<void> => {
    loading.value = true
    error.value = null

    try {
      // First get the total count
      const { count, error: countError } = await supabase
        .from('actions')
        .select('*', { count: 'exact', head: true })

      if (countError) {
        throw countError
      }

      const totalCount = count || 0
      const totalPages = Math.ceil(totalCount / limit)
      const offset = (page - 1) * limit

      // Then get the paginated data
      const { data, error: fetchError } = await supabase
        .from('actions')
        .select('*')
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)

      if (fetchError) {
        throw fetchError
      }

      actions.value = data || []
      
      // Update pagination state
      pagination.currentPage = page
      pagination.totalPages = totalPages
      pagination.totalCount = totalCount
      pagination.pageSize = limit
      pagination.hasNextPage = page < totalPages
      pagination.hasPreviousPage = page > 1

    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch actions'
      console.error('Error fetching actions:', err)
    } finally {
      loading.value = false
    }
  }

  /**
   * Fetch the latest actions (for home page featured section)
   * @param limit - Number of latest actions to fetch (default: 4)
   */
  const fetchLatestActions = async (limit = 4): Promise<void> => {
    loading.value = true
    error.value = null

    try {
      const { data, error: fetchError } = await supabase
        .from('actions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit)

      if (fetchError) {
        throw fetchError
      }

      actions.value = data || []

    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch latest actions'
      console.error('Error fetching latest actions:', err)
    } finally {
      loading.value = false
    }
  }

  /**
   * Refresh current actions data
   */
  const refreshActions = async (): Promise<void> => {
    await fetchActions(pagination.currentPage, pagination.pageSize)
  }

  return {
    actions,
    loading,
    error,
    pagination,
    fetchActions,
    fetchLatestActions,
    refreshActions
  }
}