<template>
	<UiModal
		v-model="isOpenModal"
		@confirm="() => confirm()"
		class="header-menu"
		:style="{ marginTop: `${headerHeight}px` }"
		ref="modall"
		:clickToClose="false"
	>
		<template #content>
			<div class="header-menu__header">
				<HeaderLocation />
				<HeaderChooseLang class="modal-lang" />
			</div>
			<UiInput
				:placeholder="'Поиск по сайту'"
				v-model="searchQuery"
				class="header-menu__search"
				@enter="handleSearch(searchQuery)"
			/>
			<template v-if="isAuth">
				<button
					class="header-menu__user-data"
					@click="() => (isOpenDropDown = !isOpenDropDown)"
				>
					<div class="header-menu__user-image">
						<img
							:src="logo || defaultLogoImage"
							:alt="userName"
						/>
					</div>
					<div class="header-menu__user-info">
						<div class="header-menu__user-name">{{ userName }}</div>
						<div class="header-menu__user-role">{{ getRoleName(role) }}</div>
					</div>
					<SvgoDropDownNew class="svg-m header-menu__dropdown-icon" />
				</button>
				<transition name="fade">
					<ul
						v-if="isOpenDropDown"
						class="header-menu__link-list header-menu__link-list_type_dropdown"
					>
						<li
							class="header-menu__link-item"
							v-for="item in dropdownMenuLinks"
							:key="item"
						>
							<NuxtLink
								:to="item.value"
								class="header-menu__link"
							>
								{{ item.label }}
							</NuxtLink>
						</li>
						<li class="header-menu__link-item header-menu__sign-out">
							<button
								type="button"
								@click="logOut"
								class="header-menu__link"
							>
								Выйти
							</button>
						</li>
					</ul>
				</transition>
			</template>
			<template v-else>
				<div class="header-menu__sign-in">
					<UiButton
						type="button"
						variant="quinary"
						size="large"
						class="header-menu__sign-in-button"
						@click="settingStore.authModalStatus = true"
					>
						Вход/Регистрация
					</UiButton>
					<UiButton
						type="button"
						variant="tertiary"
						size="large"
						class="header-menu__order-btn"
					>
						Разместить заказ
					</UiButton>
				</div>
			</template>
			<nav>
				<ul class="header-menu__link-list">
					<li class="header-menu__link-item">
						<NuxtLink
							to="/services"
							class="header-menu__link"
						>
							Найти производителя
						</NuxtLink>
					</li>
					<li class="header-menu__link-item">
						<NuxtLink
							to="/orders"
							class="header-menu__link"
						>
							Найти заказчика
						</NuxtLink>
					</li>
					<li class="header-menu__link-item">
						<NuxtLink
							to="/board"
							class="header-menu__link"
						>
							Объявления
						</NuxtLink>
					</li>
					<li class="header-menu__link-item">
						<NuxtLink
							to="/members"
							class="header-menu__link"
						>
							Участники портала
						</NuxtLink>
					</li>
					<li class="header-menu__link-item">
						<NuxtLink
							to="/help"
							class="header-menu__link"
						>
							Помощь
						</NuxtLink>
					</li>
					<li class="header-menu__link-item">
						<NuxtLink
							to="/contacts"
							class="header-menu__link"
						>
							Контакты
						</NuxtLink>
					</li>
				</ul>
			</nav>
			<template v-if="isAuth">
				<UiButton
					v-if="role === 'performer' && userRoles.includes('customer')"
					type="button"
					variant="default"
					class="header-menu__change-role"
					@click="handleSwitchRole"
				>
					<SvgoEnter class="svg-m" />
					Переключится на заказчика
				</UiButton>
				<UiButton
					v-if="role === 'customer' && userRoles.includes('performer')"
					type="button"
					variant="default"
					class="header-menu__change-role"
					@click="handleSwitchRole"
				>
					<SvgoEnter class="svg-m" />
					Переключится на производителя
				</UiButton>
				<!-- <NuxtLink to="" class="header-menu__change-role">
          <SvgoEnter class="svg-m" />
          В кабинет менеджера сделок
        </NuxtLink> -->
				<UiButton
					type="button"
					variant="default"
					class="header-menu__change-role"
					@click="setRole('performer')"
					v-if="!userRoles.includes('performer') && role !== 'adjacent'"
				>
					<SvgoAdduser class="svg-m" />
					Стать производителем
				</UiButton>
				<UiButton
					type="button"
					variant="default"
					class="header-menu__change-role"
					@click="setRole('customer')"
					v-if="!userRoles.includes('customer') && role !== 'adjacent'"
				>
					<SvgoAdduser class="svg-m" />
					Стать заказчиком
				</UiButton>
				<UiButton
					variant="default"
					class="header-menu__change-role"
					v-if="adminRoles.includes(userStore.role)"
					:to="`${config.public.backUrl}/admin`"
					target="_blank"
				>
					<SvgoEnter class="svg-m" />
					Панель управления
				</UiButton>
			</template>
			<div class="header-menu__social">
				<NuxtLink
					to="https://www.youtube.com/channel/UC2c_djW8Mf6KLrmB5TOuP_w"
					class="header-menu__social-link"
				>
					<SvgoYoutube class="svg-lx" />
				</NuxtLink>
			</div>
		</template>
		<HeaderAuthUserModal />
	</UiModal>
