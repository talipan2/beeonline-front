<template>
	<NuxtLayout
		name="profile"
		title="Заказы"
	>
		<template #header>
			<UiBreadCrumb
				:list="[
					{ label: 'Главная', link: '/' },
					{ label: `Кабинет ${roleName}`, link: '/desktop' },
					{ label: 'Список заказов', link: '' },
				]"
			/>
		</template>
		<template #content>
			<Entity
				:class="{ loading: isLoading }"
				role="customer"
				type="order"
				title="Все заказы"
				btnLabel="Создать заказ"
				btnLink="/orders/create"
				:data="cardData"
				:isLoaded="isLoaded"
				emptyAlertText="Заказов нет"
				:entityIsFilling="entityIsFilling"
				@selectInfoModal="selectInfoModalData"
				@setFilters="setFilters"
			/>
			<CommonPagination
				:class="{ loading: isLoading }"
				v-if="page?.last_page > 1"
				:currentPage="page.current_page"
				:totalPages="page.last_page"
				:activeFilters="activeFilter"
				@changePage="handlePageChange"
			/>
			<InfoModal
				:text="infoModal.text"
				:title="infoModal.title"
			>
				<template #content>
					<UiButton
						type="button"
						@click="infoModal.action"
						class="info-modal__btn"
						variant="quinary"
						size="large"
					>
						Подтвердить
					</UiButton>
					<UiButton
						type="button"
						class="info-modal__btn"
						variant="tertiary"
						@click="settingStore.infoModal = false"
						size="large"
					>
						Закрыть
					</UiButton>
				</template>
			</InfoModal>
		</template>
	</NuxtLayout>
</template>

<script setup>
	import { useEntityStore } from '~/store/entityStore';
	import { useLocationStore } from '~/store/locationStore';
	import { useSettingStore } from '~/store/settingStore';
	import { useUserStore } from '~/store/userStore';

	definePageMeta({
		middleware: 'telegram',
		disableMetrika: true,
	});

	const entityStore = useEntityStore();
	const userStore = useUserStore();
	const locationStore = useLocationStore();
	const settingStore = useSettingStore();

	const roleName = userStore.getRoleNameForBreadcrumbs;

	const isLoading = ref(false);
	const isLoaded = ref(false);

	const infoModal = ref({
		title: '',
		text: '',
		action: () => {},
	});

	const page = ref(null);

	const activeFilter = ref({});

	const setFilters = (filters) => {
		filters = deleteEmptyFilters(filters);
		activeFilter.value = { ...filters };

		getOrders({ ...filters });
	};

	const deleteEmptyFilters = (filter) => {
		if (!filter) return;
		for (const key in filter) {
			if (filter[key] === 'all') {
				delete filter[key];
			}
		}
		return filter;
	};

	const selectInfoModalData = ({ type, id }) => {
		settingStore.infoModal = true;
		switch (type) {
			case 'published':
				infoModal.value = {
					title: 'Публикация',
					text: 'Вы уверены, что хотите опубликовать этот заказ?',
					action: () => {
						entityStore
							.editOrder(id, { status: 'under_moderation' })
							.then(() => {
								entityStore.getOrganizationOrders(
									userStore.userData.organization_id
								);
								settingStore.infoModal = false;
							})
							.catch(() => console.log('error'));
					},
				};
				break;
			case 'unpublished':
				infoModal.value = {
					title: 'Снятие с публикации',
					text: 'Вы уверены, что хотите снять с публикации этот заказ?',
					action: () => {
						entityStore
							.editOrder(id, { status: 'archived' })
							.then(() => {
								entityStore.getOrganizationOrders(
									userStore.userData.organization_id
								);
								settingStore.infoModal = false;
							})
							.catch(() => console.log('error'));
					},
				};
				break;
		}
	};

	const entityIsFilling = ref({});

	const cardData = computed(() => {
		return entityStore.organizationOrders.map((item) => {
			const { locations, alias } = locationFormatter({
				cities: item.cities,
				regions: item.regions,
				countries: item.countries,
			});
			return {
				id: item.id,
				name: item.name,
				placeOfProduction: locations,
				alias: alias,
				rawMaterials: !item.material ? ['Исполнителя'] : ['Заказчика'],
				completionDate: item.deadline_at,
				batch: item.batch,
				category: item.product_categories.map((item) => item.id),
				status: entityStore.getEntityStatusByValue(item.status),
				locations: {
					cities: [...item.cities],
					regions: [...item.regions],
					countries: [...item.countries],
				},
				statusType: item.status,
				hasIntro: item.has_intro,
			};
		});
	});

	const handlePageChange = (page) => {
		getOrders({ page, ...activeFilter.value });
	};

	function getOrders(params) {
		if (isLoading.value) return;
		isLoading.value = true;
		entityStore
			.getSelfOrders(userStore.userData.organization_id, params)
			.then((res) => {
				if (res && res.orders) {
					page.value = res.pagination;
				}
			})
			.finally(() => {
				isLoading.value = false;
				isLoaded.value = true;
			});
	}

	onMounted(() => {
		if (userStore.userData.organization_id) {
			getOrders();
		}
	});
</script>
