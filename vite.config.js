import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import eslintPlugin from 'vite-plugin-eslint'
import path from 'path'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// import commonjs from 'rollup-plugin-commonjs'
// import externalGlobals from 'rollup-plugin-external-globals'

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    base: env.VITE_base,
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
    build: {
      // minify: 'terser',
      // outDir: '3d-shop',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    },
    server: {
      proxy: {
        '/api/': {
          target: 'https://glfy.site',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
        //   '/apis/': {
        //     target: env.VITE_baseURL,
        //     changeOrigin: true,
        //     rewrite: (path) => path.replace(/^\/apis/, '')
        //   },
        //   '/my-api/': {
        //     target: env.VITE_baseURL2,
        //     changeOrigin: true,
        //     rewrite: (path) => path.replace(/^\/my-api/, '')
        //   }
      }
    }
    // rollupOptions: {
    //   plugins: [
    //     commonjs(),
    //     externalGlobals({
    //       vue: 'Vue',
    //       'vue-router': 'VueRouter'
    //     })
    //   ],
    //   output: {
    //     format: 'es',
    //     globals: {
    //       vue: 'Vue',
    //       'vue-router': 'VueRouter'
    //     }
    //   }
    // }
  }
})
