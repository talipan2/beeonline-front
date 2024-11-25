import { useUserStore } from "~/store/userStore";
import axios from "axios";

export default defineNuxtRouteMiddleware(async(to, from) => {
  const userStore = useUserStore();
  const router = useRouter();
  // try {
  //   // Делаем запрос с авторизацией
  //   const { data } = await axios.get(`http://localhost:8080/api/auth-check`, {
  //     headers: {
  //       Authorization: `Bearer ${useCookie('token').value}`
  //     }
  //   });

  //   // Если данные получены, обновляем store
  //   if (data) {
  //     userStore.isAuth = true;
  //     userStore.userData = data.user;
  //     userStore.role = 'performer';
  //     userStore.role = useCookie('role').value;
  //   }
  // } catch (error) {
  //     userStore.isAuth = false;
  //     userStore.userData = {};
  //     userStore.role = null;
  //     useCookie('token').value = null; 
  //     if(to.path !== '/') navigateTo('/'); 
  // }

  const publicPaths = ['/', '/login', '/register', '/services', '/orders', '/members'];
  if (publicPaths.includes(to.path)) {
    return;
  }

  try {
    await userStore.checkAuth();
  } catch (error) {
    router.push({ path: '/login' });
    console.error('Ошибка при проверке авторизации:', error);
  }

})