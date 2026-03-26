<template>
  <Transition name="slide-up">
    <div v-if="show" class="absolute inset-0 z-[100] flex justify-center overflow-hidden" style="background: rgba(0,0,0,0.6);">
      <div class="relative w-full max-w-[450px] h-full overflow-hidden">
        <div class="relative w-full h-full flex flex-col overflow-hidden" style="background: rgb(8,4,20);">

          <!-- Glow -->
          <div class="absolute inset-0 pointer-events-none"
            style="background: radial-gradient(ellipse at 50% 40%, rgba(160,80,255,0.15) 0%, transparent 65%);" />

          <!-- Botón cerrar -->
          <div class="absolute top-4 right-4 z-20">
            <button class="w-10 h-10 rounded-full flex items-center justify-center text-white"
              style="background: rgba(0,0,0,0.35);" @click="$emit('close')">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" class="w-5 h-5">
                <path d="M18 6 6 18" /><path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          <!-- Título + pregunta -->
          <div class="relative z-10 flex flex-col items-center text-center pt-24 pb-10 px-5">
            <h2 class="text-4xl font-bold tracking-tight mb-3"
              style="background: linear-gradient(135deg, rgb(240,239,255) 0%, rgba(251,113,133,0.9) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
              Ruleta Sorpresa
            </h2>
            <p class="text-white text-2xl font-medium mt-2 px-2">{{ question }}</p>
          </div>

          <!-- Ruleta SVG -->
          <div class="relative z-10 flex items-center justify-center flex-1">
            <div class="relative">
              <!-- Pointer -->
              <div class="absolute left-1/2 -translate-x-1/2 z-10" style="top: -2px;">
                <svg width="24" height="20" viewBox="0 0 24 20">
                  <polygon points="12,18 2,2 22,2" fill="white" opacity="0.95" />
                </svg>
              </div>

              <!-- Glow ring -->
              <div class="absolute inset-0 pointer-events-none rounded-full"
                style="box-shadow: rgba(160,80,255,0.25) 0px 0px 40px 8px, rgba(160,80,255,0.1) 0px 0px 80px 16px;" />

              <svg width="300" height="300" viewBox="0 0 340 340">
                <circle cx="170" cy="170" r="154" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1.5" />
                <circle cx="170" cy="170" r="158" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1" />

                <g :style="{ transform: `rotate(${rotation}deg)`, transformOrigin: '170px 170px', transition: isSpinning ? 'none' : 'transform 3s cubic-bezier(0.17,0.67,0.12,1)' }">
                  <!-- Sectores -->
                  <path v-for="(sector, i) in sectors" :key="i" :d="sector.path"
                    :fill="sector.fill" stroke="rgba(255,255,255,0.08)" stroke-width="0.8" />
                  <!-- Bordes de colores -->
                  <path v-for="(sector, i) in sectors" :key="`b${i}`" :d="sector.arc"
                    fill="none" :stroke="sector.color" stroke-width="3" stroke-opacity="0.75" stroke-linecap="round" />
                  <!-- Textos -->
                  <g v-for="(sector, i) in sectors" :key="`t${i}`" :transform="`translate(170,170) rotate(${sector.textAngle})`">
                    <text :x="sector.textSide === 'right' ? 96 : -96" y="0" text-anchor="middle"
                      dominant-baseline="central" font-size="11" font-weight="600" fill="rgba(255,255,255,0.92)"
                      style="user-select: none;">{{ sector.shortLabel }}</text>
                  </g>
                  <!-- Centro -->
                  <circle cx="170" cy="170" r="40" fill="#0a0618" stroke="rgba(255,255,255,0.15)" stroke-width="1" />
                  <circle cx="170" cy="170" r="36" fill="rgba(160,80,255,0.15)" stroke="rgba(160,80,255,0.3)" stroke-width="1" />
                </g>
              </svg>

              <!-- Botón girar (centro) -->
              <button
                class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center focus:outline-none"
                style="width: 56px; height: 56px; background: radial-gradient(circle, rgba(180,80,255,0.95), rgba(120,40,200,0.95)); box-shadow: rgba(180,80,255,0.6) 0px 0px 20px, rgba(180,80,255,0.2) 0px 0px 40px; border: 2px solid rgba(255,255,255,0.2);"
                :disabled="isSpinning"
                @click="spin"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" class="w-5 h-5 text-white">
                  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                  <path d="M21 3v5h-5" />
                  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                  <path d="M8 16H3v5" />
                </svg>
              </button>
            </div>
          </div>

          <p class="relative z-10 text-center text-white/30 text-xs tracking-wide pb-4">Toca el botón para girar</p>

          <!-- Drawer resultado -->
          <Transition name="slide-result">
            <div v-if="result" class="absolute bottom-0 left-0 right-0 z-[60]">
              <div class="w-full flex flex-col items-center px-6 pt-5 pb-10 gap-4"
                style="background: linear-gradient(to top, rgba(8,4,20,0.98), rgba(8,4,20,0.92)); backdrop-filter: blur(24px); border-top: 1px solid rgba(52,211,153,0.19);">
                <div class="w-10 h-1 rounded-full bg-white/20" />
                <div class="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style="background: rgba(52,211,153,0.22); border: 2px solid rgba(52,211,153,0.314); box-shadow: rgba(52,211,153,0.25) 0px 0px 28px;">
                  <span class="text-2xl">🎉</span>
                </div>
                <div class="flex flex-col items-center gap-1">
                  <p class="text-white/40 text-xs uppercase tracking-widest">La ruleta eligió</p>
                  <p class="text-2xl font-bold text-center" style="color: rgb(52,211,153);">{{ result }}</p>
                </div>
                <button class="px-8 py-3 rounded-full text-sm font-semibold tracking-wide"
                  style="background: rgba(52,211,153,0.13); border: 1px solid rgba(52,211,153,0.27); color: rgb(52,211,153);"
                  @click="spin">
                  Girar de nuevo
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  show: boolean
  question?: string
  items: string[]
}>()

