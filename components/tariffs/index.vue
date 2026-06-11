<template>
	<div class="tariffs">
		<div class="tariffs__header">
			<TariffsBalanceCard
				class="tariffs__balance-card"
				:userBalance="userBalance"
				:userBonuses="userBonuses"
				:currentCurrency="currentCurrency"
			/>
		<TariffsPlanSummaryCard
			class="tariffs__plan-summary-card"
			v-if="!(isInternational && !tariffsStore.tariffName)"
		/>
		</div>
		<div
			class="tariffs__content"
			v-if="tariffsStore.tariffs && tariffsStore.tariffs.length"
		>
			<div class="tariffs__content-header">
				<h2 class="tariffs__title">Тарифы</h2>
				<CommonTabs
					class="tariffs__tabs"
					:tabs="tabsList"
					v-model="currentTab"
					v-if="!isInternational"
				/>
				<!-- <UiSelect
					class="tariffs__selector"
					:options="tabsList"
					v-model="currentTab"
					v-if="!isInternational"
					:return-value="true"
				/> -->
				<CommonDropDownSelect
					class="tariffs__selector"
					:options="tabsList"
					v-model="currentTab"
					v-if="!isInternational"
					:return-value="true"
				/>
			</div>
			<div v-if="!isInternational" class="tariffs__table-intro">
				<p class="tariffs__notice tariffs__notice_pre-table">
					Покупка тарифа Максимум
				</p>
				<p class="tariffs__notice-sub">
					Подключение тарифа «Максимум» доступно от 3-х месяцев.
				</p>
			</div>
		<TariffsPriceTable
			:subDuration="currentTab"
			@select="selectTariff"
			v-if="!isInternational"
		/>
		<TariffsInternational
			v-if="isInternational"
			@select="selectTariff"
		/>
	</div>
	<div class="tariffs__content">
			<div class="tariffs__content-header">
				<h2 class="tariffs__title">Дополнительные услуги</h2>
			</div>
			<TariffsServicesTable
				@select="selectServices"
				:currentCurrency="currentCurrency"
				@reset="childReset"
			/>
		</div>
		<div class="tariffs__content">
			<div class="tariffs__content-header">
				<h2 class="tariffs__title">Последние транзакции</h2>
			</div>
			<TariffsTransactionsTable :currentCurrency="isLoadedCurrency" />
		</div>
		<div class="tariffs__content">
			<div class="tariffs__content-header">
				<h2 class="tariffs__title">Выставленные счета</h2>
			</div>
			<TariffsInvoicesTable />
		</div>
		<TariffsPayModal
			:data="currentPaymentData"
			:userBalance="userBalance"
			:userBonuses="userBonuses"
			:currentCurrency="currentCurrency"
			:reset="handleReset"
			:deleteResetFunction="deleteResetFunction"
		/>
	</div>
</template>

<script setup>
	import { useSettingStore } from '~/store/settingStore';
	import { useTariffsStore } from '~/store/tariffsStore';
	import { useUserStore } from '~/store/userStore';

	const tariffsStore = useTariffsStore();
	const settingStore = useSettingStore();
	const userStore = useUserStore();

	const userBalance = computed(() =>
		formatMoney(tariffsStore.userBalance, currentCurrency.value)
	);
	const userBonuses = computed(() => tariffsStore.userBonuses);
	const isLoadedCurrency = ref('');

	// переменная для определения международного тарифа
	const isInternational = computed(() => currentCurrency.value !== 'RUB');

	const currentCurrency = computed(() => {
		if (tariffsStore.userCurrency) {
			return tariffsStore.userCurrency;
		} else {
			return 'RUB';
		}
	});

	const currentPaymentData = ref({
		data: [],
		sum: 0,
		currency: 'RUB',
	});

	const tabsList = ref([
		{ id: 1, label: '1 месяц', value: '1' },
		{ id: 2, label: '3 месяца', value: '3' },
		{ id: 3, label: '6 месяцев', value: '6' },
		{ id: 4, label: '12 месяцев', value: '12' },
	]);

	const currentTab = ref(tabsList.value[0].value);

	function selectTariff(tariff, total, currency) {
		console.log(tariff, total, currency);
		currentPaymentData.value = { data: tariff, sum: total, currency: currency };
		settingStore.payModalStatus = true;
	}

	function selectServices(services, total, currency) {
		currentPaymentData.value = {
			data: services,
			sum: total,
			currency: currency,
			isServices: true,
		};
		settingStore.payModalStatus = true;
	}

	// функция сброса при сабмите в модалке
	const handleReset = ref(null);

	function deleteResetFunction() {
		handleReset.value = null;
	}

	// получения функции с дочернего компонента
	const childReset = (reset) => {
		if (typeof reset === 'function') {
			handleReset.value = reset;
		}
	};

	onMounted(() => {
		if (userStore.userData && userStore.userData.id) {
			tariffsStore.getBalance(userStore.userData.id).then((res) => {
				console.log(res);
				isLoadedCurrency.value = res.currency;
			});
			tariffsStore.getTariffs(userStore.userData.id);
		}
	});
</script>

<style lang="scss">
	.tariffs {
		font-size: 1rem;
		&__header {
			display: flex;
			column-gap: 2.4em;
			margin-bottom: 2.8em;
		}

		&__content-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 2.4em;
		}

		&__balance-card {
			flex: 0 1 calc(50% - 1.2em);
		}

		&__plan-summary-card {
			flex: 0 1 calc(50% - 1.2em);
		}

		&__title {
			font-size: 2.4em;
			font-weight: 400;
			line-height: 1.2em;
			color: #000;
		}

		&__content {
			margin-bottom: 9.6em;
		}

		&__table-intro {
			margin-bottom: 2rem;
		}

		&__notice {
			font-size: 3em;
			font-weight: 700;
			color: var(--text-color-quaternary);
			margin-top: 2rem;
			margin-bottom: 0;
			width: 100%;

			&_pre-table {
				margin-top: 0;
			}

			&_after-table {
				margin-top: 2rem;
			}
		}

		&__notice-sub {
			font-size: 2em;
			font-weight: 400;
			color: var(--text-color-tertiary);
			margin-top: 0.8rem;
			margin-bottom: 0;
			width: 100%;
			line-height: 1.3;
		}

		&__selector {
			display: none;
		}

		@include mobile {
			&__header {
				flex-direction: column;
				row-gap: 1.6rem;
				margin-inline: -15px;
			}

			&__content-header {
				flex-direction: column;
				align-items: flex-start;
				row-gap: 2rem;
			}

			&__title {
				font-size: 1.8em;
			}

			&__selector {
				display: block;
				font-size: 1.4em;
				width: 50%;
			}

			&__tabs {
				display: none;
			}
		}

		@include small-mobile {
			&__selector {
				width: 100%;
			}
		}
	}
</style>
