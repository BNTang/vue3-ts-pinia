import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: () => import('../views/login/index.vue')
    },
    {
      path: '/main',
      component: () => import('../views/main/index.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/404/index.vue')
    }
  ]
})

export default router
