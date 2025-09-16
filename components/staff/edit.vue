<template>
	<div class="staff staff-edit">
		<UiForm :submit="handleSubmit">
			<StaffContent v-model="employeeData" />
			<div class="staff-edit__checkboxes">
				<div class="form-group">
					<UiCheckbox
						:rules="{ required: true }"
						v-model="employeeData.privacy_policy"
						name="privacy_policy"
						label="Политика конфиденциальности"
					>
						<span>
							Нажимая кнопку, я даю согласие 
							<NuxtLink
								to="/page-personal-data"
								target="_blank"
								:style="{ display: 'inline' }"
							>
								на обработку персональных данных
							</NuxtLink>
							в соответствии с
							<NuxtLink
								to="/page-personal-data"
								target="_blank"
								:style="{ display: 'inline' }"
							>
								Политикой по обработке персональных 
							</NuxtLink>
							/ 
							<NuxtLink
								to="/page-policy"
								target="_blank"
								:style="{ display: 'inline' }"
							>
								Политикой конфиденциальности.
							</NuxtLink>
						</span>
					</UiCheckbox>
				</div>
				<div class="form-group">
					<UiCheckbox
						:rules="{ required: true }"
						v-model="employeeData.personal_data"
						name="personal_data"
						label="Согласие на получение рекламной рассылки"
					>
						<span>
							Нажимая кнопку, я даю согласие на получение рекламной рассылки
							<NuxtLink
								to="/"
								target="_blank"
								:style="{ display: 'inline' }"
							>
								BEE-online.ru
							</NuxtLink>
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
						Сохранить
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
				<UiButton
					@click="handleRejectionEmployee"
					type="button"
					class="form-group-data__btn"
					variant="quinary"
					size="large"
				>
					Отвязать от компании
				</UiButton>
			</div>
		</UiForm>
	</div>
</template>

<script setup>
	import { useUserStore } from '~/store/userStore';
	import { useToast } from 'vue-toastification';

	const props = defineProps({
		userData: {
			type: Object,
			default: () => ({}),
		},
	});

	const userStore = useUserStore();
	const toast = useToast();
	const router = useRouter();

	const employeeData = ref({
		email: '',
		name: '',
		post: '',
		phone: '',
		permissions: [],
		notifications: [],
		country_code: '',
	});

	watch(
		() => props.userData,
		(newVal) => {
			employeeData.value = { ...newVal };
		},
		{ deep: true }
	);

	const handleRejectionEmployee = () => {
		userStore
			.changeUserData(props.userData.id, {
				organization_id: null,
			})
			.then(() => {
				toast.success('Сотрудник успешно отвязан от компании');
				router.push({ path: '/staff' });
			});
	};

	const handleSubmit = (value, form) => {
		userStore
			.changeUserData(
				props.userData.id,
				{
					name: employeeData.value.name,
					email: employeeData.value.email,
					post: employeeData.value.post,
					phone: employeeData.value.phone,
					permissions: employeeData.value.permissions,
					country_code: employeeData.value.country_code,
				},
				form
			)
			.then(() => {
				userStore.setNotification(
					props.userData.id,
					employeeData.value.notifications
				);
				toast.success('Данные сотрудника успешно обновлены');
				router.push({ path: '/staff' });
			});
	};
</script>

<style lang="scss">
	.staff {
		&__buttons {
			padding-top: 2em;
			// border-top: 1px solid var(--border-color-secondary);
		}

		&-edit {
			&__checkboxes {
				padding-top: 2em;
				border-top: 1px solid var(--border-color-secondary);
			}
		}
	}
</style>
