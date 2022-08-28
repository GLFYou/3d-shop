<template>
  <div class="header-container" :class="{ hidden: store.isFullscreen }">
    <a-menu class="menu" v-model:selectedKeys="current" mode="horizontal" :selectable="false" @click="clickMenu">
      <a-menu-item class="logoItem" key="logo"><Logo class="logo"></Logo> </a-menu-item>
      <a-menu-item class="searchItem" key="mail"><a-input-search class="search" v-model:value="searchVal" placeholder="搜索商品" size="default" @search="onSearch" /> </a-menu-item>
      <a-sub-menu key="sub1">
        <template #title
          ><shop-outlined />
          <div class="shop">门店</div></template
        >
        <a-menu-item-group title="最新">
          <a-menu-item key="setting:1">李大福珠宝店</a-menu-item>
          <a-menu-item key="setting:2">鼓龙香水</a-menu-item>
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
import { useRouter } from 'vue-router'
import { UserOutlined, ShopOutlined, ShoppingCartOutlined, QuestionCircleOutlined } from '@ant-design/icons-vue'
import { productStore } from '@/store/product.js'

const store = productStore()
const router = useRouter()
const searchVal = ref('')
const current = ref([])
const clickMenu = (val) => {
  console.log(val)
  if (val.key === 'logo') {
    router.push('/3d-shop-pages/home')
  }
}
const onSearch = () => {
  console.log(searchVal.value)
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
    transform: translateY(-100%);
  }
  .Logo {
    margin: 0 20px;
  }
  .search {
    vertical-align: middle;
    margin-left: 5vw;
    margin-right: 5vw;
    width: 30vw;
  }
  .shop,
  .cart,
  .account,
  .help {
    display: inline-block;
    width: 5vw;
    text-align: center;
  }
}
</style>
