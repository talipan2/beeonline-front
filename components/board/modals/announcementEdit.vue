<template>
	<ModalsRoundBorder
		:is-open="isOpen"
		title="Редактирование объявления"
		@close="emit('close')"
		size="lg"
		class="service-modal"
	>
		<UiForm
			class="service-modal__form"
			:submit="submit"
		>
			<BoardForm v-model="cloneData" />
			<div class="new-service-card-layout__edit-service-buttons">
				<UiButton
					class="new-service-card-layout__edit-service-button"
					type="button"
					variant="tertiary"
					size="large"
					@click="emit('close')"
				>
					Отмена
				</UiButton>
				<UiButton
					class="new-service-card-layout__edit-service-button"
					type="submit"
					variant="quinary"
					size="large"
				>
					Сохранить изменения
				</UiButton>
			</div>
			{{ cloneData }}
		</UiForm>
	</ModalsRoundBorder>
</template>

<script setup>
	import { useAnnouncementStore } from '~/store/announcementStore';

	const props = defineProps({
		isOpen: {
			type: Boolean,
			default: false,
		},
		data: {
			type: Object,
			default: () => ({}),
		},
	});

	const announcementStore = useAnnouncementStore();

	const cloneData = computed({
		get() {
			return props.data;
		},
		set(value) {
			emit('update:data', value);
		},
	});

	const emit = defineEmits(['close', 'update:data']);

	const prepareFormData = () => {
		// Создаем FormData
		const formData = new FormData();

		// Добавляем изображение
		const imageFile =
			cloneData.value?.announcement_image?.formData?.get('file');
		if (imageFile) {
			formData.append('announcement_image', imageFile);
		}

		// Добавляем простые поля
		const fields = {
			title: cloneData.value?.title || '',
			content: cloneData.value?.content || '',
			price: String(cloneData.value?.price || 0),
			currency: String(cloneData.value?.currency || 2),
			name: cloneData.value?.name || '',
			email: cloneData.value?.email || '',
			phone: cloneData.value?.phone || '',
			company: cloneData.value?.company || '',
			site: cloneData.value?.site || '',
		};

		console.log(fields);

		Object.entries(fields).forEach(([key, value]) => {
			formData.append(key, value);
		});

		// Добавляем массивы

		// Категории
		cloneData.value?.category_ids?.forEach((id, index) => {
			formData.append(`category_ids[${index}]`, String(id));
		});

		// Галерея - файлы из FormData
		cloneData.value?.gallery?.forEach((galleryItem, index) => {
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
			.updateAnnouncement(props.data.id, formData, form)
			.then((res) => {
				console.log('Объявление создано:', res);
				emit('close');
			})
			.catch((err) => {
				console.error('Ошибка создания объявления:', err);
			});
	};
</script>
