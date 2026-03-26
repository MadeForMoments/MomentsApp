<template>
  <section class="mb-8">
    <h2 class="text-white font-black text-xl px-4 mb-4">Ver también</h2>
    <div class="flex gap-5 px-4 overflow-x-auto no-scrollbar pb-1">
      <button
        v-for="item in items"
        :key="item.label"
        class="flex flex-col items-center gap-2 flex-shrink-0"
        tabindex="0"
      >
        <div
          class="w-[72px] h-[72px] rounded-full flex items-center justify-center"
          :style="{
            background: `linear-gradient(135deg, ${item.color}35, ${item.color}18)`,
            border: `1.5px solid ${item.color}40`,
            boxShadow: `${item.color}25 0px 0px 18px`
          }"
        >
          <!-- Ícono como slot con nombre -->
          <component :is="item.icon" :color="item.color" />
        </div>
        <span
          class="text-[11px] font-semibold text-center leading-tight max-w-[72px]"
          style="color: rgb(179,179,179);"
        >{{ item.label }}</span>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Component } from 'vue'

export interface SeeAlsoItem {
  label: string
  color: string
  icon: Component
}

defineProps<{
  items: SeeAlsoItem[]
}>()
</script>
