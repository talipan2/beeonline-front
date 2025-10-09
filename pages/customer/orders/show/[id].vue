<template>
	<NuxtLayout
		name="profile"
		title="Карточка заказа"
		class="entity-edit"
	>
		<template #header>
			<UiBreadCrumb
				:list="[
					{ label: 'Главная', link: '/' },
					{ label: `Кабинет ${roleName}`, link: '/desktop' },
					{ label: 'Список заказов', link: '/customer/orders' },
					{ label: 'Заказ', link: '' },
				]"
			/>
		</template>
		<template #content>
			<EntityView
				v-if="!isLoading"
				:data="orderProps"
				role="customer"
				type="order"
			/>
			<CreateEntityFinalModal
				:text="isCreateOrderModalText"
				:isBanner="true"
				:type="'order'"
				:isAutoClose="isAutoCloseModal"
				:btnLink="'/profile'"
				:btnText="'Перейти в профиль'"
			/>
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
		disableMetrika: false,
	});

	const router = useRouter();
	const entityStore = useEntityStore();
	const locationStore = useLocationStore();
	const settingStore = useSettingStore();
	const userStore = useUserStore();

	const roleName = userStore.getRoleNameForBreadcrumbs;

	const isAutoCloseModal = computed(() => {
		return localStorage.getItem('isFirstOrder') === 'true' ? false : true;
	});

	const isCreateOrderModalText = computed(() => {
		if (localStorage.getItem('isFirstOrder') === 'true') {
			return 'Спасибо за размещенный заказ. Он отправлен на модерацию. При желании вы можете заполнить данные об организации';
		} else {
			return 'Заказ отправлен на модерацию';
		}
	});

	const order = ref({});
	const isLoading = ref(false);

	const orderProps = computed(() => {
		const { locations, alias } = locationFormatter({
			cities: order.value.cities,
			regions: order.value.regions,
			countries: order.value.countries,
		});
		return {
			id: order.value.id,
			name: order.value.name,
			description: order.value.description,
			gallery: order.value.gallery || [],
			conditions: order.value.conditions,
			tzFiles:
				order.value.tz_files && order.value.tz_files.length
					? order.value.tz_files.map((item) => item.url)
					: [],
			status: order.value.status,
			rejectReason: order.value.reject_reason || '',
			views: order.value.view_count,
			props: {
				batch: { label: 'Размер партии', value: Number(order.value.batch) },
				category: {
					label: 'Категория',
					value:
						order.value.product_categories &&
						order.value.product_categories.length
							? entityStore.getEntityLabelById(
									'categories',
									order.value.product_categories.map((item) => item.id)
								)
							: '',
				},
				rawMaterials: {
					label: 'Сырье',
					value: !order.value.material ? 'Производителя' : 'Заказчика',
				},
				pattern: {
					label: 'Лекала',
					value: order.value.pattern ? 'Есть лекала' : 'Нужен конструктор',
				},
				price: {
					label: 'Цена за единицу продукции',
					value: `${order.value.price} ${settingStore.getCurrencyCodeById(order.value.currency_id)}`,
				},
				completionDate: {
					label: 'Срок выполнения',
					value: `До ${formatDate(order.value.deadline_at)}`,
				},
				placeOfProduction: {
					label: 'Предпочтительные регионы производства',
					value: locations,
				},
			},
		};
	});

	isLoading.value = true;
	await entityStore
		.getOrder(router.currentRoute.value.params.id)
		.then((res) => (order.value = res.data))
		.finally(() => (isLoading.value = false));

	// onMounted(() => {
	//   isLoading.value = true;
	//   entityStore.getOrder(router.currentRoute.value.params.id)
	//   .then((res) => order.value = res.data)
	//   .finally(() => isLoading.value = false)
	// })

	onMounted(() => {
		if (settingStore.currencyList.length === 0) {
			settingStore.getCurrencyList();
		}
	});
</script>
