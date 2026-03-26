<template>
  <div class="absolute inset-0 flex justify-center">
    <div class="w-full max-w-[450px] h-full overflow-hidden relative">
      <div
        class="h-full flex flex-col relative overflow-hidden"
        style="background: rgb(18,18,18); color: rgb(255,255,255);"
      >

        <!-- Navbar con logo y avatar -->
        <SpotifyNavBar :initials="data.userInitials" />

        <!-- Contenido desplazable -->
        <div class="flex-1 overflow-y-auto no-scrollbar">

          <SpotifyHero
            :image="data.heroImage"
            :artist-name="data.artistName"
            :subtitle="data.subtitle"
          />

          <SpotifyArtistActions :image="data.heroImage" />

          <SpotifyTabs :tabs="data.tabs" v-model:active-tab="activeTab" />

          <SpotifyStats :stats="data.stats" />

          <SpotifyTrackList :tracks="data.tracks" :skeleton-count="2" />

          <SpotifyAbout
            :image="data.heroImage"
            :description="data.aboutDescription"
            :since="data.since"
          />

          <SpotifySeeAlso :items="seeAlsoItems" />

          <div style="height: 108px;" />
        </div>

        <!-- Mini reproductor → abre MediaPlayer -->
        <div @click="openModal('player')">
          <SpotifyMiniPlayer
            :title="data.nowPlaying.title"
            :artist="data.nowPlaying.artist"
            :image="data.nowPlaying.image"
            :progress="data.nowPlaying.progress"
          />
        </div>
      </div>

      <!-- ───── MODALES ───── -->

      <!-- Reproductor expandido -->
      <SpotifyMediaPlayer
        :show="activeModal === 'player'"
        :track="{ title: data.nowPlaying.title, artist: 'Noah Kahan', image: data.nowPlaying.image, duration: '4:47', progress: data.nowPlaying.progress }"
        :artist-name="data.artistName"
        context="Populares"
        :lyrics="data.aboutDescription"
        :gallery="data.tracks.map(t => t.image)"
        @close="closeModal"
      />

      <!-- Recuerdos -->
      <SpotifyRecuerdos
        :show="activeModal === 'recuerdos'"
        :memories="data.memories"
        @close="closeModal"
      />

      <!-- Logros -->
      <SpotifyLogros
        :show="activeModal === 'logros'"
        :groups="data.achievementGroups"
        @close="closeModal"
      />

      <!-- Curiosidades -->
      <SpotifyCuriosidades
        :show="activeModal === 'curiosidades'"
        :slides="data.curiosidadSlides"
        @close="closeModal"
      />

      <!-- Mapa Astral -->
      <SpotifyMapaAstral
        :show="activeModal === 'mapa-astral'"
        :couple-name="data.artistName"
        :quote="data.mapaAstral.quote"
        :location="data.mapaAstral.location"
        :date="data.mapaAstral.date"
        :coords="data.mapaAstral.coords"
        :main-stars="data.mapaAstral.stars"
        :constellation-lines="data.mapaAstral.lines"
        @close="closeModal"
      />

      <!-- Ruleta -->
      <SpotifyRuleta
        :show="activeModal === 'ruleta'"
        :question="data.ruleta.question"
        :items="data.ruleta.items"
        @close="closeModal"
      />

      <!-- Viaje en el Mapa -->
      <SpotifyViajeEnMapa
        :show="activeModal === 'viaje'"
        :places="data.mapPlaces"
        @close="closeModal"
      />

      <!-- Visor de foto -->
      <SpotifyPhotoViewer
        :show="activeModal === 'photo'"
        :src="photoViewerSrc"
        @close="closeModal"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, h } from 'vue'

// ─── Componentes base ──────────────────────────────────────────────────────
import SpotifyNavBar from './components/SpotifyNavBar.vue'
import SpotifyHero from './components/SpotifyHero.vue'
import SpotifyArtistActions from './components/SpotifyArtistActions.vue'
import SpotifyTabs from './components/SpotifyTabs.vue'
import SpotifyStats from './components/SpotifyStats.vue'
import SpotifyTrackList from './components/SpotifyTrackList.vue'
import SpotifyAbout from './components/SpotifyAbout.vue'
import SpotifySeeAlso from './components/SpotifySeeAlso.vue'
import SpotifyMiniPlayer from './components/SpotifyMiniPlayer.vue'

