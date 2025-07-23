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
				@openPublicationModal="handleOpenPublicationModal"
			/>
			<BoardModalsAnnouncementEdit
				:is-open="editAnnouncementModal.isOpen"
				v-model:data="editAnnouncementModal.data"
				@close="editAnnouncementModal.isOpen = false"
				@updateData="handleUpdateData"
			/>
			<ConfirmModal />
			<PaidServiceAnnouncement
				ref="announcementPayModal"
				:id="announcementId"
			/>
			<BoardModalsPay
				:title="modalText.title"
				:text="modalText.text"
				:announcementId="data.id"
			/>
		</template>
	</NuxtLayout>
</template>

<script setup>
	import { useAnnouncementStore } from '~/store/announcementStore';
	import { useToast } from 'vue-toastification';
	import { useSettingStore } from '~/store/settingStore';

	const announcementStore = useAnnouncementStore();
	const settingStore = useSettingStore();
	const { confirm, ConfirmModal } = useConfirmModal();
	const toast = useToast();

	const data = ref({});
	const router = useRouter();
	const isLoading = ref(true);

	const modalText = computed(() => {
		if (data.value.status_code === 'ACTIVE') {
			return {
				title: 'Срок публикации',
				text: 'Осталось меньше 3 дней до окончания срока публикации объявления. Для продления срока публикации объявления необходимо оплатить услугу.',
			};
		}
		return {
			title: 'Оплата публикации',
			text: 'Объявление успешно создано. Для его публикации необходимо оплатить услугу.',
		};
	});

	const announcementPayModal = ref(null);
	const announcementId = ref(null);

	const handleOpenAnnouncementPayModal = (data) => {
		if (announcementPayModal.value) {
			announcementId.value = data?.id;
			announcementPayModal.value.open(data?.id);
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

	const handleOpenRemoveFromPublicationModal = (announcement) => {
		confirm({
			title: 'Снять объявление с публикации?',
			onConfirm: () => {
				announcementStore.deactivateAnnouncement(announcement?.id).then((res) => {
					data.value = res?.data;
					toast.success('Объявление успешно снято с публикации');
				});
			},
			onCancel: () => {},
		});
	};

	const isOpenPayModal = ref(true);

	const handleClosePayModal = () => {
		isOpenPayModal.value = false;
	};

	const handleUpdateData = (announcement) => {
		data.value = {...announcement};
	};

	const handleOpenPublicationModal = (announcement) => {
		confirm({
			title: 'Опубликовать объявление?',
			onConfirm: () => {
				announcementStore.activateAnnouncement(announcement?.id).then((res) => {
					data.value = res?.data;
					toast.success('Объявление успешно опубликовано');
				});
			},
			onCancel: () => {},
		});
	};

	onMounted(() => {
		isLoading.value = true;
		announcementStore
			.getAnnouncement(router.currentRoute.value.params.id)
			.then((res) => {
				data.value = res?.data || {};
				const threeDaysInMs = 3 * 24 * 60 * 60 * 1000; // 3 дня в миллисекундах
				if(res?.data?.status_code === "ACTIVE" && new Date(res?.data?.active_until) - new Date() <= threeDaysInMs) {
					settingStore.boardPayModal = true;
				}
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
