<template>
	<UiModal
		v-model="isOpenModal"
		:title="title"
		@confirm="() => confirm()"
	>
		<template #content>
			<div class="board-pay-modal">
				<p class="board-pay-modal__text">
					{{ text }}
				</p>
				<div class="board-pay-modal__buttons">
					<UiButton
						class="board-pay-modal__btn"
						type="button"
						variant="quinary"
						size="large"
						@click="confirm"
					>
						Отмена
					</UiButton>
					<UiButton
						class="board-pay-modal__btn"
						type="button"
						variant="quinary"
						size="large"
						@click="openPayModal"
					>
						Перейти к оплате
					</UiButton>
				</div>
			</div>
			<PaidServiceAnnouncement
				ref="announcementPayModal"
				:id="announcementId"
			/>
		</template>
	</UiModal>
</template>

<script setup>
	const emit = defineEmits(['update:isOpen']);

	const props = defineProps({
		isOpen: {
			type: Boolean,
			default: false,
		},
		text: {
			type: String,
			default: 'Для публикации объявления необходимо оплатить услугу.',
		},
		title: {
			type: String,
			default: 'Оплата объявления',
		},
	});

	const announcementPayModal = ref(null);
	const announcementId = ref(1);

	const isOpenModal = computed({
		get() {
			return props.isOpen;
		},
		set(value) {
			emit('update:isOpen', value);
		},
	});

	const openPayModal = () => {
		announcementPayModal.value.open(announcementId.value);
	};

	const confirm = () => {
		emit('update:isOpen', false);
	};
</script>

<style lang="scss">
	.board-pay-modal {
		font-size: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1em;

		&__text {
			font-size: 1.6em;
		}

		&__buttons {
			display: flex;
			gap: 1em;
			margin-left: auto;
		}

		&__btn {
			font-size: 1.2em;
			text-transform: uppercase;
			margin-top: 2em;
		}
	}
</style>
