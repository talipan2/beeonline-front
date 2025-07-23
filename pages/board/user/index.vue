<template>
	<NuxtLayout
		name="profile"
		title="Объявления"
		class="announcements-layout"
	>
		<template #header>
			<UiBreadCrumb
				:list="[
					{ label: 'Главная', link: '/' },
					{ label: `Объявления`, link: '' },
				]"
			/>
		</template>
		<template #content>
			<div ref="list">
				<CommonAlerts
					alert="Объявлений не найдено"
					v-if="!data.length && isLoaded"
				/>
				<BoardList
					ref="list"
					:data="data"
					:page="page"
					:isLoading="isLoading"
					cardLink="/board/user"
					@update:page="handleUpdatePage"
					:isUserAnnouncements="true"
					@updateData="handleUpdateData"
				/>
			</div>
		</template>
	</NuxtLayout>
</template>

<script setup>
	// Импорт стора организаций и настроек
	import { useOrganizationStore } from '~/store/organizationStore';
	import { useSettingStore } from '~/store/settingStore';
	import { useAnnouncementStore } from '~/store/announcementStore';
	import { useUserStore } from '~/store/userStore';

	// Инициализация стора организаций и стора настроек
	const organizationStore = useOrganizationStore();
	const settingStore = useSettingStore();
	const announcementStore = useAnnouncementStore();
	const userStore = useUserStore();

	// Состояние пагинации (текущая и последняя страница)
	const page = ref({
		current_page: 1,
		last_page: 1,
	});

	// ref для DOM-элемента списка объявлений (для скролла)
	const list = ref(null);

	// Список объявлений
	const data = ref([]);

	// Флаг загрузки данных
	const isLoading = ref(false);
	const isLoaded = ref(false);

	/**
	 * Получение списка объявлений с сервера
	 * @param {Object} params - параметры фильтрации/сортировки/страницы
	 * @param {boolean} scroll - нужно ли скроллить к списку после загрузки
	 */
	const handleFetchData = (params, scroll = true) => {
		if (!userStore.userData.id) return;
		isLoading.value = true;
		announcementStore
			.getAnnouncementsUserList(userStore.userData.id, {
				...params,
				per_page: 9,
			})
			.then((res) => {
				data.value = res?.data?.map((item) => {
					return {
						...item,
						categories: item.categories.map((category) => category.id),
					};
				}); // сохраняем полученные объявления
				page.value = res.meta; // обновляем данные пагинации
				if (scroll) {
					// Скроллим к списку объявлений с учетом высоты хедера
					const rect = list.value.getBoundingClientRect();
					const offset =
						window.scrollY +
						rect.top -
						settingStore.headerHeight -
						window.innerHeight / 2;
					smoothScroll(offset);
				}
			})
			.finally(() => {
				isLoading.value = false;
				isLoaded.value = true;
			});
	};

	/**
	 * Обработчик смены страницы пагинации
	 * @param {number} page - номер новой страницы
	 */
	const handleUpdatePage = (page) => {
		handleFetchData({ ...params.value, page });
	};

	const handleUpdateData = (announcement) => {
		const index = data.value.findIndex((item) => item.id === announcement.id);
		if (index !== -1) {
			data.value[index] = announcement;
		}
	};

	// При монтировании компонента — первый запрос объявлений
	onMounted(() => {
		handleFetchData({}, false);
	});
</script>
