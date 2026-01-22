<template>
	<UiModal
		v-model="isOpen"
		title="Обратная связь"
		class="contact-form-modal"
		size="xs"
	>
		<template #content>
			<UiForm
				class="contact-form-modal__form"
				:submit="handleSubmit"
			>
				<UiInput
					:rules="{ required: true }"
					class="contact-form-modal__input"
					placeholder="Ваше имя"
					v-model="formData.name"
					name="name"
					label="Имя"
				/>
				<UiInput
					:rules="{ required: true }"
					class="contact-form-modal__input"
					placeholder="Название компании"
					v-model="formData.company"
					name="company"
					label="Компания"
				/>
				<UiInput
					:rules="{ required: true }"
					class="contact-form-modal__input"
					placeholder="+7 (___) ___-__-__"
					v-model="formData.phone"
					name="phone"
					label="Телефон"
				/>
				<div class="contact-form-modal__buttons">
					<UiButton
						type="submit"
						class="contact-form-modal__btn"
						variant="quinary"
						size="large"
						:disabled="isLoading"
					>
						{{ isLoading ? 'Отправка...' : 'Отправить' }}
					</UiButton>
				</div>
			</UiForm>
		</template>
	</UiModal>
</template>

<script setup>
import { useApi } from '~/composables/useApi';
import { useToast } from 'vue-toastification';

const props = defineProps({
	modelValue: {
		type: Boolean,
		default: false,
	},
});

const emit = defineEmits(['update:modelValue']);

const { post } = useApi();
const toast = useToast();

const isOpen = computed({
	get: () => props.modelValue,
	set: (value) => emit('update:modelValue', value),
});

const isLoading = ref(false);

const formData = ref({
	name: '',
	company: '',
	phone: '',
});

const resetForm = () => {
	formData.value = {
		name: '',
		company: '',
		phone: '',
	};
};

const handleSubmit = async (values, form) => {
	if (isLoading.value) return;

	isLoading.value = true;

	try {
		await post('/api/bitrix/lead', {
			name: formData.value.name,
			company: formData.value.company,
			phone: formData.value.phone,
		}, form);

		toast.success('Заявка успешно отправлена!');
		resetForm();
		isOpen.value = false;
	} catch (error) {
		// Ошибка обрабатывается в useApi
	} finally {
		isLoading.value = false;
	}
};

watch(isOpen, (newValue) => {
	if (!newValue) {
		resetForm();
	}
});
</script>

<style lang="scss" scoped>
.contact-form-modal {
	&__form {
		display: flex;
		flex-direction: column;
		gap: 1.6rem;
	}

	&__input {
		width: 100%;
	}

	&__buttons {
		display: flex;
		justify-content: flex-end;
		margin-top: 1rem;
	}

	&__btn {
		font-size: 1.4rem;
	}
}
</style>

