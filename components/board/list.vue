<template>
	<div
		class="board-list"
		ref="list"
		:class="{ 'board-list_user-announcements': isUserAnnouncements }"
	>
		<!-- Скелетоны во время загрузки -->
		<template v-if="isLoading">
			<BoardCatalogCard
				v-for="n in 8"
				:key="'skeleton-' + n"
				:loading="true"
				class="board-list__card"
			/>
		</template>
		<!-- Список объявлений после загрузки -->
		<template v-else>
			<BoardCatalogCard
				class="board-list__card"
				v-for="announcement in data"
				:key="announcement.id"
				:announcement="announcement"
				:loading="false"
				:isUserAnnouncements="isUserAnnouncements"
			/>
		</template>
	</div>
	<!-- Пагинация -->
	<CommonPagination
		class="board-list__pagination"
		:current-page="page.current_page"
		:total-pages="page.last_page"
		@change-page="handleUpdatePage"
		btn-type="square"
		button-style="secondary"
		v-if="page.last_page > 1"
	>
		<template #prevIcon>
			<SvgoArrow
				class="svg-l board-list__pagination-icon board-list__pagination-icon_type_prev"
			/>
			<span class="board-list__pagination-text">Предыдущая</span>
		</template>
		<template #nextIcon>
			<span class="board-list__pagination-text">Следующая</span>
			<SvgoArrow
				class="svg-l board-list__pagination-icon board-list__pagination-icon_type_next"
			/>
		</template>
	</CommonPagination>
</template>

<script setup>
	import { useOrganizationStore } from '~/store/organizationStore';
	import { useSettingStore } from '~/store/settingStore';

	const organizationStore = useOrganizationStore();
	const settingStore = useSettingStore();

	const props = defineProps({
		page: {
			type: Object,
			default: () => ({
				current_page: 1,
				last_page: 1,
			}),
		},
		isLoading: {
			type: Boolean,
			default: false,
		},
		data: {
			type: Array,
			default: () => [],
		},
		isUserAnnouncements: {
			type: Boolean,
			default: false,
		},
	});

	const emit = defineEmits(['update:page']);

	const handleUpdatePage = (page) => {
		emit('update:page', page);
	};
</script>

<style lang="scss">
	.board-list {
		display: flex;
		flex-wrap: wrap;
		gap: 4em 2.7em;

		&__card {
			flex: 0 1 calc(25% - 2.1em);

			@include tablet {
				flex: 0 1 calc(33.333% - 2.1em);
			}

			@include mobile {
				flex: 0 1 100%;
			}
		}

		&_user-announcements {
			.board-list__card {
				flex: 0 1 calc(33.333% - 2.1em);
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

						.board-list__pagination-icon_type_next {
							transform: translateX(0.5em) rotate(180deg) !important;
							path {
								stroke: var(--button-background-primary);
							}
						}

						.board-list__pagination-icon_type_prev {
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
