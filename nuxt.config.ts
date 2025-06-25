export default defineNuxtConfig({
    modules: [
      "nuxt-svgo",
      "nuxt-swiper",
      "@pinia/nuxt",
      "nuxt-tiptap-editor",
      "@vee-validate/nuxt",
      "vue-yandex-maps/nuxt",
      "@nuxt/devtools",
      "@primevue/nuxt-module",
    ],
    ssr: false,
    runtimeConfig: {
        public: {
            frontUrl: process.env.FRONT_URL,
            backUrl: process.env.BACK_URL,
            baseUrl: process.env.API_BASE_URL,
            pusher: {
                host: process.env.PUSHER_HOST,
                key: process.env.PUSHER_APP_KEY,
                port: process.env.PUSHER_PORT,
                scheme: process.env.PUSHER_SCHEME || 'http',
            },
            yandexMetrika: {
                id: Number(process.env.YANDEX_METRIKA_ID),
                options: {
                    clickmap: true,
                    trackLinks: true,
                    accurateTrackBounce: true,
                    webvisor: true
                },
            },
        },
        frontUrl: process.env.FRONT_URL,
        backUrl: process.env.BACK_URL,
        baseUrl: process.env.API_BASE_URL,
    },
    svgo: {
        defaultImport: "component",
        autoImportPath: "./assets/svg/",
        explicitImportsOnly: true,
    },
    yandexMaps: {
        apikey: process.env.YANDEX_MAPS_API_KEY,
    },
    // alias: {
    //     pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs",
    // },
    css: ["~/assets/style/style.scss", "vue-final-modal/style.css"],
    devServer: {
        port: process.env.DEV_PORT,
        host: process.env.DEV_HOST,
    },
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `
          @use "@/assets/style/_media.scss" as *;
        `,
                },
            },
        },
        server: {
            hmr: {
                protocol: process.env.HMR_PROTOCOL || "ws",
                clientPort: process.env.HMR_PORT || 443,
                path: "hmr/",
            },
            allowedHosts: ['bee.online.front'],
        },
    },
    tiptap: {
        prefix: "Tiptap",
    },
    compatibilityDate: "2024-04-03",
    devtools: {
        enabled: true,

        timeline: {
            enabled: true,
        },
    },
    primevue: {
        usePrimeVue: true,
        autoImport: false,
        components: {
            include: ['ContextMenu'],
            prefix: 'Prime',
        },
        options: {
            unstyled: true,
            pt: {
                contextmenu: {
                    root: 'contextmenu',
                    rootList: 'dropdown-menu show',
                    itemLink: 'dropdown-item',
                },
            },
        },
    },
});
