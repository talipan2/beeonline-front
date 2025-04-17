// plugins/metrika.client.ts
import { defineNuxtPlugin, useRouter, useRuntimeConfig } from '#app'

declare global {
  interface Window {
    ym?: (...args: any[]) => void & { a?: any[]; l?: number }
  }
}

export default defineNuxtPlugin(() => {
  const router = useRouter()
  const { public: { yandexMetrika } } = useRuntimeConfig()

  const isProd = import.meta.env.PROD
  console.log(`[Metrika] init mode: ${isProd ? 'production' : 'development'}`)

  /** Загрузка tag.js один раз для любой среды */
  const loadScript = () => {
    if (document.querySelector('#ym-tag-script')) return
    const s = document.createElement('script')
    s.id  = 'ym-tag-script'
    s.src = 'https://mc.yandex.ru/metrika/tag.js'
    s.async = true
    document.head.appendChild(s)
  }

  /* ---------- DEV‑режим -------------------------------------------------- */
  if (!isProd) {
    /** Стаб‑функция, которая просто пишет вызовы в консоль */
    const devYm = (...args: any[]) => console.log('[Metrika‑DEV]', ...args)
    devYm.a = []                    // чтобы tag.js не перезаписал нашу stub
    devYm.l = Date.now()
    window.ym = devYm

    /* Грузим библиотеку, но НЕ делаем ym('init') */
    loadScript()

    router.afterEach((to) => {
      if ((to.meta as any).disableMetrika) return
      window.ym!(yandexMetrika.id, 'hit', to.fullPath || to)
    })
    return                             // dev‑логика закончена
  }

  /* ---------- PRODUCTION ------------------------------------------------- */
  let counterReady = false

  /** Полноценный запуск счётчика (один раз) */
  const bootProd = () => {
    if (counterReady || window.ym?.a) return  // уже инициализировали

    /* очередь до загрузки */
    window.ym = window.ym || function (...a) { (window.ym!.a = window.ym!.a || []).push(a) }
    window.ym.l = Date.now()

    loadScript()

    window.ym(yandexMetrika.id, 'init', {
      defer: true,           // без авто‑hit
      triggerEvent: true,    // событие готовности
      ...yandexMetrika.options
    })

    document.addEventListener(`yacounter${yandexMetrika.id}inited`, () => {
      counterReady = true
    })
  }

  const sendHit = (to: any) => {
    if (!counterReady) return
    window.ym!(yandexMetrika.id, 'hit', to.fullPath || to)
  }

  router.afterEach((to) => {
    if ((to.meta as any).disableMetrika) return
    bootProd()
    sendHit(to)
  })
})
