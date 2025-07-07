<template>
	<div class="board-catalog-header">
		<div class="board-catalog-header__container">
			<UiButton
				class="board-catalog-header__create"
				variant="quinary"
				size="large"
			>
				Создать объявление
			</UiButton>
			<CommonSearch
				class="board-catalog-header__search"
				placeholder="Поиск объявлений"
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
			>
				<template #iconLeft>
					<SvgoJacket />
				</template>
			</CommonDropDownMultiselect>
		</div>
	</div>
</template>

<script setup>
	import { useEntityStore } from '~/store/entityStore';

	const entityStore = useEntityStore();

	const sortOptions = [
		{
			id: 1,
			label: 'По дате публикации',
			value: 'date',
		},
		{
			id: 2,
			label: 'Сначала дорогие',
			value: 'price',
		},
		{
			id: 3,
			label: 'Сначала дешевые',
			value: 'price-asc',
		},
	];
	const categoryOptions = computed(() =>
		entityStore.entityData.categories.slice(0, 10)
	);

	const currentSort = ref(1);
	const currentCategory = ref([]);
</script>

<style lang="scss">
	.board-catalog-header {
		font-size: 1rem;
		&__container {
			display: flex;
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
	}
</style>
