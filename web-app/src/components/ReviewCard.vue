<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

interface Props {
  data: {
    image: File | null
    imageUrl: string
    name: string
    country: string
    voice: string
    actionDescription: string
  }
}

interface Emits {
  (e: 'submit'): void
  (e: 'back'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Reactive reference for the image URL from localStorage
const storedImageUrl = ref<string>('')

// Get image from localStorage
const getStoredImage = () => {
  try {
    const base64Image = localStorage.getItem('wall-action-image')
    if (base64Image) {
      storedImageUrl.value = base64Image
      console.log('Retrieved image from localStorage')
    }
  } catch (error) {
    console.error('Failed to retrieve image from localStorage:', error)
  }
}

// Create a computed property for the image URL with multiple fallbacks
const displayImageUrl = computed(() => {
  // Priority 1: Image from localStorage
  if (storedImageUrl.value) {
    return storedImageUrl.value
  }
  
  // Priority 2: Original imageUrl from props  
  if (props.data.imageUrl && props.data.imageUrl.length > 0) {
    return props.data.imageUrl
  }
  
  // Priority 3: Create new blob URL from File if available
  if (props.data.image) {
    return URL.createObjectURL(props.data.image)
  }
  
  return ''
})

// Debug logging
onMounted(() => {
  getStoredImage()
  console.log('ReviewCard data:', {
    hasImage: !!props.data.image,
    hasImageUrl: !!props.data.imageUrl,
    imageUrlLength: props.data.imageUrl?.length || 0,
    hasStoredImage: !!storedImageUrl.value,
    displayImageUrl: displayImageUrl.value ? 'Available' : 'Not available'
  })
})

// Navigation handlers
const handleSubmit = () => {
  emit('submit')
}

const handleBack = () => {
  emit('back')
}

// Get voice type display name
const getVoiceTypeName = (voice: string) => {
  switch (voice) {
    case 'air': return 'Air Voice'
    case 'land': return 'Land Voice'
    case 'water': return 'Water Voice'
    default: return voice
  }
}
</script>

<template>
  <div class="mx-auto border border-blue-900 shadow-md rounded-e-sm flex flex-col justify-center w-full p-4">
    <div class="w-full mx-auto flex flex-row justify-between mt-4 mb-4 border-b border-gray-400 pb-4">
      <div class="rounded-full border border-gray-400 text-gray-400 h-12 w-12 flex items-center justify-center"><i class="bi bi-camera"></i></div>
      <div class="rounded-full border border-gray-400 text-gray-400 h-12 w-12 flex items-center justify-center"><i class="bi bi-person-fill"></i></div>
      <div class="rounded-full border border-gray-400 text-gray-400 h-12 w-12 flex items-center justify-center"><i class="bi bi-chat-left-text"></i></div>
      <div class="rounded-full border border-blue-900 text-blue-900 h-12 w-12 flex items-center justify-center"><i class="bi bi-check2-all"></i></div>
    </div>
    
    <div class="w-full mb-4">
      <p class="text-sm text-blue-900 text-center font-medium">Review Your Action</p>
    </div>
    
    <!-- Review Content -->
    <div class="w-full space-y-6 mb-6">
      <!-- Image Preview -->
      <div class="flex flex-col items-center">
        <h3 class="text-sm font-semibold text-gray-700 mb-2">Your Action Image</h3>
        <div class="relative rounded-full h-32 w-32 border border-blue-900 overflow-hidden bg-gray-50 flex items-center justify-center">
          <img 
            v-if="displayImageUrl" 
            :src="displayImageUrl" 
            alt="Your action" 
            class="w-full h-full object-cover"
            @error="(event) => {
              console.error('Image failed to load:', event);
              console.log('Failed URL:', displayImageUrl);
            }"
            @load="() => console.log('Image loaded successfully:', displayImageUrl)"
          />
          <div v-else class="text-gray-400 text-center">
            <i class="bi bi-camera text-2xl mb-1"></i>
            <p class="text-xs">No image</p>
            <p class="text-xs mt-1" v-if="data.image">File available but no URL</p>
          </div>
        </div>
      </div>
      
      <!-- Personal Information -->
      <div class="bg-gray-50 rounded-lg p-4">
        <h3 class="text-sm font-semibold text-gray-700 mb-3">Personal Information</h3>
        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <span class="text-gray-600">Name:</span>
            <span class="font-medium">{{ data.name || 'Not provided' }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Country:</span>
            <span class="font-medium">{{ data.country || 'Not provided' }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Voice Type:</span>
            <span class="font-medium">{{ data.voice ? getVoiceTypeName(data.voice) : 'Not selected' }}</span>
          </div>
        </div>
      </div>
      
      <!-- Action Description -->
      <div class="bg-gray-50 rounded-lg p-4">
        <h3 class="text-sm font-semibold text-gray-700 mb-3">Your Climate Action</h3>
        <div class="text-sm text-gray-800 bg-white rounded border p-3 min-h-[80px]">
          {{ data.actionDescription || 'No description provided' }}
        </div>
        <div class="text-xs text-gray-500 mt-2">
          {{ data.actionDescription ? data.actionDescription.length : 0 }}/350 characters
        </div>
      </div>
    </div>
    
    <!-- Submission Notice -->
    <div class="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
      <div class="flex items-start">
        <i class="bi bi-info-circle text-blue-600 mr-2 mt-0.5"></i>
        <div class="text-xs text-blue-800">
          <p class="font-medium mb-1">Ready to submit?</p>
          <p>Your action will be reviewed and published on the Wall of Action to inspire others in the climate movement.</p>
        </div>
      </div>
    </div>
    
    <!-- Navigation Buttons -->
    <div class="w-full mb-2 flex justify-between flex-row">
      <button 
        @click="handleBack"
        class="w-1/4 bg-gray-500 text-sm text-white font-medium p-2 hover:cursor-pointer hover:bg-gray-600 transition-colors"
      >
        Back <i class="bi bi-arrow-left pl-2"></i>
      </button>
      
      <button 
        @click="handleSubmit"
        class="w-1/3 bg-green-600 text-sm text-white font-medium p-2 hover:cursor-pointer hover:bg-green-700 transition-colors"
      >
        <i class="bi bi-check-circle mr-2"></i>
        Submit Action
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Ensure consistent styling */
.space-y-6 > * + * {
  margin-top: 1.5rem;
}

.space-y-2 > * + * {
  margin-top: 0.5rem;
}
</style>