<template>
	<UiForm
		class="review__form"
		:submit="handleSubmit"
	>
		<div class="form-group">
			<label class="form-group-data form-group__title">
				Выберите оценку
				<CommonRating
					class="review__rating"
					:isSelected="true"
					:isCountRating="false"
					:isReviewText="false"
					:isCountReviews="false"
					v-model="reviewData.rating"
				/>
			</label>
		</div>
		<div class="form-group">
			<label class="form-group-data form-group__title">
				Плюсы сотрудничества:
				<UiTextArea
					class="form-group__value review__textarea"
					type="text"
					label="плюсы сотрудничества"
					name="text_positive"
					:rules="{ required: true, min: 5 }"
					v-model="reviewData.text_positive"
				/>
			</label>
		</div>
		<div class="form-group">
			<label class="form-group-data form-group__title">
				Минусы сотрудничества:
				<UiTextArea
					class="form-group__value review__textarea"
					type="text"
					label="минусы сотрудничества"
					name="text_negative"
					:rules="{ required: true, min: 5 }"
					v-model="reviewData.text_negative"
				/>
			</label>
		</div>
		<div
			class="review__file-load"
			ref="fileLoad"
		>
			<UiDragAndDropFile
				:visible="true"
				:maxSize="maxFilesSize"
				:accept="acceptFile"
				@addFile="addFile"
				:draggable-component="fileLoad || {}"
			/>
		</div>
		<CommonFileList
			@removeFile="removeFile"
			:dataList="uploadedFiles"
			:changed="true"
			:divider="false"
			:download-text="true"
		/>
		<UiButton
			class="review__btn"
			type="submit"
			variant="quinary"
			size="large"
		>
			Отправить
		</UiButton>
	</UiForm>
</template>

<script setup>
	import { useSettingStore } from '~/store/settingStore';
	import { useUserStore } from '~/store/userStore';

	const props = defineProps({
		review: {
			type: Object,
			default: () => ({}),
		},
	});

	const settingStore = useSettingStore();
	const userStore = useUserStore();
	const emit = defineEmits(['submit']);

	const fileLoad = ref(null);
	const maxFilesSize = 2048;
	const acceptFile = [
		'jpg',
		'jpeg',
		'png',
		'bmp',
		'pdf',
		'doc',
		'docx',
		'xls',
		'xlsx',
		'ppt',
		'pptx',
		'zip',
		'rar',
		'7z',
	];
	const formData = ref(new FormData());
	const reviewData = ref({
		rate: null,
		text_positive: null,
		text_negative: null,
		media_ids: [],
	});

	const uploadedFiles = ref([]);

	const addFile = (file) => {
		const formData = new FormData();
		formData.append('file', file);

		settingStore.uploadFiles(userStore.userData.id, formData).then((res) => {
			if (res && res.media_id) {
				uploadedFiles.value.push({
					id: res.media_id,
					name: res?.url?.split('/').pop(),
					url: res?.url,
					type: res?.url?.split('.').pop().toLowerCase(),
				});
			}
		});
	};

	const removeFile = (id) => {
		uploadedFiles.value = uploadedFiles.value.filter((item) => item.id !== id);
	};

	const handleSubmit = (values, form) => {
		console.log(values, form);
		emit(
			'submit',
			{ ...values, media_ids: uploadedFiles.value.map((item) => item.id) },
			form
		);
	};

	onMounted(() => {
		if (props.review) {
			reviewData.value = {
				...props.review,
			};

			if (props.review?.files && props.review.files.length > 0) {
				uploadedFiles.value = props.review.files.map((item) => ({
					id: item.id,
					name: item.url.split('/').pop(),
					url: item.url,
					type: item.url.split('.').pop().toLowerCase(),
				}));
			}
		}
	});
</script>

<style lang="scss">
	.review {
		&__text {
			font-size: 1.6em;
			margin-bottom: 1em;
		}

		&__rating {
			margin-top: 0.5em;

			.rate {
				font-size: 20px;
			}

			.rate__choice {
				font-size: 13px;
			}
		}

		.form-group__title {
			color: var(--text-color-secondary);
		}

		.file__icon {
			flex: 0 0 10%;
		}

		&__file-load {
			height: 15em;
			position: relative;
			margin-block: 1em;
		}

		&__textarea {
			.text-area__container {
				padding-bottom: 18%;

				@include mobile {
					padding-bottom: 30%;
				}
			}
		}

		&__btn {
			font-size: 1.2em;
			text-transform: uppercase;
			width: 50%;
			margin-inline: auto;
			margin-bottom: 1em;
		}
	}
</style>
