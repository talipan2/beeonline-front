<template>
	<UiModal
		v-model="isOpenModal"
		title="Оплата объявления"
		@confirm="() => confirm()"
	>
		<template #content>
			<div class="board-pay-modal">
				<p class="board-pay-modal__text">
					Для публикации объявления необходимо оплатить услугу.
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
</script>
