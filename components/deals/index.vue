<template>
	<div class="deals">
		<div
			class="deals__filters"
			:class="{ loading: loading }"
		>
			<CommonSelectorListButtons
				:buttons-list="statusList"
				type="secondary"
				:active-btn="filterList.status"
				@update-active-button="updateActiveStatus"
			/>
			<!-- <UiSelect
				class="deals__select"
				name="stage"
				:options="stageList"
				:return-value="true"
				v-model="filterList.stage"
				value="any"
			/> -->
			<CommonDropDownSelect
				:options="stageList"
				v-model="filterList.stage"
				return-value
				label="Этап"
				name="stage"
				class="deals__select"
			/>
			<CommonSortButton
				:sort-list="sortList"
				:current-sort-list="currentSort"
				@changeSort="changeSortList"
			/>
		</div>
		<div class="deals__list">
			<div
				class="deals__item"
				v-for="(deal, index) in deals"
				:key="index"
			>
				<DealsCard :data="deal" />
			</div>
		</div>
		<CommonAlerts
			v-if="!deals.length && isLoaded"
			type="warning"
			alert="Сделок нет"
		/>
		<CommonPagination
			v-if="page.last_page > 1"
			:current-page="page.current_page"
			:total-pages="page.last_page"
			@changePage="fetchDeals"
			:loading="loading"
		/>
	</div>
</template>

<script setup>
	import { useDealStore } from '~/store/dealStore';

	const dealStore = useDealStore();
	const deals = ref([]);
	const page = ref({});
	const loading = ref(false);
	const isLoaded = ref(false);
	const filter = ref(null);

	const updateActiveStatus = (value) => {
		filterList.value.status = value;
	};

	const statusList = [
		{
			value: 'active',
			label: 'Активные',
		},
		{
			value: 'archived',
			label: 'Завершенные',
		},
	];

	const stageList = [
		{
			value: 'any',
			label: 'Любой этап',
		},
		{
			value: 'creation',
			label: 'Создание',
		},
		{
			value: 'production',
			label: 'Производство',
		},
		{
			value: 'delivery',
			label: 'Доставка',
		},
		{
			value: 'review',
			label: 'Отзыв',
		},
	];

	const sortList = [
		{
			id: 1,
			label: 'по дате создания',
			value: 'created_at',
		},
		{
			id: 2,
			label: 'по дате обновления',
			value: 'updated_at',
		},
	];

	const currentSort = ref(sortList[0]);

	const filterList = ref({
		status: statusList[0].value,
		stage: stageList[0].value,
		sort: currentSort.value.value,
		page: 1,
	});

	function changeSortList(id) {
		currentSort.value = sortList.find((item) => item.id === id);
		filterList.value.sort = currentSort.value.value;
	}

	function fetchDeals(currentPage) {
		if (loading.value) return;
		loading.value = true;

		dealStore
			.getDeals({
				limit: 10,
				page: currentPage,
				...filterList.value,
			})
			.then((response) => {
				console.log(response);
				deals.value = response.data;
				page.value = response.meta;
			})
			.finally(() => {
				loading.value = false;
				isLoaded.value = true;
			});
	}

	watch(
		filterList,
		(newVal) => {
			fetchDeals();
		},
		{ deep: true }
	);

	onMounted(() => {
		fetchDeals();
	});
</script>

<style lang="scss">
	.deals {
		font-size: 1.6rem;

		&__select {
			font-size: 1em;
			width: 50%;

			@include mobile {
				width: 100%;
			}
		}

		&__list {
			display: flex;
			flex-wrap: wrap;
			gap: 1.875em;
		}

		&__item {
			flex: 0 1 calc(50% - 0.9375em);

			@include mobile {
				flex: 0 1 100%;
			}
		}
	}
</style>
