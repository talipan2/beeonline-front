<template>
	<div class="form-group form-group_type_secondary board-form">
		<label class="form-group__title">Анонсовая картинка *</label>
		<CommonImageLoadSecondary
			class="board-logo"
			v-model="modelValue.logo"
			label="Загрузить фотографию (до 5Мб. Допустимый формат .jpeg, .png, .jpg, .gif)"
			name="logo"
			:rules="{ required_image }"
			errorLabel="'Анонсовая картинка'"
		/>
	</div>
	<div class="form-group form-group_type_secondary">
		<label class="form-group__title">Название объявления *</label>
		<UiInput
			:rules="{ required: true, min: 2, max: 100 }"
			name="name"
			v-model="modelValue.name"
			label="Название объявления"
			class="form-group__value"
			placeholder="Введите название объявления"
		/>
	</div>
	<div class="form-group form-group_type_secondary">
		<label class="form-group__title">Описание *</label>
		<UiTextArea
			class="form-group__value"
			v-model="modelValue.description"
			name="description"
			label="Описание"
			:rules="{ required: true, min: 50, max: 2000 }"
			placeholder="Введите описание"
		/>
	</div>
	<div class="form-group form-group_type_secondary">
		<label class="form-group__title">Цена</label>
		<UiInput
			:rules="{ required: true }"
			name="price"
			label="Цена"
			v-model="modelValue.price"
			class="form-group__value"
		></UiInput>
	</div>
	<div class="form-group form-group_type_secondary">
		<label class="form-group__title">Выбор категории *</label>
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
			v-model="modelValue.categories"
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
			v-model="modelValue.gallery"
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
			v-model="modelValue.contact_name"
			class="form-group__value"
		></UiInput>
	</div>
	<div class="form-group form-group_type_secondary">
		<label class="form-group__title">Электронная почта *</label>
		<UiInput
			:rules="{ required: true, email: true }"
			name="contact_email"
			label="Электронная почта"
			v-model="modelValue.contact_email"
			class="form-group__value"
		></UiInput>
	</div>

	<div class="form-group form-group_type_secondary">
		<label class="form-group__title">Номер телефона *</label>
		<UiInput
			:rules="{ required: true }"
			name="contact_phone"
			label="Номер телефона"
			v-model="modelValue.contact_phone"
			class="form-group__value"
			type="tel"
		></UiInput>
	</div>
	<div class="form-group form-group_type_secondary">
		<label class="form-group__title">Название компании</label>
		<UiInput
			:rules="{ required: false }"
			name="company_name"
			label="Название компании"
			v-model="modelValue.company_name"
			class="form-group__value"
		></UiInput>
	</div>
	<div class="form-group form-group_type_secondary">
		<label class="form-group__title">Ссылка на сайт</label>
		<UiInput
			:rules="{ url: true }"
			name="url_site"
			label="Ссылка на сайт"
			v-model="modelValue.url_site"
			class="form-group__value"
		>
			<SvgoPlanet class="svg-m" />
		</UiInput>
	</div>
</template>

<script setup>
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
</script>

<style lang="scss">
	.board-logo {
		width: 100%;
	}

	.board-gallery {
		width: 100%;
	}

	.board-form {
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
			// font-size: 1.4em;
			// margin-bottom: 1em;
		}

		&__description {
			font-weight: 400;
			// font-size: 1.4em;
			// margin-bottom: 1em;
		}
	}
</style>
