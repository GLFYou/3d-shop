<template>
  <div class="scene3d-container" id="scene"></div>
</template>
<script setup>
import Base3d from '@/utils/base3d.js'

const data = reactive({ base3d: {} })

onMounted(() => {
  data.base3d = new Base3d('#scene')
  console.log(data.base3d)
})
</script>

<style lang="scss" scoped>
.scene3d-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  // background-color: aqua  ;
}
</style>
