<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import CameraModal from './CameraModal.vue'

interface Props {
  showBack?: boolean
}

interface Emits {
  (e: 'next', data: { image: File | null, imageUrl: string }): void
  (e: 'back'): void
}

const props = withDefaults(defineProps<Props>(), {
  showBack: false
})

const emit = defineEmits<Emits>()

// Image handling
const selectedImage = ref<File | null>(null)
const imageUrl = ref('')
const fileInput = ref<HTMLInputElement | null>(null)

// Modal state
const isCameraModalOpen = ref(false)

// Handle file upload
const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (file) {
    selectedImage.value = file
    imageUrl.value = URL.createObjectURL(file)
  }
}

// Open camera modal
const openCameraModal = () => {
  isCameraModalOpen.value = true
}

// Close camera modal
const closeCameraModal = () => {
  isCameraModalOpen.value = false
}

// Handle camera capture from modal
const handleCameraCapture = (imageData: string) => {
  // Convert base64 to blob and then to file
  fetch(imageData)
    .then(res => res.blob())
    .then(blob => {
      selectedImage.value = new File([blob], 'captured-photo.jpg', { type: 'image/jpeg' })
      imageUrl.value = imageData
    })
    .catch(console.error)
}

// Navigation handlers
const handleNext = () => {
  if (!selectedImage.value) {
    alert('Please capture or upload an image before proceeding.')
    return
  }
  
  emit('next', {
    image: selectedImage.value,
    imageUrl: imageUrl.value
  })
}

const handleBack = () => {
  emit('back')
}

// Cleanup on unmount
const cleanup = () => {
  if (imageUrl.value) {
    URL.revokeObjectURL(imageUrl.value)
  }
}

// Cleanup when component unmounts
onUnmounted(cleanup)

// Expose cleanup for parent component
defineExpose({ cleanup })
</script>

<template>
    <div class="mx-auto border border-blue-900 shadow-md rounded-e-sm flex flex-col justify-center w-full p-4">
      <div class="w-full mx-auto flex flex-row justify-between mt-4 mb-4 border-b border-gray-400 pb-4">
        <div class="rounded-full border border-blue-900 text-blue-900 h-12 w-12 flex items-center justify-center"><i class="bi bi-camera"></i></div>
        <div class="rounded-full border border-gray-400 text-gray-400 h-12 w-12 flex items-center justify-center"><i class="bi bi-person-fill"></i></div>
        <div class="rounded-full border border-gray-400 text-gray-400 h-12 w-12 flex items-center justify-center"><i class="bi bi-chat-left-text"></i></div>
        <div class="rounded-full border border-gray-400 text-gray-400 h-12 w-12 flex items-center justify-center"><i class="bi bi-check2-all"></i></div>
      </div>
      
      <div class="w-full mb-4">
        <p class="text-sm text-blue-900 text-center">Capture Your Action Vibe Here <span class="h-12 w-12 border-blue-800 p-2"><i class="bi bi-camera"></i></span></p>
      </div>
      
      <!-- Image/Camera Display Area -->
      <div class="w-full flex flex-col items-center mb-4">
        <div class="relative rounded-full h-48 w-48 border border-blue-900 overflow-hidden bg-gray-50 flex items-center justify-center">
          <!-- Selected Image Preview -->
          <img 
            v-if="imageUrl" 
            :src="imageUrl" 
            alt="Captured action" 
            class="w-full h-full object-cover"
          />
          
          <!-- Placeholder when no image -->
          <div v-else class="text-gray-400 text-center">
            <i class="bi bi-camera text-4xl mb-2"></i>
            <p class="text-sm">No image selected</p>
          </div>
        </div>
      </div>
      
      <!-- Action Buttons -->
      <div class="w-full flex justify-center gap-4 mb-4 border-b border-gray-400 pb-4">
        <button 
          @click="openCameraModal"
          class="p-2 w-1/2 text-sm font-medium bg-blue-900 text-white rounded-sm flex items-center justify-center hover:cursor-pointer hover:bg-blue-800 transition-colors"
        >
          Use Camera
          <i class="bi bi-camera px-4"></i>
        </button>
        
        <label class="p-2 w-1/2 text-sm font-medium bg-gray-600 text-white rounded-sm flex items-center justify-center hover:cursor-pointer hover:bg-gray-700 transition-colors">
          Upload Image 
          <i class="bi bi-upload px-4"></i>
          <input 
            ref="fileInput"
            type="file" 
            accept="image/*" 
            @change="handleImageUpload"
            class="hidden"
          />
        </label>
      </div>
      
      <!-- Navigation Buttons -->
      <div class="w-full mb-2 flex justify-between flex-row">
        <button 
          v-if="showBack"
          @click="handleBack"
          class="w-1/4 bg-gray-500 text-sm text-white font-medium p-2 hover:cursor-pointer hover:bg-gray-600 transition-colors"
        >
          Back <i class="bi bi-arrow-left pl-2"></i>
        </button>
        <div v-else class="w-1/4"></div>
        
        <button 
          @click="handleNext"
          class="w-1/4 bg-blue-900 text-sm text-white font-medium p-2 hover:cursor-pointer hover:bg-blue-800 transition-colors"
        >
          Next <i class="bi bi-arrow-right pl-2"></i>
        </button>
      </div>
    </div>

    <!-- Camera Modal -->
    <CameraModal 
      :isOpen="isCameraModalOpen"
      @close="closeCameraModal"
      @capture="handleCameraCapture"
    />
</template>