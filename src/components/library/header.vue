<template>
  <div class="header-container" :class="{ hidden: store.isFullscreen }">
    <a-menu class="menu" v-model:selectedKeys="current" mode="horizontal" :selectable="false" @click="clickMenu">
      <a-menu-item class="logoItem" key="logo"><Logo class="logo"></Logo> </a-menu-item>
      <a-menu-item class="searchItem" key="mail"><a-input-search class="search" v-model:value="searchVal" placeholder="搜索商品(这是一个假搜索)" size="default" @search="onSearch" /> </a-menu-item>
      <a-sub-menu key="sub1">
        <template #title
          ><shop-outlined />
          <div class="shop">门店</div></template
        >
        <a-menu-item-group title="最新">
          <a-menu-item key="setting:1">路易威登(Louis Vuitton)</a-menu-item>
          <a-menu-item key="setting:2">芬迪(Fendi)</a-menu-item>
        </a-menu-item-group>
        <a-menu-item-group title="最热">
          <a-menu-item key="setting:3">香奈儿(Chanel)</a-menu-item>
          <a-menu-item key="setting:4">范思哲(Versace)</a-menu-item>
          <a-menu-item key="setting:5">爱马仕(Hermes)</a-menu-item>
        </a-menu-item-group>
      </a-sub-menu>
      <a-menu-item key="cart"
        ><shopping-cart-outlined />
        <div class="cart">购物车</div></a-menu-item
      >
      <a-menu-item key="account">
        <UserOutlined />
        <div class="account">账户</div></a-menu-item
      >
      <a-menu-item key="help">
        <question-circle-outlined />
        <div class="help">帮助</div>
      </a-menu-item>
    </a-menu>
  </div>
</template>
<script setup>
import Logo from '@/components/library/logo.vue'
import { useRouter, useRoute } from 'vue-router'
import { UserOutlined, ShopOutlined, ShoppingCartOutlined, QuestionCircleOutlined } from '@ant-design/icons-vue'
import { productStore } from '@/store/product.js'
import { Modal } from 'ant-design-vue'

const store = productStore()
const router = useRouter()
const route = useRoute()
const searchVal = ref('')
const current = ref([])
const clickMenu = (val) => {
  if (val.key === 'logo') {
    router.push('/home')
  }
  if (val.key === 'help' && route.path === '/show-area') {
    Modal.info({
      title: '提示',
      content: h('div', {}, [h('p', '左侧选择产品，右侧选择场景；'), h('p', '鼠标左键双击开启、关闭全屏；'), h('p', '鼠标左键旋转，右键移动，上下滚轮缩放。')]),
      okText: '了解'
    })
  }
}
const onSearch = () => {
  // console.log(searchVal.value)
}
</script>

<style lang="scss" scoped>
.header-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  background-color: #fff;
  z-index: 100;
  transition: all 0.5s;
  &.hidden {
    transform: translateY(-102%);
  }
  .Logo {
    margin: 0 20px;
  }
  .search {
    vertical-align: middle;
    margin-left: 5vw;
    margin-right: 5vw;
    width: 45vw;
  }
  .shop,
  .cart,
  .account,
  .help {
    display: inline-block;
    width: 3vw;
    text-align: center;
  }
}
</style>
