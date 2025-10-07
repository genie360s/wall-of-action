<script setup lang="ts">
</script>

<template>
    <div class="mx-auto border border-blue-900 shadow-md rounded-e-sm flex flex-col justify-center w-[40vw]  p-4">
      <div class="w-full mx-auto flex flex-row justify-between mt-4 mb-4 border-b border-gray-400 pb-4">
        <div class="rounded-full border border-gray-400 text-gray-400 h-12 w-12 flex items-center justify-center"><i class="bi bi-camera"></i></div>
        <div class="rounded-full border border-gray-400 text-gray-400 h-12 w-12 flex items-center justify-center"><i class="bi bi-person-fill"></i></div>
        <div class="rounded-full border border-gray-400 text-gray-400 h-12 w-12 flex items-center justify-center"><i class="bi bi-chat-left-text"></i></div>
        <div class="rounded-full border border-blue-900 text-blue-900 h-12 w-12 flex items-center justify-center"><i class="bi bi-check2-all"></i></div>
      </div>
      <div class="w-full  mb-4">
        <p class="text-sm text-blue-900 text-center"> Review Your Details </p>
      </div>
      <div class="w-full flex flex-col items-center mb-4">
        <div class="rounded-full h-48 w-48 border border-blue-900"></div>
      </div>
      <div class="w-full flex justify-center gap-4 mb-4 border-b border-gray-400 pb-4">
        <form action="" method="get" class="w-full text-sm text-gray-500">
          <div class="mb-4 mt-4 w-full">
            <textarea name="actionText" id="actionText" class="border border-gray-400 rounded-sm p-2  focus:outline-none focus:border-blue-900 h-24 w-full"></textarea>
          </div>
          <div class="mb-4 mt-4 w-full">
            <input id="name" name="name" placeholder="Full Name" type="text" class="border border-gray-400 rounded-sm p-2  focus:outline-none focus:border-blue-900 h-12 w-full">
          </div>
          <div class="mb-4 mt-4 w-full">
            <input id="country" name="country" placeholder="Country Name" type="text" class="border border-gray-400 rounded-sm p-2  focus:outline-none focus:border-blue-900 h-12 w-full">
          </div>
          <div class="mb-4 mt-4 w-full">
            <input id="voice" name="voice" placeholder="Land Voice" type="text" class="border border-gray-400 rounded-sm p-2  focus:outline-none focus:border-blue-900 h-12 w-full">
          </div>
        </form>
      </div>
      <div class="w-full mb-2 flex justify-between ">
        <div class=" bg-blue-900 text-sm text-white font-medium p-2 hover:cursor-pointer">Back <i class="bi bi-arrow-left"></i></div>
        <div class=" bg-blue-900 text-sm text-white font-medium p-2 hover:cursor-pointer"> Confirm & Submit <i class="bi bi-arrow-right"></i></div>
      </div>
    </div>
</template>