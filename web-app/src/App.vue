<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="container mx-auto flex space-grotesk-font justify-between mb-4 mt-4"> 
    <div><RouterLink to="/"><img alt="Bowseat logo" class="logo" src="@/assets/bowseat-logo.svg" width="100" height="100" /></RouterLink></div> 
    <div class="text-lg font-bold"> Wall Of Action </div>
    <div class="text-sm">
      {{ new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).replace(/\//g, '-').replace(',', '') }}
    </div>
  </div>
  <div class="flex space-grotesk-font container mx-auto w-full text-sm border-b border-t border-blue-800 p-2"> 
    <div class="w-1/3"><div class="p-2 text-sm font-bold hover:text-blue-800"><RouterLink to="/thewall">The Wall</RouterLink></div></div>
    <div class="flex gap-16 w-2/3">
      <div class="border border-blue-800 p-2  text-sm font-medium"> <p class="mx-auto">Countries <span class="font-bold">89</span></p> </div>
      <div class="border border-blue-800 p-2  text-sm font-medium"> <p class="mx-auto">Actors <span class="font-bold">89</span></p> </div>
      <div class="border border-blue-800 p-2  text-sm font-medium"> <p class="mx-auto">Actions <span class="font-bold">89</span></p> </div>
    </div>
  </div>

  <RouterView />
</template>
