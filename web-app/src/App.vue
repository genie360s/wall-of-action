<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useStats } from '@/composables/useStats'

// Get statistics data
const { stats, loading, error } = useStats()
</script>

<template>
  
  <div class="container mx-auto w-full flex space-grotesk-font justify-between mb-4 mt-4 "> 
    <div class="xs:ml-0 ml-2"><RouterLink to="/"><img alt="Bowseat logo" class="logo" src="@/assets/bowseat-logo.svg" width="100" height="100" /></RouterLink></div> 
    <div class="xs:text-lg text-sm font-bold"> Wall Of Action </div>
    <div class="text-sm mr-2 xs:mr-0">
      {{ new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).replace(/\//g, '-').replace(',', '') }}
    </div>
  </div>
  <div class="flex  space-grotesk-font container mx-auto w-full text-sm border-b border-t border-blue-800 p-2"> 
    <div class="xs:w-1/3 w-1/5"><div class="p-2 text-sm font-bold hover:text-blue-800"><RouterLink to="/thewall">The Wall</RouterLink></div></div>
    <div class="xs:w-2/3 w-4/5 flex xs:gap-16 gap-4">
      <div class="border border-blue-800 p-2 text-xs xs:text-sm font-medium"> 
        <p class="text-center">Countries 
          <span class="font-bold">
            {{ loading ? '...' : error ? '?' : stats.totalCountries }}
          </span>
        </p> 
      </div>
      <div class="border border-blue-800 p-2 text-xs xs:text-sm font-medium"> 
        <p class="text-center">Actors 
          <span class="font-bold">
            {{ loading ? '...' : error ? '?' : stats.totalActors }}
          </span>
        </p> 
      </div>
      <div class="border border-blue-800 p-2 text-xs xs:text-sm font-medium"> 
        <p class="text-center">Actions 
          <span class="font-bold">
            {{ loading ? '...' : error ? '?' : stats.totalActions }}
          </span>
        </p> 
      </div>
    </div>
  </div>

  <RouterView />
  
</template>
