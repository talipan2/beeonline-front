<template>
	<DesktopCard title="Статистика">
		<template #body>
			<div class="stats">
				<div class="stats__list">
					<div class="stats__items-container">
						<div
							class="stats__item"
							@mouseover="currentViewSetting = 'pubcard'"
						>
							<p
								class="stats__title"
								:class="{ active: currentViewSetting === 'pubcard' }"
							>
								Просмотры профиля
							</p>
							<p class="stats__value">
								{{
									`${data.pubcard_views?.weekly || 0} (${data.pubcard_views?.previous || 0})`
								}}
							</p>
							<div class="stats__status">
								<!-- <div
									:class="
										handleCheckStatsPosition(data.pubcard_views?.percentage)
									"
								>
									<SvgoBalanceArrow class="svg-m" />
									<p class="stats__status-text">
										{{ data.pubcard_views?.percentage || 0 }}%
									</p>
								</div> -->
								<span class="desktop__selected">
									за месяц (за прошлый месяц)
								</span>
							</div>
						</div>
						<div class="divider-vertical"></div>
						<div
							class="stats__item"
							@mouseover="currentViewSetting = 'orders'"
							v-if="role === 'customer'"
						>
							<p
								class="stats__title"
								:class="{ active: currentViewSetting === 'orders' }"
							>
								Просмотры заказов
							</p>
							<p class="stats__value">
								{{
									`${data.order_views?.weekly || 0} (${data.order_views?.previous || 0})`
								}}
							</p>
							<div class="stats__status">
								<!-- <div :class="handleCheckStatsPosition(data.order_views?.percentage)">
                  <SvgoBalanceArrow class="svg-m" />
                  <p class="stats__status-text">{{ data.order_views?.percentage || 0 }}%</p>
                </div> -->
								<span class="desktop__selected">
									за месяц (за прошлый месяц)
								</span>
							</div>
						</div>
						<template v-if="false">
							<div
								class="stats__item"
								@mouseover="currentViewSetting = 'services'"
								v-if="role === 'performer'"
							>
								<p
									class="stats__title"
									:class="{ active: currentViewSetting === 'services' }"
								>
									Просмотры услуг
								</p>
								<p class="stats__value">
									{{
										`${data.service_views?.weekly || 0} (${data.service_views?.previous || 0})`
									}}
								</p>
								<div class="stats__status">
									<!-- <div :class="handleCheckStatsPosition(data.service_views?.percentage)">
                    <SvgoBalanceArrow class="svg-m" />
                    <p class="stats__status-text">{{ data.service_views?.percentage || 0 }}%</p>
                    </div> -->
									<span class="desktop__selected">
										за месяц (за прошлый месяц)
									</span>
								</div>
							</div>
						</template>
						<div
							class="divider-vertical"
							v-if="role === 'customer'"
						></div>
						<div
							class="stats__item"
							@mouseover="currentViewSetting = 'favorites'"
						>
							<p
								class="stats__title"
								:class="{ active: currentViewSetting === 'favorites' }"
							>
								Добавлен в избранное
							</p>
							<p class="stats__value">
								{{
									`${data.favorites?.weekly || 0} (${data.favorites?.previous || 0})`
								}}
							</p>
							<div class="stats__status">
								<!-- <div :class="handleCheckStatsPosition(data.favorites?.percentage)">
                  <SvgoBalanceArrow class="svg-m" />
                  <p class="stats__status-text">{{ data.favorites?.percentage || 0 }}%</p>
                </div> -->
								<span class="desktop__selected">
									за месяц (за прошлый месяц)
								</span>
							</div>
						</div>
					</div>
					<CommonChart
						class="stats__chart"
						:data="currentDataSet"
					/>
				</div>
			</div>
		</template>
	</DesktopCard>
</template>

<script setup>
	const props = defineProps({
		role: {
			type: String,
			required: true,
		},
		data: {
			type: Object,
			default: () => ({}),
		},
	});

	const chartDataSets = computed(() => {
		if (props.data && props.data.daily_stats) {
			return props.data.daily_stats;
		} else {
			return {
				pubcard_views: Array(30).fill(0),
				order_views: Array(30).fill(0),
				service_views: Array(30).fill(0),
				favorites: Array(30).fill(0),
			};
		}
	});

	const currentViewSetting = ref(null);
	const isHover = ref(false);

	const currentDataSet = computed(() => {
		switch (currentViewSetting.value) {
			case 'pubcard':
				return props.data.pubcard_views.chart;
			case 'orders':
				return props.data.order_views.chart;
			case 'favorites':
				return props.data.favorites.chart;
			default:
				return Array(30).fill(0);
		}
	});

	const handleCheckStatsPosition = (percent) => {
		if (!percent) return 'add';
		if (percent < 0) {
			return 'purchase';
		} else {
			return 'add';
		}
	};
</script>

<style lang="scss">
	.stats {
		flex: 1;
		&__list {
			display: flex;
			justify-content: space-between;
			align-items: center;
			column-gap: 2em;
		}

		&__items-container {
			flex: 1 0 50%;
			display: flex;
			justify-content: space-between;
		}

		&__item {
			font-family: 'fira-sans', sans-serif;
			flex: 0 1 auto;
			display: flex;
			flex-direction: column;
			font-size: 1.6em;
			cursor: pointer;
		}

		&__title {
			font-size: 1em;
			color: var(--text-color-monodecimal);
			transition: color 0.2s ease;
		}

		&__value {
			font-size: 2.25em;
			font-weight: 600;
		}

		&__status {
			display: flex;
			column-gap: 0.5em;
			align-items: center;
			font-size: 0.875em;
			line-height: 1em;
		}

		&__chart {
			flex: 0 1 31%;
			max-width: 31%;
		}

		.active {
			color: var(--text-color-ternary);
		}

		@include tablet {
			&__list {
				column-gap: 5em;
			}
		}

		@include mobile {
			&__list {
				flex-direction: column;
				align-items: normal;
			}

			&__items-container {
				order: 1;
			}

			&__chart {
				flex: 1 1 100%;
				max-width: 100%;
			}

			&__item {
				font-size: 1.4rem;
			}
		}
	}

	@include small-mobile {
		.stats {
			&__list {
				row-gap: 1em;
			}

			&__items-container {
				flex-direction: column;
				row-gap: 1em;
			}
		}
	}
</style>
