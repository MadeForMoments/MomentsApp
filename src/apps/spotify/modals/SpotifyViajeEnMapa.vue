<template>
  <Transition name="slide-up">
    <div
      v-if="show"
      class="absolute inset-0 z-[100] flex justify-center overflow-hidden"
      style="background: rgba(0, 0, 0, 0.6)"
    >
      <div class="relative w-full max-w-[450px] h-full overflow-hidden">
        <div
          class="relative w-full h-full flex flex-col overflow-hidden"
          style="background: rgb(13, 17, 23)"
        >
          <!-- Header flotante -->
          <div
            class="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 pointer-events-none"
            style="
              padding-top: 16px;
              padding-bottom: 12px;
              background: linear-gradient(rgba(13, 17, 23, 0.95) 0%, transparent 100%);
            "
          >
            <div class="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                class="w-4 h-4 text-emerald-400"
              >
                <path
                  d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
                />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <h2
                class="text-lg font-bold tracking-tight"
                style="
                  background: linear-gradient(
                    135deg,
                    rgb(240, 239, 255) 0%,
                    rgba(52, 211, 153, 0.9) 100%
                  );
                  -webkit-background-clip: text;
                  background-clip: text;
                  -webkit-text-fill-color: transparent;
                "
              >
                Viaje en el Mapa
              </h2>
            </div>
            <button
              class="w-9 h-9 rounded-full flex items-center justify-center text-white backdrop-blur-md pointer-events-auto"
              style="
                background: rgba(255, 255, 255, 0.06);
                border: 1px solid rgba(255, 255, 255, 0.1);
              "
              @click="$emit('close')"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                class="w-4 h-4"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          <!-- Mapa real (Leaflet / OpenStreetMap + CartoDB dark) -->
          <div class="absolute inset-0 z-0">
            <l-map
              ref="mapRef"
              :zoom="zoom"
              :center="center"
              :use-global-leaflet="false"
              :options="{ zoomControl: false, attributionControl: true }"
              style="width: 100%; height: 100%; background: rgb(13, 17, 23)"
            >
              <!-- Tiles oscuros CartoDB (basados en OpenStreetMap) -->
              <l-tile-layer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                :options="{
                  subdomains: 'abcd',
                  maxZoom: 19,
                  attribution:
                    '&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors &copy; <a href=&quot;https://carto.com/attributions&quot;>CARTO</a>',
                }"
              />

              <!-- Línea de ruta conectando los puntos en orden -->
              <l-polyline
                v-if="latLngs.length >= 2"
                :lat-lngs="latLngs"
                :options="{
                  color: 'rgba(52,211,153,0.7)',
                  weight: 2,
                  dashArray: '8,6',
                  lineCap: 'round',
                  lineJoin: 'round',
                }"
              />

              <!-- Marcador tipo polaroid por cada lugar -->
              <l-marker
                v-for="(place, i) in places"
                :key="i"
                :lat-lng="[place.lat, place.lng]"
                :icon="getPolaroidIcon(place, i)"
                @click="selectPlace(i)"
              />
            </l-map>
          </div>

          <!-- Badge inferior -->
          <div
            class="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-4 py-2 rounded-full backdrop-blur-md border border-white/10 pointer-events-none"
            style="background: rgba(0, 0, 0, 0.6)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              class="w-3.5 h-3.5 text-emerald-400"
            >
              <path
                d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
              />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span class="text-white/70 text-xs font-medium">{{ places.length }} lugares</span>
            <span class="text-white/40 text-xs">· toca para explorar</span>
          </div>

          <!-- Story overlay al seleccionar un lugar -->
          <Transition name="fade">
            <div
              v-if="selectedPlace !== null && activePlace"
              class="absolute inset-0 z-30 bg-black flex flex-col"
            >
              <img
                :src="activePlace.image"
                alt=""
                class="absolute inset-0 w-full h-full object-cover opacity-80"
              />
              <div
                class="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/70 to-transparent pointer-events-none"
              />
              <div
                class="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 to-transparent pointer-events-none"
              />

              <!-- Header story -->
              <div
                class="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-4"
              >
                <button
                  class="w-10 h-10 rounded-full flex items-center justify-center text-white backdrop-blur-md bg-black/35"
                  @click="closeStory"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    class="h-5 w-5"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
                <span class="text-white font-semibold text-base truncate max-w-[55%] text-center">
                  {{ activePlace.label }}
                </span>
                <div class="w-10" />
              </div>

              <!-- Texto del lugar -->
              <div class="absolute bottom-16 left-0 right-0 z-20 px-6">
                <div class="flex flex-col items-center text-center gap-1">
                  <p class="text-white/60 text-sm">{{ activePlace.date }}</p>
                  <p class="text-white text-base font-medium leading-snug max-w-xs">
                    {{ activePlace.description }}
                  </p>
                </div>
              </div>

              <!-- Barra de progreso de stories -->
              <div class="absolute bottom-4 left-4 right-4 z-50 flex gap-1">
                <button
                  v-for="(_, i) in places"
                  :key="i"
                  class="h-1 flex-1 rounded-full overflow-hidden"
                  style="background: rgba(255, 255, 255, 0.25)"
                  @click="selectPlace(i)"
                >
                  <div
                    class="h-full rounded-full bg-white"
                    :style="{ width: i <= (selectedPlace ?? -1) ? '100%' : '0%' }"
                  />
                </button>
              </div>

              <!-- Nav prev/next -->
              <button
                class="absolute left-2 top-1/2 -translate-y-1/2 z-50 text-white p-2 bg-black/35 backdrop-blur-md rounded-full"
                @click="selectPlace(Math.max(0, (selectedPlace ?? 0) - 1))"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  class="h-6 w-6"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button
                class="absolute right-2 top-1/2 -translate-y-1/2 z-50 text-white p-2 bg-black/35 backdrop-blur-md rounded-full"
                @click="selectPlace(Math.min(places.length - 1, (selectedPlace ?? 0) + 1))"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  class="h-6 w-6"
                >
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
import { ref, computed, watch } from 'vue'
import { LMap, LTileLayer, LMarker, LPolyline } from '@vue-leaflet/vue-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useYouTubePlayer } from '@/composables/useYouTubePlayer'

