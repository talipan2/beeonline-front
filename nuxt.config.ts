export default defineNuxtConfig({
  modules: ["nuxt-svgo", "nuxt-swiper", '@pinia/nuxt', 'nuxt-tiptap-editor', '@vee-validate/nuxt'],
  svgo: {
    defaultImport: 'component',
    autoImportPath: './assets/svg/',
    explicitImportsOnly: true,
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