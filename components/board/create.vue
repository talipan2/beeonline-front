<template>
	<UiForm
		class="board-create"
		:submit="submit"
	>
		<CommonLayoutInfoCard>
			{{ data }}
			<BoardForm v-model="data" />
		</CommonLayoutInfoCard>
		<UiButton
			type="submit"
			variant="quinary"
			size="large"
			class="board-create__btn"
		>
			Создать объявление и перейти к оплате
		</UiButton>
	</UiForm>
	<BoardModalsPay
		:isOpen="isOpenPayModal"
		@update:isOpen="handleClosePayModal"
	/>
</template>

<script setup>
	import { useAnnouncementStore } from '~/store/announcementStore';

	const announcementStore = useAnnouncementStore();

	const data = ref({
		announcement_image: '',
		title: '',
		content: '',
		price: 0,
		currency: 2,
		category_ids: [],
		gallery: [],
		name: '',
		email: '',
		phone: '',
		company: '',
		site: '',
	});

	const isOpenPayModal = ref(false);

	const handleClosePayModal = () => {
		isOpenPayModal.value = false;
	};

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
			currency: String(data.value.currency || 2),
			name: data.value.name || '',
			email: data.value.email || '',
			phone: data.value.phone || '',
			company: data.value.company || '',
			site: data.value.site || '',
		};

		Object.entries(fields).forEach(([key, value]) => {
			formData.append(key, value);
		});

		// Добавляем массивы

		// // Категории
		// data.value.category_ids?.forEach((id, index) => {
		// 	formData.append(`category_ids[${index}]`, String(id));
		// });

		// Галерея - файлы из FormData
		data.value.gallery?.forEach((galleryItem, index) => {
			if (galleryItem.formData) {
				const galleryFile = galleryItem.formData.get('file');
				if (galleryFile) {
					formData.append(`gallery[${index}]`, galleryFile);
				}
			} else if (galleryItem.id) {
				// Если это уже загруженное изображение с ID
				formData.append(`gallery_ids[${index}]`, String(galleryItem.id));
			}
		});

		return formData;
	};

	const submit = (value, form) => {
		const formData = prepareFormData();
		announcementStore
			.createAnnouncement(formData, form)
			.then((res) => {
				console.log('Объявление создано:', res);
				isOpenPayModal.value = true;
			})
			.catch((err) => {
				console.error('Ошибка создания объявления:', err);
			});
	};
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
