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

  const availableLinkList = [
    '/login',
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
  ]

  if (
    userStore.isAuth &&
    userStore.role === 'customer' &&
    userStore.role === 'performer' &&
    userStore.userData.id &&
    userStore.userData?.organization_id &&
    !availableLinkList.some((item) => to.path.startsWith(item)) &&
    !to.path !== '/' &&
    userStore.userData?.public_cards
  ) {
    const publicCards = userStore.userData.public_cards || []
    const firstCard = publicCards[0];

    if(!firstCard) {
      return navigateTo({ path: "/register/step2" });
    } else if (firstCard?.current_step === 1 && publicCards.length === 1) {
      return navigateTo({ path: "/register/step3" });
    } else if (firstCard?.current_step === 2 && publicCards.length === 1) {
      return navigateTo({ path: "/register/step4" });
    }
  }
})