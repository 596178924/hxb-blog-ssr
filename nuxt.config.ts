const isProd = process.env.NODE_ENV === 'production'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: process.env.NUXT_TITLE,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no' },
        { name: 'keywords', content: '海星吧，海星吧的博客，博客' },
        { name: 'description', content: '你好，这是海星吧的博客，欢迎来逛。' },
        { name: 'format-detection', content: 'telephone=no' }
        // pc 等比例缩放
        // { name: 'viewport', content: 'user-scalable=yes' }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      style: [],
      script: [
        // { src: '//cdn.jsdelivr.net/npm/eruda', type: 'text/javascript' },
        // { children: 'eruda.init();', type: 'text/javascript' }
      ],
      noscript: [{ children: 'JavaScript is required' }]
    }
    // pageTransition: false,
    // layoutTransition: false
  },
  sourcemap: false,
  typescript: { strict: false, shim: false },
  modules: ['@nuxt/image', 'dayjs-nuxt', '@nuxt/ui', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt'],
  css: ['~/assets/style/scss/main.scss'],
  // 此处配置的目录中的任何组件都可以在整个页面、布局（和其他组件）中使用，而无需显式导入它们。
  imports: { dirs: ['types', 'stores', 'api'] },
  build: { transpile: [/echarts/] },
  dayjs: {
    locales: ['en', 'zh-cn'],
    defaultLocale: 'zh-cn'
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // additionalData: '@use "@/assets/style/scss/theme.scss" as *;'
        }
      }
    },
    build: {
      chunkSizeWarningLimit: 1000,
      commonjsOptions: { transformMixedEsModules: true }
    },

    esbuild: {
      drop: isProd ? ['console', 'debugger'] : []
    }
  },
  runtimeConfig: {
    public: {
      api: {
        baseUrl: process.env.NUXT_PUBLIC_API_BASEURL
      }
    }
  },
  // 解决 eruda 服务端控制台报错问题
  nitro: {
    esbuild: {
      options: {
        target: 'esnext'
      }
    },
    devProxy: {
      host: '127.0.0.1'
    }
  }
})
