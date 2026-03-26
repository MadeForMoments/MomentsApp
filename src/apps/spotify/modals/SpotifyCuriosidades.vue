<template>
  <Transition name="slide-up">
    <div v-if="show" class="absolute inset-0 z-[100] flex justify-center overflow-hidden" style="background: rgba(0,0,0,0.6);">
      <div class="relative w-full max-w-[450px] h-full overflow-hidden">
        <div class="relative w-full h-full flex flex-col overflow-hidden"
          :style="{ background: currentSlide.bgGradient, backdropFilter: 'blur(32px)', transition: 'background 0.5s' }">

          <!-- Glow superior -->
          <div class="absolute top-0 left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
            style="width: 320px; height: 200px; filter: blur(40px);"
            :style="{ background: currentSlide.glowColor }" />

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

          <!-- Cuerpo del slide -->
          <div class="relative z-10 flex-1 flex flex-col items-center justify-center px-8 pb-28">
            <h2 class="text-3xl font-bold tracking-tight mb-10"
              style="background: linear-gradient(135deg, rgb(240,239,255) 0%, rgba(167,139,250,0.9) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
              Curiosidades
            </h2>

            <Transition name="fade" mode="out-in">
              <div :key="activeIndex" class="flex flex-col items-center text-center w-full">
                <!-- Ícono visual del slide -->
                <div class="mb-8">
                  <div class="relative flex items-center justify-center" style="width: 160px; height: 160px;">
                    <!-- Icono dinámico definido por slot -->
                    <component :is="currentSlide.visual" />
                  </div>
                </div>

                <p class="text-white/70 text-xl font-medium tracking-wide mb-3">{{ currentSlide.label }}</p>
                <p class="text-5xl font-extrabold mb-5 leading-tight"
                  :style="{ color: currentSlide.valueColor, textShadow: `${currentSlide.glowShadow} 0px 0px 24px, ${currentSlide.glowShadow2} 0px 0px 48px` }">
                  {{ currentSlide.value }}
                </p>
                <p class="text-white/55 text-base leading-relaxed max-w-[300px]">{{ currentSlide.description }}</p>
              </div>
            </Transition>
          </div>

          <!-- Navegación inferior -->
          <div class="absolute bottom-0 left-0 right-0 z-20 flex flex-col items-center pb-10 pt-4"
            style="background: linear-gradient(to top, rgba(5,5,8,0.85) 0%, transparent 100%);">
            <!-- Dots -->
            <div class="flex items-center gap-2 mb-5">
              <div v-for="(_, i) in slides" :key="i" class="rounded-full cursor-pointer transition-all"
                :style="i === activeIndex
                  ? { width: '22px', height: '7px', background: currentSlide.dotColor }
                  : { width: '7px', height: '7px', background: 'rgba(255,255,255,0.22)' }"
                @click="activeIndex = i" />
            </div>
            <!-- Prev / Next -->
            <div class="flex items-center gap-6">
              <button
                class="rounded-full flex items-center justify-center border transition-all active:scale-95"
                style="width: 52px; height: 52px; background: rgba(255,255,255,0.07); border-color: rgba(255,255,255,0.15);"
                @click="prev"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white/80">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button
                class="rounded-full flex items-center justify-center border transition-all active:scale-95"
                style="width: 52px; height: 52px; background: rgba(255,255,255,0.07); border-color: rgba(255,255,255,0.15);"
                @click="next"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white/80">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Component } from 'vue'

export interface CuriosidadSlide {
  label: string
  value: string
  description: string
  bgGradient: string
  glowColor: string
  glowShadow: string
  glowShadow2: string
  valueColor: string
  dotColor: string
  visual: Component
}

const props = defineProps<{
  show: boolean
  slides: CuriosidadSlide[]
}>()

defineEmits<{ close: [] }>()

const activeIndex = ref(0)
const currentSlide = computed(() => props.slides[activeIndex.value])

function prev() { activeIndex.value = (activeIndex.value - 1 + props.slides.length) % props.slides.length }
function next() { activeIndex.value = (activeIndex.value + 1) % props.slides.length }
</script>

<style scoped>
.slide-up-enter-active, .slide-up-leave-active { transition: transform 0.35s cubic-bezier(0.32,0.72,0,1); }
.slide-up-enter-from, .slide-up-leave-to { transform: translateY(100%); }
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
