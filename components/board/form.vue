<template>
	<div class="board-form">
		<div class="form-group form-group_type_secondary">
			<label class="form-group__title">Анонсовая картинка *</label>
			<CommonImageLoadSecondary
				class="board-logo"
				v-model="data.announcement_image"
				label="Загрузить фотографию (до 5Мб. Допустимый формат .jpeg, .png, .jpg, .gif)"
				name="announcement_image"
				:rules="{ required_image: true }"
				errorLabel="'Анонсовая картинка'"
				:returnFormData="true"
			/>
		</div>
		<div class="form-group form-group_type_secondary">
			<label class="form-group__title">Название объявления *</label>
			<UiInput
				:rules="{ required: true, min: 2, max: 100 }"
				name="title"
				v-model="data.title"
				label="Название объявления"
				class="form-group__value"
				placeholder="Введите название объявления"
			/>
		</div>
		<div class="form-group form-group_type_secondary">
			<label class="form-group__title">Описание *</label>
			<UiTextArea
				class="form-group__value"
				v-model="data.content"
				name="content"
				label="Описание"
				:rules="{ required: true, min: 50, max: 2000 }"
				placeholder="Введите описание"
			/>
		</div>
		<div class="form-group form-group_type_secondary">
			<label class="form-group__title">Цена *</label>
			<UiInput
				:rules="{ required: true, min_value: 1 }"
				name="price"
				label="Цена"
				v-model="data.price"
				class="form-group__value board-form__price-input"
				type="number"
			>
				<!-- <UiSelect
					:options="currencyList"
					v-model="data.currency_id"
					return-id
					label="Валюта"
					name="currency"
					class="form-group__value board-form__currency-select"
					:error-show="false"
				/> -->
				<CommonDropDownSelect
					:options="currencyList"
					v-model="data.currency_id"
					label="Валюта"
					name="currency"
					class="form-group__value board-form__currency-select notranslate"
					:error-show="false"
					:show-border="false"
				/>
			</UiInput>
		</div>
		<div class="form-group form-group_type_secondary">
			<label class="form-group__title">Выбор категории *</label>
			<CommonBadgeSecond
				:badges="selectedCategories"
				@click="handleClickCategory"
				type="button"
				class="board-form__badge-second"
			/>
			<UiCheckboxGroup
				class="form-group__value board-form__checkbox-group"
				variant="rounded"
				:rules="{ required: true }"
				:options="categoryOptions"
				v-model="data.category_ids"
				name="category_ids"
				label="Выбор категории"
			/>
		</div>
		<div class="form-group form-group_type_secondary">
			<label class="form-group__title">Галерея</label>
			<div class="board-form__gallery-description">
				<p class="board-form__description-bold">
					Фотографии сделают вашу карточку более привлекательной для заказчика
				</p>
				<p class="board-form__description">
					Рекомендуемый размер 300 x 340 px.
				</p>
			</div>
			<CommonGalleryLoadSecondary
				v-model="data.gallery"
				class="board-gallery"
				:showSetting="false"
				:maxCount="5"
				:returnFormData="isReturnFormDataGallery"
			/>
		</div>
		<div class="form-group form-group_type_secondary">
			<label class="form-group__title">ФИО *</label>
			<UiInput
				:rules="{ required: true }"
				name="name"
				label="ФИО"
				v-model="data.name"
				class="form-group__value"
				placeholder="Введите ФИО"
			></UiInput>
		</div>
		<div class="form-group form-group_type_secondary">
			<label class="form-group__title">Электронная почта *</label>
			<UiInput
				:rules="{ required: true, email: true }"
				name="email"
				label="Электронная почта"
				v-model="data.email"
				class="form-group__value"
				placeholder="Введите электронную почту"
			></UiInput>
		</div>

		<div class="form-group form-group_type_secondary">
			<label class="form-group__title">Номер телефона *</label>
			<!-- <UiInput
				:rules="{ required: true }"
				name="phone"
				label="Номер телефона"
				v-model="data.phone"
				class="form-group__value"
				type="tel"
				placeholder="Введите номер телефона"
			></UiInput> -->
			<CommonPhoneMusk
				class="form-group__value board-form__phone-mask"
				v-model="data"
				:rules="{ required: true, max: 16 }"
				name="phone"
				label="Телефон"
			/>
		</div>
		<div class="form-group form-group_type_secondary">
			<label class="form-group__title">Название компании</label>
			<UiInput
				:rules="{ required: false }"
				name="company"
				label="Название компании"
				v-model="data.company"
				class="form-group__value"
				placeholder="Введите название компании"
			></UiInput>
		</div>
		<div class="form-group form-group_type_secondary">
			<label class="form-group__title">Ссылка на сайт</label>
			<UiInput
				:rules="{ url: true }"
				placeholder="Введите название сайта"
				name="site"
				label="Ссылка на сайт"
				v-model="data.site"
				class="form-group__value"
			>
				<SvgoPlanet class="svg-m" />
			</UiInput>
		</div>
		<div class="form-group form-group_type_secondary">
			<UiCheckbox
				:rules="{ required: true }"
				v-model="data.privacy_policy"
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
		<div class="form-group form-group_type_secondary">
			<UiCheckbox
				:rules="{ required: true }"
				v-model="data.personal_data"
				name="personal_data"
				label="Согласие на получение рекламной рассылки"
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
</template>

