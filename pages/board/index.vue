<template>
	<NuxtLayout
		name="info"
		title="Объявления"
	>
		<template #header>
			<UiBreadCrumb
				:list="[
					{ label: 'Главная', link: '/' },
					{ label: 'Объявления', link: '' },
				]"
			/>
		</template>
		<template #content>
			<div class="board">
				<!-- Заголовок и фильтры каталога объявлений -->
				<BoardCatalogHeader class="board__header" />
				<div
					class="board__list"
					ref="list"
				>
					<!-- Скелетоны во время загрузки -->
					<template v-if="isLoading">
						<BoardCatalogCard
							v-for="n in 8"
							:key="'skeleton-' + n"
							:loading="true"
							class="board__card"
						/>
					</template>
					<!-- Список объявлений после загрузки -->
					<template v-else>
						<BoardCatalogCard
							class="board__card"
							v-for="announcement in data"
							:key="announcement.id"
							:announcement="announcement"
							:loading="false"
						/>
					</template>
				</div>
				<!-- Пагинация -->
				<CommonPagination
					class="board__pagination"
					:current-page="page.current_page"
					:total-pages="page.last_page"
					@change-page="handleUpdatePage"
					btn-type="square"
					button-style="secondary"
				>
					<template #prevIcon>
						<SvgoArrow
							class="svg-l board__pagination-icon board__pagination-icon_type_prev"
						/>
						<span class="board__pagination-text">Предыдущая</span>
					</template>
					<template #nextIcon>
						<span class="board__pagination-text">Следующая</span>
						<SvgoArrow
							class="svg-l board__pagination-icon board__pagination-icon_type_next"
						/>
					</template>
				</CommonPagination>
			</div>
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

<style lang="scss">
	.board {
		font-size: 1rem;

		&__header {
			margin-bottom: 3.2em;
		}

		&__list {
			display: flex;
			flex-wrap: wrap;
			gap: 4em 2.7em;
		}

		&__card {
			flex: 0 1 calc(25% - 2.1em);

			@include tablet {
				flex: 0 1 calc(33.333% - 2.1em);
			}

			@include mobile {
				flex: 0 1 100%;
			}
		}

		&__pagination {
			.pagination__btn {
				gap: 0.8rem;
				width: auto;

				&_type_prev,
				&_type_next {
					background-color: transparent;
					color: #868695;
					font-size: 1.4rem;
					font-family: 'Inter', sans-serif;

					&:disabled:hover {
						background-color: transparent;
						color: #868695;
					}

					&:hover {
						background-color: transparent;
						color: #868695;

						.board__pagination-icon_type_next {
							transform: translateX(0.5em) rotate(180deg) !important;
							path {
								stroke: var(--button-background-primary);
							}
						}

						.board__pagination-icon_type_prev {
							transform: translateX(-0.5em) !important;

							path {
								stroke: var(--button-background-primary);
							}
						}
					}
				}
			}

			&-icon {
				&_type_prev {
					transform: rotate(0deg) !important;
				}

				&_type_next {
					transform: rotate(180deg) !important;
				}
			}
		}
	}
</style>
