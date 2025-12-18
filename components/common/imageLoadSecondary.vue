<template>
	<Field
		:label="errorLabel"
		:rules="rules"
		v-slot="{ field, errors, meta, handleReset, handleBlur, setValue }"
		:name="name"
		:model-value="imagePreview || modelValue"
	>
		<div
			class="load-image-secondary"
			:class="{ 'load-image-secondary_error': errors.length && meta.touched }"
		>
			<label
				class="form-group__title"
				v-if="title"
			>
				{{ title }}
			</label>
			<div class="load-image-secondary__wrapper">
				<div
					class="load-image-secondary__container"
					v-bind="field"
				>
					<template v-if="imagePreview">
						<img
							:src="imagePreview"
							:alt="imagePreview"
						/>
						<UiButton
							class="load-image-secondary__btn load-image-secondary__btn_type_delete"
							type="button"
							variant="default"
							:without-padding="true"
							@click="
								() => {
									handleDeleteImage();
									handleReset();
									handleBlur();
									setValue('');
								}
							"
						>
							<SvgoClose class="svg-l" />
						</UiButton>

						<!-- <UiButton class="load-image-secondary__btn load-image-secondary__btn_type_setting" type="button" variant="default" :without-padding="true" @click="settingModal = true">
              <SvgoSetting class="svg-l"/>
            </UiButton> -->
						<UiInput
							class="load-image-secondary__input-url"
							type="text"
							name="imagePreview"
							label="Логотип"
							v-model="imagePreview"
						/>
					</template>
					<div
						v-else
						class="load-image-secondary__loader"
					>
						<input
							ref="inputFile"
							type="file"
							name="logo"
							accept=".jpeg, .png, .jpg, .gif"
							@change="onFileChange"
						/>
						<div class="load-image-secondary__placeholder">
							<SvgoCamera
								class="svg-lx load-image-secondary__camera"
								fill="#6937a5"
							/>
							<span
								class="load-image-secondary__title"
								v-if="label"
							>
								{{ label }}
							</span>
							<CommonProgressBar
								class="load-image-secondary__progress"
								:progress="progress"
								v-if="progress > 0 && progress < 100"
							/>
						</div>
					</div>
				</div>
			</div>
			<ModalsRoundBorder
				:is-open="settingModal"
				title="Выберите область"
				@close="settingModal = false"
			>
				<Cropper
					ref="cropper"
					:src="imagePreview"
					:stencil-component="RectangleStencil"
					:stencil-props="stencilProps"
					:cross-origin="'anonymous'"
					class="cropper-container"
				/>
				<UiButton
					type="button"
					variant="quinary"
					size="large"
					@click="handleCrop"
				>
					Выбрать область
				</UiButton>
			</ModalsRoundBorder>
		</div>
		<div
			class="invalid-error"
			v-if="rules"
		>
			<span
				v-if="errors.length && meta.touched"
				class="invalid-error__text"
			>
				{{ errors[0] }}
			</span>
		</div>
	</Field>
</template>

