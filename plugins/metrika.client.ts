import { defineNuxtPlugin, useRouter, useRuntimeConfig } from '#app'

/** Тип счётчика v2 */
interface YM2 {
  hit: (url: string) => void
  destruct: () => void
}

export default defineNuxtPlugin(() => {
  const router = useRouter()
  const { public: { yandexMetrika } } = useRuntimeConfig()
  const isProd = import.meta.env.PROD

  console.log(`[Metrika] init mode: ${isProd ? 'production' : 'development'}`)

  /* ---------------------------------------------------------------- */
  /* 1. загрузка tag.js (единожды)                                     */
  /* ---------------------------------------------------------------- */
  const loadTag = () =>
    new Promise<void>((resolve) => {
      if ((window as any).Ya?.Metrika2) return resolve()   // уже есть

      const s = document.createElement('script')
      s.id   = 'ym-tag'
      s.src  = 'https://mc.yandex.ru/metrika/tag.js'
      s.async = true
      s.onload = () => resolve()          // ← сработает, когда Metrika2 объявлен
      document.head.appendChild(s)
    })

  /* ---------------------------------------------------------------- */
  /* 2. глобальные ссылки на счётчик                                   */
  /* ---------------------------------------------------------------- */
  let counter: YM2 | null = null          // активный экземпляр
  let killed  = false                     // вызвали destruct()

  /* helper ----------------- */
  const needSkip = (to: any) =>
    !!(to.meta as any).disableMetrika     // «тихая» страница

  /* ---------------------------------------------------------------- */
  /* 3. DEV‑заглушка                                                 */
  /* ---------------------------------------------------------------- */
  const createDevStub = (): YM2 => ({
    hit: (url: string) => console.log('[Metrika‑DEV] hit', url),
    destruct: () => {
      console.log('[Metrika‑DEV] destruct()')
      killed = true
      counter = null
    }
  })

  /* ---------------------------------------------------------------- */
  /* 4. Инициализация счётчика                                        */
  /* ---------------------------------------------------------------- */
  const boot = async () => {
    if (counter || killed) return         // уже запущен / только что убит

    await loadTag()

    counter = isProd
    ? new (window as any).Ya.Metrika2({
        id: yandexMetrika.id,
        defer: true,
        triggerEvent: true,
        ...yandexMetrika.options
      })
    : createDevStub()
  }

  /* ---------------------------------------------------------------- */
  /* 5. Полная остановка                                              */
  /* ---------------------------------------------------------------- */
  const kill = () => {
    if (!counter || killed) return
    counter.destruct()
    killed = true
    counter = null
  }

  /* ---------------------------------------------------------------- */
  /* 6. SPA‑навигация                                                 */
  /* ---------------------------------------------------------------- */
  router.afterEach(async (to) => {
    if (needSkip(to)) {       // «тихая» страница
      kill()
      return
    }

    killed = false            // «громкая» страница
    await boot()              // если ещё не запущен – создаём
    counter!.hit(to.fullPath || to)   // ручной page‑view
  })
})
