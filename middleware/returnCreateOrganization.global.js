import { useSettingStore } from "~/store/settingStore";
import { useUserStore } from "~/store/userStore"


export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();
  const settingStore = useSettingStore();
  const router = useRouter();

  if(userStore.isAuth && !userStore.userOrganization?.id && to.path !== '/register/step1' &&  settingStore.isCreateOrder === false) {
    return navigateTo({path: '/register/step1'})
  }
  
})