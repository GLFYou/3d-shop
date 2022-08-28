<template>
  <div class="show-area-container">
    <div class="leftView" :class="{ hidden: isFullscreen }">
      <div class="title"><crown-outlined /> 产品展示</div>
      <div class="goodsItem" v-for="(item, index) in goodsArr2" :key="index" @click="changeModel(item.modelName, index)">
        <img :src="item.imgsrc" alt="" />
        <div class="goodsName">{{ item.title }}</div>
        <div class="goodsPrice">￥{{ item.price }}</div>
        <div class="selected" :class="{ active: activeModel === index }"><sketch-outlined /></div>
      </div>
    </div>
    <!-- <div class="rightView" :class="{ hidden: isFullscreen }">
      <div class="title"><swap-outlined /> 场景切换</div>
      <div class="sceneItem" v-for="(item, index) in hdrArr" :key="index" @click="changeScene(item, index)">
        <img :src="`./files/hdr/${item}.jpg`" alt="" />
        <div class="selected" :class="{ active: activeScene === index }"><sketch-outlined /></div>
      </div>
    </div> -->
    <!-- <div class="threeBox">3dbox</div> -->
    <Scene3d></Scene3d>
  </div>
</template>
<script setup>
// import { getProducts } from '@/apis/home.js'
import { productStore } from '@/store/product.js'
import { storeToRefs } from 'pinia'
import { CrownOutlined, SwapOutlined, SketchOutlined } from '@ant-design/icons-vue'
import { Modal } from 'ant-design-vue'

const store = productStore()
const hdrArr = ref([])
const goodsArr = ref([])
const goodsArr2 = [
  { title: 'GUCCI 新款女包', price: 17899, imgsrc: 'http://www.glfy.site/images/models/shop3d/model-img/GUCCI-bag.png', modelPath: 'GUCCI-bag.glb' },
  { title: '限量 水晶高跟鞋', price: 6599, imgsrc: 'http://www.glfy.site/images/models/shop3d/model-img/high-heeled-shoes.png', modelPath: 'high-heeled-shoes.glb' }
]
const activeModel = ref(0)
const activeScene = ref(0)
const { isFullscreen } = storeToRefs(store)
const getMyPro = async () => {
  // const res = await getProducts()
  // console.log(res)
  // hdrArr.value = res.hdr
  // goodsArr.value = res.list
}

const changeModel = (name, index) => {
  activeModel.value = index
}
const changeScene = (name, index) => {
  activeScene.value = index
}

const doubleClickFn = (e) => {
  // if (e.deltaY > 0) {
  //   isFullscreen.value = true
  // } else {
  //   isFullscreen.value = false
  // }
  isFullscreen.value = !isFullscreen.value
}

const tipFn = () => {
  const modal = Modal.info({
    title: '提示',
    // content: '左侧选择展示的产品，右侧选择场景；\r\n滚轮向下开启全屏并查看产品，滚轮向上关闭全屏。',
    content: h('div', {}, [h('p', '左侧选择展示的产品，右侧选择场景；'), h('p', '滚轮向下 ↓ 开启全屏并查看产品，滚轮向上 ↑ 关闭全屏。')]),
    okText: '了解'
  })
  let timer = null
  clearTimeout(timer)
  timer = setTimeout(() => {
    clearTimeout(timer)
    modal.destroy()
  }, 20000)
}
onMounted(() => {
  getMyPro()
  // tipFn()
  window.addEventListener('dblclick', doubleClickFn)
})
onBeforeUnmount(() => {
  window.removeEventListener('dblclick', doubleClickFn)
})
</script>

<style lang="scss" scoped>
.show-area-container {
  width: 100vw;
  height: calc(100vh - 46px);
  $item-margin: 15px;

  .leftView,
  .rightView {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-evenly;
    align-items: center;
    position: fixed;
    top: 0;
    padding-top: 46px;
    height: 100%;
    width: 40vw;
    max-width: 200px;
    background-color: rgba(189, 189, 189, 0.42);
    z-index: 2;
    transition: all 0.5s;
    backdrop-filter: blur(10px);
    .title {
      // background-color: #fff;
      margin-top: $item-margin;
      font-size: 20px;
    }
    .selected {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 50px;
      color: rgb(255, 255, 255);
      opacity: 0;
      transition: all 0.2s;
      filter: drop-shadow(0 5px 5px rgba(0, 0, 0, 0.712));
      // text-shadow: 0 0 10px aqua;
      &.active {
        opacity: 1;
      }
    }
  }
  .leftView {
    left: 0;
    &.hidden {
      transform: translateX(-100%);
    }
    .goodsItem {
      position: relative;
      margin: $item-margin;
      margin-bottom: 0;
      flex: 1;
      overflow: hidden;
      box-shadow: 0 0 5px 0 rgba(99, 99, 99, 0.594);
      cursor: pointer;
      &:last-child {
        margin-bottom: $item-margin;
      }
      &:hover .goodsName {
        transform: translateY(0);
        border-radius: 5px 5px 0 0;
      }
      &:hover .goodsPrice {
        transform: translateY(0);
        border-radius: 0 0 5px 5px;
      }

      .goodsName,
      .goodsPrice {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        left: 0;
        width: 100%;
        font-size: 18px;
        height: 20%;
        vertical-align: middle;
        background-color: rgba(255, 255, 255, 0.3);
        backdrop-filter: blur(5px);
        transition: all 0.3s;
        border-radius: 30px;
      }
      .goodsName {
        top: 0;
        transform: translateY(-100%);
      }
      .goodsPrice {
        bottom: 0;
        transform: translateY(100%);
        color: rgb(255, 98, 0);
      }
      img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
        object-fit: cover;
      }
    }
  }
  .rightView {
    right: 0;
    .sceneItem {
      // width: 38vw;
      // max-width: 180px;
      // height: 38vw;
      // max-height: 180px;
      position: relative;
      overflow: hidden;
      box-shadow: 0 0 5px 0 rgba(99, 99, 99, 0.594);
      margin: $item-margin;
      margin-bottom: 0;
      flex: 1;
      cursor: pointer;
      &:last-child {
        margin-bottom: $item-margin;
      }
      img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
        object-fit: cover;
      }
    }
    &.hidden {
      transform: translateX(100%);
    }
  }
}
</style>