// ─── Player ────────────────────────────────────────────────────────────────
import SpotifyMediaPlayer from './player/SpotifyMediaPlayer.vue'
import SpotifyPhotoViewer from './player/SpotifyPhotoViewer.vue'

// ─── Modales ───────────────────────────────────────────────────────────────
import SpotifyRecuerdos from './modals/SpotifyRecuerdos.vue'
import SpotifyLogros from './modals/SpotifyLogros.vue'
import SpotifyCuriosidades from './modals/SpotifyCuriosidades.vue'
import SpotifyMapaAstral from './modals/SpotifyMapaAstral.vue'
import SpotifyRuleta from './modals/SpotifyRuleta.vue'
import SpotifyViajeEnMapa from './modals/SpotifyViajeEnMapa.vue'

import type { SeeAlsoItem } from './components/SpotifySeeAlso.vue'
import type { CuriosidadSlide } from './modals/SpotifyCuriosidades.vue'

// ─── Imágenes ─────────────────────────────────────────────────────────────
import img1 from '@/assets/images/1.webp'
import img2 from '@/assets/images/2.webp'
import img3 from '@/assets/images/3.webp'
import img4 from '@/assets/images/4.webp'
import img5 from '@/assets/images/5.webp'
import img6 from '@/assets/images/6.webp'

// ─── Navegación de modales ────────────────────────────────────────────────
const activeModal = ref<string | null>(null)
const photoViewerSrc = ref('')
const activeTab = ref('Músicas')

function openModal(name: string) { activeModal.value = name }
function closeModal() { activeModal.value = null }

