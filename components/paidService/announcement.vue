<template>
	<PaidServiceModal
		:title="title"
		:prepare="prepare"
		:use="use"
		ref="announcementPayModal"
	>
		<template #button="{ open }">
			<slot
				name="button"
				:open="open"
			/>
		</template>
		<template #prepared>
			<div
				class="counterparty-check"
				v-if="preparedData"
			>
				<div class="counterparty-check__organization">
					<div class="counterparty-check__organization-title">Объявление:</div>
					<div class="counterparty-check__organization-name">
						{{ preparedData.name }}
					</div>
				</div>
				<div class="counterparty-check__organization">
					<div class="counterparty-check__organization-title">
						{{ preparedData.paid_service.name }}
					</div>
					<div class="counterparty-check__organization-name">
						Количество: {{ preparedData.paid_service.quantity }}
					</div>
				</div>
			</div>
		</template>
		<template #used>
			<CommonAlerts
				:alert="'Объявление оплачено'"
				type="success"
			/>
		</template>
		<template #buttons>
			<UiButton
				class="counterparty-check-btn"
				variant="primary"
				size="large"
				:to="usedData?.file?.url"
				v-if="usedData?.file?.url"
				target="_blank"
			>
				Открыть
			</UiButton>
		</template>
	</PaidServiceModal>
</template>

<script setup>
	import { useEntityStore } from '~/store/entityStore';
	import { useAnnouncementStore } from '~/store/announcementStore';

	const entityStore = useEntityStore();
	const announcementStore = useAnnouncementStore();

	const props = defineProps({
		id: {
			type: [Number, null],
			required: true,
		},
		title: {
			type: String,
			default: 'Оплата объявления',
		},
	});

	const announcementPayModal = ref(null);

	const preparedData = ref(null);
	const usedData = ref(null);

	const prepare = () => {
		usedData.value = null;
		preparedData.value = null;

		return announcementStore.announcementPrepare(props.id).then((response) => {
			preparedData.value = response;
		});
	};
	const use = () => {
		return announcementStore.announcementPublish(props.id).then((response) => {
			usedData.value = response.data;
		});
	};

	defineExpose({
		open: (id) => {
			announcementPayModal.value.openModal();
		},
	});
</script>

<style lang="scss" scoped>
	.counterparty-check {
		font-size: 14px;
		display: flex;
		flex-direction: column;
		margin: 1em 0;

		&__organization {
			// margin: 1em 0;
			padding: 1em 0;
			border-top: 1px solid var(--border-color-secondary);
			border-bottom: 1px solid var(--border-color-secondary);

			&-title {
				font-weight: 700;
			}
		}

		&__organization + &__organization {
			border-top: none;
		}

		&-btn {
			font-size: 12px;
			font-weight: 400;
			text-transform: uppercase;
		}
	}
</style>
