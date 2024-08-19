// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["nuxt-svgo", "@nuxt/image", "nuxt-swiper"],
  svgo: {
    defaultImport: 'component',
    autoImportPath: './assets/svg/',
    explicitImportsOnly: true,
  },
  image: {
    dir: 'assets',
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
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
})