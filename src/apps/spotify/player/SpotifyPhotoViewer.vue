<template>
  <Transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 z-[300] flex justify-center"
      style="background: rgba(0,0,0,0.88);"
    >
      <div class="w-full max-w-[450px] flex flex-col items-center justify-center px-4 gap-4">
        <button
          class="w-9 h-9 flex items-center justify-center rounded-full flex-shrink-0 self-start"
          style="background: rgba(255,255,255,0.18);"
          @click="$emit('close')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white">
            <path d="M18 6 6 18" /><path d="m6 6 12 12" />
          </svg>
        </button>

        <img
          :alt="alt"
          class="w-full object-contain rounded-2xl"
          :src="src"
          style="max-height: 75dvh;"
        />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean
  src?: string
  alt?: string
}>()

defineEmits<{ close: [] }>()
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
