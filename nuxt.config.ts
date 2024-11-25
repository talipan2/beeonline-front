export default defineNuxtConfig({
  modules: [
    "nuxt-svgo", 
    "nuxt-swiper", 
    '@pinia/nuxt', 
    'nuxt-tiptap-editor', 
    '@vee-validate/nuxt', 
    'vue-yandex-maps/nuxt',
    '@nuxt/devtools'
  ],
  ssr: false,
  runtimeConfig: {
    public: {
      baseUrl: process.env.API_BASE_URL,
    },
    baseUrl: process.env.API_BASE_URL
  },
  svgo: {
    defaultImport: 'component',
    autoImportPath: './assets/svg/',
    explicitImportsOnly: true,
  },
  yandexMaps: {
    apikey: process.env.YANDEX_MAPS_API_KEY,
  },
  alias: {
    pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs"
  },
  css: ['~/assets/style/style.scss', 'vue-final-modal/style.css'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use "@/assets/style/_media.scss" as *;
        `
        },
      },
    },
  },
  tiptap: {
    prefix: 'Tiptap',
  },

  compatibilityDate: '2024-04-03',
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
})