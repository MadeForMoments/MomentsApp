// ─── Map Places Configuration ─────────────────────────────────────────────
// Edit this file to add or update journey locations for the "Viaje en el Mapa" modal.
// Each place needs real lat/lng coordinates, a photo, and optional music/description.

export interface MapPlaceConfig {
  /** Display label shown on the polaroid marker and story header */
  label: string
  /** Path to the photo used for the polaroid marker and story background */
  image: string
  /** Real geographic latitude */
  lat: number
  /** Real geographic longitude */
  lng: number
  /** Date string shown in the story overlay, e.g. "13/02/2022" */
  date?: string
  /** Short description shown in the story overlay */
  description?: string
  /**
   * Optional per-place music file path (relative to /public).
   * Falls back to mapMusic.src if not set.
   * Example: "/music/sao-paulo.mp3"
   */
  music?: string
}

/** Global fallback music played when a place doesn't define its own `music` */
export const mapMusic: { src: string } | null = null
// Example: export const mapMusic = { src: '/music/journey.mp3' }

/** Initial map center and zoom level — adjust to frame your locations */
export const mapConfig = {
  /** [lat, lng] of the map center when the modal opens */
  center: [-12.09, -77.04] as [number, number],
  /** Leaflet zoom level (1=world, 5=country, 10=city, 15=street) */
  zoom: 12,
}

// ─── Your Journey Places ──────────────────────────────────────────────────
// Import your images from @/assets/images or reference /public paths directly.
// Replace the examples below with your real locations.

import img1 from '@/assets/images/1.webp'
import img2 from '@/assets/images/2.webp'
import img3 from '@/assets/images/3.webp'
import img5 from '@/assets/images/5.webp'

export const mapPlaces: MapPlaceConfig[] = [
  {
    label: 'Miraflores — el malecón de los sueños',
    image: img1,
    lat: -12.1219,
    lng: -77.0289,
    date: '13/02/2022',
    description:
      'Caminamos por el malecón con el mar de fondo y el sol hundiéndose en el Pacífico.',
    // music: '/music/miraflores.mp3',
  },
  {
    label: 'Barranco — el barrio del arte',
    image: img3,
    lat: -12.1497,
    lng: -77.0211,
    date: '09/07/2022',
    description: 'Nos perdimos entre murales y cafés bohemios. Una tarde que no olvidaremos.',
    // music: '/music/barranco.mp3',
  },
  {
    label: 'Plaza Mayor — el corazón de Lima',
    image: img5,
    lat: -12.0453,
    lng: -77.0311,
    date: '15/12/2022',
    description:
      'En el centro histórico, rodeados de historia, nos dimos la mano frente a la catedral.',
    // music: '/music/plaza-mayor.mp3',
  },
  {
    label: 'Larcomar — vistas al Pacífico',
    image: img2,
    lat: -12.1313,
    lng: -77.0306,
    date: '19/09/2023',
    description:
      'Cenar con el océano frente a nosotros y las luces de la ciudad a nuestras espaldas. Inolvidable.',
    // music: '/music/larcomar.mp3',
  },
]
