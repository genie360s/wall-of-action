<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import countriesData from '@/assets/countries.json'

// Form data
const formData = ref({
  name: '',
  country: '',
  voice: ''
})

// Country autocomplete
const countries = ref<string[]>([])
const showSuggestions = ref(false)
const countryInput = ref<HTMLInputElement | null>(null)

// Load countries data
onMounted(() => {
  countries.value = countriesData
})

// Filtered countries based on input
const filteredCountries = computed(() => {
  if (!formData.value.country || formData.value.country.length < 2) {
    return []
  }
  return countries.value.filter(country =>
    country.toLowerCase().includes(formData.value.country.toLowerCase())
  ).slice(0, 5) // Limit to 5 suggestions
})

// Handle country input
const onCountryInput = () => {
  showSuggestions.value = formData.value.country.length >= 2
}

// Select country from suggestions
const selectCountry = (country: string) => {
  formData.value.country = country
  showSuggestions.value = false
}

// Hide suggestions when clicking outside
const hideSuggestions = () => {
  setTimeout(() => {
    showSuggestions.value = false
  }, 200)
}
</script>
<template>
    <div class="mx-auto border border-blue-900 shadow-md rounded-e-sm flex flex-col justify-center w-[40vw]  p-4">
      <div class="w-full mx-auto flex flex-row justify-between mt-4 mb-4 border-b border-gray-400 pb-4">
        <div class="rounded-full border border-gray-400 h-12 w-12 text-gray-400 flex items-center justify-center"><i class="bi bi-camera"></i></div>
        <div class="rounded-full border border-blue-900 text-blue-900  h-12 w-12 flex items-center justify-center"><i class="bi bi-person-fill"></i></div>
        <div class="rounded-full border border-gray-400 text-gray-400 h-12 w-12 flex items-center justify-center"><i class="bi bi-chat-left-text"></i></div>
        <div class="rounded-full border border-gray-400 text-gray-400 h-12 w-12 flex items-center justify-center"><i class="bi bi-check2-all"></i></div>
      </div>
      <div class="w-full  mb-4">
        <p class="text-sm text-blue-900 text-center">Tell Us About Yourself </p>
      </div>
      <div class="w-full flex flex-col items-center mb-4">
        <form action="" method="get" class="flex flex-col gap-4 w-full">
          <div class="flex flex-col w-full">
            <input 
              v-model="formData.name"
              type="text" 
              id="name" 
              name="name" 
              placeholder="Full Name"
              class="border border-gray-400 rounded-sm p-2 w-full focus:outline-none focus:border-blue-900" 
            />
          </div>
          <div class="flex flex-col w-full relative">
            <input 
              ref="countryInput"
              v-model="formData.country"
              @input="onCountryInput"
              @focus="onCountryInput"
              @blur="hideSuggestions"
              type="text" 
              id="country" 
              name="country" 
              placeholder="Start typing your country..."
              class="border border-gray-400 rounded-sm p-2 w-full focus:outline-none focus:border-blue-900" 
              autocomplete="off"
            />
            
            <!-- Country Suggestions Dropdown -->
            <div 
              v-if="showSuggestions && filteredCountries.length > 0"
              class="absolute top-full left-0 right-0 bg-white border border-gray-400 rounded-sm shadow-lg z-10 max-h-40 overflow-y-auto"
            >
              <div
                v-for="country in filteredCountries"
                :key="country"
                @mousedown="selectCountry(country)"
                class="p-2 hover:bg-blue-50 cursor-pointer text-sm border-b border-gray-200 last:border-b-0"
              >
                {{ country }}
              </div>
            </div>
          </div>
          <div class="flex flex-col w-full">
            <select 
              v-model="formData.voice"
              id="voice" 
              name="voice" 
              class="p-2 text-sm border border-gray-400 rounded-sm w-full focus:outline-none focus:border-blue-900"
            >
              <option value="" disabled selected>Select Voice Type</option>
              <option value="air">Air Voice</option>
              <option value="land">Land Voice</option>
              <option value="water">Water Voice</option>
            </select>
          </div>

        </form>
      </div>
      <div class="w-full mb-2 flex justify-between flex-row">
        <div class="w-1/4 bg-blue-900 text-sm text-white font-medium p-2 hover:cursor-pointer">Back <i class="bi bi-arrow-left pl-16"></i></div>
        <div class="w-1/4 bg-blue-900 text-sm text-white font-medium p-2 hover:cursor-pointer">Next <i class="bi bi-arrow-right pl-16"></i></div>
      </div>
    </div>
</template>