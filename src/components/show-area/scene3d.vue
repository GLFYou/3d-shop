<template>
  <div class="scene3d-container" id="scene"></div>
</template>
<script setup>
import Base3d from '@/utils/base3d.js'
import { productStore } from '@/store/product.js'
import { storeToRefs } from 'pinia'

const props = defineProps({
  activeModel: {
    default: '',
    type: String
  },
  activeHdr: {
    default: '',
    type: String
  },
  scale: {
    default: 1,
    type: Number
  }
})
const data = reactive({ base3d: {} })
const store = productStore()
const { isLoadingModel, isLoadingHdr } = storeToRefs(store)
watch(
  () => props.activeModel,
  (newVal) => {
    data.base3d.setModel(props.activeModel, props.scale)
  }
)
watch(
  () => props.activeHdr,
  (newVal) => {
    data.base3d.setEnvMap(newVal)
  }
)
watch(
  () => [data.base3d.loadingModel, data.base3d.loadingHdr],
  ([val1, val2]) => {
    // console.log({ val1, val2 })
    console.log('val1', val1)
    console.log('val2', val2)
    isLoadingModel.value = val1
    isLoadingHdr.value = val2
  },
  {
    // deep: true,
    // immediate: true
  }
)

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
