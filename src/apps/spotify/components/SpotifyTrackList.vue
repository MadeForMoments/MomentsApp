<template>
  <section class="px-4 mb-8">
    <h2 class="text-white font-black text-[22px] mb-4">Populares</h2>
    <div class="space-y-0.5">
      <!-- Tracks reales -->
      <div
        v-for="track in tracks"
        :key="track.index"
        class="flex items-center gap-3 px-2 py-2 rounded-lg cursor-pointer group transition-colors"
        :style="{ background: track.active ? 'rgba(29,185,84,0.08)' : 'transparent' }"
      >
        <!-- Número / Play icon -->
        <div class="w-5 flex-shrink-0 flex items-center justify-center">
          <span
            class="text-sm font-medium group-hover:hidden"
            :style="{ color: track.active ? 'rgb(29,185,84)' : 'rgb(179,179,179)' }"
          >{{ track.index }}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"
            fill="white" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="text-white hidden group-hover:block"
          >
            <polygon points="6 3 20 12 6 21 6 3" />
          </svg>
        </div>

        <!-- Thumbnail -->
        <div
          class="relative w-10 h-10 rounded flex-shrink-0 overflow-hidden"
          style="background: rgb(40,40,40);"
        >
          <img :alt="track.title" class="w-full h-full object-cover" :src="track.image" />
          <div
            v-if="track.active"
            class="absolute inset-0 border-2 rounded"
            style="border-color: rgb(29,185,84);"
          />
        </div>

        <!-- Info -->
        <div class="flex-1 min-w-0">
          <p
            class="text-sm font-semibold truncate"
            :style="{ color: track.active ? 'rgb(29,185,84)' : 'white' }"
          >{{ track.title }}</p>
          <p class="text-xs truncate" style="color: rgb(179,179,179);">{{ track.artist }}</p>
        </div>

        <!-- Botón corazón -->
        <button
          class="group-hover:opacity-100 transition-opacity flex-shrink-0 mr-1"
          tabindex="0"
          style="opacity: 0;"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            style="color: rgb(179,179,179);">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </button>

        <!-- Duración -->
        <span class="text-xs flex-shrink-0 w-8 text-right" style="color: rgb(179,179,179);">{{ track.duration }}</span>
      </div>

      <!-- Skeleton loaders (canciones bloqueadas) -->
      <div
        v-for="n in skeletonCount"
        :key="`skeleton-${n}`"
        class="flex items-center gap-3 px-2 py-2 animate-pulse"
      >
        <span class="w-5 text-center text-sm" style="color: rgba(255,255,255,0.12);">{{ tracks.length + n }}</span>
        <div class="w-10 h-10 rounded flex-shrink-0" style="background: rgb(40,40,40);" />
        <div class="flex-1 flex flex-col gap-1.5">
          <div class="h-3 rounded" style="background: rgb(40,40,40); width: 55%;" />
          <div class="h-2.5 rounded" style="background: rgb(40,40,40); width: 35%;" />
        </div>
        <div class="w-8 h-2.5 rounded" style="background: rgb(40,40,40);" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
export interface Track {
  index: number
  title: string
  artist: string
  image: string
  duration: string
  active?: boolean
}

defineProps<{
  tracks: Track[]
  skeletonCount?: number
}>()
</script>
