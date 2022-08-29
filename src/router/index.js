import { createRouter, createWebHashHistory } from 'vue-router'
const Layout = () => import('@/views/layout.vue')
const Home = () => import('@/views/home/index.vue')
const ShowArea = () => import('@/views/show-area/index.vue')
// import Layout from '@/views/layout.vue'
// import Home from '@/views/home/index.vue'
// import ShowArea from '@/views/show-area/index.vue'

const routes = [
  {
    // path: '/3d-shop-pages',
    path: '/',
    component: Layout,
    redirect: 'home',
    children: [
      {
        path: 'home',
        component: Home
      },
      {
        path: 'show-area',
        component: ShowArea
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
