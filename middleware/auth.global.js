import { useUserStore } from "~/store/userStore";
import axios from "axios";

export default defineNuxtRouteMiddleware(async(to, from) => {
  const userStore = useUserStore();

  const publicPaths = ['/', '/login', '/register', '/services', '/orders', '/members'];

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
  if(!userStore.isAuth) {
    try {
      await userStore.checkAuth();
    } catch (error) {
      if(publicPaths.includes(to.path)) return;
      navigateTo('/login');
      console.error('Ошибка при проверке авторизации:', error);
    }
  }

  // try {
  //   await userStore.checkAuth();
  // } catch (error) {
  //   if(publicPaths.includes(to.path)) return;
  //   navigateTo('/login');
  //   console.error('Ошибка при проверке авторизации:', error);
  // }

})