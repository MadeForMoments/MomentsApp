<template>
  <div class="px-4 flex gap-6 mb-4" style="border-bottom: 1px solid rgba(255,255,255,0.08);">
    <button
      v-for="tab in tabs"
      :key="tab"
      class="pb-3 text-sm font-bold transition-colors"
      :style="{
        color: activeTab === tab ? 'white' : 'rgb(179,179,179)',
        borderBottom: activeTab === tab ? '2px solid rgb(29,185,84)' : '2px solid transparent'
      }"
      @click="$emit('update:activeTab', tab)"
    >
      {{ tab }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  tabs: string[]
  activeTab: string
}>()

defineEmits<{
  'update:activeTab': [value: string]
}>()
</script>
