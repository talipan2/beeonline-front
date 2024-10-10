export default defineNuxtConfig({
  modules: ["nuxt-svgo", "nuxt-swiper", '@pinia/nuxt', 'nuxt-tiptap-editor', '@vee-validate/nuxt', 'vue-yandex-maps/nuxt'],
  svgo: {
    defaultImport: 'component',
    autoImportPath: './assets/svg/',
    explicitImportsOnly: true,
  },
  yandexMaps: {
    apikey: '82de5ac1-09a8-46fc-a4f9-0d964a74531d',
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
  devtools: { enabled: true },
})