// ─── Datos centralizados ──────────────────────────────────────────────────
const data = {
  userInitials: 'HZ',
  heroImage: img1,
  artistName: 'Ana & João',
  subtitle: '1.501 días de historia',
  tabs: ['Músicas', 'Eventos', 'Loja'],
  stats: [
    { value: '4', label: 'Años juntos' },
    { value: '1.501', label: 'Días de historia' },
    { value: '13/02', label: 'Desde' },
  ],
  tracks: [
    { index: 1, title: 'Memoria 1', artist: 'Noah Kahan', image: img1, duration: '2:47', active: true },
    { index: 2, title: 'Memoria 2', artist: 'Noah Kahan', image: img2, duration: '3:15' },
    { index: 3, title: 'Memoria 3', artist: 'Noah Kahan', image: img3, duration: '4:01' },
    { index: 4, title: 'Memoria 4', artist: 'Noah Kahan', image: img4, duration: '2:58' },
    { index: 5, title: 'Memoria 5', artist: 'Noah Kahan', image: img5, duration: '3:33' },
    { index: 6, title: 'Memoria 6', artist: 'Noah Kahan', image: img6, duration: '3:44' },
  ],
  aboutDescription: 'Eres la razón de mi sonrisa cada día. Desde el primer momento que te vi, supe que mi vida nunca volvería a ser la misma. Cada segundo a tu lado es un regalo que guardo en el corazón. Te amo más de lo que las palabras pueden expresar.',
  since: 'Juntos desde 13/02/2022',
  nowPlaying: {
    title: "You're Gonna Go Far",
    artist: 'Noah Kahan',
    image: img1,
    progress: 0,
  },
  memories: [
    { index: 1, date: '13 de fevereiro, 2022', title: 'Nuestra primera cita', text: 'Fue en un pequeño café del centro. Estaba nerviosa, pero tu sonrisa me puso cómoda de inmediato.', image: img1 },
    { index: 2, date: '09 de julho, 2022', title: 'Viaje a la costa', text: 'Tres días con los pies en la arena, sin prisa. El mejor viaje de mi vida hasta ese momento.', image: img2 },
    { index: 3, date: '24 de dezembro, 2022', title: 'Nuestra primera Navidad juntos', text: 'Familia reunida, risas y ese postre que insististe en hacer desde cero.', image: img3 },
    { index: 4, date: '13 de fevereiro, 2023', title: 'Aniversario de 1 año', text: 'Cenamos en ese restaurante con vista al río. Llegaste con flores y casi lloré.', image: img4 },
    { index: 5, date: '31 de maio, 2023', title: 'Nos mudamos juntos', text: 'Cajas por todos lados, pizza en el suelo y la mejor sensación de nuevo comienzo.', image: img5 },
    { index: 6, date: '30 de dezembro, 2023', title: 'Nochevieja en familia', text: 'Contamos los segundos juntos y lo primero que hice fue abrazarte bien fuerte.', image: img6 },
  ],
  achievementGroups: [
    {
      title: 'Línea de Tiempo',
      items: [
        { emoji: '🌱', title: 'Un Mes Juntos', description: 'Completaron 1 mes de historia', color: 'rgb(52,211,153)', level: 1, stars: 1, unlocked: true, progress: 100, progressLabel: '1501/30 días' },
        { emoji: '🌿', title: 'Tres Meses', description: 'Tres meses de momentos especiales', color: 'rgb(16,185,129)', level: 2, stars: 2, unlocked: true, progress: 100, progressLabel: '1501/90 días' },
        { emoji: '🌺', title: 'Seis Meses', description: 'Medio año de historias compartidas', color: 'rgb(244,114,182)', level: 3, stars: 3, unlocked: true, progress: 100, progressLabel: '1501/180 días' },
        { emoji: '🎂', title: '¡Un Año!', description: 'Un año entero de complicidad', color: 'rgb(240,192,96)', level: 4, stars: 4, unlocked: true, progress: 100, progressLabel: '1501/365 días' },
        { emoji: '💎', title: 'Tres Años', description: 'Una bonita historia que solo crece', color: 'rgb(96,191,250)', level: 5, stars: 5, unlocked: true, progress: 100, progressLabel: '1501/1095 días' },
        { emoji: '👑', title: 'Cinco Años', description: 'A mitad de camino hacia la leyenda', color: 'rgb(251,191,36)', level: 5, stars: 5, unlocked: false, progress: 82, progressLabel: '1501/1825 días' },
        { emoji: '🏆', title: '¡Una Década!', description: 'Diez años de una historia épica', color: 'rgb(251,146,60)', level: 5, stars: 5, unlocked: false, progress: 41, progressLabel: '1501/3650 días' },
      ],
    },
    {
      title: 'Recuerdos',
      items: [
        { emoji: '📸', title: 'Primer Recuerdo', description: 'Registró el primer momento especial', color: 'rgb(220,38,38)', level: 1, stars: 1, unlocked: true },
        { emoji: '🗂️', title: 'Coleccionista', description: '5 recuerdos registrados', color: 'rgb(155,109,255)', level: 2, stars: 2, unlocked: true, progress: 100, progressLabel: '6/5 recuerdos' },
        { emoji: '📚', title: 'Historiador', description: '10 recuerdos registrados', color: 'rgb(96,191,250)', level: 3, stars: 3, unlocked: false, progress: 60, progressLabel: '6/10 recuerdos' },
        { emoji: '🏛️', title: 'Archivo Vivo', description: '20 recuerdos registrados', color: 'rgb(240,192,96)', level: 4, stars: 4, unlocked: false, progress: 30, progressLabel: '6/20 recuerdos' },
      ],
    },
    {
      title: 'Perfil',
      items: [
        { emoji: '✍️', title: 'Autor de Historias', description: 'Escribió su propia historia de amor', color: 'rgb(244,114,182)', level: 1, stars: 1, unlocked: true },
        { emoji: '🎵', title: 'Nuestra Canción', description: 'Eligió la banda sonora de la historia', color: 'rgb(52,211,153)', level: 1, stars: 1, unlocked: true },
        { emoji: '🖼️', title: 'En Fotos', description: 'Inmortalizó momentos en fotos', color: 'rgb(251,146,60)', level: 1, stars: 1, unlocked: true },
        { emoji: '⭐', title: 'Todo Perfecto', description: 'Completó todos los detalles de la página', color: 'rgb(240,192,96)', level: 4, stars: 4, unlocked: true },
      ],
    },
  ],
  curiosidadSlides: [] as CuriosidadSlide[], // definidos abajo
  mapaAstral: {
    quote: '"El cielo cuando nos conocimos"',
    location: 'São Paulo, Brasil',
    date: '13 de fevereiro de 2022',
    coords: '23.5505°S 46.6333°W',
    stars: [
      { cx: 266.6, cy: 117.4, opacity: 1 },
      { cx: 196.3, cy: 231.2, opacity: 1 },
      { cx: 65.2, cy: 170.4, opacity: 1 },
      { cx: 193.1, cy: 206.2, opacity: 1 },
      { cx: 277.5, cy: 186.2, opacity: 1 },
      { cx: 250.8, cy: 126.9, opacity: 1 },
      { cx: 150.3, cy: 111.2, opacity: 1 },
      { cx: 265.3, cy: 235.5, opacity: 1 },
    ],
    lines: [
      'M266.6,117.4 L196.3,231.2 L65.2,170.4 L193.1,206.2',
      'M277.5,186.2 L250.8,126.9 L150.3,111.2 L265.3,235.5',
      'M181.0,198.1 L272.3,240.3 L56.0,194.7',
      'M196.4,98.8 L252.3,161.4 L55.6,170.9',
    ],
  },
  ruleta: {
    question: '¿Cuál fue el mejor momento que vivimos juntos?',
    items: [
      'Nuestro primer beso',
      'Nuestro primer viaje',
      'Cuando nos mudamos',
      'Nuestra primera Navidad',
      'Aquella tarde de lluvia',
      'El día que dijimos "te amo"',
    ],
  },
  mapPlaces: [
    { label: 'São Paulo — donde todo comenzó', image: img1, date: '13/02/2022', description: 'Fue aquí donde nuestra historia comenzó.', x: 225, y: 365 },
    { label: 'Florianópolis — la isla del amor', image: img3, date: '09/07/2022', description: 'Tres días perfectos con la arena y el mar.', x: 200, y: 430 },
    { label: 'Río de Janeiro — la ciudad maravillosa', image: img5, date: '15/12/2022', description: 'El Cristo nos miraba mientras nos dábamos la mano.', x: 280, y: 340 },
    { label: 'París — la ville de l\'amour', image: img2, date: '19/09/2023', description: 'Subimos a la Torre Eiffel de noche, con las luces de la ciudad abajo. Inolvidable.', x: 160, y: 280 },
  ],
}

