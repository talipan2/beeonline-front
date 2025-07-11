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
			<BoardList
				:data="data"
				:page="page"
				:isLoading="isLoading"
				@update:page="handleUpdatePage"
				:isUserAnnouncements="true"
			/>
		</template>
	</NuxtLayout>
</template>

<script setup>
	// Импорт стора организаций и настроек
	import { useOrganizationStore } from '~/store/organizationStore';
	import { useSettingStore } from '~/store/settingStore';

	// Инициализация стора организаций и стора настроек
	const organizationStore = useOrganizationStore();
	const settingStore = useSettingStore();

	// Состояние пагинации (текущая и последняя страница)
	const page = ref({
		current_page: 1,
		last_page: 1,
	});

	// Параметры фильтрации и сортировки объявлений
	const params = ref({
		category_id: 1, // id категории (по умолчанию 1)
		sort: 'created_at', // сортировка по дате создания
		search: '', // поисковый запрос
	});

	// ref для DOM-элемента списка объявлений (для скролла)
	const list = ref(null);

	// Флаг загрузки данных
	const isLoading = ref(false);

	/**
	 * Получение списка объявлений с сервера
	 * @param {Object} params - параметры фильтрации/сортировки/страницы
	 * @param {boolean} scroll - нужно ли скроллить к списку после загрузки
	 */
	const handleFetchData = (params, scroll = true) => {
		isLoading.value = true;
		organizationStore
			.getPubCardsList({ type: 'performer', ...params })
			.then((res) => {
				data.value = res.data; // сохраняем полученные объявления
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
			});
	};

	/**
	 * Обработчик смены страницы пагинации
	 * @param {number} page - номер новой страницы
	 */
	const handleUpdatePage = (page) => {
		handleFetchData({ ...params.value, page });
	};

	// Список объявлений
	const data = ref({});

	// При монтировании компонента — первый запрос объявлений
	onMounted(() => {
		handleFetchData({}, false);
	});
</script>
