<template>
	<UiModal
		v-model="settingStore.boardPayModal"
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
						variant="tertiary"
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
			<!-- <PaidServiceAnnouncement
				ref="announcementPayModal"
				:id="announcementId"
				@updateData="emit('updateData', $event)"
			/> -->
		</template>
	</UiModal>
</template>

<script setup>
	import { useSettingStore } from '~/store/settingStore';

	const emit = defineEmits(['update:isOpen', 'updateData', 'openAnnouncementPayModal']);

	const props = defineProps({
		isOpen: {
			type: Boolean,
			default: false,
		},
		text: {
			type: String,
			default:
				'Объявление успешно создано. Для его публикации необходимо оплатить услугу.',
		},
		title: {
			type: String,
			default: 'Оплата объявления',
		},
		announcementId: {
			type: Number,
			default: null,
		},
	});

	const settingStore = useSettingStore();

	const announcementPayModal = ref(null);

	const openPayModal = () => {
		emit('openAnnouncementPayModal', {id: props.announcementId});
		confirm();
	};

	const confirm = () => {
		settingStore.boardPayModal = false;
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
