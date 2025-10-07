<script setup lang="ts">
</script>

<template>
    <div class="mx-auto border border-blue-900 shadow-md rounded-e-sm flex flex-col justify-center w-[40vw]  p-4">
      <div class="w-full mx-auto flex flex-row justify-between mt-4 mb-4 border-b border-gray-400 pb-4">
        <div class="rounded-full border border-blue-900 text-blue-900 h-12 w-12 flex items-center justify-center"><i class="bi bi-camera"></i></div>
        <div class="rounded-full border border-gray-400 text-gray-400 h-12 w-12 flex items-center justify-center"><i class="bi bi-person-fill"></i></div>
        <div class="rounded-full border border-gray-400 text-gray-400 h-12 w-12 flex items-center justify-center"><i class="bi bi-chat-left-text"></i></div>
        <div class="rounded-full border border-gray-400 text-gray-400 h-12 w-12 flex items-center justify-center"><i class="bi bi-check2-all"></i></div>
      </div>
      <div class="w-full  mb-4">
        <p class="text-sm text-blue-900 text-center">Capture Your Action Vibe Here <span class="h-12 w-12 border-blue-800 p-2"><i class="bi bi-camera"></i></span> </p>
      </div>
      <div class="w-full flex flex-col items-center mb-4">
        <div class="rounded-full h-48 w-48 border border-blue-900"></div>
      </div>
      <div class="w-full flex justify-center gap-4 mb-4 border-b border-gray-400 pb-4">
        <div class="p-2 w-1/2 text-sm font-medium bg-blue-900 text-white rounded-sm flex items-center justify-center hover:cursor-pointer"> Use Camera <i class="bi bi-camera px-4"></i></div>
        <div class="p-2 w-1/2 text-sm font-medium bg-gray-600 text-white rounded-sm flex items-center justify-center hover:cursor-pointer">Upload Image <i class="bi bi-upload px-4"></i></div>
      </div>
      <div class="w-full mb-2 flex justify-between flex">
        <div class="w-1/4 bg-blue-900 text-sm text-white font-medium p-2 hidden hover:cursor-pointer">Back <i class="bi bi-arrow-left"></i></div>
        <div class="w-1/4 bg-blue-900 text-sm text-white font-medium p-2 hover:cursor-pointer">Next <i class="bi bi-arrow-right"></i></div>
      </div>
    </div>
</template>