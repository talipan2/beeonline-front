import { useUserStore } from "~/store/userStore";
import axios from "axios";

export default defineNuxtRouteMiddleware(async(to, from) => {
  const userStore = useUserStore();
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

  try {
    await userStore.checkAuth();
  } catch (error) {
    console.error('Ошибка при проверке авторизации:', error);
  }

})