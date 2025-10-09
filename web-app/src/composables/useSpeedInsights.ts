// src/composables/useSpeedInsights.ts
import { onMounted } from 'vue'

export function useSpeedInsights() {
  const initSpeedInsights = async () => {
    // Only initialize in production or on Vercel
    if (import.meta.env.PROD || import.meta.env.VITE_VERCEL_ENV) {
      try {
        // Use the proper @vercel/speed-insights package
        const { injectSpeedInsights } = await import('@vercel/speed-insights')
        injectSpeedInsights()
      } catch (error) {
        console.log('Speed Insights not available:', error)
      }
    }
  }

  // Initialize on mount
  onMounted(() => {
    initSpeedInsights()
  })

  return {
    initSpeedInsights
  }
}

// Note: This composable is optional since Speed Insights is already initialized 
// globally in main.ts via the plugin. Use this only if you need manual control
// in specific components.