<script setup>
	import { useUserStore } from '~/store/userStore';
	import { useSettingStore } from '~/store/settingStore';
	import { useToast } from 'vue-toastification';
	import { Cropper, RectangleStencil } from 'vue-advanced-cropper';
	import 'vue-advanced-cropper/dist/style.css';

	const props = defineProps({
		title: {
			type: String,
			default: '',
		},
		label: {
			type: String,
			default:
				'Загрузить Logo, или фотографию (до 5Мб. Допустимый формат .jpeg, .png, .jpg, .gif)',
		},
		modelValue: {
			type: [String, Object],
			default: '',
		},
		maxSize: {
			type: Number,
			default: 5,
		},
		rules: {
			type: Object,
			default: () => ({}),
		},
		errorLabel: {
			type: String,
			default: 'Изображение',
		},
		name: {
			type: String,
			default: '',
		},
		returnFormData: {
			type: Boolean,
			default: false,
		},
	});

	const settingStore = useSettingStore();
	const imagePreview = ref('');
	const userStore = useUserStore();
	const toast = useToast();
	const progress = ref(0);
	const cropper = ref(null);
	const settingModal = ref(false);
	const inputFile = ref(null);

	const stencilProps = {
		aspectRatio: 1 / 0.7,
	};

	const handleCrop = (data) => {
		if (cropper.value) {
			const { canvas } = cropper.value.getResult();
			canvas.toBlob((blob) => {
				imagePreview.value = URL.createObjectURL(blob);
			});
			settingModal.value = false;
		}
	};

	const handleCloseSettingModal = () => {
		settingModal.value = false;
	};

	const emit = defineEmits(['update:modelValue']);

	const onFileChange = (event) => {
		const file = event.target.files[0];

		if (file && file.type.startsWith('image/')) {
			if (file.size < props.maxSize * 1024 * 1024) {
				const formData = new FormData();
				formData.append('file', file);
				console.log(formData.get('file'));
				const config = {
					onUploadProgress: (progressEvent) => {
						if (progressEvent.lengthComputable) {
							progress.value = Math.round(
								(progressEvent.loaded / progressEvent.total) * 100
							);
						}
					},
				};
				if (props.returnFormData) {
					emit('update:modelValue', {
						formData: formData,
						url: URL.createObjectURL(file),
					});
					imagePreview.value = URL.createObjectURL(file);
				} else {
					settingStore
						.uploadFiles(userStore.userData.id, formData, config)
						.then((res) => {
							if (res && res.media_id) {
								imagePreview.value = URL.createObjectURL(file);
								emit('update:modelValue', {
									id: res.media_id,
									url: imagePreview.value,
								});
							}
						});
				}
			} else {
				toast.error('Файл превышает допустимый размер');
			}
		} else {
			toast.error('Неверный тип файла');
		}
	};

	watch(
		() => progress.value,
		(newVal) => {
			console.log(progress.value);
		}
	);

	const handleDeleteImage = () => {
		if (inputFile.value) {
			inputFile.value.value = '';
		}
		imagePreview.value = '';
		emit('update:modelValue', null);
	};

	// Инициализация imagePreview при монтировании
	onMounted(() => {
		if (props.modelValue) {
			if (typeof props.modelValue === 'object' && props.modelValue !== null) {
				imagePreview.value = props.modelValue.url || '';
			} else {
				imagePreview.value = props.modelValue || '';
			}
		}
	});

	watch(
		() => props.modelValue,
		(newVal) => {
			if (newVal && typeof newVal === 'object' && newVal !== null) {
				if (newVal.url) {
					imagePreview.value = newVal.url;
				}
			} else {
				imagePreview.value = newVal || '';
			}
		},
		{ deep: true, immediate: true }
	);
</script>

<style lang="scss">
	.cropper-container {
		min-height: 200px;
		max-height: 500px;
	}

	.load-image-secondary {
		font-size: 1rem;
		width: 100%;

		&__wrapper {
			display: flex;
		}

		&_error {
			.load-image-secondary__container {
				border-color: #ff0000;
			}
		}

		&__container {
			border: 1px dashed #e1e3f1;
			background-color: #f9f9f9;
			flex: 0 0 32%;
			aspect-ratio: 1 / 0.7;
			position: relative;
			overflow: hidden;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 8px;

			input {
				position: absolute;
				inset: 0;
				width: 100%;
				opacity: 0;
				cursor: pointer;
			}

			img {
				height: 100%;
				object-fit: contain;
			}
		}

		&__placeholder {
			display: flex;
			flex-direction: column;
			align-items: center;
			row-gap: 1.6em;
		}

		&__title {
			font-size: 1.4em;
			font-weight: 600;
			line-height: 1.4em;
			color: #8387a3;
			text-align: center;
		}

		&__progress {
			position: absolute;
			bottom: 1.2em;
			left: 2.5em;
			right: 2.5em;
			width: auto !important;
			background-color: rgb(255, 255, 255);
			border-radius: 8px;
			padding: 0.2em 1em;
			border: 1px solid var(--text-color-ternary);
		}

		&__btn {
			position: absolute;
			width: 2.4em;
			height: 2.4em;
			box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);
			background: #fff;

			svg {
				width: 100%;
			}

			&_type_delete {
				top: 1em;
				right: 1em;

				svg {
					width: 55%;
					path {
						fill: #000;
					}
				}

				&:hover {
					path {
						fill: #6937a5;
					}
				}
			}

			&_type_setting {
				top: 1em;
				left: 1em;

				svg {
					path {
						stroke: #000;
					}
				}

				&:hover {
					path {
						stroke: #6937a5;
					}
				}
			}
		}

		&__del {
			position: absolute;
			top: 1em;
			right: 1em;
			background-color: transparent;
		}

		.input:has(.load-image-secondary__input-url) {
			display: none;
		}

		@include mobile {
			&__container {
				aspect-ratio: 1/0.7;
				flex-basis: 50%;
				max-width: 50%;
			}

			&__title {
				font-size: 1em;
				margin-inline: 0.2em;
			}
		}
	}
</style>
