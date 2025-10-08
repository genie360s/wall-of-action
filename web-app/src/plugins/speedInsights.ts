// src/plugins/speedInsights.ts
// Note: @vercel/speed-insights package is already installed

export function initializeSpeedInsights() {
  // Only initialize in production or on Vercel
  if (import.meta.env.PROD || import.meta.env.VITE_VERCEL_ENV) {
    // Dynamic import to avoid build errors and use correct export
    import('@vercel/speed-insights').then(({ injectSpeedInsights }) => {
      injectSpeedInsights()
    }).catch((error) => {
      console.log('Speed Insights not available:', error)
    })
  }
}

// Vue plugin
export default {
  install() {
    initializeSpeedInsights()
  }
}