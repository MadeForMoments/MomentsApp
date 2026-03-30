<template>
  <div class="px-4 pt-4 pb-3 flex items-center gap-3">
    <!-- Minuatura del artista -->
    <div
      class="w-[52px] h-[52px] rounded flex-shrink-0 overflow-hidden"
      style="background: rgb(40, 40, 40)"
    >
      <img alt="" class="w-full h-full object-cover" :src="image" />
    </div>

    <!-- Botón Seguir / Siguiendo -->
    <button
      class="rounded-full px-5 py-[7px] text-[13px] font-bold border transition-all duration-200"
      tabindex="0"
      :style="
        store.isFollowing
          ? 'border-color: rgb(29,185,84); color: rgb(29,185,84); background: transparent;'
          : 'border-color: white; color: white; background: transparent;'
      "
      @click="store.toggleFollow()"
    >
      {{ store.isFollowing ? 'Siguiendo' : 'Seguir' }}
    </button>

    <!-- Botón opciones -->
    <button style="color: rgb(179, 179, 179)">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
        <circle cx="5" cy="12" r="1" />
      </svg>
    </button>

    <div class="flex-1" />

    <!-- Botón Shuffle -->
    <button tabindex="0" style="color: rgb(179, 179, 179)">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22" />
        <path d="m18 2 4 4-4 4" />
        <path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2" />
        <path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8" />
        <path d="m18 14 4 4-4 4" />
      </svg>
    </button>

    <!-- Botón Play / Pause principal -->
    <button
      class="w-[56px] h-[56px] rounded-full flex items-center justify-center shadow-xl flex-shrink-0 transition-transform active:scale-95"
      tabindex="0"
      style="background: rgb(29, 185, 84)"
      @click="store.toggle()"
    >
      <!-- Pause icon -->
      <svg
        v-if="store.isPlaying"
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="black"
        stroke="black"
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
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="black"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="ml-0.5"
      >
        <polygon color="black" points="6 3 20 12 6 21 6 3" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { usePlayerStore } from '@/stores/playerStore'

defineProps<{
  image?: string
}>()

const store = usePlayerStore()
</script>
