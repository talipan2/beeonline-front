import { useSettingStore } from "~/store/settingStore";
import { useUserStore } from "~/store/userStore"


export default defineNuxtRouteMiddleware(async (to, from) => {
    if (to.meta.ignoreAuth) {
        return
      }

  const nuxtApp = useNuxtApp();
  const userStore = useUserStore();
  const settingStore = useSettingStore();
  const router = useRouter();

  if(from.path === '/telegram') {
    settingStore.isTelegram = true
    settingStore.isCreateOrder = true
  }

  
  await nextTick();

  if (!userStore.isAuth) {
    return;
  }

  // try {
  //   await userStore.checkAuth();
  // } catch (error) {

  // }

  const availableLinkList = [
    '/register',
    '/orders/create',
    '/support',
    '/deals',
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
    '/news',
  ]

  if(userStore.isAuth && 
    userStore.userData.id && 
    !userStore.userData?.organization_id && 
    to.path !== '/register/step1' &&  
    settingStore.isCreateOrder === false && 
    !availableLinkList.some((item) => to.path.startsWith(item)) &&
    to.path !== '/'
  ) {
    return navigateTo({path: '/register/step1'})
  }

  const showModalLinks = [
    '/support',
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
    '/news',
  ]

  const notShowModalLinks = [
    '/services/create',
    '/orders/create',
  ]

  // подтверждение перехода
  if(from.path.startsWith('/register/step') && 
    to.path !== from.path && 
    (showModalLinks.some((item) => to.path.startsWith(item)) || to.path === '/') &&
    !settingStore.registerRedirectConfirm
    && !notShowModalLinks.some((item) => to.path.startsWith(item))
  ) {
    settingStore.returnRegisterModal = true
    settingStore.registerRedirectPath = to.path
    return abortNavigation()
  }

  if (
    userStore.isAuth &&
    (userStore.role === 'customer' ||
    userStore.role === 'performer') &&
    userStore.userData.id &&
    userStore.userData?.organization_id &&
    !availableLinkList.some((item) => to.path.startsWith(item)) &&
    to.path !== '/' && 
    userStore.userData?.public_cards 
  ) {
    const publicCards = userStore.userData.public_cards || []
    const firstCard = publicCards[0];

    if(firstCard && !firstCard?.status_code === 'DRAFT'){
      return
    }

    if(!firstCard) {
      return navigateTo({ path: "/register/step2" });
    } else if (firstCard?.current_step === 1 && publicCards.length === 1) {
      return navigateTo({ path: "/register/step3" });
    } else if (firstCard?.current_step === 2 && publicCards.length === 1) {
      return navigateTo({ path: "/register/step4" });
    }
  }
})
