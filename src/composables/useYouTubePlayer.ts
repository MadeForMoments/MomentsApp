/**
 * Singleton YouTube IFrame player composable.
 *
 * Loads the YouTube IFrame API script once and creates one hidden YT.Player
 * instance that persists for the lifetime of the app. All components share the
 * same player so there is never more than one video playing at a time.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
  }
}

import { usePlayerStore } from '@/stores/playerStore'

// ─── Module-level singletons ────────────────────────────────────────────────
let _player: any = null
let _ready = false
let _resolvers: Array<() => void> = []
let _scriptLoaded = false
let _loadedVideoId = ''
let _pollInterval: ReturnType<typeof setInterval> | null = null

function _stopPoll() {
  if (_pollInterval) {
    clearInterval(_pollInterval)
    _pollInterval = null
  }
}

function _startPoll() {
  _stopPoll()
  _pollInterval = setInterval(() => {
    if (!_player || !_ready) return
    try {
      const store = usePlayerStore()
      store.updateTime(_player.getCurrentTime() ?? 0, _player.getDuration() ?? 0)
    } catch {
      /* ignore transient player errors */
    }
  }, 500)
}

function _ensureContainer() {
  if (document.getElementById('yt-hidden-player')) return
  const div = document.createElement('div')
  div.id = 'yt-hidden-player'
  div.style.cssText =
    'position:fixed;width:1px;height:1px;opacity:0;pointer-events:none;top:-9999px;left:-9999px;z-index:-1;'
  document.body.appendChild(div)
}

function _initPlayer() {
  _ensureContainer()
  _player = new window.YT.Player('yt-hidden-player', {
    width: '1',
    height: '1',
    playerVars: {
      autoplay: 0,
      controls: 0,
      disablekb: 1,
      fs: 0,
      iv_load_policy: 3,
      modestbranding: 1,
      rel: 0,
    },
    events: {
      onReady: () => {
        _ready = true
        _resolvers.forEach((fn) => fn())
        _resolvers = []
      },
      onStateChange: (e: any) => {
        const store = usePlayerStore()
        const S = window.YT.PlayerState
        if (e.data === S.PLAYING) {
          store.isPlaying = true
          _startPoll()
        } else if (e.data === S.PAUSED) {
          store.isPlaying = false
          _stopPoll()
        } else if (e.data === S.ENDED) {
          store.isPlaying = false
          _stopPoll()
          // Reset loaded id so the same video can be restarted from next track
          _loadedVideoId = ''
          store.next()
        }
      },
    },
  })
}

function _waitReady(): Promise<void> {
  if (_ready) return Promise.resolve()
  return new Promise((resolve) => _resolvers.push(resolve))
}

function _loadScript() {
  if (_scriptLoaded) return
  _scriptLoaded = true
  window.onYouTubeIframeAPIReady = _initPlayer
  const tag = document.createElement('script')
  tag.src = 'https://www.youtube.com/iframe_api'
  document.head.appendChild(tag)
}

// ─── Public composable ───────────────────────────────────────────────────────
export function useYouTubePlayer() {
  /** Call once during app startup to begin loading the YT IFrame script early. */
  function init() {
    _loadScript()
  }

  /** Load (and auto-play) a video by its YouTube ID. */
  async function loadVideo(videoId: string) {
    if (!videoId) return
    _loadScript()
    await _waitReady()
    if (_loadedVideoId === videoId) {
      // Same video already loaded – just resume if paused
      _player?.playVideo()
      return
    }
    _loadedVideoId = videoId
    _player.loadVideoById(videoId)
  }

  /** Resume playback for the currently loaded video. */
  async function playVideo() {
    if (!_ready || !_player) return
    _player.playVideo()
  }

  /** Pause playback. */
  function pauseVideo() {
    if (!_ready || !_player) return
    try {
      _player.pauseVideo()
    } catch {
      /* ignore if player not ready yet */
    }
  }

  /** Seek to the given time in seconds. */
  async function seekTo(seconds: number) {
    if (!_ready || !_player) return
    _player.seekTo(seconds, true)
  }

  return { init, loadVideo, playVideo, pauseVideo, seekTo }
}
