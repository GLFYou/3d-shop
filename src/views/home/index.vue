<template>
  <div class="home-container">
    <Slideshow :slideshowArr="slideshowArr" @emit-bgc="emitBgc" />
    <div class="enterText">3D商品展示区</div>
    <div class="enterBtn" @click="enter3D">进入</div>
  </div>
</template>
<script setup>
// import { getHomePage } from '@/apis/home.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const slideshowArr = ref([])
const slideBgc = ref('')
const getMyHomePage = async () => {
  // const res = await getHomePage()
  // console.log(res)
  // slideshowArr.value = res.banner
  slideshowArr.value = [
    {
      bg_color: '#E51144',
      sub_title: '新年新装备',
      title: '红红火火 过新年',
      imgsrc: 'https://pixl.decathlon.com.cn/s904137/banner.jpg'
    },
    {
      bg_color: '#2e939a',
      sub_title: '儿童冬季装备',
      title: '成长之旅 如虎添翼',
      imgsrc: 'https://pixl.decathlon.com.cn/s904168/banner.jpg'
    },
    {
      bg_color: '#d78640',
      sub_title: '户外装备系列',
      title: '户外骑行 即刻启程',
      imgsrc: 'https://pixl.decathlon.com.cn/s904164/banner.jpg'
    },
    {
      bg_color: '#bb0009',
      sub_title: '室内健身系列',
      title: '宅家健身 即刻开练',
      imgsrc: 'https://pixl.decathlon.com.cn/s904166/banner.jpg'
    }
  ]
}
const emitBgc = (val) => {
  slideBgc.value = val
}

const enter3D = () => {
  router.push('/show-area')
}
onMounted(() => {
  getMyHomePage()
  console.log('123qweqwes')
})
</script>

<style lang="scss" scoped>
.home-container {
  color: #fff;
  position: relative;
  width: 100vw;
  height: calc(100vh - 46px);
  background-color: rgb(223, 223, 223);
  @include scrollbar;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100vw;
    height: 25vh;
    // background-image: -webkit-linear-gradient(-90deg, transparent, v-bind(slideBgc));
    // background-color: v-bind(slideBgc);
    border-top: 20px double #fff;
    transform: skewY(-8deg);
    box-shadow: inset 0 0 100px 0 v-bind(slideBgc);
    transform-origin: 100% 100%;
    transition: all 2s;
    background-color: v-bind(slideBgc);
  }

  .enterText,
  .enterBtn {
    position: absolute;
    transform: rotate(-8deg);
    color: #fff;
    transition: all 2s;
    // text-shadow: 0 3px 5px rgba(0, 0, 0, 0.434);
    user-select: none;
    text-shadow: 0 0 10px rgb(0, 0, 0);
  }
  .enterText {
    right: 20vw;
    bottom: 4vh;
    font-size: 3vw;
  }
  .enterBtn {
    right: 3vw;
    bottom: 6vh;
    font-size: 7vw;
    line-height: 4vw;
    cursor: pointer;
  }
}
</style>
