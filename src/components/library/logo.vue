<template>
  <div class="logo-container">
    <img src="@/assets/icons/atom.svg" alt="" />
    <div class="name">3D商城</div>
  </div>
</template>
<script setup></script>

<style lang="scss" scoped>
.logo-container {
  width: 180px;
  height: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 30%;
    height: 100%;
  }
  .name {
    height: 100%;
    // line-height: 60px;
    width: 70%;
    font-size: 30px;
    text-align: center;
  }
}
</style>
