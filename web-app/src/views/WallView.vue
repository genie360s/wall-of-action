<script setup lang="ts">
import { onMounted, computed } from 'vue'
import FeaturedVoiceCard from '@/components/FeaturedVoiceCard.vue'
import { useActions } from '@/composables/useActions'

const { actions, loading, error, pagination, fetchActions } = useActions()

// Computed properties for pagination
const currentPage = computed(() => pagination.currentPage)
const totalPages = computed(() => pagination.totalPages)
const hasNextPage = computed(() => pagination.hasNextPage)
const hasPreviousPage = computed(() => pagination.hasPreviousPage)

// Pagination handlers
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    fetchActions(page, 20)
  }
}

const nextPage = () => {
  if (hasNextPage.value) {
    goToPage(currentPage.value + 1)
  }
}

const previousPage = () => {
  if (hasPreviousPage.value) {
    goToPage(currentPage.value - 1)
  }
}

// Generate page numbers for pagination
const pageNumbers = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value
  
  if (total <= 7) {
    // Show all pages if 7 or fewer
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    // Show smart pagination
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i)
      pages.push('...')
      pages.push(total)
    } else if (current >= total - 3) {
      pages.push(1)
      pages.push('...')
      for (let i = total - 4; i <= total; i++) pages.push(i)
    } else {
      pages.push(1)
      pages.push('...')
      for (let i = current - 1; i <= current + 1; i++) pages.push(i)
      pages.push('...')
      pages.push(total)
    }
  }
  
  return pages
})

// Fetch actions on component mount
onMounted(() => {
  fetchActions(1, 20)
})
</script>

<template>
  <main class="container mx-auto space-grotesk-font mt-4">
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-center mb-4">The Wall of Action</h1>
      <p class="text-center text-gray-600">
        Discover inspiring environmental actions from voices around the world
      </p>
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="flex justify-center items-center py-16">
      <div class="text-center">
        <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-800 mx-auto mb-4"></div>
        <p class="text-lg">Loading actions...</p>
      </div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="flex justify-center items-center py-16">
      <div class="text-center text-red-600">
        <i class="bi bi-exclamation-triangle text-4xl mb-4"></i>
        <p class="text-lg mb-4">Error loading actions: {{ error }}</p>
        <button 
          @click="fetchActions(1, 20)"
          class="px-6 py-3 bg-blue-800 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>

    <!-- Actions Grid -->
    <div v-else>
      <!-- Stats -->
      <div v-if="pagination.totalCount > 0" class="mb-6 text-center">
        <p class="text-sm text-gray-600">
          Showing {{ (currentPage - 1) * 20 + 1 }} - {{ Math.min(currentPage * 20, pagination.totalCount) }} 
          of {{ pagination.totalCount }} actions
        </p>
      </div>

      <!-- No actions message -->
      <div v-if="actions.length === 0" class="text-center py-16">
        <i class="bi bi-inbox text-6xl text-gray-400 mb-4"></i>
        <h3 class="text-2xl font-semibold text-gray-600 mb-2">No Actions Yet</h3>
        <p class="text-gray-500 mb-6">Be the first to share your environmental action!</p>
        <button class="px-6 py-3 bg-cyan-500 text-white rounded hover:bg-cyan-600 transition-colors">
          Share Your Action
        </button>
      </div>

      <!-- Actions Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        <FeaturedVoiceCard 
          v-for="(action, index) in actions" 
          :key="action.id || index"
          :action="action"
          :index="(currentPage - 1) * 20 + index"
        />
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex justify-center items-center space-x-2 py-8">
        <!-- Previous button -->
        <button
          @click="previousPage"
          :disabled="!hasPreviousPage"
          :class="[
            'px-3 py-2 rounded text-sm font-medium transition-colors',
            hasPreviousPage 
              ? 'bg-blue-800 text-white hover:bg-blue-700' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          ]"
        >
          <i class="bi bi-chevron-left"></i>
          Previous
        </button>

        <!-- Page numbers -->
        <template v-for="page in pageNumbers" :key="page">
          <button
            v-if="typeof page === 'number'"
            @click="goToPage(page)"
            :class="[
              'px-3 py-2 rounded text-sm font-medium transition-colors',
              page === currentPage
                ? 'bg-blue-800 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            ]"
          >
            {{ page }}
          </button>
          <span v-else class="px-2 py-2 text-gray-500">...</span>
        </template>

        <!-- Next button -->
        <button
          @click="nextPage"
          :disabled="!hasNextPage"
          :class="[
            'px-3 py-2 rounded text-sm font-medium transition-colors',
            hasNextPage 
              ? 'bg-blue-800 text-white hover:bg-blue-700' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          ]"
        >
          Next
          <i class="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>
  </main>
</template>


