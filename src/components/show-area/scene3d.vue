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

const setModelHdr = () => {
  watch(
    () => props.activeModel,
    () => {
      data.base3d.setModel(props.activeModel, props.scale)
    },
    {
      immediate: true
    }
  )
  watch(
    () => props.activeHdr,
    (newVal) => {
      data.base3d.setEnvMap(newVal)
    },
    {
      immediate: true
    }
  )
  watch(
    () => [data.base3d.loadingModel, data.base3d.loadingHdr],
    () => {
      isLoadingModel.value = data.base3d.loadingModel
      isLoadingHdr.value = data.base3d.loadingHdr
    },
    {
      immediate: true
    }
  )
}

onMounted(() => {
  data.base3d = new Base3d('#scene')
  setModelHdr()
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
