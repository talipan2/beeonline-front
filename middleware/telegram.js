import { useSettingStore } from "~/store/settingStore"

export default defineNuxtRouteMiddleware((to) => {
  const settingStore = useSettingStore();
  const router = useRouter();
  console.log(settingStore.isTelegram)
  
  if (settingStore.isTelegram || to.query?.platform === 'telegram' || to.path === '/telegram') {
    to.meta.layout = 'telegram'
    
    if (to.query.platform !== 'telegram') {
      const newUrl = {
        path: to.path,
        query: { ...to.query, platform: 'telegram' }, // Добавляем platform=telegram
      };

      // Проверяем, не пытаемся ли мы перенаправить на тот же URL
      if (to.fullPath !== newUrl.path + '?' + new URLSearchParams(newUrl.query).toString()) {
        // return navigateTo(newUrl);
        router.push(newUrl);
      }
    }
  } else {
    to.meta.layout = 'default'
  }

})