// ─── Slides de Curiosidades (render functions) ────────────────────────────
// Sol (Verano)
const SunVisual = {
  render: () => h('div', { class: 'relative flex items-center justify-center', style: 'width: 160px; height: 160px;' }, [
    h('div', { class: 'absolute rounded-full', style: 'width: 160px; height: 160px; background: radial-gradient(circle, rgba(250,204,21,0.35) 0%, transparent 75%);' }),
    h('div', { class: 'absolute rounded-full', style: 'width: 80px; height: 80px; background: radial-gradient(circle at 38% 35%, rgb(254,240,138) 0%, rgb(250,204,21) 40%, rgb(234,179,8) 75%, rgb(202,138,4) 100%);' }),
    h('div', { class: 'absolute rounded-full pointer-events-none', style: 'width: 80px; height: 80px; background: radial-gradient(circle at 35% 30%, rgba(255,255,255,0.35) 0%, transparent 55%);' }),
  ]),
}

// Luna (Cuarto Creciente / Domingo)
const MoonVisual = {
  render: () => h('div', { class: 'relative flex items-center justify-center', style: 'width: 160px; height: 160px;' }, [
    h('div', { class: 'absolute rounded-full', style: 'width: 160px; height: 160px; background: radial-gradient(circle, rgba(186,230,253,0.18) 0%, transparent 75%);' }),
    h('div', { class: 'absolute rounded-full overflow-hidden', style: 'width: 84px; height: 84px; background: radial-gradient(circle at 40% 35%, rgb(241,245,249) 0%, rgb(203,213,225) 45%, rgb(148,163,184) 80%, rgb(100,116,139) 100%);' }, [
      h('div', { class: 'absolute inset-0 rounded-full', style: 'background: radial-gradient(circle at 68% 45%, rgba(10,15,30,0.88) 30%, transparent 65%);' }),
      h('div', { class: 'absolute inset-0 rounded-full', style: 'background: radial-gradient(circle at 32% 28%, rgba(255,255,255,0.3) 0%, transparent 50%);' }),
    ]),
  ]),
}

