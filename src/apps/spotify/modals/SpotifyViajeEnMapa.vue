<template>
  <Transition name="slide-up">
    <div v-if="show" class="absolute inset-0 z-[100] flex justify-center overflow-hidden" style="background: rgba(0,0,0,0.6);">
      <div class="relative w-full max-w-[450px] h-full overflow-hidden">
        <div class="relative w-full h-full flex flex-col overflow-hidden" style="background: rgb(13,17,23);">

          <!-- Header flotante -->
          <div class="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4"
            style="padding-top: 16px; padding-bottom: 12px; background: linear-gradient(rgba(13,17,23,0.95) 0%, transparent 100%);">
            <div class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" class="w-4 h-4 text-emerald-400">
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <h2 class="text-lg font-bold tracking-tight"
                style="background: linear-gradient(135deg, rgb(240,239,255) 0%, rgba(52,211,153,0.9) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                Viaje en el Mapa
              </h2>
            </div>
            <button class="w-9 h-9 rounded-full flex items-center justify-center text-white backdrop-blur-md"
              style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);" @click="$emit('close')">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" class="w-4 h-4">
                <path d="M18 6 6 18" /><path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          <!-- Mapa de fondo (imagen estática oscura tipo CartoDB) -->
          <div class="absolute inset-0 z-0">
            <div class="relative w-full h-full" style="background: rgb(13,17,23);">
              <!-- Cuadrícula simulando mapa oscuro -->
              <svg class="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(52,211,153,0.15)" stroke-width="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>

              <!-- Línea de trayecto SVG -->
              <svg class="absolute inset-0 w-full h-full">
                <path :d="routePath" fill="none" stroke="rgba(52,211,153,0.7)" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="8,6" />
              </svg>

              <!-- Marcadores de lugares -->
              <div
                v-for="(place, i) in places"
                :key="i"
                class="absolute cursor-pointer"
                :style="{ left: `${place.x}px`, top: `${place.y}px`, transform: 'translate(-44px, -92px)', zIndex: place.y + 200 }"
                @click="selectedPlace = i"
              >
                <div
                  class="inline-flex flex-col items-center transition-transform duration-150"
                  :class="selectedPlace === i ? 'scale-110' : 'hover:scale-105'"
                  style="background: white; padding: 5px 5px 22px; border-radius: 3px; box-shadow: 0 6px 24px rgba(0,0,0,0.65), 0 1px 4px rgba(0,0,0,0.3); width: 78px;"
                >
                  <div style="width: 68px; height: 56px; overflow: hidden; background: #111; border-radius: 1px;">
                    <img :src="place.image" style="width: 100%; height: 100%; object-fit: cover; display: block;" loading="lazy" />
                  </div>
                  <div style="font-size: 7.5px; font-weight: 700; color: #222; text-align: center; padding-top: 5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 68px;">
                    {{ place.label }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Badge inferior -->
          <div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-4 py-2 rounded-full backdrop-blur-md border border-white/10"
            style="background: rgba(0,0,0,0.6);">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" class="w-3.5 h-3.5 text-emerald-400">
              <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span class="text-white/70 text-xs font-medium">{{ places.length }} lugares</span>
            <span class="text-white/40 text-xs">· toca para explorar</span>
          </div>

          <!-- Story overlay al seleccionar un lugar -->
          <Transition name="fade">
            <div v-if="selectedPlace !== null" class="absolute inset-0 z-30 bg-black flex flex-col">
              <img :src="places[selectedPlace].image" alt="" class="absolute inset-0 w-full h-full object-cover opacity-80" />
              <div class="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/70 to-transparent pointer-events-none" />
              <div class="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 to-transparent pointer-events-none" />

              <!-- Header story -->
              <div class="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-4">
                <button class="w-10 h-10 rounded-full flex items-center justify-center text-white backdrop-blur-md bg-black/35"
                  @click="selectedPlace = null">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" class="h-5 w-5">
                    <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                  </svg>
                </button>
                <span class="text-white font-semibold text-base truncate max-w-[55%] text-center">
                  {{ places[selectedPlace].label }}
                </span>
                <div class="w-10" />
              </div>

              <!-- Texto del lugar -->
              <div class="absolute bottom-16 left-0 right-0 z-20 px-6">
                <div class="flex flex-col items-center text-center gap-1">
                  <p class="text-white/60 text-sm">{{ places[selectedPlace].date }}</p>
                  <p class="text-white text-base font-medium leading-snug max-w-xs">{{ places[selectedPlace].description }}</p>
                </div>
              </div>

              <!-- Barra de progreso de stories -->
              <div class="absolute bottom-4 left-4 right-4 z-50 flex gap-1">
                <button v-for="(_, i) in places" :key="i"
                  class="h-1 flex-1 rounded-full overflow-hidden"
                  style="background: rgba(255,255,255,0.25);"
                  @click="selectedPlace = i">
                  <div class="h-full rounded-full bg-white" :style="{ width: i <= selectedPlace ? '100%' : '0%' }" />
                </button>
              </div>

              <!-- Nav prev/next -->
              <button class="absolute left-2 top-1/2 -translate-y-1/2 z-50 text-white p-2 bg-black/35 backdrop-blur-md rounded-full"
                @click="selectedPlace = Math.max(0, selectedPlace - 1)">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" class="h-6 w-6">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button class="absolute right-2 top-1/2 -translate-y-1/2 z-50 text-white p-2 bg-black/35 backdrop-blur-md rounded-full"
                @click="selectedPlace = Math.min(places.length - 1, selectedPlace + 1)">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" class="h-6 w-6">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

export interface MapPlace {
  label: string
  image: string
  date?: string
  description?: string
  x: number
  y: number
}

const props = defineProps<{
  show: boolean
  places: MapPlace[]
}>()

defineEmits<{ close: [] }>()

const selectedPlace = ref<number | null>(null)

const routePath = computed(() => {
  if (props.places.length < 2) return ''
  const pts = props.places.map(p => `${p.x},${p.y}`)
  return `M${pts.join('L')}`
})
</script>

<style scoped>
.slide-up-enter-active, .slide-up-leave-active { transition: transform 0.35s cubic-bezier(0.32,0.72,0,1); }
.slide-up-enter-from, .slide-up-leave-to { transform: translateY(100%); }
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