defineEmits<{ close: [] }>()

const rotation = ref(0)
const isSpinning = ref(false)
const result = ref<string | null>(null)

const sectorColors = ['#FF6B9D', '#A78BFA', '#60BFFA', '#FB7185', '#FBBF24', '#34D399']

const sectors = computed(() => {
  const count = props.items.length
  const angle = 360 / count
  return props.items.map((label, i) => {
    const start = (i * angle - 90) * (Math.PI / 180)
    const end = ((i + 1) * angle - 90) * (Math.PI / 180)
    const r = 150, cx = 170, cy = 170, ir = 38
    const x1 = cx + r * Math.cos(start), y1 = cy + r * Math.sin(start)
    const x2 = cx + r * Math.cos(end), y2 = cy + r * Math.sin(end)
    const ix1 = cx + ir * Math.cos(start), iy1 = cy + ir * Math.sin(start)
    const ix2 = cx + ir * Math.cos(end), iy2 = cy + ir * Math.sin(end)
    const large = angle > 180 ? 1 : 0
    const color = sectorColors[i % sectorColors.length]
    const midAngle = (i + 0.5) * angle
    const textSide = midAngle % 360 < 180 ? 'right' : 'left'
    return {
      path: `M${ix1},${iy1} L${x1},${y1} A${r},${r} 0 ${large},1 ${x2},${y2} L${ix2},${iy2} A${ir},${ir} 0 ${large},0 ${ix1},${iy1}Z`,
      arc: `M${x1},${y1} A${r},${r} 0 ${large},1 ${x2},${y2}`,
      fill: `${color}38`,
      color,
      textAngle: midAngle <= 180 ? midAngle - 60 : midAngle + 120,
      textSide,
      shortLabel: label.length > 9 ? label.slice(0, 9) + '…' : label,
    }
  })
})

function spin() {
  if (isSpinning.value) return
  isSpinning.value = true
  result.value = null
  const extra = 1080 + Math.random() * 720
  rotation.value += extra
  setTimeout(() => {
    isSpinning.value = false
    const normalized = ((rotation.value % 360) + 360) % 360
    const angle = 360 / props.items.length
    const idx = Math.floor(((360 - normalized + 90) % 360) / angle) % props.items.length
    result.value = props.items[idx]
  }, 3100)
}
</script>

<style scoped>
.slide-up-enter-active, .slide-up-leave-active { transition: transform 0.35s cubic-bezier(0.32,0.72,0,1); }
.slide-up-enter-from, .slide-up-leave-to { transform: translateY(100%); }
.slide-result-enter-active, .slide-result-leave-active { transition: transform 0.4s ease; }
.slide-result-enter-from, .slide-result-leave-to { transform: translateY(100%); }
</style>
