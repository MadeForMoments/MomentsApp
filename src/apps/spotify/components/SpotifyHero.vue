<template>
  <section class="relative" style="height: 58vh; min-height: 340px;">
    <!-- Imagen de fondo -->
    <div class="absolute inset-0 overflow-hidden" style="opacity: 1;">
      <img alt="" class="w-full h-full object-cover object-center" :src="image" />
    </div>

    <!-- Gradiente inferior -->
    <div class="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/40 to-transparent" />

    <!-- Gradiente superior -->
    <div class="absolute inset-0 bg-gradient-to-b from-black/55 to-transparent" style="height: 100px;" />

    <!-- Contenido inferior -->
    <div class="absolute bottom-0 left-0 right-0 px-4 pb-5">
      <!-- Badge verificado -->
      <div class="flex items-center gap-1.5 mb-2">
        <div
          class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
          style="background: rgb(29, 185, 84);"
        >
          <svg viewBox="0 0 24 24" class="w-3 h-3 fill-white">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        </div>
        <span class="text-white text-xs font-bold">Relación verificada</span>
      </div>

      <!-- Nombre del artista -->
      <h1
        class="text-white font-black leading-none mb-2 drop-shadow-lg"
        style="font-size: clamp(2.2rem, 9vw, 3.4rem); text-shadow: rgba(0,0,0,0.8) 0px 2px 20px;"
      >
        {{ artistName }}
      </h1>

      <!-- Subtítulo -->
      <p class="text-sm font-semibold" style="color: rgba(255,255,255,0.7);">{{ subtitle }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  image?: string
  artistName?: string
  subtitle?: string
}>()
</script>
