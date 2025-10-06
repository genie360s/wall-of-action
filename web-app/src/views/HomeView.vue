<script setup lang="ts">
import FeaturedVoicecard from '@/components/FeaturedVoicecard.vue';
</script>

<template>
  <main class="container mx-auto space-grotesk-font mt-4">
    <div class="mx-auto w-96">
      <img alt="Bowseat logo" class="logo" src="@/assets/circle-cta.svg" width="400" height="400" />
    </div>
    <div class="flex w-96 mx-auto gap-8 h-[40px]">
      <div class="w-1/2 border border-blue-800 p-2 text-center font-medium hover:text-white hover:bg-gray-500 hover:border-4 hover:border-t hover:border-l hover:border-black cursor-pointer"><RouterLink to="/thewall"><span class="p-2">VISIT THE WALL</span></RouterLink></div>
      <div class="w-1/2 border border-blue-800 p-2 text-center font-medium border border-blue-800 bg-cyan-500 hover:border-4 hover:border-t hover:border-l hover:border-blue-800 cursor-pointer"> SHARE YOUR ACTION </div>
    </div>
    <div class="mx-auto mt-12 text-center text-9xl ">
      <p>A healthy Earth means a healthy population. Let’s envision and act.</p>
    </div>
    <div class="flex mx-auto ">
      <div class="w-96 mx-auto p-2 font-medium border border-blue-800 hover:border-4 hover:border-t hover:border-l hover:border-blue-800 mt-16 mb-8 text-center bg-cyan-500 h-[40px] cursor-pointer"> SHARE YOUR ACTION TODAY </div>
    </div>
    <div class="mx-auto w-full mt-12 mb-16">
      <h2 class="text-3xl font-bold text-center">Featured Voices</h2>
    </div>
    <div class="mx-auto w-full flex gap-8 mb-8">
      <FeaturedVoicecard />
      <FeaturedVoicecard />
      <FeaturedVoicecard />
      <FeaturedVoicecard />
    </div>
    <div class="mb-4 w-full flex flex-row-reverse">
      <div class="border border-blue-800 px-4 py-2 text-sm hover:bg-cyan-500 hover:text-white hover:border-4 hover:border-t hover:border-l hover:border-blue-800 h-[40px] cursor-pointer">View All</div>
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
  </main>
</template>
