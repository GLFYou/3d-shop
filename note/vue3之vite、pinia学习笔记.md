## 1. 搭建项目
### 1.1 起步
官网:[https://www.vitejs.net](https://www.vitejs.net)

初始化vite:**npm init vite**

配置好之后进入生成的项目,需要关闭父级文件夹!

在编辑器中一定要让项目文件夹处于顶级,即**不能包含父级文件夹!**

安装依赖包:

**npm install**

启动服务:

**npm run dev**

### 1.2 安装vue-router

**npm install vue-router@4**

src>router>index.js:
```javascript
import { createRouter, createWebHistory } from 'vue-router'

const routes = []

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```
在main.js中挂载router
```javascript
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
```
### 1.3 vite中配置@路径别名
注意:在vite中.vue后缀不能省略,但.js可以省略
```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})

```
## 2. 自动引入vue的api
安装

**npm i unplugin-auto-import -D**

vite.config.js中配置
```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'

import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 自动引入
    AutoImport({
      imports: ['vue']
    })
  ],
  resolve: {
    // 配置路径别名
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})

```
## 3. pinia状态管理
官网:[https://pinia.web3doc.top](https://pinia.web3doc.top)

Vuex和pinia的区别

1.pinia没有mutations，只：state，getters，actions

2.pinia分模块不需要modules（之前vuex分模块需要modules）

3.pinia体积更小（性能更好）

### 3.1 基础使用
起步

**npm install pinia**

src>store>index.js中
```javascript
import { createPinia } from 'pinia'

const store = createPinia()

export default store
```
main.js中
```javascript
import store from '@/store/index.js'

createApp(App).use(router).use(store).mount('#app')
```
src>store>user.js中

**注意,这里是userStore,并不是useStore**
```javascript
import { defineStore } from 'pinia'

export const userStore = defineStore('user', {
  state: () => {
    return {
      name: '张全蛋',
      age: 99,
      height: 170
    }
  },
  getters: {
    // 相当于计算属性
    doubleAge: (state) => state.age * 2,
    // 访问getters的其他内容
    doubleAgeAddOne() {
      return this.doubleAge + 1
    }
  },
  actions: {
    //支持异步同步操作
    setHeight(val) {
      this.height = val
    }
  }
})

```
组件中:

**注意,这里是userStore,并不是useStore**
```html
<template>
  <div class="layout-container">
    <div>名字: {{ name }}</div>
    <div>年龄: {{ age }}</div>
    <div>年龄*2: {{ doubleAge }}</div>
    <div>年龄*2+1: {{ doubleAgeAddOne }}</div>
    <div>身高: {{ height }}</div>
    <button @click="changeInfo">修改人生</button>
    <button @click="resetInfo">重置人生</button>
    <button @click="restartInfo">重启人生</button>
    <button @click="setHeight">高人一等</button>
  </div>
</template>

<script setup>
import { userStore } from '@/store/user.js' // 引入
import { storeToRefs } from 'pinia' // 保持其响应式的api

const store = userStore()
const { age, height, doubleAge, doubleAgeAddOne } = storeToRefs(store) // 使解构的数据具有响应式,可以修改
const name = computed(() => store.name) // 也可以使用computed,但是不可修改

// 修改store中的数据，不用mutations中定义及commit
const changeInfo = () => {
  // 方式一
  age.value--
  // 方式二
  store.$patch((state) => {
    state.height++
    state.name = '张全蛋儿' // 此时可以修改name
  })
}
// 重置state到初始值
const resetInfo = () => {
  store.$reset()
}
// 重新给state赋值
const restartInfo = () => {
  store.$state = { name: '王美丽', age: '24', height: 166 }
}
// 使用actions
const setHeight = () => {
  store.setHeight(199)
}
</script>
```
结果:

![](http://www.glfy.site/images/glfy-blog/article/vue3之vite、pinia学习笔记/pinia基础.gif)

### 3.2 分模块使用
分模块使用的话,不用像vuex那样设置modules,而是直接在src>store中新建一个模块

比如要新建一个购物车模块:

在src>store>cart.js中
```javascript
import { defineStore } from 'pinia'

export const cartStore = defineStore('cart', {
  state: () => {
    return {
      shoes:['nike','阿迪','李宁','鸿星尔克']
    }
  },
  getters: {
  },
  actions: {
  }
})
```
 在组件中可以引入需要的模块
 ```javascript
import { cartStore } from '@/store/cart.js' 
 ```
 ### 3.3 数据持久化
 官网:[https://seb-l.github.io/pinia-plugin-persist/](https://seb-l.github.io/pinia-plugin-persist/)

 安装插件

 **npm i pinia-plugin-persist -s**

 src>store>index.js中
 ```javascript
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'

const store = createPinia()
store.use(piniaPluginPersist)
export default store
 ```
 需要持久化的模块中,与state,getters,actions同级,配置如下
```javascript
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'user',
        storage: localStorage,// 修改存储位置。默认是sessionStorage，其在关闭标签会重置
        paths:['name','age']// 哪一些数据需要持久化,默认是全部
      }
    ]
  }
```
最后,在浏览器安装了vue调试工具的话在其中会有pinia的调试工具

![](http://www.glfy.site/images/glfy-blog/article/vue3之vite、pinia学习笔记/pinia调试工具.png)

## 4. css预处理器sass
安装

**npm i sass sass-loader -D**

vite.config.js中
```javascript
  css: {
    // css预处理器
    preprocessorOptions: {
      scss: {
        charset: false,
        additionalData: '@import "./src/assets/styles/mixin.scss";'
      }
    }
  }
```
src>assets>styles>mixin.scss中
```css
.test {
  color: red;
}
```
组件中:
```html
  <div class="test">你好</div>
```
## 5. 代码检测工具eslint
安装

**npm i eslint -D**

初始化配置

**npx eslint --init**

选择模式，最后一个
![](http://www.glfy.site/images/glfy-blog/article/vue3之vite、pinia学习笔记/eslint选择模式.png)
选择引入模式，第一个
![](http://www.glfy.site/images/glfy-blog/article/vue3之vite、pinia学习笔记/选择js引入方式.png)
选择框架,vue
![](http://www.glfy.site/images/glfy-blog/article/vue3之vite、pinia学习笔记/选择框架.png)
是否ts,按需求选
![](http://www.glfy.site/images/glfy-blog/article/vue3之vite、pinia学习笔记/是否ts.png)
项目环境,两个都选,按空格键多选
![](http://www.glfy.site/images/glfy-blog/article/vue3之vite、pinia学习笔记/项目环境.png)
选择样式,第一个
![](http://www.glfy.site/images/glfy-blog/article/vue3之vite、pinia学习笔记/选择style.png)
选择guide,第二个
![](http://www.glfy.site/images/glfy-blog/article/vue3之vite、pinia学习笔记/选择guide.png)
配置文件格式,第一个
![](http://www.glfy.site/images/glfy-blog/article/vue3之vite、pinia学习笔记/配置文件格式.png)
yes
![](http://www.glfy.site/images/glfy-blog/article/vue3之vite、pinia学习笔记/现在安装.png)
包管理工具,按需求选
![](http://www.glfy.site/images/glfy-blog/article/vue3之vite、pinia学习笔记/包工具.png)

安装另外两个包:

**npm i vite-plugin-eslint -D**

**npm i @babel/eslint-parser -D**

vite.config.js中添加配置
```javascript
import eslintPlugin from 'vite-plugin-eslint'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue']
    }),
    // 添加这个
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
    })
  ]
  // ...
})
```
.eslintrc.cjs中配置(此文件安装eslint后自动生成)
```javascript
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['plugin:vue/vue3-essential', 'standard'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['vue'],
  rules: {
    'vue/multi-word-component-names': 'off', // 关闭组件命名多词组合
    'no-undef': 'off', // 关闭未定义，因为我们使用了自动引入vue，会报错
    'space-before-function-paren': 'off' // 函数括号前的空格，关闭
  }
}
```
## 6. 代码格式化Prettier
**(之前配置过就跳过)**

在vscode中安装插件Prettier

新建一个.prettierrc保存在电脑中,文件内容
```json
 {"semi": false, "singleQuote": true, "printWidth": 300,"trailingComma":"none"}
```
vscode设置中配置:
```json
  "prettier.configPath": "C:\\Users\\临空\\.prettierrc",// 上述文件路径
  "eslint.alwaysShowStatus": true,
  "prettier.trailingComma": "none",
  "prettier.semi": false,
  "prettier.printWidth": 300,// 每行文字个数超出此限制将会被迫换行
  "prettier.singleQuote": true,  // 使用单引号替换双引号
  "prettier.arrowParens": "avoid",
  "vetur.format.defaultFormatter.html": "js-beautify-html",  // 设置 .vue 文件中，HTML代码的格式化插件
  "vetur.ignoreProjectWarning": true,
  "vetur.format.defaultFormatterOptions": {
    "js-beautify-html": {
      "wrap_attributes": false
    },
    "prettier": {
      "printWidth": 300,
      "trailingComma": "none",
      "semi": false,
      "singleQuote": true,
      "arrowParens": "avoid"
    }
  },
    "editor.codeActionsOnSave": {
    "source.fixAll": true
  }
```

## 7. 标准化样式表
下载地址:[https://necolas.github.io/normalize.css/latest/normalize.css](https://necolas.github.io/normalize.css/latest/normalize.css)

src>styles>normalize.css中粘贴

main.js中引入
```javascript
import '@/assets/styles/normalize.css'
```

## 8. 配置axios及跨域
### 8.1 axios基本配置
安装axios

**npm i axios -S**

安装nprogress,一个虚拟进度条

**npm i nprogress -S**

进度条配置,src>utils>nprogress.js
```javascript
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
  minimum: 0.4,
  easing: 'ease',
  speed: 1000,
  trickleSpeed: 500,
  showSpinner: false
})

export const NPStart = () => {
  NProgress.start()
}
export const NPDone = () => {
  NProgress.done()
}
```
进度条样式,scr>assets>styles>mixin.scss
```css
#nprogress .bar {
  background-color: rgba(0, 255, 255, 0) !important;
  background-image: linear-gradient(right, aqua, transparent) !important;
  background-image: -webkit-linear-gradient(right, aqua, transparent) !important;
  height: 3px !important;
  border-radius: 50px !important;
  box-shadow: 0 0 20px 1px aqua !important;
}
```

scr>utils>request.js中
```javascript
import axios from 'axios'
import { NPStart, NPDone } from '@/utils/nprogress.js'

const baseURL = 'http://xxxxxxxxx.com'
const instance = axios.create({
  baseURL,
  timeout: 5000
})

// 请求拦截
instance.interceptors.request.use((config) => {
  NPStart()// 显示进度条
  return config
})

// 响应拦截
instance.interceptors.response.use((res) => {
  NPDone()// 隐藏进度条
  return res
})

export default (url, method, submitData) => {
  return instance({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
```
**比如定义一个获取轮播图的api:**

scr>apis>home.js中
```javascript
import request from '@/utils/request.js'

export const getSlideshow = () => {
  return request('banner', 'get', { limit: 4 })
}
```
组件中:
```javascript
import { getSlideshow } from '@/apis/home.js'

const getMySlideshow = async () => {
  const res = await getSlideshow()
  console.log(res)
}
```
### 8.2 跨域问题
**当然解决跨域也可以使用nginx~**

这里使用的是vite中的server配置

vite.config.js中配置
```javascript
export default defineConfig({
  // 其他配置...
  server: {
    proxy: {
      '/apis/': {
        target: 'http://xxxxxxxxx.com',
        changeOrigin: true,
        rewrite: (path) => { return path.replace(/^\/apis/, '')}
      }
    }
  }
})
```
scr>utils>request.js中更改baseURL
```javascript
const baseURL = 'apis'
```

## 9. 环境变量配置

代码环境分为：

1. 开发环境 

2. 测试环境

3. 预发布环境

4. 灰度环境

5. 生产环境

### 9.1 步认识环境变量
在package.json中,定义这样的脚本,不同的命令决定不同的环境
```json
  "scripts": {
    "dev": "vite --port 8081",
    "test": "vite --port 8081 --mode test",
    "build": "vite build",
    "preview": "vite preview"
  },
```
我们运行npm run dev后,在在任一组件中打印
```javascript
// 应用运行的模式
console.log(import.meta.env.MODE)// 输出development
// 部署应用时的基本 URL
console.log(import.meta.env.BASE_URL)// 输出'/'
// 应用是否运行在生产环境
console.log(import.meta.env.PROD)// 输出false
// 应用是否运行在开发环境 (永远与 import.meta.env.PROD相反)
console.log(import.meta.env.DEV)// 输出true
```
不同的环境上述值会有不同的结果.上述变量MODE,BASE_URL等就是环境变量

**怎么自定义自己的环境变量?**

在根目录新建三个文件:

**.env.development

.env.test

.env.production**

分别对应开发,测试,生产环境,用来存储我们的环境变量

比如其中的test就对应我们的 `"test": "vite --port 8081 --mode test"`中mode后的test

只不过开发和生产命令默认的就是development,production,不用再定义

在这些文件中自定义的环境变量必须以 `VITE_` 开头

例如:

.env.development内容
```javascript
VITE_NAME='伊丽莎白-翠花-开发'
```
.env.test内容
```javascript
VITE_NAME='伊丽莎白-翠花-测试'
```
.env.production内容
```javascript
VITE_NAME='伊丽莎白-翠花-生产'
```
运行**npm run test**后,在任一组件中打印
```javascript
console.log(import.meta.env.VITE_NAME)// 输出 伊丽莎白-翠花-测试
```
### 9.2 实际应用
在vite.config.js中,需要修改如下
```javascript
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  // console.log(mode)// 开发：development，测试：test，生产：production
  // console.log(command)// 开发：serve，测试：serve，生产：build
  // console.log(process.cwd()) // 项目文件夹的绝对路径
  // console.log('env', env)// 各个自定义的环境变量对象
  return {
   // 之前的配置项
   // ...
    server: {
      proxy: {
        '/apis/': {
          target: env.VITE_baseURL,// VITE_baseURL在各自环境变量文件中定义
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/apis/, '')
        }
      }
    }
  }
})
```
现在只需要运行不同的命令就可以自动调用不同的baseURL,发起对应的请求
## 10. 组件库自动按需引入
比如我们使用ant-design-vue组件库

安装ant-design-vue

**npm i ant-design-vue -S**

安装unplugin-vue-components

**npm i unplugin-vue-components -D**

vite.config.js中:
```javascript
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// ...
 plugins: [
      // ...
      Components({ resolvers: [AntDesignVueResolver()] })
    ]
```

## 11. GitHub Pages部署静态页面
 1. vite.config.js中,与plugins同级,添加如下
```javascript
base:'./'
```
2. .gitignore中,删掉dist
3. **npm run build**,打包生成dist文件夹
4. github新建一个仓库,并把项目上传进仓库中
5. 开启GitHub Pages服务,会生成一个url
6. 访问url/dist/index.html,就可以进入我们的页面中







