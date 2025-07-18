<template>
	<NuxtLayout
		name="info"
		title="Объявления"
	>
		<template #header>
			<UiBreadCrumb
				:list="[
					{ label: 'Главная', link: '/' },
					{ label: 'Объявления', link: '/board' },
					{
						label: data.name || 'Объявление',
						link: '',
					},
				]"
				:loading="isLoading"
			/>
		</template>
		<template #content>
			<BoardCatalogDetails
				:data="data"
				:isLoading="isLoading"
			/>
		</template>
	</NuxtLayout>
</template>

<script setup>
	import { useOrganizationStore } from '~/store/organizationStore';

	const organizationStore = useOrganizationStore();

	const data = ref({});
	const router = useRouter();
	const isLoading = ref(true);

	onMounted(() => {
		isLoading.value = true;
		organizationStore
			.getPubCard(router.currentRoute.value.params.id)
			.then((res) => {
				data.value = res;
			})
			.finally(() => {
				isLoading.value = false;
			});
	});
</script>