<script setup>
	import { useEntityStore } from '~/store/entityStore';
	import { useSettingStore } from '~/store/settingStore';
	import { useUserStore } from '~/store/userStore';
	import { useAnnouncementStore } from '~/store/announcementStore';

	const settingStore = useSettingStore();
	const entityStore = useEntityStore();
	const userStore = useUserStore();
	const announcementStore = useAnnouncementStore();

	const selectedCategories = computed(() => {
		if (data.value.category_ids) {
			return entityStore.getEntityLabelById(
				'announcementCategories',
				data.value.category_ids,
				true
			);
		}
		return [];
	});

	const props = defineProps({
		modelValue: {
			type: Object,
			default: () => ({}),
		},
		errorsList: {
			type: Object,
			default: () => ({}),
		},
		isReturnFormDataGallery: {
			type: Boolean,
			default: false,
		},
	});

	const emit = defineEmits(['update:modelValue']);

	const data = computed({
		get() {
			return props.modelValue;
		},
		set(value) {
			emit('update:modelValue', value);
		},
	});

	const categoryOptions = computed(
		() => entityStore.entityData.announcementCategories
	);

	const currencyList = computed(() => {
		if (settingStore.currencyList.length > 0) {
			return settingStore.currencyList
				.filter((item) => item.code !== 'bonus')
				.map((item) => ({
					id: item.id,
					label: item.code,
					value: item.code,
				}));
		} else {
			return [];
		}
	});

	onMounted(() => {
		if (settingStore.currencyList.length === 0) {
			settingStore.getCurrencyList();
		}
		if (entityStore.entityData.announcementCategories.length === 0) {
			announcementStore.getAnnouncementsCategories();
		}
	});

	const handleClickCategory = (category) => {
		if (data.value?.category_ids) {
			data.value.category_ids = data.value.category_ids.filter(
				(item) => item !== category.id
			);
		}
	};
</script>

<style lang="scss">
	.board-logo {
		width: 100%;
	}

	.board-gallery {
		width: 100%;
	}

	.invalid .board-form__currency-select .select__select {
		background: none;
	}

	.board-form {
		&__price-input {
			flex-direction: row !important;
		}

		&__currency-select {
			font-size: 1em;
			margin-top: 0;
			flex: 0 0 2em;
			line-height: 1em;
			padding: 0;

			.select__select {
				border: none;
				padding-block: 0;

				&:focus {
					box-shadow: none;
				}
			}
		}

		&__badge-second {
			font-size: 1.2em;
			margin-block: 0.66em 1.33em;
		}

		&__checkbox-group.checkbox-group {
			flex-direction: row;

			.checkbox {
				flex: 0 1 calc(50% - 1.5em);

				@include small-mobile {
					flex: 1 1 100%;
				}
			}
		}

		&__gallery-description {
			font-size: 1.4em;
			margin-bottom: 1em;
		}

		&__description-bold {
			font-weight: 700;
		}

		&__description {
			font-weight: 400;
		}
		@include mobile {
			.form-group_type_secondary {
				margin-bottom: 1em;
			}
		}

		&__phone-mask {
			.input-container {
				padding: 1.4rem !important;
			}
		}
	}
</style>
