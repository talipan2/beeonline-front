<template>
	<div class="form-group form-group_type_secondary board-form">
		<label class="form-group__title">Анонсовая картинка *</label>
		<CommonImageLoadSecondary
			class="board-logo"
			v-model="data.logo"
			label="Загрузить фотографию (до 5Мб. Допустимый формат .jpeg, .png, .jpg, .gif)"
			name="logo"
			:rules="{ required_image: true }"
			errorLabel="'Анонсовая картинка'"
		/>
	</div>
	<div class="form-group form-group_type_secondary">
		<label class="form-group__title">Название объявления *</label>
		<UiInput
			:rules="{ required: true, min: 2, max: 100 }"
			name="name"
			v-model="data.name"
			label="Название объявления"
			class="form-group__value"
			placeholder="Введите название объявления"
		/>
	</div>
	<div class="form-group form-group_type_secondary">
		<label class="form-group__title">Описание *</label>
		<UiTextArea
			class="form-group__value"
			v-model="data.description"
			name="description"
			label="Описание"
			:rules="{ required: true, min: 50, max: 2000 }"
			placeholder="Введите описание"
		/>
	</div>
	<div class="form-group form-group_type_secondary">
		<label class="form-group__title">Цена</label>
		<UiInput
			:rules="{ required: true, min_value: 1 }"
			name="price"
			label="Цена"
			v-model="data.price"
			class="form-group__value board-form__price-input"
			type="number"
		>
			<UiSelect
				:options="currencyList"
				v-model="data.currency"
				return-id
				label="Валюта"
				name="currency"
				class="form-group__value board-form__currency-select"
				:error-show="false"
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
			:options="[
				{ id: 0, label: 'Пошив' },
				{ id: 1, label: 'Ремонт' },
				{ id: 2, label: 'Другое' },
				{ id: 3, label: 'Пошив' },
				{ id: 4, label: 'Ремонт' },
				{ id: 5, label: 'Другое' },
				{ id: 6, label: 'Пошив' },
			]"
			v-model="data.categories"
			name="categories"
			label="Выбор категории"
		/>
	</div>
	<div class="form-group form-group_type_secondary">
		<label class="form-group__title">Галерея</label>
		<div class="board-form__gallery-description">
			<p class="board-form__description-bold">
				Фотографии сделают вашу карточку более привлекательной для заказчика
			</p>
			<p class="board-form__description">Рекомендуемый размер 300 x 340 px.</p>
		</div>
		<CommonGalleryLoadSecondary
			v-model="data.gallery"
			class="board-gallery"
			:showSetting="false"
			:maxCount="5"
		/>
	</div>
	<div class="form-group form-group_type_secondary">
		<label class="form-group__title">ФИО *</label>
		<UiInput
			:rules="{ required: true }"
			name="contact_name"
			label="ФИО"
			v-model="data.contact_name"
			class="form-group__value"
			placeholder="Введите ФИО"
		></UiInput>
	</div>
	<div class="form-group form-group_type_secondary">
		<label class="form-group__title">Электронная почта *</label>
		<UiInput
			:rules="{ required: true, email: true }"
			name="contact_email"
			label="Электронная почта"
			v-model="data.contact_email"
			class="form-group__value"
			placeholder="Введите электронную почту"
		></UiInput>
	</div>

	<div class="form-group form-group_type_secondary">
		<label class="form-group__title">Номер телефона *</label>
		<UiInput
			:rules="{ required: true }"
			name="contact_phone"
			label="Номер телефона"
			v-model="data.contact_phone"
			class="form-group__value"
			type="tel"
			placeholder="Введите номер телефона"
		></UiInput>
		<!-- <CommonPhoneMusk class="form-group__value register__phone-mask" v-model="userData" :rules="{ required: true, max: 16 }" name="phone" label="Телефон" /> -->
	</div>
	<div class="form-group form-group_type_secondary">
		<label class="form-group__title">Название компании</label>
		<UiInput
			:rules="{ required: false }"
			name="company_name"
			label="Название компании"
			v-model="data.company_name"
			class="form-group__value"
			placeholder="Введите название компании"
		></UiInput>
	</div>
	<div class="form-group form-group_type_secondary">
		<label class="form-group__title">Ссылка на сайт</label>
		<UiInput
			:rules="{ url: true }"
			placeholder="Введите название сайта"
			name="url_site"
			label="Ссылка на сайт"
			v-model="data.url_site"
			class="form-group__value"
		>
			<SvgoPlanet class="svg-m" />
		</UiInput>
	</div>
</template>

<script setup>
	import { useEntityStore } from '~/store/entityStore';
	import { useSettingStore } from '~/store/settingStore';

	const settingStore = useSettingStore();
	const entityStore = useEntityStore();

	const selectedCategories = computed(() => {
		return entityStore.getEntityLabelById(
			'announcementCategories',
			data.value.categories,
			true
		);
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
	});

	const handleClickCategory = (category) => {
		if (data.value?.categories) {
			data.value.categories = data.value.categories.filter(
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
			margin-top: 0;
			flex: 0 0 5em;
			line-height: 1em;

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
	}
</style>
