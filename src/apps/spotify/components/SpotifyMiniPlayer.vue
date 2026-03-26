<template>
  <div class="absolute bottom-2 inset-x-0 z-40 flex justify-center px-4">
    <div
      class="w-full max-w-[450px] cursor-pointer overflow-hidden rounded-xl"
      tabindex="0"
      style="background: rgb(26,8,8);"
    >
      <div class="flex items-center gap-3 px-3 py-2.5">
        <!-- Portada -->
        <div
          class="w-[52px] h-[52px] rounded-sm flex-shrink-0 overflow-hidden shadow-lg"
          style="background: rgb(40,40,40);"
        >
          <img :alt="title" class="w-full h-full object-cover" :src="image" />
        </div>

        <!-- Título y artista -->
        <div class="flex-1 min-w-0">
          <p class="text-white text-[14px] font-semibold truncate leading-tight">{{ title }}</p>
          <p class="text-[12px] truncate mt-0.5" style="color: rgba(255,255,255,0.55);">{{ artist }}</p>
        </div>

        <!-- Controles -->
        <div class="flex items-center gap-5 flex-shrink-0 mr-2">
          <!-- Botón Cast -->
          <button style="color: rgba(255,255,255,0.7);">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <rect x="2" y="7" width="20" height="15" rx="2" />
              <path d="M2 12.5A9 9 0 0 1 11 21.5" />
              <path d="M2 17A4 4 0 0 1 6.5 21" />
              <circle cx="2.5" cy="21.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          </button>

          <!-- Botón Play -->
          <button tabindex="0">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
              fill="white" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="6 3 20 12 6 21 6 3" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Barra de progreso -->
      <div class="w-full" style="height: 3px; background: rgba(255,255,255,0.15);">
        <div
          :style="{ width: `${progress}%`, height: '100%', background: 'rgb(29,185,84)', transition: 'width 1s linear' }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  artist?: string
  image?: string
  progress?: number
}>()
</script>
