<template>
  <div class="absolute bottom-2 inset-x-0 z-40 flex justify-center px-4">
    <div
      class="w-full max-w-[450px] cursor-pointer overflow-hidden rounded-xl transition-colors duration-700"
      tabindex="0"
      :style="{ background: ambientColor }"
    >
      <div class="flex items-center gap-3 px-3 py-2.5">
        <!-- Portada -->
        <div
          class="w-[52px] h-[52px] rounded-sm flex-shrink-0 overflow-hidden shadow-lg"
          style="background: rgb(40, 40, 40)"
        >
          <img
            ref="artRef"
            :alt="store.currentTrack?.title"
            class="w-full h-full object-cover"
            :src="store.currentTrack?.image"
            crossorigin="anonymous"
          />
        </div>

        <!-- Título y artista -->
        <div class="flex-1 min-w-0">
          <p class="text-white text-[14px] font-semibold truncate leading-tight">
            {{ store.currentTrack?.title }}
          </p>
          <p class="text-[12px] truncate mt-0.5" style="color: rgba(255, 255, 255, 0.55)">
            {{ store.currentTrack?.artist }}
          </p>
        </div>

        <!-- Controles -->
        <div class="flex items-center gap-5 flex-shrink-0 mr-2">
          <!-- Botón Cast (decorativo) -->
          <button style="color: rgba(255, 255, 255, 0.7)">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <rect x="2" y="7" width="20" height="15" rx="2" />
              <path d="M2 12.5A9 9 0 0 1 11 21.5" />
              <path d="M2 17A4 4 0 0 1 6.5 21" />
              <circle cx="2.5" cy="21.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          </button>

          <!-- Botón Play / Pause -->
          <button tabindex="0" @click.stop="store.toggle()">
            <!-- Pause icon -->
            <svg
              v-if="store.isPlaying"
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="white"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
            >
              <line x1="6" y1="4" x2="6" y2="20" />
              <line x1="18" y1="4" x2="18" y2="20" />
            </svg>
            <!-- Play icon -->
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="white"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polygon points="6 3 20 12 6 21 6 3" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Barra de progreso -->
      <div class="w-full" style="height: 3px; background: rgba(255, 255, 255, 0.15)">
        <div
          :style="{
            width: `${store.progress}%`,
            height: '100%',
            background: 'rgb(29,185,84)',
            transition: 'width 0.5s linear',
          }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { usePlayerStore } from '@/stores/playerStore'

const store = usePlayerStore()
const artRef = ref<HTMLImageElement>()
const ambientColor = ref('rgb(26,8,8)')

function extractColor(img: HTMLImageElement) {
  try {
    const canvas = document.createElement('canvas')
    canvas.width = 4
    canvas.height = 4
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.drawImage(img, 0, 0, 4, 4)
    const d = ctx.getImageData(0, 0, 4, 4).data
    let r = 0,
      g = 0,
      b = 0
    for (let i = 0; i < d.length; i += 4) {
      r += d[i]
      g += d[i + 1]
      b += d[i + 2]
    }
    const n = d.length / 4
    // Darken the average color for the background
    ambientColor.value = `rgb(${Math.floor((r / n) * 0.45)},${Math.floor((g / n) * 0.45)},${Math.floor((b / n) * 0.45)})`
  } catch {
    ambientColor.value = 'rgb(26,8,8)'
  }
}

watch(
  () => store.currentTrack?.image,
  () => {
    const img = artRef.value
    if (!img) return
    if (img.complete && img.naturalWidth) {
      extractColor(img)
    } else {
      img.onload = () => extractColor(img)
    }
  },
  { immediate: true },
)
</script>