data.curiosidadSlides = [
  {
    label: 'Durante la estación de',
    value: 'Verano',
    description: 'Ese fue el ambiente cuando su historia comenzó.',
    bgGradient: 'radial-gradient(at 50% 0%, rgba(234,179,8,0.18) 0%, rgba(5,5,8,0.97) 60%)',
    glowColor: 'radial-gradient(rgba(250,204,21,0.22) 0%, transparent 70%)',
    glowShadow: 'rgba(234,179,8,0.7)',
    glowShadow2: 'rgba(234,179,8,0.3)',
    valueColor: 'rgb(253,230,138)',
    dotColor: 'rgb(250,204,21)',
    visual: SunVisual,
  },
  {
    label: 'Esta historia comenzó bajo',
    value: 'Cuarto Creciente',
    description: 'El cielo ya estaba a favor de ustedes.',
    bgGradient: 'radial-gradient(at 50% 0%, rgba(30,41,59,0.85) 0%, rgba(5,5,8,0.97) 60%)',
    glowColor: 'radial-gradient(rgba(186,230,253,0.1) 0%, transparent 70%)',
    glowShadow: 'rgba(186,230,253,0.5)',
    glowShadow2: 'rgba(148,163,184,0.25)',
    valueColor: 'rgb(226,232,240)',
    dotColor: 'rgb(148,163,184)',
    visual: MoonVisual,
  },
  {
    label: 'Todo comenzó en',
    value: 'Domingo',
    description: 'Y este momento especial ya suma 1501 días.',
    bgGradient: 'radial-gradient(at 50% 0%, rgba(30,41,59,0.85) 0%, rgba(5,5,8,0.97) 60%)',
    glowColor: 'radial-gradient(rgba(186,230,253,0.1) 0%, transparent 70%)',
    glowShadow: 'rgba(186,230,253,0.5)',
    glowShadow2: 'rgba(148,163,184,0.25)',
    valueColor: 'rgb(226,232,240)',
    dotColor: 'rgb(148,163,184)',
    visual: MoonVisual,
  },
]

// ─── Ítems "Ver también" con apertura de modales ──────────────────────────
const seeAlsoItems: SeeAlsoItem[] = [
  {
    label: 'Recuerdos',
    color: 'rgb(220,38,38)',
    icon: {
      render: () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: 26, height: 26, viewBox: '0 0 24 24', fill: 'none', stroke: 'rgb(220,38,38)', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', onClick: () => openModal('recuerdos') }, [
        h('path', { d: 'M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z' }),
      ]),
    },
  },
  {
    label: 'Logros',
    color: 'rgb(240,192,96)',
    icon: {
      render: () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: 26, height: 26, viewBox: '0 0 24 24', fill: 'none', stroke: 'rgb(240,192,96)', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', onClick: () => openModal('logros') }, [
        h('path', { d: 'M6 9H4.5a2.5 2.5 0 0 1 0-5H6' }),
        h('path', { d: 'M18 9h1.5a2.5 2.5 0 0 0 0-5H18' }),
        h('path', { d: 'M4 22h16' }),
        h('path', { d: 'M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22' }),
        h('path', { d: 'M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22' }),
        h('path', { d: 'M18 2H6v7a6 6 0 0 0 12 0V2Z' }),
      ]),
    },
  },
  {
    label: 'Curiosidades',
    color: 'rgb(155,109,255)',
    icon: {
      render: () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: 26, height: 26, viewBox: '0 0 24 24', fill: 'none', stroke: 'rgb(155,109,255)', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', onClick: () => openModal('curiosidades') }, [
        h('path', { d: 'M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z' }),
        h('path', { d: 'M20 3v4' }), h('path', { d: 'M22 5h-4' }), h('path', { d: 'M4 17v2' }), h('path', { d: 'M5 18H3' }),
      ]),
    },
  },
  {
    label: 'Mapa Astral',
    color: 'rgb(96,191,250)',
    icon: {
      render: () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: 26, height: 26, viewBox: '0 0 24 24', fill: 'none', stroke: 'rgb(96,191,250)', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', onClick: () => openModal('mapa-astral') }, [
        h('polygon', { points: '12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' }),
      ]),
    },
  },
  {
    label: 'Viaje en el Mapa',
    color: 'rgb(52,211,153)',
    icon: {
      render: () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: 26, height: 26, viewBox: '0 0 24 24', fill: 'none', stroke: 'rgb(52,211,153)', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', onClick: () => openModal('viaje') }, [
        h('path', { d: 'm16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z' }),
        h('circle', { cx: 12, cy: 12, r: 10 }),
      ]),
    },
  },
  {
    label: 'Ruleta Sorpresa',
    color: 'rgb(251,146,60)',
    icon: {
      render: () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: 26, height: 26, viewBox: '0 0 24 24', fill: 'none', stroke: 'rgb(251,146,60)', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', onClick: () => openModal('ruleta') }, [
        h('path', { d: 'M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8' }),
        h('path', { d: 'M21 3v5h-5' }),
      ]),
    },
  },
]
</script>
