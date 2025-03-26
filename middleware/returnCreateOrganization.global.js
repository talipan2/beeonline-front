import { useSettingStore } from "~/store/settingStore";
import { useUserStore } from "~/store/userStore"


export default defineNuxtRouteMiddleware(async (to, from) => {
  const nuxtApp = useNuxtApp();
  const userStore = useUserStore();
  const settingStore = useSettingStore();
  const router = useRouter();

  await nextTick();

  // try {
  //   await userStore.checkAuth();
  // } catch (error) {

  // }

  if(userStore.isAuth && userStore.userData.id && !userStore.userData?.organization_id && to.path !== '/register/step1' &&  settingStore.isCreateOrder === false) {
    return navigateTo({path: '/register/step1'})
  }

  if(userStore.isAuth && userStore.userData.id && userStore.userData?.organization_id && !userStore.userData?.public_cards[0]?.id && to.path !== '/register/step2') {
    return navigateTo({path: '/register/step2'})
  }
  
})