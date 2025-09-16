<template>
	<RegisterLayout
		:block-title="`${
			role === 'customer'
				? 'Регистрация заказчика'
				: 'Регистрация производителя'
		}`"
		title="Контактные данные"
		description="Указанные данные не разглашаются третьим лицам и необходимы для успешной работы на портале."
	>
		<UiForm :submit="handleSubmit">
			<div class="register__form-container">
				<div
					class="register__performer-header"
					v-if="userStore.role === 'performer'"
				>
					<h2>Контактные данные</h2>
					<p>
						Указанные данные не разглашаются третьим лицам и необходимы для
						успешной работы на портале.
					</p>
				</div>
				<div class="form-group register__form-group">
					<label class="form-group-data form-group__title">
						Ваше имя *
						<UiInput
							:rules="{ required: true, min: 2 }"
							name="name"
							label="Ваше имя"
							class="form-group__value"
							type="text"
							placeholder="Ваше имя"
							v-model="userData.name"
						/>
					</label>
					<!-- <label class="form-group-data form-group__title">
            Ваша должность
            <UiInput
              :rules="{min: 2}"
              name="post"
              label="Ваша должность"
              class="form-group__value"
              type="text"
              placeholder="Ваша должность"
              v-model="userData.jobTitle"
            />
          </label> -->
					<label
						class="form-group-data form-group__title"
						v-if="role === 'customer'"
					>
						Название компании
						<UiInput
							:rules="{ min: 2 }"
							name="organization_name"
							label="Название компании"
							class="form-group__value"
							type="text"
							placeholder="Название компании"
							v-model="userData.organization_name"
						/>
					</label>
					<label class="form-group-data form-group__title">
						E-mail *
						<UiInput
							:rules="{ required: true, min: 6, email: true }"
							name="email"
							label="E-mail"
							class="form-group__value"
							type="email"
							placeholder="____@_____"
							v-model="userData.email"
						/>
					</label>
					<label class="form-group-data form-group__title">
						Ваш телефон *
						<CommonPhoneMusk
							class="form-group__value register__phone-mask"
							v-model="userData"
							:rules="{ required: true, max: 16 }"
							name="phone"
							label="Телефон"
						/>
					</label>
				</div>
				<div class="register__checkbox">
					<UiCheckbox
						name="Политика конфиденциальности"
						:rules="{ required: true }"
						v-model="userData.privacyPolicy"
					>
						<span class="register__checkbox-text">
							Нажимая кнопку, я даю согласие 
							<NuxtLink
								to="/page-personal-data"
								target="_blank"
							>
								на обработку персональных данных
							</NuxtLink>
							в соответствии с
							<NuxtLink
								to="/page-personal-data"
								target="_blank"
							>
								Политикой по обработке персональных 
							</NuxtLink>
							/ 
							<NuxtLink
								to="/page-policy"
								target="_blank"
							>
								Политикой конфиденциальности.
							</NuxtLink>
						</span>
					</UiCheckbox>
				</div>
				<div class="register__checkbox">
					<UiCheckbox
						name="Согласие на получение рекламной рассылки"
						:rules="{ required: true }"
						v-model="userData.personalData"
					>
						<span class="register__checkbox-text">
							Нажимая кнопку, я даю согласие на получение рекламной рассылки
							<NuxtLink
								to="/"
								target="_blank"
							>
								BEE-online.ru
							</NuxtLink>
						</span>
					</UiCheckbox>
				</div>
			</div>
			<UiButton
				type="submit"
				class="register__btn register__btn_type_secondary"
				variant="quinary"
				size="large"
			>
				Зарегистрироваться
				<SvgoBtnArrow class="svg-lx" />
			</UiButton>
		</UiForm>
		<template #soc-reg>
			<RegisterSocialRegistr :role="role" />
		</template>
	</RegisterLayout>
</template>

<script setup>
	import { useSettingStore } from '~/store/settingStore';
	import { useUserStore } from '~/store/userStore';
	import { useTranslateStore } from '~/store/translateStore';
	const translateStore = useTranslateStore();
	const userStore = useUserStore();
	const settingStore = useSettingStore();
	const router = useRouter();

	const role = computed(() => userStore.role);
	const userData = ref({
		name: '',
		jobTitle: '',
		email: '',
		phone: '',
		privacyPolicy: false,
		role: role.value,
		country_code: '',
		organization_name: '',
		personalData: false,
	});
	const isCreateOrder = computed(() => settingStore.isCreateOrder);

	const handleSubmit = async (values, form) => {
		const utm = localStorage.getItem('utm_params');
		const locale = translateStore.lang === 'ru' ? 'ru' : 'en';
		await userStore
			.registerUser(
				{
					...values,
					role: userData.value.role,
					utm: utm,
					country_code: userData.value.country_code,
					phone: userData.value.phone,
					notification_locale: locale,
				},
				form
			)
			.then((res) => {
				if (userData.value.role === 'customer') {
					if (isCreateOrder.value) {
						router.push({ path: '/orders/create/step1' });
						localStorage.setItem('isFirstOrder', true);
					} else {
						router.push({ path: '/orders/create/step1' });
						localStorage.setItem('isFirstOrder', true);
					}
				} else if (userData.value.role === 'performer') {
					router.push({ path: '/performer-register/step1' });
				}
			});
	};

	// watch(() => router.currentRoute.value.query, (newVal) => {
	//   if(newVal && newVal.action === 'create-order') {
	//     settingStore.isCreateOrder = true
	//   } else {
	//     settingStore.isCreateOrder = false
	//   }
	// })

	onMounted(() => {
		if (
			router.currentRoute.value.query &&
			router.currentRoute.value.query.role === 'customer' &&
			router.currentRoute.value.query.action === 'create-order'
		) {
			userStore.role = router.currentRoute.value.query.role;
			userData.value.role = router.currentRoute.value.query.role;
			settingStore.isCreateOrder = true;
		} else if (
			router.currentRoute.value.query &&
			router.currentRoute.value.query.role
		) {
			userStore.role = router.currentRoute.value.query.role;
			userData.value.role = router.currentRoute.value.query.role;
			settingStore.isCreateOrder = false;
		}
	});
</script>

<style lang="scss">
	.register {
		&__performer-header {
			h2 {
				font-size: 2.6em;
				margin-bottom: 0.3em;
			}

			p {
				font-size: 1.2em;
				margin-bottom: 1.46em;
			}
		}
		&__phone-mask {
			flex: 0 1 40%;
		}

		&__form-group {
			.form-group-data {
				flex: 0 1 calc(50% - 1.2em);

				@include mobile {
					flex: 0 1 100%;
				}
			}
		}

		&__checkbox {
			a {
				display: inline;
			}
		}

		@include mobile {
			&__checkbox {
				margin-bottom: 1em !important;
			}
		}
	}
</style>
