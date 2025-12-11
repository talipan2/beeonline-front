<template>
	<div class="staff staff-create">
		<p class="staff__description">
			Заполните данные о сотруднике. Его логином будет являться адрес
			электронной почты, на которую придет пароль для доступа в личный кабинет.
		</p>
		<UiForm :submit="createOrganizationEmployee">
			<StaffContent v-model="staffData" />
			<div class="staff__checkboxes">
				<div class="form-group">
					<UiCheckbox
						:rules="{ required: true }"
						v-model="staffData.privacy_policy"
						name="privacy_policy"
						label="Политика конфиденциальности"
					>
						<span>
							Нажимая кнопку, я даю  
							<NuxtLink
								to="/page-personal-data"
								target="_blank"
								:style="{ display: 'inline' }"
							>
								согласие
							</NuxtLink>
								на обработку персональных данных в соответствии с
							<NuxtLink
								to="/page-policy"
								target="_blank"
								:style="{ display: 'inline' }"
							>
								Политикой по обработке персональных данных
							</NuxtLink>
						</span>
					</UiCheckbox>
				</div>
				<div class="form-group">
					<UiCheckbox
						v-model="staffData.newsletter_subscribed"
						name="newsletter_subscribed"
					>
						<span>
							Нажимая кнопку, я даю 
							<NuxtLink
								to="/page-consent-mailings"
								target="_blank"
								:style="{ display: 'inline' }"
							>
							согласие на получение рекламной рассылки
							</NuxtLink>
							BEE-online.ru
						</span>
					</UiCheckbox>
				</div>
			</div>
			<div class="form-group staff__buttons">
				<div class="form-group-data">
					<UiButton
						type="submit"
						class="form-group-data__btn"
						variant="quinary"
						size="large"
					>
						Создать
					</UiButton>
				</div>
				<div class="form-group-data">
					<UiButton
						to="/staff"
						class="form-group-data__btn"
						variant="senary"
						size="large"
					>
						Вернуться к списку сотрудников
					</UiButton>
				</div>
			</div>
		</UiForm>
	</div>
</template>

<script setup>
	import { useOrganizationStore } from '~/store/organizationStore';
	import { useUserStore } from '~/store/userStore';
	import { useToast } from 'vue-toastification';

	const organizationStore = useOrganizationStore();
	const userStore = useUserStore();
	const toast = useToast();
	const router = useRouter();

	const staffData = ref({
		name: '',
		email: '',
		phone: '',
		post: '',
		permissions: [],
		notifications: [],
		country_code: '',
		privacy_policy: false,
		newsletter_subscribed: true,
	});

	const createOrganizationEmployee = (values, form) => {
		userStore
			.createNewUser(
				{
					email: staffData.value.email,
					name: staffData.value.name,
					phone: staffData.value.phone,
					post: staffData.value.post,
					organization_id: userStore.userData.organization_id,
					country_code: staffData.value.country_code,
				},
				form
			)
			.then((res) => {
				if (res.data) {
					userStore.changeUserData(res.data.id, {
						permissions: staffData.value.permissions,
					});
					userStore.setNotification(res.data.id, staffData.value.notifications);
					toast.success('Сотрудник успешно создан');
					router.push({ path: '/staff' });
				}
			});
	};
</script>

<style lang="scss">
	.staff {
		&__buttons {
			padding-top: 2em;
		}

		&__checkboxes {
			padding-top: 2em;
			border-top: 1px solid var(--border-color-secondary);
		}
	}
</style>
