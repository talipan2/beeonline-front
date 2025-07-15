<template>
	<NuxtLayout
		name="profile"
		title="Объявления"
	>
		<template #header>
			<UiBreadCrumb
				:list="[
					{ label: 'Главная', link: '/' },
					{ label: 'Объявления', link: '/board/user' },
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
				type="user"
				class="board-catalog-details board-catalog-details_type_user"
				@openEditModal="handleOpenEditAnnouncementModal"
				@removeFromPublication="handleOpenRemoveFromPublicationModal"
				@openAnnouncementPayModal="handleOpenAnnouncementPayModal"
			/>
			<BoardModalsAnnouncementEdit
				:is-open="editAnnouncementModal.isOpen"
				v-model:data="editAnnouncementModal.data"
				@close="editAnnouncementModal.isOpen = false"
			/>
			<ConfirmModal />
			<PaidServiceAnnouncement
				ref="announcementPayModal"
				:id="announcementId"
			/>
			<BoardModalsPay
				:isOpen="isOpenPayModal"
				@update:isOpen="handleClosePayModal"
				title="Срок публикации"
				text="Осталось меньше 3 дней до окончания срока публикации объявления. Для продления срока публикации объявления необходимо оплатить услугу."
			/>
		</template>
	</NuxtLayout>
</template>

<script setup>
	import { useOrganizationStore } from '~/store/organizationStore';

	const organizationStore = useOrganizationStore();
	const { confirm, ConfirmModal } = useConfirmModal();

	const data = ref({});
	const router = useRouter();
	const isLoading = ref(true);

	const announcementPayModal = ref(null);
	const announcementId = ref(null);

	const handleOpenAnnouncementPayModal = (id) => {
		if (announcementPayModal.value) {
			announcementId.value = id;
			announcementPayModal.value.open(id);
		}
	};
	const editAnnouncementModal = ref({
		data: {},
		isOpen: false,
	});

	const handleOpenEditAnnouncementModal = (data) => {
		editAnnouncementModal.value.data = data;
		editAnnouncementModal.value.isOpen = true;
	};

	const handleOpenRemoveFromPublicationModal = (data) => {
		confirm({
			title: 'Снять объявление с публикации?',
			onConfirm: () => {
				console.log('Удалить объявление из публикации');
			},
			onCancel: () => {
				console.log('Отмена');
			},
		});
	};

	const isOpenPayModal = ref(true);

	const handleClosePayModal = () => {
		isOpenPayModal.value = false;
	};

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

<style lang="scss">
	.board-catalog-details_type_user {
		.board-catalog-details__header-content {
			flex-basis: 50%;
		}
	}
</style>
