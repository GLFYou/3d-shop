<template>
  <div class="slideshow-container">
    <a-carousel class="carousel" arrows autoplay :beforeChange="slideToggle">
      <template #prevArrow>
        <div class="custom-slick-arrow" style="left: 10px; z-index: 5">
          <left-circle-outlined />
        </div>
      </template>
      <template #nextArrow>
        <div class="custom-slick-arrow" style="right: 10px">
          <right-circle-outlined />
        </div>
      </template>
      <div class="slideItem" v-for="(item, index) in props.slideshowArr" :key="index">
        <div class="myItem">
          <img :src="item.imgsrc" alt="" />
          <!-- <img :src="`images/banner${index + 1}.jpg`" alt="" /> -->
        </div>
        <div class="desc">
          <p>{{ item.title === ' ' ? item.desktop_title : item.title }}</p>
          <p>{{ item.sub_title === ' ' ? item.desktop_sub_title : item.sub_title }}</p>
        </div>
      </div>
    </a-carousel>
  </div>
</template>
<script setup>
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue'

const props = defineProps({
  slideshowArr: {
    default: () => [],
    type: Array
  }
})
const emit = defineEmits(['emitBgc'])
const slideIndex = ref(3)
const slideBgc = ref('')

watch(
  () => props.slideshowArr,
  () => {
    slideBgc.value = props.slideshowArr[3].bg_color
    emit('emitBgc', slideBgc.value)
  }
)
const slideToggle = () => {
  slideIndex.value++
  if (slideIndex.value > props.slideshowArr.length - 1) {
    slideIndex.value = 0
  }
  slideBgc.value = props.slideshowArr[slideIndex.value].bg_color
  emit('emitBgc', slideBgc.value)
}
const color = ref('aqua')
</script>
<style lang="scss" scoped>
.slideshow-container {
  width: 100vw;
  // height: 600px;
  height: 80vh;
  position: relative;
  overflow: hidden;
  height: max-content;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 80%;
    background-color: v-bind(slideBgc);
    // transform: rotate(-15deg) scaleX(3);
    transform: skewY(-8deg);
    transform-origin: 0 0;
    transition: all 1.5s;
  }
  :deep(.ant-carousel) {
    width: 100%;
    margin-top: 50px;
    .slick-slide {
      width: 100%;
      text-align: center;
      line-height: 60px;
      // background: #364d79;
      overflow: hidden;
      .slideItem {
        position: relative;
        .myItem {
          margin: 0 5% 0 25%;
          width: 55%;
          transform-origin: 0 100%;
          transform: skewY(-8deg);
          border-radius: 20px;
          overflow: hidden;
          img {
            width: 100%;
            border-radius: 20px;
            transform-origin: 0 100%;
            transform: skewY(8deg);
          }
        }
        .desc {
          position: absolute;
          width: 20vw;
          top: 0;
          left: 2vw;
          // transform: translateX();
          color: #fff;
          text-align: center;
          transform-origin: 100% 0;
          transform: skewY(-8deg);

          // transform-origin: 0 100%;
          // transform: skewY(10deg);
          p:first-child {
            text-shadow: 0 0 10px rgb(0, 0, 0);
            font-size: 5vw;
          }
          p:nth-child(2) {
            text-shadow: 0 0 10px rgb(0, 0, 0);
            font-size: 2vw;
          }
        }
      }
    }
    .custom-slick-arrow {
      width: 25px;
      height: 25px;
      font-size: 25px;
      color: #fff;
      // background-color: rgba(31, 45, 61, 0.11);
      opacity: 0.5;
      z-index: 1;
      &:before {
        display: none;
      }
    }
  }
}
</style>
