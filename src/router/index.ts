import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/spotify',
    },
    {
      path: '/spotify',
      name: 'spotify',
      component: () => import('../apps/spotify/SpotifyHome.vue'),
    },
  ],
})

export default router
