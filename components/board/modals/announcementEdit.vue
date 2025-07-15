<template>
	<ModalsRoundBorder
		:is-open="isOpen"
		title="Редактирование объявления"
		@close="emit('close')"
		size="lg"
		class="service-modal"
	>
		<UiForm class="service-modal__form">
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
		</UiForm>
	</ModalsRoundBorder>
</template>

<script setup>
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

	const cloneData = computed({
		get() {
			return props.data;
		},
		set(value) {
			emit('update:data', value);
		},
	});

	const emit = defineEmits(['close', 'update:data']);
</script>
