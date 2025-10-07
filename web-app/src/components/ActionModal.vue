<script setup lang="ts">
import { ref, computed } from 'vue'
import CaptureActionCard from './CaptureActionCard.vue'
import AboutCard from './AboutCard.vue'
import ShareActionCard from './ShareActionCard.vue'
import ReviewCard from './ReviewCard.vue'

interface Props {
  isOpen: boolean
}

interface Emits {
  (e: 'close'): void
  (e: 'submit', data: any): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Modal state management
const currentStep = ref(1)
const totalSteps = 4

// Data collection from each step
const modalData = ref({
  image: null as File | null,
  imageUrl: '',
  name: '',
  country: '',
  voice: '',
  actionDescription: ''
})

// Step navigation
const nextStep = () => {
  if (currentStep.value < totalSteps) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const closeModal = () => {
  // Reset modal state
  currentStep.value = 1
  modalData.value = {
    image: null,
    imageUrl: '',
    name: '',
    country: '',
    voice: '',
    actionDescription: ''
  }
  emit('close')
}

// Handle data updates from child components
const updateCaptureData = (data: { image: File | null, imageUrl: string }) => {
  modalData.value.image = data.image
  modalData.value.imageUrl = data.imageUrl
  console.log('Image captured:', { hasFile: !!data.image, imageUrl: data.imageUrl })
  nextStep()
}

const updateAboutData = (data: { name: string, country: string, voice: string }) => {
  modalData.value.name = data.name
  modalData.value.country = data.country
  modalData.value.voice = data.voice
  nextStep()
}

const updateActionData = (data: { actionDescription: string }) => {
  modalData.value.actionDescription = data.actionDescription
  nextStep()
}

const submitAction = () => {
  emit('submit', modalData.value)
  closeModal()
}

// Computed properties
const currentComponent = computed(() => {
  switch (currentStep.value) {
    case 1: return 'CaptureActionCard'
    case 2: return 'AboutCard'
    case 3: return 'ShareActionCard'
    case 4: return 'ReviewCard'
    default: return 'CaptureActionCard'
  }
})

const stepTitle = computed(() => {
  switch (currentStep.value) {
    case 1: return 'Capture Your Action'
    case 2: return 'Tell Us About Yourself'
    case 3: return 'Share Your Climate Action'
    case 4: return 'Review & Submit'
    default: return 'Capture Your Action'
  }
})
</script>

<template>
  <!-- Modal Overlay -->
  <div 
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center p-4"
    @click.self="closeModal"
  >
    <!-- Blur Background -->
    <div class="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
    
    <!-- Modal Content -->
    <div class="relative z-10 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <!-- Modal Header -->
      <div class="bg-white rounded-t-lg p-4 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold text-blue-900">{{ stepTitle }}</h2>
          <button 
            @click="closeModal"
            class="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>
        
        <!-- Progress Indicator -->
        <div class="mt-4">
          <div class="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Step {{ currentStep }} of {{ totalSteps }}</span>
            <span>{{ Math.round((currentStep / totalSteps) * 100) }}% Complete</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div 
              class="bg-blue-600 h-2 rounded-full transition-all duration-300"
              :style="`width: ${(currentStep / totalSteps) * 100}%`"
            ></div>
          </div>
        </div>
      </div>

      <!-- Modal Body -->
      <div class="bg-white">
        <!-- Step 1: Capture Action Card -->
        <CaptureActionCard 
          v-if="currentStep === 1"
          @next="updateCaptureData"
          @back="prevStep"
          :showBack="false"
        />
        
        <!-- Step 2: About Card -->
        <AboutCard 
          v-if="currentStep === 2"
          @next="updateAboutData"
          @back="prevStep"
          :showBack="true"
          :initialData="{ name: modalData.name, country: modalData.country, voice: modalData.voice }"
        />
        
        <!-- Step 3: Share Action Card -->
        <ShareActionCard 
          v-if="currentStep === 3"
          @next="updateActionData"
          @back="prevStep"
          :showBack="true"
          :initialData="{ actionDescription: modalData.actionDescription }"
        />
        
        <!-- Step 4: Review Card -->
        <ReviewCard 
          v-if="currentStep === 4"
          @submit="submitAction"
          @back="prevStep"
          :data="modalData"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Ensure modal appears above other content */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

/* Smooth transitions */
.transition-all {
  transition: all 0.3s ease-in-out;
}

/* Custom scrollbar for modal content */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>