<template>
	<div
		class="notifications"
		:class="{ loading: isLoading }"
	>
		<!-- <UiSelect
			class="notifications__filter"
			:options="filterOptions"
			v-model="selectedFilter"
			name="filter"
			return-value
		/> -->
		<CommonDropDownSelect
			class="notifications__filter"
			:options="filterOptions"
			v-model="selectedFilter"
			name="filter"
			return-value
			label="Фильтр"
			:error-show="false"
		/>
		<div
			class="notifications__list"
			ref="notificationsList"
		>
			<template
				v-for="notification in data"
				:key="notification.id"
			>
				<NotificationCard :data="notification" />
			</template>
		</div>
		<CommonAlerts
			:alert="'Уведомлений не найдено'"
			:type="'warning'"
			v-if="!data.length && isLoaded"
		/>
		<CommonPagination
			v-if="page?.last_page > 1"
			:current-page="page.current_page"
			:total-pages="page.last_page"
			@change-page="handlePageChange"
		/>
	</div>
</template>

<script setup>
	import { useSettingStore } from '~/store/settingStore';
	import { useUserStore } from '~/store/userStore';

	const router = useRouter();
	const selectedFilter = ref('all');
	const userStore = useUserStore();
	const settingStore = useSettingStore();

	const data = ref([]);
	const page = ref({
		current_page: 1,
	});

	const isLoading = ref(false);
	const isLoaded = ref(false);

	const notificationsList = ref(null);

	const filterOptions = [
		{ id: 1, label: 'Все уведомления', value: 'all' },
		{ id: 2, label: 'Системные', value: 'system' },
		{ id: 3, label: 'Заказы/Услуги', value: 'product' },
		{ id: 4, label: 'Сообщения', value: 'chat' },
		{ id: 5, label: 'Отзывы', value: 'reply' },
		{ id: 6, label: 'Сделки', value: 'deal' },
	];

	watch(
		() => selectedFilter.value,
		(newVal) => {
			const filter = clearFilter(newVal);
			getData({ group: filter?.value });
			router.replace({ query: { group: newVal } });
		}
	);

	const clearFilter = (filterValue) => {
		const filter = {
			...filterOptions.find((item) => item.value === filterValue),
		};
		if (!filter.label) return;
		if (filter.value === 'all') filter.label = '';
		return filter;
	};

	const getData = (filter) => {
		if (isLoading.value) return;
		isLoading.value = true;
		userStore
			.getNotificationsList(userStore.userData.id, filter)
			.then((res) => {
				data.value = res.data;
				page.value = res.meta;
			})
			.finally(() => {
				isLoading.value = false;
				isLoaded.value = true;
			});
	};

	const handlePageChange = (page) => {
		const filter = clearFilter(selectedFilter.value);
		getData({ page, group: filter?.label });
	};

	watch(
		() => page.value.current_page,
		() => {
			const rect = notificationsList.value.getBoundingClientRect();
			const offset =
				window.scrollY +
				rect.top -
				settingStore.headerHeight -
				window.innerHeight / 2;
			smoothScroll(offset, false);
		},
		{ deep: true }
	);

	onMounted(() => {
		if (
			router.currentRoute.value.query &&
			router.currentRoute.value.query.type
		) {
			selectedFilter.value = router.currentRoute.value.query.type;
		}

		getData();
	});
</script>

<style lang="scss">
	.notifications {
		font-size: 1.6rem;

		&__filter {
			font-size: 1em;
			margin-bottom: 1.875em;
			max-width: 33%;

			.select__select {
				color: #667085;
			}
			.select__option {
				color: #667085;
			}

			@include mobile {
				max-width: 50%;
			}

			@include small-mobile {
				max-width: 100%;
			}
		}

		&__list {
			display: flex;
			flex-direction: column;
			row-gap: 0.625em;
		}
	}
</style>
