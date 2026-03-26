<template>
  <section class="mb-8">
    <h2 class="text-white font-black text-xl mb-3 px-4">Sobre</h2>
    <div class="overflow-hidden rounded-xl mx-4" style="background: rgb(24,24,24);">
      <!-- Imagen -->
      <div class="relative w-full" style="height: 300px;">
        <img alt="" class="w-full h-full object-cover" :src="image" />
        <div class="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#181818] to-transparent" />
      </div>

      <!-- Descripción -->
      <div class="px-4 pb-4" style="padding-top: 12px;">
        <p class="text-sm leading-relaxed" style="color: rgb(179,179,179);">{{ description }}</p>
        <p class="text-xs font-bold mt-3" style="color: rgb(29,185,84);">{{ since }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  image?: string
  description?: string
  since?: string
}>()
</script>
