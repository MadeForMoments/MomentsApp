<template>
  <div class="flex-shrink-0 bg-gray-100 px-3 py-2">
    <div class="bg-white rounded-full px-3 py-1 flex items-center">
      <svg class="w-3 h-3 text-gray-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd"
          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
          clip-rule="evenodd" />
      </svg>
      <span class="text-xs text-gray-700 truncate">{{ url }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  url?: string
}>()
</script>
