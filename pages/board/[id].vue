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
	import { useAnnouncementStore } from '~/store/announcementStore';
	import { useOrganizationStore } from '~/store/organizationStore';

	const organizationStore = useOrganizationStore();
	const announcementStore = useAnnouncementStore();

	const data = ref({});
	const router = useRouter();
	const isLoading = ref(true);

	onMounted(() => {
		isLoading.value = true;
		announcementStore
			.getAnnouncement(router.currentRoute.value.params.id)
			.then((res) => {
				if (res && res.data) {
					data.value = res.data;
				}
			})
			.finally(() => {
				isLoading.value = false;
			});
	});
</script>
