import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomePage.vue'),
  },
  {
    path: '/artur',
    name: 'artur',
    component: () => import('@/pages/ArturPage.vue'),
  },
  {
    path: '/aza',
    name: 'aza',
    component: () => import('@/pages/AzaPage.vue'),
  },
  {
    path: '/el',
    name: 'el',
    component: () => import('@/pages/ElPage.vue'),
  },
  {
    path: '/ziraela',
    name: 'ziraela',
    component: () => import('@/pages/ZiraelaPage.vue'),
  },
  {
    path: '/barandur',
    name: 'barandur',
    component: () => import('@/pages/BarandurPage.vue'),
  },
  {
    path: '/malbrin',
    name: 'malbrin',
    component: () => import('@/pages/MalbrinPage.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})