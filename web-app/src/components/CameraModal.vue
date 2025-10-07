<script setup lang="ts">
import { ref } from 'vue'
import { WebCam } from 'vue-camera-lib'

interface Props {
  isOpen: boolean
}

interface Emits {
  (e: 'close'): void
  (e: 'capture', imageData: string): void
}

interface PhotoData {
  blob: Blob
  image_data_url: string
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Camera state
const webcamRef = ref<any>(null)
const capturedImage = ref<string | null>(null)
const error = ref('')

// Handle photo taken from camera
const handlePhotoTaken = (data: PhotoData) => {
  console.log('Photo taken:', data)
  capturedImage.value = data.image_data_url
}

// Handle camera errors
const handleError = (message: string) => {
  console.error('Camera error:', message)
  error.value = message
}

// Handle camera init
const handleInit = () => {
  console.log('Camera initialized')
}

// Take photo manually
const takePhoto = async () => {
  if (webcamRef.value) {
    try {
      await webcamRef.value.takePhoto()
    } catch (err) {
      console.error('Error taking photo:', err)
      error.value = 'Failed to take photo'
    }
  }
}

// Retake photo
const retakePhoto = () => {
  capturedImage.value = null
}

// Confirm and use photo
const confirmPhoto = () => {
  if (capturedImage.value) {
    emit('capture', capturedImage.value)
    closeModal()
  }
}

// Close modal
const closeModal = () => {
  cleanup()
  emit('close')
}

// Cleanup function
const cleanup = () => {
  if (webcamRef.value) {
    webcamRef.value.stop()
  }
  capturedImage.value = null
  error.value = ''
}
</script>

<template>
  <!-- Modal Overlay -->
  <div 
    v-if="isOpen" 
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    @click.self="closeModal"
  >
    <!-- Modal Content -->
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
      <!-- Modal Header -->
      <div class="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Take Photo</h3>
        <button 
          @click="closeModal"
          class="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <i class="bi bi-x-lg text-xl"></i>
        </button>
      </div>

      <!-- Modal Body -->
      <div class="p-6">
        <!-- Error State -->
        <div v-if="error" class="text-center p-8">
          <i class="bi bi-exclamation-triangle text-red-500 text-4xl mb-4"></i>
          <p class="text-red-600 mb-4 font-medium">{{ error }}</p>
          <p class="text-gray-500 text-sm">Please allow camera permissions or use the upload option instead.</p>
          <button 
            @click="closeModal"
            class="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
          >
            Close
          </button>
        </div>

        <!-- Camera Interface -->
        <div v-else class="space-y-6">
          <!-- Preview Section -->
          <div class="relative w-full max-w-sm mx-auto">
            <!-- Captured Image Preview -->
            <img
              v-if="capturedImage"
              :src="capturedImage"
              alt="Captured photo"
              class="w-full aspect-square object-cover rounded-xl border-2 border-blue-500"
            />

            <!-- Live Camera Feed -->
            <div v-else class="relative">
              <WebCam
                ref="webcamRef"
                :autoStart="true"
                :constraints="{ 
                  video: { 
                    width: { ideal: 640 }, 
                    height: { ideal: 640 }, 
                    facingMode: 'user' 
                  } 
                }"
                :classList="'w-full aspect-square object-cover rounded-xl border-2 border-blue-500'"
                :audio="false"
                :shutterEffect="true"
                @photoTaken="handlePhotoTaken"
                @error="handleError"
                @init="handleInit"
              />
              <!-- Camera overlay -->
              <div class="absolute inset-0 rounded-xl border-2 border-blue-500 pointer-events-none">
                <div class="absolute inset-4 border border-white border-opacity-50 rounded-lg"></div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-center space-x-4">
            <!-- When showing live camera feed -->
            <template v-if="!capturedImage && !error">
              <button
                @click="takePhoto"
                class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <i class="bi bi-camera mr-2"></i>
                Capture
              </button>
              <button
                @click="closeModal"
                class="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </template>

            <!-- When showing captured image -->
            <template v-if="capturedImage">
              <button
                @click="confirmPhoto"
                class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center"
              >
                <i class="bi bi-check2 mr-2"></i>
                Use This Photo
              </button>
              <button
                @click="retakePhoto"
                class="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors flex items-center"
              >
                <i class="bi bi-arrow-clockwise mr-2"></i>
                Retake
              </button>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>