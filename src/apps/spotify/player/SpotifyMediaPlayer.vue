<template>
  <Transition name="slide-up">
    <div
      v-if="show"
      class="absolute inset-0 z-[150] flex flex-col"
      style="background: rgb(18, 18, 18)"
    >
      <!-- Fondo blureado -->
      <div
        class="absolute inset-0 bg-cover bg-center"
        :style="{
          backgroundImage: `url(${store.currentTrack?.image})`,
          filter: 'blur(80px) brightness(0.35)',
          transform: 'scale(1.3)',
        }"
      />

      <!-- Contenido desplazable -->
      <div class="relative flex-1 overflow-y-auto no-scrollbar">
        <!-- Header -->
        <div class="flex items-center justify-between px-5 pt-6 pb-4">
          <button
            class="w-9 h-9 flex items-center justify-center rounded-full"
            style="background: rgba(255, 255, 255, 0.1)"
            @click="$emit('close')"
          >
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
              class="text-white"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          <div class="text-center">
            <p class="text-white/50 text-[10px] uppercase tracking-[0.18em] font-semibold">
              {{ context }}
            </p>
            <p class="text-white text-sm font-bold mt-0.5 max-w-[180px] truncate">
              {{ artistName }}
            </p>
          </div>

          <button class="w-9 h-9 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-white/60"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
            </svg>
          </button>
        </div>

        <!-- Portada -->
        <div class="px-6 mb-8">
          <div
            class="w-full aspect-square rounded-2xl overflow-hidden transition-transform duration-300"
            :style="{
              background: 'rgb(40,40,40)',
              boxShadow: 'rgba(0,0,0,0.6) 0px 32px 64px',
              transform: store.isPlaying ? 'scale(1)' : 'scale(0.88)',
            }"
          >
            <img
              :alt="store.currentTrack?.title"
              class="w-full h-full object-cover"
              :src="store.currentTrack?.image"
            />
          </div>
        </div>

        <!-- Título + corazón -->
        <div class="px-6 flex items-start justify-between mb-6">
          <div class="flex-1 min-w-0">
            <p class="text-white text-2xl font-black truncate">{{ store.currentTrack?.title }}</p>
            <p class="text-base font-medium mt-0.5" style="color: rgb(179, 179, 179)">
              {{ store.currentTrack?.artist }}
            </p>
          </div>
          <button class="ml-4 mt-1.5 flex-shrink-0" @click="store.toggleLike()">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              :fill="store.isLiked ? 'rgb(29,185,84)' : 'none'"
              :stroke="store.isLiked ? 'rgb(29,185,84)' : 'rgb(179,179,179)'"
            >
              <path
                d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
              />
            </svg>
          </button>
        </div>

        <!-- Barra de progreso interactiva -->
        <div class="px-6 mb-5">
          <div
            class="w-full h-1 rounded-full cursor-pointer group relative"
            style="background: rgba(255, 255, 255, 0.14)"
            @click="handleProgressClick"
          >
            <div
              class="h-full rounded-full transition-none relative"
              :style="{ width: `${store.progress}%`, background: 'white' }"
            >
              <!-- Thumb dot (visible on hover) -->
              <div
                class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
          <div class="flex justify-between mt-1.5">
            <span class="text-[11px]" style="color: rgb(179, 179, 179)">{{
              store.elapsedLabel
            }}</span>
            <span class="text-[11px]" style="color: rgb(179, 179, 179)">{{
              store.remainingLabel
            }}</span>
          </div>
        </div>

        <!-- Controles -->
        <div class="px-5 flex items-center justify-between mb-10">
          <!-- Shuffle -->
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
              <path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22" />
              <path d="m18 2 4 4-4 4" />
              <path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2" />
              <path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8" />
              <path d="m18 14 4 4-4 4" />
            </svg>
          </button>
          <!-- Prev -->
          <button style="color: white" @click="store.prev()">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="white"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polygon points="19 20 9 12 19 4 19 20" />
              <line x1="5" x2="5" y1="19" y2="5" />
            </svg>
          </button>
          <!-- Play / Pause -->
          <button
            class="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 transition-transform active:scale-95"
            style="background: white"
            @click="store.toggle()"
          >
            <!-- Pause -->
            <svg
              v-if="store.isPlaying"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="black"
              stroke="black"
              stroke-width="2.5"
              stroke-linecap="round"
            >
              <line x1="6" y1="4" x2="6" y2="20" />
              <line x1="18" y1="4" x2="18" y2="20" />
            </svg>
            <!-- Play -->
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="black"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="ml-1"
            >
              <polygon points="6 3 20 12 6 21 6 3" />
            </svg>
          </button>
          <!-- Next -->
          <button style="color: white" @click="store.next()">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="white"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polygon points="5 4 15 12 5 20 5 4" />
              <line x1="19" x2="19" y1="5" y2="19" />
            </svg>
          </button>
          <!-- Repeat -->
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
              <path d="m17 2 4 4-4 4" />
              <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
              <path d="m7 22-4-4 4-4" />
              <path d="M21 13v1a4 4 0 0 1-4 4H3" />
            </svg>
          </button>
        </div>

        <!-- Letra -->
        <section class="px-5 mb-6">
          <div class="rounded-2xl overflow-hidden" style="background: rgb(192, 57, 43)">
            <div class="flex items-center justify-between px-4 pt-4 pb-1">
              <span class="text-white text-sm font-black">Letra</span>
              <div class="flex items-center gap-3">
                <button style="color: rgba(0, 0, 0, 0.55)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="m5 8 6 6" />
                    <path d="m4 14 6-6 2-3" />
                    <path d="M2 5h12" />
                    <path d="M7 2h1" />
                    <path d="m22 22-5-10-5 10" />
                    <path d="M14 18h6" />
                  </svg>
                </button>
                <button style="color: rgba(0, 0, 0, 0.55)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                    <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
                  </svg>
                </button>
              </div>
            </div>
            <div class="relative overflow-hidden px-4 pb-2" style="max-height: 230px">
              <p
                class="font-black leading-snug mb-4"
                style="font-size: 23px; color: rgba(0, 0, 0, 0.88)"
              >
                {{ lyrics }}
              </p>
              <div
                class="absolute bottom-0 left-0 right-0"
                style="
                  height: 72px;
                  background: linear-gradient(to top, rgb(192, 57, 43) 0%, transparent 100%);
                "
              />
            </div>
            <button class="px-4 pb-4 text-sm font-black" style="color: rgba(0, 0, 0, 0.55)">
              Ver más
            </button>
          </div>
        </section>

        <!-- Galería "Conoce al artista" -->
        <section class="mb-8">
          <div class="mx-5 rounded-2xl overflow-hidden" style="background: rgb(40, 40, 40)">
            <h3 class="text-white font-black text-base px-4 pt-4 pb-3">Conoce {{ artistName }}</h3>
            <div class="flex gap-3 px-4 pb-4 overflow-x-auto no-scrollbar">
              <div
                v-for="(img, i) in gallery"
                :key="i"
                class="flex-shrink-0 relative rounded-xl overflow-hidden cursor-pointer"
                style="width: 138px; height: 148px; background: rgb(18, 18, 18)"
              >
                <img alt="" class="w-full h-full object-cover" :src="img" />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"
                />
                <p
                  class="absolute bottom-2.5 left-2.5 right-2.5 text-white text-xs font-bold leading-tight"
                >
                  {{ artistName }}
                </p>
              </div>
            </div>
          </div>
        </section>

        <div class="h-10" />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { usePlayerStore } from '@/stores/playerStore'
import { useYouTubePlayer } from '@/composables/useYouTubePlayer'

defineProps<{
  show: boolean
  artistName?: string
  context?: string
  lyrics?: string
  gallery?: string[]
}>()

defineEmits<{ close: [] }>()

const store = usePlayerStore()
const yt = useYouTubePlayer()

function handleProgressClick(e: MouseEvent) {
  const bar = e.currentTarget as HTMLElement
  const rect = bar.getBoundingClientRect()
  const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
  const secs = ratio * store.duration
  store.seek(secs)
  yt.seekTo(secs)
}
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.35s cubic-bezier(0.32, 0.72, 0, 1);
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}
</style>
