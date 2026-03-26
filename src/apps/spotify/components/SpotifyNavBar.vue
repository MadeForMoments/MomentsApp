<template>
  <div
    class="absolute top-[42px] left-0 right-0 z-30 px-4 py-3 flex items-center justify-between transition-all duration-300"
    style="background: transparent; backdrop-filter: none;"
  >
    <!-- Logo Spotify -->
    <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" fill="#1DB954" />
      <path d="M10 26.5 Q20 22 31 24.5" stroke="white" stroke-width="2.7" stroke-linecap="round" fill="none" />
      <path d="M9 21 Q20 15.5 32 19" stroke="white" stroke-width="2.7" stroke-linecap="round" fill="none" />
      <path d="M8 15 Q20 8 33 13" stroke="white" stroke-width="2.7" stroke-linecap="round" fill="none" />
    </svg>

    <!-- Avatar del usuario -->
    <div class="relative">
      <button
        class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black"
        style="background: rgb(29, 185, 84);"
      >
        {{ initials }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  initials?: string
}>()
</script>
