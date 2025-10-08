// src/composables/useStats.ts
import { ref, onMounted, type Ref } from 'vue'
import { supabase } from '@/lib/supabase'

export interface StatsData {
  totalCountries: number
  totalActors: number
  totalActions: number
}

export interface UseStatsReturn {
  stats: Ref<StatsData>
  loading: Ref<boolean>
  error: Ref<string | null>
  fetchStats: () => Promise<void>
}

export function useStats(): UseStatsReturn {
  const stats = ref<StatsData>({
    totalCountries: 0,
    totalActors: 0,
    totalActions: 0
  })
  
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchStats = async (): Promise<void> => {
    loading.value = true
    error.value = null

    try {
      // Fetch all actions to calculate statistics
      const { data: actions, error: fetchError } = await supabase
        .from('actions')
        .select('country, name, id')

      if (fetchError) {
        throw fetchError
      }

      if (actions) {
        // Count total actions
        stats.value.totalActions = actions.length

        // Count unique countries
        const uniqueCountries = new Set(
          actions
            .map(action => action.country)
            .filter(country => country && country.trim() !== '')
        )
        stats.value.totalCountries = uniqueCountries.size

        // Count unique actors (by name)
        const uniqueActors = new Set(
          actions
            .map(action => action.name)
            .filter(name => name && name.trim() !== '')
        )
        stats.value.totalActors = uniqueActors.size
      }

    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch statistics'
      console.error('Error fetching statistics:', err)
    } finally {
      loading.value = false
    }
  }

  // Auto-fetch on mount
  onMounted(() => {
    fetchStats()
  })

  return {
    stats,
    loading,
    error,
    fetchStats
  }
}