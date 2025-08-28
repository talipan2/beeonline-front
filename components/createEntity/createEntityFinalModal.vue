<template>
	<UiModal
		class="create-entity-final-modal modal"
		v-model="settingStore.createEntityFinalModal"
		@confirm="() => confirm()"
		:closeButton="true"
		size="md"
	>
		<template #content>
			<Banners v-if="isBanner && bannerLoaded" :banner="banner" />
			<p v-else-if="!bannerLoaded">{{ text }}</p>
			<div
				class="create-entity-final-modal__buttons"
				v-if="!isAutoClose && btnLink"
			>
				<UiButton
					class="create-entity-final-modal__btn"
					variant="tertiary"
					size="large"
					@click="confirm"
					type="button"
				>
					Закрыть
				</UiButton>
				<UiButton
					class="create-entity-final-modal__btn"
					variant="quinary"
					size="large"
					type="button"
					@click="handleBtnClick"
				>
					{{ btnText }}
				</UiButton>
			</div>
		</template>
	</UiModal>
</template>

<script setup>
	import { useSettingStore } from '~/store/settingStore';

	const props = defineProps({
		text: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			default: 'order',
		},
		isBanner: {
			type: Boolean,
			default: false,
		},
		isAutoClose: {
			type: Boolean,
			default: true,
		},
		btnText: {
			type: String,
			default: 'Перейти',
		},
		btnLink: {
			type: String,
			default: '',
		},
	});

	const settingStore = useSettingStore();
	const router = useRouter();

	const modalState = computed(() => settingStore.createEntityFinalModal);
	const banner = ref({});
	const bannerLoaded = ref(false);

	const confirm = () => {
		settingStore.createEntityFinalModal = false;
		localStorage.removeItem('isFirstOrder');
	};

	const handleBtnClick = () => {
		settingStore.createEntityFinalModal = false;
		router.push(props.btnLink);
		localStorage.removeItem('isFirstOrder');
	};

	// onMounted(() => {
	// 	if (props.isBanner) {
	// 		settingStore.getBannerLatest({ banner_type: 'order_moderation' }).then((res) => {
	// 			console.log(res.data);
	// 			if (res.data) {
	// 				banner.value = res.data;
	// 			}
	// 		});
	// 	}
	// });

	if (props.isBanner) {
		await settingStore.getBannerLatest({ banner_type: 'order_moderation' }).then((res) => {
			console.log(res.data);
			if (res.data) {
				banner.value = res.data;
				bannerLoaded.value = true;
			} else {
				bannerLoaded.value = false;
			}
		}).catch(() => {
			bannerLoaded.value = false;
		});
	}

	watch(
		() => modalState.value,
		(newVal) => {
			if (newVal === true) {
				if (banner.value.length === 0 && props.isBanner) {
					settingStore.createEntityFinalModal = false;
					return;
				}
				if (props.isAutoClose) {
					setTimeout(() => {
						settingStore.createEntityFinalModal = false;
					}, 5000);
				}
			}
		},
		{ immediate: true }
	);
</script>

<style lang="scss">
	.create-entity-final-modal {
		font-size: 1rem;

		.modal-content {
			padding: 4em;
		}

		p {
			font-family: 'fira-sans', sans-serif;
			font-size: 2.8em;
			text-align: center;
		}

		&__buttons {
			display: flex;
			gap: 2em;
			justify-content: right;
			margin-top: 3em;
		}

		&__btn {
			font-size: 1.2em;
			text-transform: uppercase;
			flex: 0 1 50%;
		}
	}
</style>
