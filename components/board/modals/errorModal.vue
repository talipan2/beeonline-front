<template>
	<UiModal
		v-model="settingStore.boardErrorModal"
		:title="title"
		@confirm="() => confirm()"
	>
		<template #content>
			<div class="board-error-modal">
				<p class="board-error-modal__text">
					{{ text }}
				</p>
				<div class="board-error-modal__buttons">
					<UiButton
						class="board-error-modal__btn"
						type="button"
						variant="tertiary"
						size="large"
						@click="confirm"
					>
						Закрыть
					</UiButton>
					<UiButton
						v-if="buttonLink"
						class="board-error-modal__btn"
						variant="quinary"
						size="large"
						:to="buttonLink"
					>
						{{ buttonText }}
					</UiButton>
					<UiButton
						v-else
						type="button"
						class="board-error-modal__btn"
						variant="quinary"
						size="large"
						@click="buttonFunction"
					>
						{{ buttonText }}
					</UiButton>
				</div>
			</div>
		</template>
	</UiModal>
</template>

<script setup>
	import { useSettingStore } from '~/store/settingStore';

	const props = defineProps({
		title: {
			type: String,
			default: 'Ошибка',
		},
		text: {
			type: String,
			default: 'Произошла ошибка',
		},
		buttonText: {
			type: String,
			default: 'Закрыть',
		},
		buttonLink: {
			type: String,
			default: '',
		},
		buttonFunction: {
			type: Function,
			default: () => {},
		},
	});

	const settingStore = useSettingStore();

	const confirm = () => {
		settingStore.boardErrorModal = false;
	};
</script>

<style lang="scss">
	.board-error-modal {
		font-size: 1rem;
		&__text {
			font-size: 1.6em;
			font-weight: 500;
			margin-bottom: 2em;
		}

		&__buttons {
			display: flex;
			gap: 1em;
			justify-content: flex-end;
		}

		&__btn {
			font-size: 1.2em;
			text-transform: uppercase;
		}
	}
</style>
