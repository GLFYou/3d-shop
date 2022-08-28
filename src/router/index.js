import { createRouter, createWebHistory } from 'vue-router'
const Layout = () => import('@/views/layout.vue')
const Home = () => import('@/views/home/index.vue')
const ShowArea = () => import('@/views/show-area/index.vue')

const routes = [
  {
    path: '/3d-shop-pages',
    component: Layout,
    redirect: '/3d-shop-pages/home',
    children: [
      {
        path: '/3d-shop-pages/home',
        component: Home
      },
      {
        path: '/3d-shop-pages/show-area',
        component: ShowArea
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
