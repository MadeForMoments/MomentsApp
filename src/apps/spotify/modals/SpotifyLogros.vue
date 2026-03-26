<template>
  <Transition name="slide-up">
    <div v-if="show" class="absolute inset-0 z-[100] flex justify-center overflow-hidden" style="background: rgba(0,0,0,0.6);">
      <div class="relative w-full max-w-[450px] h-full overflow-hidden">
        <div class="relative w-full h-full flex flex-col overflow-hidden" style="background: rgba(5,5,8,0.9); backdrop-filter: blur(32px);">

          <!-- Glow dorado -->
          <div class="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-56 rounded-full pointer-events-none opacity-20"
            style="background: radial-gradient(rgba(240,192,96,0.19), transparent 70%); filter: blur(40px);" />

          <!-- Botón cerrar -->
          <div class="absolute top-4 right-4 z-20">
            <button class="w-10 h-10 rounded-full flex items-center justify-center text-white backdrop-blur-md"
              style="background: rgba(0,0,0,0.35);" @click="$emit('close')">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
                <path d="M18 6 6 18" /><path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          <!-- Header -->
          <div class="relative z-10 flex-shrink-0 px-5 pt-10 pb-4">
            <div class="flex flex-col items-center text-center mb-6">
              <h2 class="text-4xl font-bold tracking-tight"
                style="background: linear-gradient(135deg, rgb(240,239,255) 0%, rgba(240,192,96,0.85) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                Logros
              </h2>
              <p class="text-[14px]" style="color: rgba(255,255,255,0.38);">Hitos desbloqueados a lo largo del camino</p>
            </div>

            <!-- Resumen total -->
            <div class="flex items-center gap-3 px-4 py-3 rounded-2xl"
              style="background: linear-gradient(135deg, rgba(240,192,96,0.1), rgba(0,0,0,0.6)); border: 1px solid rgba(240,192,96,0.22);">
              <span class="text-2xl">🏆</span>
              <div class="flex flex-col gap-0.5 flex-1">
                <div class="flex items-baseline gap-1">
                  <span class="text-2xl font-bold" style="color: rgb(240,192,96);">{{ totalUnlocked }}</span>
                  <span class="text-sm" style="color: rgba(255,255,255,0.45);">de {{ totalAchievements }} obtenidos</span>
                </div>
                <div class="w-full h-1.5 rounded-full overflow-hidden mt-1" style="background: rgba(255,255,255,0.07);">
                  <div class="h-full rounded-full"
                    :style="{ width: `${Math.round(totalUnlocked / totalAchievements * 100)}%`, background: 'linear-gradient(90deg, rgb(240,192,96), rgb(251,146,60))' }" />
                </div>
              </div>
            </div>
          </div>

          <!-- Lista de grupos -->
          <div class="relative z-10 flex-1 overflow-y-auto px-5 pb-10 pt-4 flex flex-col gap-6">
            <div v-for="group in groups" :key="group.title" class="flex flex-col gap-3">

              <!-- Encabezado del grupo -->
              <div class="flex items-center gap-2 px-1">
                <span class="text-[11px] font-semibold uppercase tracking-widest" style="color: rgba(255,255,255,0.35);">{{ group.title }}</span>
                <div class="flex-1 h-px" style="background: rgba(255,255,255,0.06);" />
                <span class="text-[11px]" style="color: rgba(255,255,255,0.28);">{{ group.items.filter(i => i.unlocked).length }}/{{ group.items.length }}</span>
              </div>

              <!-- Grid 2 cols -->
              <div class="grid grid-cols-2 gap-2.5">
                <button
                  v-for="item in group.items"
                  :key="item.title"
                  class="relative rounded-2xl p-3.5 flex flex-col gap-2 overflow-hidden focus:outline-none w-full text-left"
                  style="height: 160px;"
                  :style="item.unlocked ? {
                    background: `linear-gradient(145deg, ${item.color}18 0%, rgba(0,0,0,0.94) 65%)`,
                    border: `1px solid ${item.color}50`,
                    boxShadow: `${item.color}1a 0px 0px 28px, rgba(0,0,0,0.5) 0px 4px 20px`
                  } : {
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    boxShadow: 'rgba(0,0,0,0.4) 0px 2px 10px'
                  }"
                >
                  <!-- Glow corner -->
                  <div v-if="item.unlocked" class="absolute -top-6 -right-6 w-24 h-24 rounded-full pointer-events-none"
                    :style="{ background: `radial-gradient(circle, ${item.color}26, transparent 70%)` }" />

                  <!-- Lock icon -->
                  <div v-if="!item.unlocked" class="absolute bottom-2.5 right-2.5 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2" class="w-3 h-3" style="color: rgba(255,255,255,0.13);">
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>

                  <!-- Emoji + level + stars -->
                  <div class="flex items-center justify-between gap-1.5">
                    <div class="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                      :style="item.unlocked ? {
                        background: `linear-gradient(135deg, ${item.color}35, ${item.color}14)`,
                        border: `1px solid ${item.color}60`,
                        boxShadow: `${item.color}35 0px 0px 16px`
                      } : {
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        filter: 'grayscale(1) opacity(0.28)'
                      }">
                      {{ item.emoji }}
                    </div>
                    <div class="flex flex-col items-end gap-0.5">
                      <span class="text-[9px] font-semibold uppercase tracking-wider leading-none"
                        :style="{ color: item.unlocked ? item.color : 'rgba(255,255,255,0.2)' }">
                        Nivel {{ item.level }}
                      </span>
                      <span class="flex gap-px leading-none" style="font-size: 9px;">
                        <span v-for="s in 5" :key="s"
                          :style="s <= item.stars ? { color: item.color, textShadow: `${item.color} 0px 0px 6px` } : { color: 'rgba(255,255,255,0.12)' }">★</span>
                      </span>
                    </div>
                  </div>

                  <!-- Title + desc -->
                  <div class="flex flex-col gap-0.5 flex-1 min-w-0">
                    <span class="text-[12px] font-bold leading-tight line-clamp-1"
                      :style="{ color: item.unlocked ? 'rgb(240,239,255)' : 'rgba(255,255,255,0.22)' }">
                      {{ item.title }}
                    </span>
                    <span class="text-[10px] leading-snug line-clamp-2"
                      :style="{ color: item.unlocked ? 'rgba(255,255,255,0.42)' : 'rgba(255,255,255,0.14)' }">
                      {{ item.description }}
                    </span>
                  </div>

                  <!-- Progress bar -->
                  <div v-if="item.progress !== undefined" class="flex flex-col gap-1">
                    <div class="w-full h-1 rounded-full overflow-hidden" style="background: rgba(255,255,255,0.07);">
                      <div class="h-full rounded-full"
                        :style="{ background: item.unlocked ? item.color : `${item.color}50`, width: `${Math.min(100, item.progress)}%` }" />
                    </div>
                    <div class="flex items-center justify-between">
                      <span class="text-[9px]" style="color: rgba(255,255,255,0.25);">{{ item.progressLabel }}</span>
                      <span v-if="item.unlocked"
                        class="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full"
                        :style="{ color: item.color, background: `${item.color}18`, border: `1px solid ${item.color}40` }">
                        ✓ obtenido
                      </span>
                    </div>
                  </div>
                  <div v-else class="flex justify-end" style="min-height: 18px;">
                    <span v-if="item.unlocked" class="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full"
                      :style="{ color: item.color, background: `${item.color}18`, border: `1px solid ${item.color}40` }">
                      ✓ obtenido
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface Achievement {
  emoji: string
  title: string
  description: string
  color: string
  level: number
  stars: number
  unlocked: boolean
  progress?: number
  progressLabel?: string
}

export interface AchievementGroup {
  title: string
  items: Achievement[]
}

const props = defineProps<{
  show: boolean
  groups: AchievementGroup[]
}>()

defineEmits<{ close: [] }>()

const totalAchievements = computed(() => props.groups.reduce((s, g) => s + g.items.length, 0))
const totalUnlocked = computed(() => props.groups.reduce((s, g) => s + g.items.filter(i => i.unlocked).length, 0))
</script>

<style scoped>
.slide-up-enter-active, .slide-up-leave-active { transition: transform 0.35s cubic-bezier(0.32,0.72,0,1); }
.slide-up-enter-from, .slide-up-leave-to { transform: translateY(100%); }
</style>
