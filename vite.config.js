import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import eslintPlugin from 'vite-plugin-eslint'
import path from 'path'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    base: 'https://glfyou.github.io/',
    plugins: [
      vue(),
      AutoImport({
        imports: ['vue']
      }),
      eslintPlugin({
        include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
      }),
      Components({ resolvers: [AntDesignVueResolver()] })
    ],
    resolve: {
      // 配置路径别名
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    css: {
      // css预处理器
      preprocessorOptions: {
        scss: {
          charset: false,
          additionalData: '@import "./src/assets/styles/mixin.scss";'
        }
      }
      // loaderOptions: {
      //   less: {
      //     lessOptions: {
      //       modifyVars: {
      //         'primary-color': '#1DA57A'
      //       },
      //       javascriptEnabled: true
      //     }
      //   }
      // }
    },
    server: {
      proxy: {
        '/apis/': {
          target: env.VITE_baseURL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/apis/, '')
        },
        '/my-api/': {
          target: env.VITE_baseURL2,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/my-api/, '')
        }
      }
    }
  }
})