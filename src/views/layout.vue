<template>
  <div class="holder" v-show="!store.isFullscreen"></div>
  <div class="holder" v-show="false"></div>
  <Header></Header>
  <router-view></router-view>
</template>
<script setup>
// import Header from '@/components/home/header.vue'
import { productStore } from '@/store/product.js'
import { useRouter } from 'vue-router'
const router = useRouter()
const store = productStore()
// onMounted(() => {
//   router.push()
// })
</script>

<style scoped lang="scss">
.holder {
  height: 46px;
}
</style>
