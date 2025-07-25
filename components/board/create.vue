<template>
	<UiForm
		class="board-create"
		:submit="submit"
	>
		<CommonLayoutInfoCard>
			<BoardForm
				v-model="data"
				isReturnFormDataGallery
			/>
		</CommonLayoutInfoCard>
		<BoardModalsErrorModal
			title="Ошибка создания объявления"
			:text="errorText"
			buttonText="Авторизоваться"
			buttonLink="/login"
		/>
		<UiButton
			type="submit"
			variant="quinary"
			size="large"
			class="board-create__btn"
			:disabled="isLoading"
		>
			Создать объявление и перейти к оплате
		</UiButton>
	</UiForm>
</template>

<script setup>
	import { useAnnouncementStore } from '~/store/announcementStore';
	import { useSettingStore } from '~/store/settingStore';
	import { useUserStore } from '~/store/userStore';

	const announcementStore = useAnnouncementStore();
	const settingStore = useSettingStore();
	const userStore = useUserStore();

	const data = ref({
		announcement_image: '',
		title: '',
		content: '',
		price: 0,
		currency_id: 2,
		category_ids: [],
		gallery: [],
		name: '',
		email: '',
		phone: '',
		company: '',
		site: '',
		country_code: '',
	});

	const router = useRouter();
	const isLoading = ref(false);
	const errorText = ref('');

	const prepareFormData = () => {
		// Создаем FormData
		const formData = new FormData();

		// Добавляем изображение
		const imageFile = data.value.announcement_image?.formData?.get('file');
		if (imageFile) {
			formData.append('announcement_image', imageFile);
		}

		// Добавляем простые поля
		const fields = {
			title: data.value.title || '',
			content: data.value.content || '',
			price: String(data.value.price || 0),
			currency_id: String(data.value.currency_id || 2),
			name: data.value.name || '',
			email: data.value.email || '',
			phone: data.value.phone || '',
			company: data.value.company || '',
			site: data.value.site || '',
			country_code: data.value.country_code || '',
		};

		Object.entries(fields).forEach(([key, value]) => {
			formData.append(key, value);
		});

		// Добавляем массивы

		// Категории
		data.value.category_ids?.forEach((id, index) => {
			formData.append(`category_ids[${index}]`, String(id));
		});

		// Галерея - файлы из FormData
		data.value.gallery?.forEach((galleryItem, index) => {
			if (galleryItem.formData) {
				const galleryFile = galleryItem.formData.get('file');
				if (galleryFile) {
					formData.append(`gallery[${index}]`, galleryFile);
				}
			} else if (galleryItem.id) {
				// Если это уже загруженное изображение с ID
				formData.append(`gallery[${index}]`, galleryItem.id);
			}
		});

		return formData;
	};

	const submit = (value, form) => {
		if (isLoading.value) return;
		isLoading.value = true;
		const formData = prepareFormData();
		announcementStore
			.createAnnouncement(formData, form)
			.then((res) => {
				console.log(res);
				if (res.announcement) {
					router.push(`/board/user/${res.announcement.id}`);
					settingStore.boardPayModal = true;
				} else {
					router.push(`/board/user`);
				}
			})
			.catch((err) => {
				console.error('Ошибка создания объявления:', err);
				if (err.statusCode === 401 && err.message) {
					errorText.value = err.message;
					settingStore.boardErrorModal = true;
				}
			})
			.finally(() => {
				isLoading.value = false;
			});
	};

	onMounted(() => {
		if (userStore.userData.id) {
			data.value = {
				...data.value,
				name: userStore.userData?.name,
				email: userStore.userData?.email,
				phone: userStore.userData?.phone,
				country_code: userStore.userData?.country_code,
				company: userStore.userData?.organization?.name,
			};
		}
	});
</script>

<style lang="scss">
	.board-create {
		font-size: 1rem;

		&__btn {
			font-size: 1.2em;
			text-transform: uppercase;
			margin-left: auto;
			margin-top: 2.6em;
		}
	}
</style>
