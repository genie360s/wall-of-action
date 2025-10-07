<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import FeaturedVoiceCard from '@/components/FeaturedVoiceCard.vue'
import ActionModal from '@/components/ActionModal.vue'
import { useActions } from '@/composables/useActions'

// Modal state
const isModalOpen = ref(false)

// Actions data
const { actions, loading, error, fetchLatestActions } = useActions()

// Modal handlers
const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const handleSubmit = (data: any) => {
  console.log('Action submitted:', data)
  // Here you would typically send the data to your backend
  alert('Thank you! Your action has been submitted successfully.')
  // Refresh the featured actions after submission
  fetchLatestActions(4)
}

// Fetch latest actions on component mount
onMounted(() => {
  fetchLatestActions(4)
})
</script>

<template>
  <main class="container mx-auto space-grotesk-font mt-4">
    <div class="mx-auto w-96">
      <img alt="Bowseat logo" class="logo" src="@/assets/circle-cta.svg" width="400" height="400" />
    </div>
    <div class="flex w-96 mx-auto gap-8 h-[40px]">
      <div class="w-1/2 border border-blue-800 p-2 text-center font-medium hover:text-white hover:bg-gray-500 hover:border-4 hover:border-t hover:border-l hover:border-black cursor-pointer"><RouterLink to="/thewall"><span class="p-2">VISIT THE WALL</span></RouterLink></div>
      <button 
        @click="openModal"
        class="w-1/2 border border-blue-800 p-2 text-center font-medium border border-blue-800 bg-cyan-500 hover:border-4 hover:border-t hover:border-l hover:border-blue-800 cursor-pointer"
      > 
        SHARE YOUR ACTION 
      </button>
    </div>
    <div class="mx-auto mt-12 text-center text-9xl ">
      <p>A healthy Earth means a healthy population. Let’s envision and act.</p>
    </div>
    <div class="flex mx-auto ">
      <button 
        @click="openModal"
        class="w-96 mx-auto p-2 font-medium border border-blue-800 hover:border-4 hover:border-t hover:border-l hover:border-blue-800 mt-16 mb-8 text-center bg-cyan-500 h-[40px] cursor-pointer"
      > 
        SHARE YOUR ACTION TODAY 
      </button>
    </div>
    <div class="mx-auto w-full mt-12 mb-16">
      <h2 class="text-3xl font-bold text-center">Featured Voices</h2>
    </div>
    
    <!-- Loading state -->
    <div v-if="loading" class="mx-auto w-full flex justify-center mb-8">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800 mx-auto mb-4"></div>
        <p>Loading featured voices...</p>
      </div>
    </div>
    
    <!-- Error state -->
    <div v-else-if="error" class="mx-auto w-full flex justify-center mb-8">
      <div class="text-center text-red-600">
        <p>Error loading featured voices: {{ error }}</p>
        <button 
          @click="fetchLatestActions(4)"
          class="mt-2 px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    </div>
    
    <!-- Featured voices -->
    <div v-else class="mx-auto w-full flex justify-between mb-8 gap-4">
      <FeaturedVoiceCard 
        v-for="(action, index) in actions" 
        :key="action.id || index"
        :action="action"
        :index="index"
      />
      
      <!-- Show placeholder cards if less than 4 actions -->
      <div 
        v-for="i in Math.max(0, 4 - actions.length)" 
        :key="`placeholder-${i}`"
        class="bg-gray-200 h-[425px] w-[300px] border border-gray-300 flex items-center justify-center"
      >
        <div class="text-center text-gray-500">
          <i class="bi bi-plus-circle text-4xl mb-2"></i>
          <p>No more actions</p>
        </div>
      </div>
    </div>
    <div class="mb-4 w-full flex flex-row-reverse">
      <RouterLink to="/thewall"><div class="border border-blue-800 px-4 py-2 text-sm hover:bg-cyan-500 hover:text-white hover:border-4 hover:border-t hover:border-l hover:border-blue-800 h-[40px] cursor-pointer">View All</div></RouterLink>
    </div>
    <div class="w-full mb-4 flex flex-col  border-t border-b border-blue-800 py-4 gap-1">
      <div class="w-full">
        <img alt="Bowseat logo" class="logo" src="@/assets/bowseat-logo.svg" width="100" height="100" />
      </div>
      <div class="w-full">
        <p class="text-xs">Creative Action For Conservation</p>
      </div>
      <div class="w-full flex gap-4">
        <div class="text-sm text-gray-500 hover:text-blue-800 cursor-pointer"><i class="bi bi-facebook"></i></div>
        <div class="text-sm text-gray-500 hover:text-blue-800 cursor-pointer"><i class="bi bi-twitter"></i></div>
        <div class="text-sm text-gray-500 hover:text-blue-800 cursor-pointer"><i class="bi bi-instagram"></i></div>
        <div class="text-sm text-gray-500 hover:text-blue-800 cursor-pointer"><i class="bi bi-linkedin"></i></div>
        <div class="text-sm text-gray-500 hover:text-blue-800 cursor-pointer"><i class="bi bi-envelope"></i></div>
        <div class="text-sm text-gray-500 hover:text-blue-800 cursor-pointer"><i class="bi bi-pinterest"></i></div>
      </div>
      <div class="w-full flex gap-8">
        <div class="text-sm text-gray-500 hover:text-blue-800 cursor-pointer"> Terms Of Use</div>
        <div class="text-sm text-gray-500 hover:text-blue-800 cursor-pointer"> Privacy Policy </div>
        <div class="text-sm text-gray-500 hover:text-blue-800 cursor-pointer"> COPPA Privacy Notice </div>
      </div>
    </div>
    <div class="w-full">
      <p class="text-center text-xs text-gray-500">All Copyrights Reserved - &copy; Bowseat 2024</p>
    </div>

    <!-- Action Modal -->
    <ActionModal 
      :isOpen="isModalOpen"
      @close="closeModal"
      @submit="handleSubmit"
    />
  </main>
</template>
