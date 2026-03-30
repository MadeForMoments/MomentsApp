import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface PlayerTrack {
  index: number
  title: string
  artist: string
  image: string
  duration: string
  youtubeId?: string
}

export const usePlayerStore = defineStore('player', () => {
  // ─── State ──────────────────────────────────────────────────────────────
  const tracks = ref<PlayerTrack[]>([])
  const currentIndex = ref(0)
  const isPlaying = ref(false)
  const isLiked = ref(false)
  const isFollowing = ref(false)
  const currentTime = ref(0)
  const duration = ref(0)

  // ─── Computed ────────────────────────────────────────────────────────────
  const currentTrack = computed(() => tracks.value[currentIndex.value] ?? null)

  const progress = computed(() =>
    duration.value > 0 ? (currentTime.value / duration.value) * 100 : 0,
  )

  const elapsedLabel = computed(() => _fmt(currentTime.value))

  const remainingLabel = computed(() => `-${_fmt(Math.max(0, duration.value - currentTime.value))}`)

  function _fmt(secs: number): string {
    const s = Math.max(0, Math.floor(secs))
    return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`
  }

  // ─── Actions ─────────────────────────────────────────────────────────────
  function setTracks(list: PlayerTrack[]) {
    tracks.value = list
  }

  function play(index?: number) {
    if (index !== undefined) currentIndex.value = index
    isPlaying.value = true
  }

  function pause() {
    isPlaying.value = false
  }

  function toggle() {
    isPlaying.value = !isPlaying.value
  }

  function next() {
    if (!tracks.value.length) return
    currentIndex.value = (currentIndex.value + 1) % tracks.value.length
    isPlaying.value = true
  }

  function prev() {
    if (!tracks.value.length) return
    if (currentTime.value > 3) {
      currentTime.value = 0
    } else {
      currentIndex.value = (currentIndex.value - 1 + tracks.value.length) % tracks.value.length
    }
    isPlaying.value = true
  }

  function seek(seconds: number) {
    currentTime.value = Math.max(0, seconds)
  }

  function updateTime(time: number, dur: number) {
    currentTime.value = time
    duration.value = dur
  }

  function toggleLike() {
    isLiked.value = !isLiked.value
  }

  function toggleFollow() {
    isFollowing.value = !isFollowing.value
  }

  return {
    tracks,
    currentIndex,
    isPlaying,
    isLiked,
    isFollowing,
    currentTime,
    duration,
    currentTrack,
    progress,
    elapsedLabel,
    remainingLabel,
    setTracks,
    play,
    pause,
    toggle,
    next,
    prev,
    seek,
    updateTime,
    toggleLike,
    toggleFollow,
  }
})