</template>

<script setup>
	import { useSettingStore } from '~/store/settingStore';
	import defaultLogoImage from '~/assets/images/nophoto_pc.png';
	import { useUserStore } from '~/store/userStore';
	import { useOrganizationStore } from '~/store/organizationStore';

	const props = defineProps({
		modelValue: {
			type: Boolean,
			default: false,
		},

		headerHeight: {
			type: Number,
			default: 0,
		},
		userName: {
			type: String,
		},
		role: {
			type: String,
		},
		isAuth: {
			type: Boolean,
			default: false,
		},
		logo: {
			type: String,
			default: '',
		},
	});

	const router = useRouter();
	const emit = defineEmits(['update:modelValue']);
	const modall = ref(null);
	const settingStore = useSettingStore();
	const userStore = useUserStore();
	const organizationStore = useOrganizationStore();
	const isOpenModal = ref(props.modelValue);
	const userRoles = computed(() => userStore.userRoles);
	const userData = computed(() => userStore.userData);
	const config = useRuntimeConfig();

	const adminRoles = [
		'admin',
		'moderator',
		'support',
		'to_moderator',
		'deals_manager',
	];

	const absenceDefaultRole = computed(
		() =>
			!userRoles.value.includes('customer') &&
			!userRoles.value.includes('performer')
	); // переменная для проверки наличия ролей customer и performer

	const userCurrentPubCard = computed(() => userStore.userPubCard);

	const isOpenDropDown = ref(false);
	const searchQuery = ref('');

	function getRoleName(role) {
		if (role === 'customer') {
			return 'Заказчик';
		} else if (role === 'performer') {
			return 'Производитель';
		}
	}

	const handleSwitchRole = async () => {
		const isCustomer = userStore.role === 'customer';
		const newRole = isCustomer ? 'performer' : 'customer';
		const redirectPath = '/desktop';

		try {
			await userStore
				.setUserData({ role: newRole }, userData.value.id)
				.then((res) => {
					userStore.role = newRole;
					userStore.checkAuth();
				});
			localStorage.setItem('role', newRole);
			router.push({ path: redirectPath });
		} catch (error) {
			console.error(error);
		}
	};

	const logOut = async () => {
		try {
			await userStore.logOut();

			await router.push({ path: '/' });
		} catch (error) {
			console.log(error);
		}
	};

	const setRole = (role) => {
		userStore.setUserData({ role: role }, userData.value.id).then((res) => {
			userStore.role = role;
			userStore.userRoles = res.data.roles;
			localStorage.setItem('role', role);

			if (role === 'customer') {
				if (userStore.userData.organization_id) {
					router.push({ path: `/register/step2` });
				} else {
					router.push({ path: `/register/step1` });
				}
			} else if (role === 'performer') {
				if (userStore.userData.organization_id) {
					router.push({ path: `/performer-register/step2` });
				} else {
					router.push({ path: `/performer-register/step1` });
				}
			}
		});
	};

	const dropdownMenuLinks = computed(() => {
		if (props.role === 'adjacent') {
			return [
				{ id: 1, label: 'Профиль', value: `/profile` },
				{ id: 2, label: 'Сообщения', value: '/chat' },
			];
		} else {
			return [
				{ id: 1, label: 'Рабочий стол', value: `/desktop` },
				{ id: 2, label: 'Bee-online Gifts', value: `/bonus` },
				{ id: 3, label: 'Объявления', value: `/board/user` },
				{ id: 4, label: 'Профиль', value: `/profile` },
				...(props.role === 'customer'
					? [{ id: 5, label: 'Заказы', value: '/customer/orders' }]
					: []),
				// { id: 4, label: props.role === "performer" ? "Услуги" : "Заказы", value: props.role === "performer" ? "/performer/services" : "/customer/orders", },
				{ id: 6, label: 'Проверка контрагентов', value: `/org_check` },
				{ id: 7, label: 'Сообщения', value: '/chat' },
				{ id: 8, label: 'Сделки', value: '/deals' },
				// { id: 9, label: 'Документы', value: `/documentation` },
				// {
				// 	id: 10,
				// 	label: 'Партнерские сервисы',
				// 	value: `/related-industry-services`,
				// },
				{ id: 11, label: 'Избранное', value: `/favorites` },
				{ id: 12, label: 'Отзывы', value: `/my-reviews` },
				{ id: 13, label: 'Баланс и платные услуги', value: '/tariffs' },
				{ id: 14, label: 'Уведомления', value: `/notifications` },
				{ id: 15, label: 'Новости', value: '/news' },
				{ id: 16, label: 'Поддержка', value: '/support' },
			];
		}
	});

	function confirm() {
		emit('update:modelValue', false);
	}

	watch(
		() => props.modelValue,
		(newVal) => {
			isOpenModal.value = newVal;
		}
	);

	watch(isOpenModal, (newVal) => {
		isOpenModal.value = newVal;
		emit('update:modelValue', newVal);
	});

	watch(
		() => router.currentRoute.value.path,
		(newVal) => {
			confirm();
		}
	);

	const handleSearch = (query) => {
		router.push({ path: '/search', query: { q: query } });
	};
