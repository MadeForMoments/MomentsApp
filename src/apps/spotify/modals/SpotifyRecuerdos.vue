<template>
  <Transition name="slide-up">
    <div v-if="show" class="absolute inset-0 z-[100] flex justify-center overflow-hidden" style="background: rgba(0,0,0,0.6);">
      <div class="relative w-full max-w-[450px] h-full overflow-hidden">
        <div class="absolute inset-0 w-full z-[60] flex flex-col overflow-hidden" style="background: rgba(5,5,8,0.9); backdrop-filter: blur(32px);">

          <!-- Glow superior -->
          <div class="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-56 rounded-full pointer-events-none opacity-20 z-0"
            style="background: radial-gradient(rgba(220,38,38,0.2), transparent 70%); filter: blur(40px);" />

          <!-- Hero con imagen -->
          <div class="relative h-[42%] w-full flex-shrink-0 overflow-hidden">
            <div class="absolute inset-0 bg-cover bg-center bg-no-repeat scale-[1.04]"
              :style="{ backgroundImage: `url(${memories[0]?.image})` }" />
            <div class="absolute inset-0 bg-black/40" />
            <div class="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />
            <div class="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-black/60 to-transparent" />

            <!-- Contenido hero -->
            <div class="relative z-10 flex flex-col items-center justify-end h-full px-5 pb-7">
              <div class="flex items-center gap-1.5 mb-3">
                <div class="h-px w-8 bg-white/30" />
                <span class="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">Revive los momentos especiales</span>
                <div class="h-px w-8 bg-white/30" />
              </div>
              <h1 class="text-[2.2rem] leading-tight font-bold tracking-tight text-center drop-shadow-2xl text-white"
                style="text-shadow: rgba(0,0,0,0.8) 0px 2px 24px, rgba(0,0,0,0.9) 0px 1px 4px;">
                Recuerdos
              </h1>
              <div class="mt-3 flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/15"
                style="background: rgba(0,0,0,0.45); backdrop-filter: blur(8px);">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
                  class="w-3 h-3 text-red-400">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
                <span class="text-[11px] text-white/70 font-medium">{{ memories.length }} memórias</span>
              </div>
            </div>
          </div>

          <!-- Botón cerrar -->
          <div class="absolute top-4 right-4 z-50">
            <button
              class="w-10 h-10 rounded-full flex items-center justify-center text-white"
              style="background: rgba(0,0,0,0.35);"
              @click="$emit('close')"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
                <path d="M18 6 6 18" /><path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          <!-- Timeline scrollable -->
          <div class="relative z-10 flex-1 overflow-y-auto overflow-x-hidden px-4 pb-28">
            <div class="relative pt-8">
              <!-- Línea central punteada -->
              <div class="absolute top-0 bottom-0 w-px pointer-events-none"
                style="left: 50%; transform: translateX(-50%); background-image: repeating-linear-gradient(rgba(255,255,255,0.28) 0px, rgba(255,255,255,0.28) 8px, transparent 8px, transparent 16px);" />

              <div class="flex flex-col gap-8">
                <div
                  v-for="(memory, idx) in memories"
                  :key="memory.index"
                  class="flex w-full items-start"
                  :class="idx % 2 === 0 ? '' : 'flex-row-reverse'"
                >
                  <!-- Texto (izquierda en par, derecha en impar alternado) -->
                  <div class="flex-1 min-w-0" :class="idx % 2 === 0 ? 'pr-2' : 'pl-2'">
                    <div class="flex flex-col gap-1 pt-2" :class="idx % 2 === 0 ? 'items-end text-right' : 'items-start text-left'">
                      <span class="text-[40px] font-bold leading-none select-none pointer-events-none block"
                        style="color: rgba(255,255,255,0.22); opacity: 0.25; font-family: sans-serif; line-height: 1;">
                        {{ String(memory.index).padStart(2, '0') }}
                      </span>
                      <p class="text-[12px] leading-snug mb-2" style="color: rgb(239,68,68);">{{ memory.date }}</p>
                      <p class="text-neutral-400 text-[11px] leading-relaxed line-clamp-4 mt-1">{{ memory.text }}</p>
                    </div>
                  </div>

                  <!-- Ícono central -->
                  <div class="w-10 flex-shrink-0 flex flex-col items-center pt-6">
                    <div class="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                      style="background-color: rgb(220,38,38); box-shadow: rgba(220,38,38,0.565) 0px 0px 12px, rgba(220,38,38,0.314) 0px 0px 24px;">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        fill="white" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="w-3.5 h-3.5 text-white">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                      </svg>
                    </div>
                  </div>

                  <!-- Foto tipo polaroid -->
                  <div class="flex-1 min-w-0" :class="idx % 2 === 0 ? 'pl-2' : 'pr-2'">
                    <button class="group cursor-pointer focus:outline-none w-full">
                      <div
                        class="bg-white p-2 shadow-2xl transition-transform duration-300 group-hover:scale-[1.03] group-active:scale-[0.97]"
                        :style="{ transform: `rotate(${idx % 2 === 0 ? -1.8 : 1.8}deg)`, boxShadow: 'rgba(0,0,0,0.7) 0px 10px 40px, rgba(0,0,0,0.5) 6px 6px 20px' }"
                      >
                        <div class="w-full aspect-square overflow-hidden bg-neutral-900 rounded-sm">
                          <div class="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                            :style="{ backgroundImage: `url(${memory.image})` }" />
                        </div>
                        <p class="text-neutral-800 text-center mt-2 mb-1 text-[13px] leading-tight line-clamp-2 px-1"
                          style="min-height: 2.2rem;">{{ memory.title }}</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Footer -->
              <div class="flex flex-col items-center mt-8 gap-2 pb-4">
                <div class="w-8 h-8 rounded-full flex items-center justify-center"
                  style="background-color: rgba(220,38,38,0.125); border: 2px solid rgba(220,38,38,0.376);">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="w-4 h-4" style="color: rgb(220,38,38);">
                    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
                    <path d="M20 3v4" /><path d="M22 5h-4" /><path d="M4 17v2" /><path d="M5 18H3" />
                  </svg>
                </div>
                <p class="text-xs" style="color: rgba(255,255,255,0.55);">{{ memories.length }} memórias</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
export interface Memory {
  index: number
  date: string
  text: string
  image: string
  title: string
}

defineProps<{
  show: boolean
  memories: Memory[]
}>()

defineEmits<{ close: [] }>()
</script>

<style scoped>
.slide-up-enter-active, .slide-up-leave-active { transition: transform 0.35s cubic-bezier(0.32,0.72,0,1); }
.slide-up-enter-from, .slide-up-leave-to { transform: translateY(100%); }
</style>
