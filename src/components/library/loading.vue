<template>
  <div class="loading-container" :class="{ loading: isLoadingModel || isLoadingHdr }">
    <img src="@/assets/icons/fire.svg" alt="" />
    <div class="text">火热加载中</div>
  </div>
</template>
<script setup>
import { productStore } from '@/store/product.js'
import { storeToRefs } from 'pinia'
const store = productStore()
const { isLoadingModel, isLoadingHdr } = storeToRefs(store)
</script>

<style lang="scss" scoped>
.loading-container {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  z-index: 101;
  display: none;
  user-select: none;
  &.loading {
    display: block;
  }
  img {
    width: 100%;
    height: 100%;
  }
  .text {
    text-align: center;
    font-size: 20px;
    color: rgb(255, 255, 255);
    // transform: translate(0,-60%);
    text-shadow: 0 0 30px black;
  }
}
</style>