</script>

<style lang="scss">
	.header-menu {
		.modal-body {
			width: 29em;
		}

		.modal-content {
			font-family: 'Inter', sans-serif;
			max-height: 100%;
			box-sizing: border-box;
			overflow-y: auto;
			padding-bottom: 3em;
			margin-block: 0;
			background-color: transparent;
			padding-right: 1em;
		}

		&__header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 1.5em;

			.header__location {
				font-size: 1.4em;
			}
		}

		.header__lang-item {
			font-size: 1em;
		}

		.choose-lang {
			[data-tippy-root] {
				min-width: auto;
			}
		}

		&__search {
			margin-bottom: 1em;
		}

		&__sign-in {
			display: flex;
			flex-direction: column;
			row-gap: 1em;
			padding-block: 2em;
			border-top: 1px solid var(--text-color-ternary);
			border-bottom: 1px solid var(--text-color-ternary);

			.btn {
				width: 100%;
				text-transform: uppercase;
				font-size: 1.2em;
			}
		}

		&__order-btn {
			background-color: transparent;
			color: #fff;
		}

		&__user-data {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			column-gap: 1.2em;
			padding-block: 1.5em;
			margin-block: 1.5em;
			border-bottom: 1px solid var(--text-color-ternary);
			border-top: 1px solid var(--text-color-ternary);
		}

		&__user-image {
			width: 3em;
			height: 3em;
			border-radius: 3em;
			overflow: hidden;
		}

		&__user-info {
			font-size: 1.4em;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			flex: 1;
			row-gap: 0.5em;
			color: var(--text-color-octonary);
		}

		&__user-role {
			font-size: 0.857em;
			text-transform: uppercase;
		}

		&__dropdown-icon {
			path {
				fill: var(--text-color-octonary);
			}
		}

		&__link-list {
			display: flex;
			flex-direction: column;
			row-gap: 0.625em;
			font-size: 1.6em;
			color: var(--text-color-octonary);
			padding: 0.625em 0 1.9em 2.5em;
			font-weight: 300;
			border-bottom: 1px solid var(--text-color-ternary);
			margin-bottom: 1.25em;
		}

		&__link {
			color: var(--text-color-octonary);
		}

		&__change-role {
			font-size: 1.2em;
			color: var(--text-color-octonary);
			text-transform: uppercase;
			column-gap: 0.625em;
			padding-block: 0.625em 2.291em;
			border: none;
			border-bottom: 1px solid var(--text-color-ternary);
			margin-bottom: 1.66em;
			border-radius: 0;
			width: 100%;

			svg {
				fill: #fff;
			}
		}

		&__social {
			display: flex;
			justify-content: center;
		}

		&__social-link {
			circle {
				fill: #ffffff00;
			}

			@include hover {
				circle {
					fill: var(--text-color-octonary);
				}
				path {
					fill: var(--text-color-monodecimal);
				}
			}
		}

		&__sign-out {
			border-top: 1px solid #fff;
			padding-top: 1em;
		}

		.fade-enter-active,
		.fade-leave-active {
			transition:
				opacity 0.2s ease-in-out,
				transform 0.2s ease-in-out;
		}

		.fade-enter-from {
			transform: translateY(-10%);
			opacity: 0;
		}

		.fade-enter-to {
			transform: translateY(0);
			opacity: 1;
		}

		.fade-leave-from {
			transform: translateY(0);
			opacity: 1;
		}

		.fade-leave-to {
			transform: translateY(-10%);
			opacity: 0;
		}
	}
</style>
