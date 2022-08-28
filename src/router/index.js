import { createRouter, createWebHistory } from 'vue-router'
const Layout = () => import('@/views/layout.vue')
const Home = () => import('@/views/home/index.vue')
const ShowArea = () => import('@/views/show-area/index.vue')

const routes = [
  {
    // path: '/3d-shop-pages',
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: Home
      },
      {
        path: '/show-area',
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