export interface MapPlaceConfig {
  label: string
  image: string
  lat: number
  lng: number
  date?: string
  description?: string
  youtubeId?: string
}

const props = defineProps<{
  show: boolean
  places: MapPlaceConfig[]
  center?: [number, number]
  zoom?: number
}>()

defineEmits<{ close: [] }>()

const mapRef = ref()
const yt = useYouTubePlayer()
const selectedPlace = ref<number | null>(null)

const center = computed(() => props.center ?? ([-15, -50] as [number, number]))
const zoom = computed(() => props.zoom ?? 3)

/** Non-null accessor used in the story overlay (template already guards with v-if) */
const activePlace = computed(() =>
  selectedPlace.value !== null ? props.places[selectedPlace.value] : null,
)

const latLngs = computed(() => props.places.map((p) => [p.lat, p.lng] as [number, number]))

/** Build a Leaflet DivIcon that renders the polaroid-style marker */
function getPolaroidIcon(place: MapPlaceConfig, index: number) {
  const isSelected = selectedPlace.value === index
  const scale = isSelected ? 'scale(1.1)' : 'scale(1)'
  const shadow = '0 6px 24px rgba(0,0,0,0.65), 0 1px 4px rgba(0,0,0,0.3)'
  const html = `
    <div style="
      display:inline-flex;
      flex-direction:column;
      align-items:center;
      background:white;
      padding:5px 5px 22px;
      border-radius:3px;
      box-shadow:${shadow};
      width:78px;
      transform:${scale};
      transition:transform 0.15s;
      cursor:pointer;
    ">
      <div style="width:68px;height:56px;overflow:hidden;background:#111;border-radius:1px;">
        <img src="${place.image}" style="width:100%;height:100%;object-fit:cover;display:block;" loading="lazy"/>
      </div>
      <div style="
        font-size:7.5px;font-weight:700;color:#222;text-align:center;
        padding-top:5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
        max-width:68px;font-family:'Helvetica Neue',Arial,sans-serif;
        letter-spacing:0.01em;line-height:1.2;
      ">${place.label}</div>
    </div>
  `
  // Cast as any: @vue-leaflet/vue-leaflet accepts DivIcon but its d.ts
  // only declares Icon<IconOptions> — the cast is safe at runtime.
  return L.divIcon({
    html,
    className: '',
    iconSize: [88, 92],
    iconAnchor: [44, 92],
  }) as unknown as L.Icon
}

function selectPlace(i: number) {
  selectedPlace.value = i
}

function closeStory() {
  selectedPlace.value = null
}

// ─── YouTube ambient music ───────────────────────────────────────────────
watch(selectedPlace, (idx) => {
  if (idx === null) {
    yt.pauseVideo()
    return
  }
  const place = props.places[idx]
  if (!place?.youtubeId) {
    yt.pauseVideo()
    return
  }
  yt.loadVideo(place.youtubeId)
})

// Stop music and reset when the modal closes
watch(
  () => props.show,
  (visible) => {
    if (!visible) {
      selectedPlace.value = null
      yt.pauseVideo()
    }
  },
)
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Leaflet attribution – styled for the dark theme */
:deep(.leaflet-control-attribution) {
  background: rgba(0, 0, 0, 0.55) !important;
  color: rgba(255, 255, 255, 0.45) !important;
  font-size: 9px !important;
  backdrop-filter: blur(4px);
}
:deep(.leaflet-control-attribution a) {
  color: rgba(52, 211, 153, 0.75) !important;
}
</style>
