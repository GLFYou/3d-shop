import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '@/router'
import store from '@/store/index.js'
import '@/assets/styles/normalize.css'
import '@/assets/styles/common.scss'
import 'ant-design-vue/dist/antd.css'

createApp(App).use(router).use(store).mount('#app')
