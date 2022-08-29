<template>
  <div class="holder" :class="{ hidden: store.isFullscreen }"></div>
  <Header></Header>
  <Loading></Loading>
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
  transition: all 0.5s;
  &.hidden {
    height: 0px;
  }
}
</style>
