<template>
  <div class="show-area-container" :class="{ hidden: isFullscreen }">
    <div class="leftView" :class="{ hidden: isFullscreen }">
      <div class="title"><crown-outlined /> 产品展示</div>
      <div class="goodsItem" v-for="(item, index) in goodsArr" :key="index" @click="changeModel(index)">
        <img :src="item.imgSrc" alt="" />
        <div class="goodsName">{{ item.title }}</div>
        <div class="goodsPrice">￥{{ item.price }}</div>
        <div class="selected" :class="{ active: activeModel === index }"><sketch-outlined /></div>
      </div>
    </div>
    <div class="rightView" :class="{ hidden: isFullscreen }">
      <div class="title"><swap-outlined /> 场景切换</div>
      <div class="sceneItem" v-for="(item, index) in hdrArr" :key="index" @click="changeScene(index)">
        <img :src="item.imgSrc" alt="" />
        <div class="selected" :class="{ active: activeHdr === index }"><sketch-outlined /></div>
      </div>
    </div>
    <!-- <div class="threeBox">3dbox</div> -->
    <Scene3d :activeModel="goodsArr[activeModel].modelPath" :scale="goodsArr[activeModel].scale" :activeHdr="hdrArr[activeHdr].hdrSrc"></Scene3d>
  </div>
</template>
<script setup>
// import { getProducts } from '@/apis/home.js'
import { productStore } from '@/store/product.js'
import { storeToRefs } from 'pinia'
import { CrownOutlined, SwapOutlined, SketchOutlined } from '@ant-design/icons-vue'
import { Modal } from 'ant-design-vue'

const hdrImgURL = 'http://www.glfy.site/images/models/shop3d/hdr/'
const modelImgURL = 'http://www.glfy.site/images/models/shop3d/model-img/'
const store = productStore()
const activeModel = ref(0)
const activeHdr = ref(0)
const { isFullscreen, isLoadingModel, isLoadingHdr } = storeToRefs(store)
const goodsArr = [
  { title: 'GUCCI新品 包涵优雅', price: '1.78w', imgSrc: modelImgURL + 'GUCCI-bag.png', modelPath: 'GUCCI-bag.glb', scale: 1 },
  { title: '水晶高跟鞋 细致于型', price: 6599, imgSrc: modelImgURL + 'high-heeled-shoes.png', modelPath: 'high-heeled-shoes.glb', scale: 0.008 },
  // { title: '雷电 风驰电掣', price: 4999999, imgSrc: modelImgURL + 'high-heeled-shoes.png', modelPath: 'thunder-hypercar.glb' },
  { title: '兰博基尼 卓越非凡', price: '850w', imgSrc: modelImgURL + 'lamborghini.png', modelPath: 'lamborghini.glb', scale: 1.7 },
  { title: '帕加尼 极致性能', price: '3000w', imgSrc: modelImgURL + 'pagani-car.png', modelPath: 'pagani-car.glb', scale: 0.6 },
  { title: '六神电驴 安全平稳', price: 3800, imgSrc: modelImgURL + 'electrocar.png', modelPath: 'electrocar.glb', scale: 1.8 },
  { title: '山地车 为运动而生', price: '3.5w', imgSrc: modelImgURL + 'frame-bike.png', modelPath: 'frame-bike.glb', scale: 1.2 },
  { title: '电脑桌面 艺术摆件', price: 1516, imgSrc: modelImgURL + 'cute-computer.png', modelPath: 'cute-computer.glb', scale: 0.5 },
  { title: 'AJ1 引领潮流', price: 1599, imgSrc: modelImgURL + 'air-jordan1.png', modelPath: 'air-jordan1.glb', scale: 0.05 },
  // { title: 'NewBalance', price: 1099, imgSrc: modelImgURL + 'high-heeled-shoes.png', modelPath: 'new-balance.glb' },
  { title: '可爱手办 室内摆件', price: 366, imgSrc: modelImgURL + 'handmade-model.png', modelPath: 'handmade-model.glb', scale: 0.2 },
  { title: '赛博出品 豪华游戏本', price: '4.6w', imgSrc: modelImgURL + 'cyberpunk_laptop_concept_design.png', modelPath: 'cyberpunk_laptop_concept_design.glb', scale: 0.008 }
]
const hdrArr = [
  { hdrSrc: '000.hdr', imgSrc: hdrImgURL + '000.jpg' },
  { hdrSrc: '079.hdr', imgSrc: hdrImgURL + '079.jpg' },
  { hdrSrc: '029.hdr', imgSrc: hdrImgURL + '029.jpg' },
  { hdrSrc: '039.hdr', imgSrc: hdrImgURL + '039.jpg' },
  { hdrSrc: '044.hdr', imgSrc: hdrImgURL + '044.jpg' },
  { hdrSrc: '050.hdr', imgSrc: hdrImgURL + '050.jpg' },
  { hdrSrc: '052.hdr', imgSrc: hdrImgURL + '052.jpg' },
  { hdrSrc: '067.hdr', imgSrc: hdrImgURL + '067.jpg' },
  { hdrSrc: '068.hdr', imgSrc: hdrImgURL + '068.jpg' },
  { hdrSrc: '076.hdr', imgSrc: hdrImgURL + '076.jpg' },
  { hdrSrc: '078.hdr', imgSrc: hdrImgURL + '078.jpg' }
  // { hdrSrc: '077.hdr', imgSrc: hdrImgURL + '077.jpg' },
  // { hdrSrc: '080.hdr', imgSrc: hdrImgURL + '080.jpg' }
]

// const getMyPro = async () => {
//   // const res = await getProducts()
//   // console.log(res)
//   // hdrArr.value = res.hdr
//   // goodsArr.value = res.list
// }

const changeModel = (index) => {
  if (isLoadingModel.value) return
  activeModel.value = index
}
const changeScene = (index) => {
  if (isLoadingHdr.value) return
  activeHdr.value = index
}

const doubleClickFn = (e) => {
  isFullscreen.value = !isFullscreen.value
}

const tipFn = () => {
  const modal = Modal.info({
    title: '提示',
    // content: '左侧选择展示的产品，右侧选择场景；\r\n滚轮向下开启全屏并查看产品，滚轮向上关闭全屏。',
    content: h('div', {}, [h('p', '左侧选择产品，右侧选择场景；'), h('p', '鼠标左键双击开启、关闭全屏；'), h('p', '鼠标左键旋转，右键移动，上下滚轮缩放。')]),
    okText: '了解'
  })
  // let timer = null
  // clearTimeout(timer)
  // timer = setTimeout(() => {
  //   clearTimeout(timer)
  //   modal.destroy()
  // }, 20000)
}
onMounted(() => {
  // getMyPro()
  tipFn()
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
  $item-margin: 10px;
  overflow-y: hidden;
  transition: all 0.5s;
  &.hidden {
    height: 100vh;
  }

  .leftView,
  .rightView {
    // display: flex;
    // flex-flow: column nowrap;
    // justify-content: space-evenly;
    // align-items: center;
    @include scrollbar;
    position: fixed;
    top: 0;
    padding-top: 46px;
    height: 100%;
    width: 40vw;
    max-width: 200px;
    background-color: rgba(255, 255, 255, 0.5);
    z-index: 2;
    transition: all 0.5s;
    backdrop-filter: blur(10px);
    overflow-y: auto;
    .title {
      // background-color: #fff;
      margin-top: $item-margin;
      font-size: 20px;
      text-align: center;
      text-shadow: 0 0 30px #fff;
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
      width: auto;
      // flex: 1;
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
        background-color: rgba(255, 255, 255, 0.5);
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
