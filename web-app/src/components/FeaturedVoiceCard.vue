<script setup lang="ts">
import type { ActionRecord } from '@/types/database'
import countriesAndFlags from '@/assets/countriesandflags.json'

interface Props {
  action: ActionRecord
  index?: number
}

const props = defineProps<Props>()

// Format date for display
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  })
}

// Get country flag emoji using countriesandflags.json
const getCountryFlag = (country: string) => {
  // The JSON contains an array with one object containing all country-flag mappings
  const countryData = countriesAndFlags[0] as Record<string, string>
  
  if (!countryData || !country) {
    return '🌍'
  }
  
  // Look for exact match first
  if (countryData[country]) {
    return countryData[country]
  }
  
  // If no exact match, try case-insensitive search
  const lowerCountry = country.toLowerCase()
  const foundKey = Object.keys(countryData).find(key => 
    key.toLowerCase() === lowerCountry
  )
  
  if (foundKey && countryData[foundKey]) {
    return countryData[foundKey]
  }
  
  // If still no match, try partial matching for common variations
  const partialMatch = Object.keys(countryData).find(key => 
    key.toLowerCase().includes(lowerCountry) || 
    lowerCountry.includes(key.toLowerCase())
  )
  
  if (partialMatch && countryData[partialMatch]) {
    return countryData[partialMatch]
  }
  
  // Default fallback
  return '🌍'
}
</script>

<template>
    <div class="bg-green-400 h-[425px] w-[300px] border border-blue-800">
        <div class="mx-4 py-1 flex">
          <div class="text-sm font-medium text-left w-1/2">#{{ props.action.id || (props.index ? props.index + 1 : 1) }}</div>
          <div class="text-sm font-medium text-right w-1/2">{{ props.action.country }} {{ getCountryFlag(props.action.country) }}</div>
        </div>
        <div class="mx-4 h-[250px] bg-white flex items-center justify-center overflow-hidden">
          <img 
            v-if="props.action.image" 
            :src="props.action.image" 
            :alt="`Action by ${props.action.name}`"
            class="w-full h-full object-cover"
            @error="(e) => ((e.target as HTMLImageElement).style.display = 'none')"
          />
          <div v-else class="text-gray-500 text-center">
            <i class="bi bi-image text-4xl"></i>
            <p class="mt-2">No Image</p>
          </div>
        </div>
        <div class="mx-4 py-1">
          <p class="text-sm line-clamp-3">
            {{ props.action.actiontext }}
          </p>
        </div>
        <div class="mx-4 py-1 flex">
          <div class="w-1/2"></div>
          <div class="text-sm text-right w-1/2 text-xs">
            {{ props.action.created_at ? formatDate(props.action.created_at) : 'Date unknown' }}
          </div>
        </div>
        <div class="mx-4 py-1 flex">
          <div class="text-sm font-medium text-left w-1/2">{{ props.action.name }}</div>
          <div class="text-sm font-medium text-right w-1/2">{{ props.action.voice }} voice</div>
        </div>
      </div>
</template>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  line-clamp: 3;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}</style>
