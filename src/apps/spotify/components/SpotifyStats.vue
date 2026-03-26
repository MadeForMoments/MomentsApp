<template>
  <div class="px-4 mb-6">
    <div class="grid grid-cols-3 gap-2">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="rounded-xl p-3 text-center"
        style="background: rgb(24,24,24);"
      >
        <p class="font-black text-2xl" style="color: rgb(29,185,84);">{{ stat.value }}</p>
        <p class="text-[10px] uppercase tracking-wide mt-0.5" style="color: rgb(179,179,179);">{{ stat.label }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface Stat {
  value: string
  label: string
}

defineProps<{
  stats: Stat[]
}>()
</script>
