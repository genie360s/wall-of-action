<script setup lang="ts">
import { ref, computed } from 'vue'

const actionText = ref('')
const maxCharacters = 350

// Computed property for character count
const characterCount = computed(() => actionText.value.length)

// Computed property for remaining characters
const remainingCharacters = computed(() => maxCharacters - characterCount.value)

// Computed property for character count color (warning when close to limit)
const characterCountColor = computed(() => {
  if (remainingCharacters.value <= 10) return 'text-red-500'
  if (remainingCharacters.value <= 50) return 'text-orange-500'
  return 'text-gray-500'
})
</script>

<template>
    <div class="mx-auto border border-blue-900 shadow-md rounded-e-sm flex flex-col justify-center w-[40vw]  p-4">
      <div class="w-full mx-auto flex flex-row justify-between mt-4 mb-4 border-b border-gray-400 pb-4">
        <div class="rounded-full border border-gray-400 text-gray-400 h-12 w-12 flex items-center justify-center"><i class="bi bi-camera"></i></div>
        <div class="rounded-full border border-gray-400 text-gray-400 h-12 w-12 flex items-center justify-center"><i class="bi bi-person-fill"></i></div>
        <div class="rounded-full border border-blue-900 text-blue-900 h-12 w-12 flex items-center justify-center"><i class="bi bi-chat-left-text"></i></div>
        <div class="rounded-full border border-gray-400 text-gray-400 h-12 w-12 flex items-center justify-center"><i class="bi bi-check2-all"></i></div>
      </div>
      <div class="w-full  mb-4">
        <p class="text-sm text-blue-900 text-center font-medium">Share Your Climate Action</p>
      </div>
      <div class="w-full text-sm items-center mb-4">
        <form action="" method="get"> 
          <textarea 
            v-model="actionText"
            name="actionText"
            id="actionText"
            :maxlength="maxCharacters"
            placeholder="Describe your action..." 
            class="border border-gray-400 rounded-sm p-2 w-full focus:outline-none focus:border-blue-900 h-24 resize-none"
          ></textarea>
          <div class="flex justify-between items-center mt-1">
            <div class="text-gray-500 text-xs">Max 350 characters</div>
            <div :class="['text-xs font-medium', characterCountColor]">
              {{ characterCount }}/{{ maxCharacters }}
            </div>
          </div>
        </form>
      </div>
      
      <div class="w-full mb-2 flex justify-between flex-row-reverse">
        <div class="w-1/4 bg-blue-900 text-sm text-white font-medium p-2 hidden hover:cursor-pointer">Back <i class="bi bi-arrow-left"></i></div>
        <div class="w-1/4 bg-blue-900 text-sm text-white font-medium p-2 hover:cursor-pointer">Next <i class="bi bi-arrow-right"></i></div>
      </div>
    </div>
</template>