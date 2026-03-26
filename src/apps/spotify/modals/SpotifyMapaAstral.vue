<template>
  <Transition name="slide-up">
    <div v-if="show" class="absolute inset-0 z-[100] flex justify-center overflow-hidden" style="background: rgba(0,0,0,0.6);">
      <div class="relative w-full max-w-[450px] h-full overflow-hidden">
        <div class="relative w-full h-full flex flex-col overflow-hidden" style="background: rgb(5,5,16);">

          <!-- Ruido de fondo -->
          <div class="absolute inset-0 pointer-events-none opacity-[0.03]"
            style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E'); background-repeat: repeat; background-size: 180px;" />

          <!-- Header -->
          <div class="relative z-10 flex items-center justify-between px-5 pt-10 pb-2">
            <div class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" class="w-4 h-4 text-blue-300">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <h2 class="text-lg font-bold"
                style="background: linear-gradient(135deg, rgb(240,239,255) 0%, rgba(96,191,250,0.9) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                Mapa Astral
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

          <!-- Subtítulo -->
          <div class="relative z-10 flex flex-col items-center text-center gap-1 px-5 mb-4">
            <p class="text-white/60 font-semibold text-lg">{{ coupleName }}</p>
          </div>

          <!-- SVG Mapa Astral -->
          <div class="relative z-10 flex items-center justify-center flex-1 px-5">
            <svg viewBox="0 0 340 340" class="w-full max-w-[285px] h-auto">
              <!-- Círculos concéntricos -->
              <circle v-for="r in [162,125,90,45]" :key="r" cx="170" cy="170" :r="r"
                fill="none" stroke="rgba(180,210,255,0.11)" stroke-width="0.5" />
              <!-- Ejes -->
              <line x1="10" y1="170" x2="330" y2="170" stroke="rgba(180,210,255,0.07)" />
              <line x1="170" y1="10" x2="170" y2="330" stroke="rgba(180,210,255,0.07)" />

              <!-- Estrellas de fondo generadas -->
              <circle v-for="(star, i) in backgroundStars" :key="`bg-${i}`"
                :cx="star.x" :cy="star.y" :r="star.r" fill="white" :opacity="star.opacity" />

              <!-- Líneas de constelación -->
              <path v-for="(line, i) in constellationLines" :key="`l-${i}`"
                :d="line" fill="none" stroke="rgba(180,220,255,0.65)" stroke-width="1.5"
                stroke-linecap="round" stroke-linejoin="round" />

              <!-- Estrellas principales (puntos de constelación) -->
              <g v-for="(star, i) in mainStars" :key="`s-${i}`">
                <circle :cx="star.cx" :cy="star.cy" r="10" fill="rgba(160,210,255,0.08)" :opacity="star.opacity * 0.1" />
                <path :d="starPath(star.cx, star.cy)" fill="white" :opacity="star.opacity" />
              </g>
            </svg>
          </div>

          <!-- Info inferior -->
          <div class="relative z-10 flex flex-col items-center text-center px-6 pb-8 gap-4">
            <p class="text-white font-bold text-2xl leading-snug px-4">"{{ quote }}"</p>
            <div class="flex flex-col items-center gap-1.5">
              <p class="uppercase tracking-[0.1em] text-[13px]" style="color: rgba(255,255,255,0.5);">{{ location }}</p>
              <p class="uppercase tracking-[0.06em] text-[12px]" style="color: rgba(255,255,255,0.38);">{{ date }}</p>
              <p class="uppercase tracking-[0.06em] text-[11px]" style="color: rgba(255,255,255,0.28);">{{ coords }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
export interface AstralStar { cx: number; cy: number; opacity: number }

const props = defineProps<{
  show: boolean
  coupleName?: string
  quote?: string
  location?: string
  date?: string
  coords?: string
  mainStars?: AstralStar[]
  constellationLines?: string[]
}>()

defineEmits<{ close: [] }>()

// Estrellas de fondo estáticas (seed determinístico)
const backgroundStars = Array.from({ length: 22 }, (_, i) => ({
  x: ((i * 137.5) % 300) + 20,
  y: ((i * 97.3) % 300) + 20,
  r: [2, 1.1, 1.5, 2, 1.1][i % 5],
  opacity: 0.25 + (i % 5) * 0.08,
}))

// Genera el path SVG de una estrella de 8 puntas pequeña centrada en (cx, cy)
function starPath(cx: number, cy: number): string {
  const size = 4.5
  const pts = Array.from({ length: 8 }, (_, i) => {
    const angle = (i * Math.PI) / 4
    const r = i % 2 === 0 ? size : size * 0.42
    return `${cx + Math.cos(angle) * r},${cy + Math.sin(angle) * r}`
  })
  return `M${pts.join('L')}Z`
}
</script>

<style scoped>
.slide-up-enter-active, .slide-up-leave-active { transition: transform 0.35s cubic-bezier(0.32,0.72,0,1); }
.slide-up-enter-from, .slide-up-leave-to { transform: translateY(100%); }
</style>
