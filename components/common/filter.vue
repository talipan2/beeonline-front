<template>
	<CommonSidebar class="filter">
		<template #body>
			<UiButton
				v-show="!isFilterVisible && isMobile"
				@click="toggleFilter"
				type="button"
				class="sidebar__btn"
				variant="quinary"
				size="large"
			>
				Показать фильтры
			</UiButton>

			<div
				class="sidebar__top"
				v-show="!isMobile || (isMobile && isFilterVisible)"
			>
				<div class="filter__container">
					<slot name="body" />
					<div class="filter__bottom">
						<slot name="bottom" />
					</div>
					<div class="form-group">
						<div
							class="filter__submit"
							ref="submitRef"
						>
							<UiButton
								type="button"
								variant="quinary"
								size="large"
								class="form-group-data__btn"
								@click="submitFunction"
							>
								Применить фильтр
							</UiButton>
						</div>
						<UiButton
							type="button"
							variant="default"
							size="large"
							class="form-group-data__btn"
							@click="resetFunction"
						>
							Сбросить фильтры
						</UiButton>
					</div>
				</div>
			</div>
			<div
				class="sidebar__bottom"
				v-show="isFilterVisible && isMobile"
			>
				<UiButton
					@click="toggleFilter"
					type="button"
					class="sidebar__btn sidebar__btn_type_close"
					variant="quinary"
					size="large"
				>
					Скрыть фильтры
				</UiButton>
			</div>

			<div class="filter__banner">
				<Banners
					v-if="customerTopBanner"
					:banner="customerTopBanner"
				/>
				<Banners
					v-if="customerBottomBanner"
					:banner="customerBottomBanner"
				/>
			</div>
			<div class="filter__banners">
				<BoardBanners
					:data="[
						{
							id: 1,
							name: 'Баннер 1',
							image:
								'https://i.pinimg.com/1200x/7b/09/c7/7b09c77fbaf0bad1564b1dc2ff69a9aa.jpg',
						},
						{
							id: 2,
							name: 'Баннер 2',
							image:
								'https://i.pinimg.com/1200x/7b/09/c7/7b09c77fbaf0bad1564b1dc2ff69a9aa.jpg',
						},
						{
							id: 3,
							name: 'Баннер 3',
							image:
								'https://i.pinimg.com/1200x/7b/09/c7/7b09c77fbaf0bad1564b1dc2ff69a9aa.jpg',
						},
					]"
				/>
			</div>
		</template>
	</CommonSidebar>
</template>

<script setup>
	import { useSettingStore } from '~/store/settingStore';

	const props = defineProps({
		isTutorial: {
			type: Boolean,
		},
		submitFunction: {
			type: Function,
			default: () => {},
		},
		resetFunction: {
			type: Function,
			default: () => {},
		},
	});

	const settingStore = useSettingStore();
	const submitRef = ref(null);
	const emit = defineEmits(['updateTutorialRefSubmit']);

	const filterBanner = ref(null);
	const customerTopBanner = ref(null);
	const customerBottomBanner = ref(null);

	const isMobile = ref(false);
	const isFilterVisible = ref(false);

	function toggleFilter() {
		isFilterVisible.value = !isFilterVisible.value;
		settingStore.catalogTutorialStatus = isFilterVisible.value;
	}

	const updateWidth = () => {
		isMobile.value = window.innerWidth < 768;
	};

	watch(
		() => submitRef.value,
		(newVal) => {
			emit('updateTutorialRefSubmit', newVal);
		},
		{ deep: true }
	);

	watch(
		() => settingStore.catalogTutorialStatus,
		(newVal) => {
			isFilterVisible.value = newVal;
		}
	);

	onMounted(() => {
		window.addEventListener('resize', updateWidth);
		updateWidth();
	});

	onUnmounted(() => {
		window.removeEventListener('resize', updateWidth);
	});

	onMounted(() => {
		settingStore
			.getBanners({
				banner_type: ['customer_catalog_top', 'customer_catalog_bot'],
			})
			.then((res) => {
				if (res && res.data && !res.data.length) return;
				customerTopBanner.value =
					res.data.find((item) => item.type === 'customer_catalog_top') || {};
				customerBottomBanner.value =
					res.data.find((item) => item.type === 'customer_catalog_bot') || {};
			});
	});
</script>

<style lang="scss">
	.filter {
		&__title {
			font-size: 1.8rem;
			margin-bottom: 1.1em;
		}

		&__item {
			padding-bottom: 1.6rem;
			margin-bottom: 1.6rem;
			border-bottom: 1px solid var(--border-color-secondary);
		}

		.checkbox__label {
			font-size: 1.6rem;
		}

		&__location {
			.location__location {
				flex-basis: 100%;
			}

			.btn {
				max-width: 100%;
				margin-bottom: 0;
			}
		}

		.sidebar__btn {
			font-size: 12px;
			text-transform: uppercase;
			width: 100%;
			margin-bottom: 2em;
		}

		.checkbox-group {
			flex-direction: column;
		}

		&__bottom {
			.filter__item {
				border-bottom: none;
			}
		}

		.sidebar__top {
			border-bottom: none;
			margin-left: 0;

			.checkbox-group__btn {
				width: 100%;
				justify-content: space-between;
				padding: 0;
				font-size: 1.6rem;
				text-transform: none;
				margin-top: 1.25em;

				svg {
					width: 1.3rem;
					height: 1.3rem;
				}
			}

			.checkbox-group__btn_type_active {
				svg {
					transform: rotate(180deg);
				}
			}
		}

		.sidebar__bottom {
			padding-top: 2em;
			border-top: 1px solid var(--border-color-secondary);
		}

		&__submit {
			width: 100%;
		}

		&__banner {
			display: flex;
			flex-direction: column;
			gap: 1em;
			margin-bottom: 3em;
		}

		&__banners {
			margin-bottom: 3em;
		}
	}

	@include mobile {
	}
</style>
