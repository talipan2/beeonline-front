<template>
	<ModalsRoundBorder
		:is-open="isOpen"
		title="Редактирование объявления"
		@close="emit('close')"
		size="lg"
		class="announcement-edit-modal"
	>
		<UiForm
			class="announcement-edit-modal__form"
			:submit="submit"
		>
			<BoardForm v-model="cloneData" />
			<div class="announcement-edit-modal__buttons">
				<UiButton
					class="announcement-edit-modal__button"
					type="button"
					variant="tertiary"
					size="large"
					@click="emit('close')"
				>
					Отмена
				</UiButton>
				<UiButton
					class="announcement-edit-modal__button"
					type="submit"
					variant="quinary"
					size="large"
				>
					Сохранить изменения
				</UiButton>
			</div>
		</UiForm>
	</ModalsRoundBorder>
</template>

<script setup>
	import { useAnnouncementStore } from '~/store/announcementStore';
	import { useToast } from 'vue-toastification';

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
	const toast = useToast();

	const cloneData = computed({
		get() {
			return props.data;
		},
		set(value) {
			emit('update:data', value);
		},
	});

	const emit = defineEmits(['close', 'update:data', 'updateData']);

	const prepareFormData = () => {
		// Создаем FormData
		const formData = new FormData();

		formData.append('_method', 'PATCH');

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
			currency_id: String(cloneData.value?.currency_id || 2),
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
				formData.append(`gallery[${index}]`, galleryItem.id);
			}
		});

		return formData;
	};

	const submit = (value, form) => {
		const formData = prepareFormData();
		announcementStore
			.updateAnnouncement(props.data.id, formData, form)
			.then((res) => {
				emit('updateData', res?.data);
				emit('close');
				toast.success('Объявление успешно обновлено');
			})
			.catch((err) => {
				console.error('Ошибка создания объявления:', err);
			});
	};
</script>

<style lang="scss">
	.announcement-edit-modal {
		&__buttons {
			display: flex;
			column-gap: 1em;
			justify-content: flex-end;
		}
		&__button {
			font-size: 1.2em;
			text-transform: uppercase;
		}

		@include mobile {
			&__buttons {
				flex-direction: column;
				gap: 1em;
				box-shadow: 0 -2px 12px 0 rgba(0, 0, 0, 0.02);
				border-top: 1px solid #eff0f5;
				margin-inline: -3em;
				margin-bottom: -2.4em;
				padding: 1.6em;
			}
		}
	}
</style>
