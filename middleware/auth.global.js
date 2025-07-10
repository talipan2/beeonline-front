import { useUserStore } from "~/store/userStore";
import axios from "axios";
import { useSettingStore } from "~/store/settingStore";

export default defineNuxtRouteMiddleware(async(to, from) => {
    if (to.meta.ignoreAuth) {
        return
      }

  const userStore = useUserStore();
  const settingStore = useSettingStore();
  const router = useRouter();

  const publicPaths = [
    '/',
    '/login',
    '/login/token',
    '/register',
    '/services',
    '/orders',
    '/members',
    '/contacts',
    '/help',
    '/page-policy',
    '/page-oferta',
    '/page-requisites',
    '/sitemap',
    '/page-terms-of-use',
    '/page-oferta-st',
    '/page-oferta-ct',
    '/welcome',
    '/search',
    '/related-industry-services',
    '/telegram',
    '/forgot-password',
    '/reset-password',
    '/news',
    '/email-confirm'
  ];

  // if(!userStore.isAuth) {
  //   try {
  //     await userStore.checkAuth();
  //   } catch (error) {
  //     if(publicPaths.includes(to.path)) return;
  //     navigateTo('/login');
  //     console.error('Ошибка при проверке авторизации:', error);
  //   }
  // } else {
  //   userStore.checkAuth()
  //   .catch(error => {
  //     navigateTo('/login');
  //     console.error('Ошибка при проверке авторизации:', error)}
  //   );
  // }

  const isPublicRoute = publicPaths.includes(to.path) || publicPaths.some(path => to.path.startsWith(path + '/'));

  if(!userStore.isAuth) {
    try {
      await userStore.checkAuth();
    } catch (error) {
      if(isPublicRoute) return;
      if(settingStore.isTelegram) {
        router.push('/telegram');
      } else {
        router.push('/login');
      }
      console.error('Ошибка при проверке авторизации:', error);
    }
  }

  // try {
  //   await userStore.checkAuth();
  // } catch (error) {
  //   if(publicPaths.includes(to.path)) return;
  //   console.error('Ошибка при проверке авторизации:', error);
  //   return navigateTo('/login');
  // }

})
