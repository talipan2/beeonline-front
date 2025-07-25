import { useEntityStore } from '~/store/entityStore';
import { useSettingStore } from '~/store/settingStore';
import { useUserStore } from '~/store/userStore';

export default defineNuxtRouteMiddleware(async (to, from) => {
	if (to.meta.ignoreAuth) {
		return;
	}

	const nuxtApp = useNuxtApp();
	const userStore = useUserStore();
	const settingStore = useSettingStore();
	const entityStore = useEntityStore();
	const router = useRouter();

	if (from.path === '/telegram') {
		settingStore.isTelegram = true;
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
		'/performer-register',
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
		'/news',
		'/no-roles',
		'/board',
	];

	const requireOrganizationAndPublicCardLinks = ['/board/user'];

	// переход к созданию организации у заказчика
	if (
		userStore.isAuth &&
		userStore.userData.id &&
		userStore.role === 'customer' &&
		!userStore.userData?.organization_id &&
		to.path !== '/register/step1' &&
		settingStore.isCreateOrder === false &&
		!availableLinkList.some((item) => to.path.startsWith(item)) &&
		to.path !== '/'
	) {
		return navigateTo({ path: '/register/step1' });
	}

	// переход к созданию организации у исполнителя
	if (
		userStore.isAuth &&
		userStore.userData.id &&
		userStore.role === 'performer' &&
		!userStore.userData?.organization_id &&
		to.path !== '/performer-register/step1' &&
		!availableLinkList.some((item) => to.path.startsWith(item)) &&
		to.path !== '/'
	) {
		return navigateTo({ path: '/performer-register/step1' });
	}

	// Список ссылок которые не должны быть закрытым, но на которых есть модальное окно с запросом подтверждения
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
		'/board',
	];

	const notShowModalLinks = ['/services/create', '/orders/create'];

	// подтверждение перехода
	if (
		(from.path.startsWith('/register/step') ||
			from.path.startsWith('/performer-register/step')) &&
		to.path !== from.path &&
		(showModalLinks.some((item) => to.path.startsWith(item)) ||
			to.path === '/') &&
		!settingStore.registerRedirectConfirm &&
		!notShowModalLinks.some((item) => to.path.startsWith(item)) &&
		!requireOrganizationAndPublicCardLinks.some((item) =>
			to.path.startsWith(item)
		)
	) {
		settingStore.returnRegisterModal = true;
		settingStore.registerRedirectPath = to.path;
		return abortNavigation();
	}

	// переход к созданию публичной карты у заказчика
	if (
		userStore.isAuth &&
		userStore.role === 'customer' &&
		userStore.userData.id &&
		userStore.userData?.organization_id &&
		(!availableLinkList.some((item) => to.path.startsWith(item)) ||
			requireOrganizationAndPublicCardLinks.some((item) =>
				to.path.startsWith(item)
			)) &&
		to.path !== '/' &&
		userStore.userData?.public_cards
	) {
		const publicCards = userStore.userData.public_cards || [];
		const firstCard = publicCards[0];

		if (firstCard?.id && firstCard?.status_code !== 'DRAFT') {
			return;
		}

		if (!firstCard) {
			return navigateTo({ path: '/register/step2' });
		} else if (firstCard.is_auto_created) {
			return navigateTo({ path: '/register/step2' });
		} else if (firstCard?.current_step === 1 && publicCards.length === 1) {
			return navigateTo({ path: '/register/step3' });
		} else if (firstCard?.current_step === 2 && publicCards.length === 1) {
			return navigateTo({ path: '/register/step4' });
		}
	}

	// переход к созданию публичной карты у исполнителя
	if (
		userStore.isAuth &&
		userStore.role === 'performer' &&
		userStore.userData.id &&
		userStore.userData?.organization_id &&
		(!availableLinkList.some((item) => to.path.startsWith(item)) ||
			requireOrganizationAndPublicCardLinks.some((item) =>
				to.path.startsWith(item)
			)) &&
		to.path !== '/' &&
		userStore.userData?.public_cards
	) {
		const publicCards = userStore.userData.public_cards || [];
		const firstCard = publicCards.find((card) => card.type === 'performer');
		let performerServices = null;
		if (userStore.userData?.organization_id) {
			const response = await entityStore.getSelfServices(
				userStore.userData?.organization_id
			);
			if (response) {
				performerServices = response;
			}
		}

		if (firstCard?.id && firstCard?.status_code != 'DRAFT') {
			return;
		}

		if (!firstCard?.id) {
			return navigateTo({ path: '/performer-register/step2' });
		} else if (firstCard && firstCard.id && firstCard.current_step === 2) {
			return navigateTo({ path: '/performer-register/step3' });
		} else if (firstCard && firstCard.id && firstCard.current_step === 3) {
			return navigateTo({ path: '/performer-register/step4' });
		}
	}

	// проверка есть ли организация у пользователя для всех пользователей
	if (
		userStore.isAuth &&
		userStore.userData.id &&
		(!availableLinkList.some((item) => to.path.startsWith(item)) ||
			requireOrganizationAndPublicCardLinks.some((item) =>
				to.path.startsWith(item)
			)) &&
		to.path !== '/' &&
		!userStore.role
	) {
		return navigateTo({ path: '/no-roles' });
	}
});
