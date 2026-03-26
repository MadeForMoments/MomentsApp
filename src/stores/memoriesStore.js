import { defineStore } from 'pinia'

export const useMemoriesStore = defineStore('memories', {
  state: () => ({
    memories: [],
  }),
  actions: {},
})
