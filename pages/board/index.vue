<template>
	<NuxtLayout
		name="info"
		title="Поставщики"
	>
		<template #header>
			<UiBreadCrumb
				:list="[
					{ label: 'Главная', link: '/' },
					{ label: 'Поставщики', link: '' },
				]"
			/>
		</template>
		<template #content>
			<div
				class="board"
				ref="list"
			>
				<!-- Заголовок и фильтры каталога объявлений -->
				<BoardCatalogHeader
					class="board__header"
					:params="params"
					@update:params="updateParams"
					:isLoading="isLoading"
				/>
				<CommonAlerts
					alert="Объявлений не найдено"
					v-if="!data.length && isLoaded"
				/>
				<BoardList
					:data="data"
					:page="page"
					:isLoading="isLoading"
					cardLink="/board"
					@update:page="handleUpdatePage"
				/>
			</div>
		</template>
	</NuxtLayout>
</template>

<script setup>
	// Импорт стора организаций и настроек
	import { useAnnouncementStore } from '~/store/announcementStore';
	import { useSettingStore } from '~/store/settingStore';

	// Инициализация стора организаций и стора настроек
	const announcementStore = useAnnouncementStore();
	const settingStore = useSettingStore();
	const router = useRouter();

	// Состояние пагинации (текущая и последняя страница)
	const page = ref({
		current_page: 1,
		last_page: 1,
	});

	// Параметры фильтрации и сортировки объявлений
	const params = ref({
		category_id: [], // id категории (по умолчанию 1)
		sort: 'date', // сортировка по дате создания
		search: '', // поисковый запрос
	});

	// Список объявлений
	const data = ref([]);

	// ref для DOM-элемента списка объявлений (для скролла)
	const list = ref(null);

	// Флаг загрузки данных
	const isLoading = ref(false);
	const isLoaded = ref(false);

	/**
	 * Обновление параметров фильтрации и запуск нового запроса
	 * @param {Object} data - новые параметры фильтрации
	 */
	const updateParams = (data) => {
		params.value = {
			...params.value,
			...data,
		};
		handleFetchData(params.value, false);
	};

	/**
	 * Получение списка объявлений с сервера
	 * @param {Object} params - параметры фильтрации/сортировки/страницы
	 * @param {boolean} scroll - нужно ли скроллить к списку после загрузки
	 */
	const handleFetchData = (params, scroll = true) => {
		isLoading.value = true;
		const query = {
			category_id: params.category_id ? params.category_id.join(',') : undefined,
			search: params.search ? params.search : undefined,
			sort: params.sort ? params.sort : undefined,
		}

		  // удаление пустых параметров
			Object.keys(query).forEach((key) => {
    if (
      query[key] == null || 
      query[key] === '' || 
      (Array.isArray(query[key]) && query[key].length === 0)
    ) {
      delete query[key];
    }
  });
		announcementStore
			.getAnnouncements({ ...params, per_page: 12 })
			.then((res) => {
				data.value = res.data; // сохраняем полученные объявления
				page.value = res.meta; // обновляем данные пагинации
				if (scroll) {
					// Скроллим к началу списка объявлений с учетом высоты хедера
					const rect = list.value.getBoundingClientRect();
					const offset = window.scrollY + rect.top - settingStore.headerHeight;
					smoothScroll(offset);
				}

				router.replace({ query: { ...query } });
				
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

	// При монтировании компонента — первый запрос объявлений
	onMounted(() => {
		params.value = {
			category_id: router.currentRoute.value.query.category_id ? router.currentRoute.value.query.category_id.split(',').map(Number) : [],
			search: router.currentRoute.value.query.search ? router.currentRoute.value.query.search : '',
			sort: router.currentRoute.value.query.sort ? router.currentRoute.value.query.sort : 'date',
		 };
		console.log(params.value);
		handleFetchData(params.value, false);
	});
</script>

<style lang="scss">
	.board {
		font-size: 1rem;

		&__header {
			margin-bottom: 3.2em;
		}
	}
</style>
