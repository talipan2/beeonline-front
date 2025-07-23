<template>
	<div class="board-catalog-header">
		<div class="board-catalog-header__container">
			<UiButton
				class="board-catalog-header__create"
				variant="quinary"
				size="large"
				to="/board/create"
			>
				Создать объявление
			</UiButton>
			<CommonSearch
				class="board-catalog-header__search"
				placeholder="Поиск объявлений"
				v-model="search"
			/>
			<CommonDropDownSelect
				class="board-catalog-header__sort"
				:options="sortOptions"
				v-model="currentSort"
			>
				<template #icon-left>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						class="svg-m sort-svg"
					>
						<path
							class="sort-svg__arrow-up"
							d="M11.9498 7.94975L10.5356 9.36396L8.00079 6.828L8.00004 20H6.00004L6.00079 6.828L3.46451 9.36396L2.05029 7.94975L7.00004 3L11.9498 7.94975Z"
							fill="black"
						/>
						<path
							class="sort-svg__arrow-down"
							d="M21.9498 16.0503L17 21L12.0503 16.0503L13.4645 14.636L16.0008 17.172L16 4H18L18.0008 17.172L20.5356 14.636L21.9498 16.0503Z"
							fill="black"
						/>
					</svg>
				</template>
			</CommonDropDownSelect>
			<CommonDropDownMultiselect
				title="Категории"
				:options="categoryOptions"
				class="board-catalog-header__category"
				v-model="currentCategory"
			>
				<template #iconLeft>
					<SvgoJacket />
				</template>
			</CommonDropDownMultiselect>
			<CommonBadgeSecond
				class="board-catalog-header__category-badges"
				:badges="categoryBadges"
				type="button"
				@click="handleDeleteCategory"
			/>
		</div>
	</div>
</template>

<script setup>
	import { useAnnouncementStore } from '~/store/announcementStore';
	import { useEntityStore } from '~/store/entityStore';

	const props = defineProps({
		params: {
			type: Object,
			default: () => ({}),
		},
		isLoading: {
			type: Boolean,
			default: false,
		},
	});

	const emit = defineEmits(['update:params']);

	const announcementStore = useAnnouncementStore();
	const entityStore = useEntityStore();

	const categoryBadges = computed(() => {
		return currentCategory.value.map((item) => {
			return {
				id: item,
				label: entityStore.entityData.announcementCategories.find(
					(category) => category.id === item
				)?.name,
			};
		});
	});

	const sortOptions = [
		{
			id: 1,
			label: 'По дате публикации',
			value: 'date',
		},
		{
			id: 2,
			label: 'Сначала дорогие',
			value: 'expensive',
		},
		{
			id: 3,
			label: 'Сначала дешевые',
			value: 'cheap',
		},
	];
	const categoryOptions = computed(
		() => entityStore.entityData.announcementCategories
	);

	const currentSort = ref(sortOptions[0].value);
	const currentCategory = ref([]);
	const search = ref('');
	const isInitializing = ref(true);

	// Синхронизация с props из родителя (URL query параметры) - НЕ эмитим события
	watch(
		() => props.params,
		(newParams) => {
			if (newParams.sort) {
				currentSort.value = newParams.sort;
			}
			if (newParams.category_id) {
				currentCategory.value = newParams.category_id;
			}
			if (newParams.search !== undefined) {
				search.value = newParams.search;
			}
		},
		{ immediate: true, deep: true }
	);

	// Отслеживание изменений пользователем - эмитим события
	watch(
		() => [currentSort.value, currentCategory.value, search.value],
		() => {
			// Пропускаем первое срабатывание (инициализация)
			if (isInitializing.value) {
				isInitializing.value = false;
				return;
			}

			emit('update:params', {
				sort: currentSort.value,
				category_id: currentCategory.value,
				search: search.value,
			});
		},
		{
			deep: true,
			immediate: false,
		}
	);

	const handleDeleteCategory = (category) => {
		currentCategory.value = currentCategory.value.filter(
			(item) => item !== category.id
		);
	};

	onMounted(async () => {
		await nextTick();
		if (categoryOptions.value.length === 0) {
			announcementStore.getAnnouncementsCategories();
		}
	});
</script>

<style lang="scss">
	.board-catalog-header {
		font-size: 1rem;
		&__container {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			gap: 3.2em;
		}

		&__create {
			font-size: 1.2em;
			text-transform: uppercase;
			font-weight: 400;
			padding-block: 1.41em;
			flex: 0 1 21.6em;
		}

		&__search {
			flex: 0 1 42em;
		}

		&__sort {
			.drop-down-select__dropdown-button {
				padding: 0.75em;
			}
			// Анимация стрелок
			.sort-svg .sort-svg__arrow-up,
			.sort-svg .sort-svg__arrow-down {
				transition: transform 0.3s;
			}
			&:hover .sort-svg .sort-svg__arrow-up {
				transform: translateY(-4px);
			}
			&:hover .sort-svg .sort-svg__arrow-down {
				transform: translateY(4px);
			}
		}

		&__category {
			.drop-down-multiselect__dropdown-button {
				padding: 0.75em;
			}

			.drop-down-multiselect__dropdown-left-icon {
				width: 1.25em;
				height: 1.25em;
				svg {
					width: 100%;
					height: 100%;
				}
			}
		}

		&__category-badges {
			flex: 0 1 100%;
			font-size: 1.6em;
		}

		@include mobile {
			&__create {
				order: 4;
				flex-basis: 100%;
			}

			&__search {
				order: 1;
				flex-basis: 100%;
			}

			&__sort {
				order: 3;
				flex: 0 1 calc(50% - 1.6em);

				.drop-down-select__dropdown-button-icon {
					display: none;
				}

				.drop-down-select__dropdown-button {
					font-size: 1.3em;
					background-color: transparent;
					box-shadow: none;
					padding-inline: 0;
					column-gap: 0.5em;

					@include hover {
						box-shadow: none;
					}
				}
			}

			&__category {
				order: 2;
				flex: 0 1 calc(50% - 1.6em);

				.drop-down-multiselect__dropdown-button
					svg:not(.drop-down-multiselect__dropdown-left-icon svg) {
					display: none;
				}
			}
		}
	}
</style>
