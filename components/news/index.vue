<template>
	<div class="news">
		<template v-if="isLoaded">
			<div
				class="news__list"
				v-if="data.length"
				:class="{ loading: loading }"
			>
				<div
					class="news__item"
					v-for="(news, index) in data"
					:key="index"
				>
					<NewsNewCard :data="news" />
				</div>
			</div>
			<CommonAlerts
				alert="Новостей нет"
				:type="'warning'"
				v-if="!data.length"
			/>
			<CommonPagination
				button-style="secondary"
				v-if="newsPage.lastPage > 1"
				class="news__pagination"
				:current-page="newsPage.currentPage"
				:total-pages="newsPage.lastPage"
				@change-page="handlePageChange"
			>
				<template #prevIcon>
					<SvgoArrow
						class="svg-l news__pagination-icon news__pagination-icon_type_prev"
					/>
					<span class="news__pagination-text">Предыдущая</span>
				</template>
				<template #nextIcon>
					<span class="news__pagination-text">Следующая</span>
					<SvgoArrow
						class="svg-l news__pagination-icon news__pagination-icon_type_next"
					/>
				</template>
			</CommonPagination>
		</template>
	</div>
</template>

<script setup>
	import { useSettingStore } from '~/store/settingStore';

	const settingStore = useSettingStore();
	const isLoaded = ref(false);
	const loading = ref(false);
	const router = useRouter();
	const data = ref([]);

	const newsPage = ref({
		currentPage: 1,
		lastPage: 1,
	});

	const handlePageChange = (page) => {
		if (loading.value) return;
		loading.value = true;
		settingStore
			.getNewsList({ page, per_page: 12 })
			.then((res) => {
				data.value = res.data;
				newsPage.value = {
					currentPage: res.current_page,
					lastPage: res.last_page,
				};
				smoothScroll(0, false);
				router.replace({ query: { page: res.current_page } });
			})
			.finally(() => {
				loading.value = false;
			});
	};

	onMounted(() => {
		loading.value = true;
		if (router.currentRoute.value.query.page) {
			newsPage.value.currentPage = Number(router.currentRoute.value.query.page);
		}
		settingStore
			.getNewsList({ page: newsPage.value.currentPage, per_page: 12 })
			.then((res) => {
				data.value = res.data;
				newsPage.value = {
					currentPage: res.current_page,
					lastPage: res.last_page,
				};
			})
			.finally(() => {
				isLoaded.value = true;
				loading.value = false;
			});
	});
</script>

<style lang="scss">
	.news {
		font-size: 1.6rem;

		.attachment--preview {
			max-width: 100%;
			text-align: left;
			border: none;
			cursor: pointer;
			margin: 0 0 1em;
		}

		&__list {
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			grid-auto-rows: 1fr;
			gap: 1.875em;

			@include desktop {
				grid-template-columns: repeat(3, 1fr);
			}

			@include small-tablet {
				grid-template-columns: repeat(2, 1fr);
			}

			@include mobile {
				grid-template-columns: repeat(1, 1fr);
			}
		}

		&__item {
			min-width: 0;
		}

		&__pagination {
			.pagination__btn {
				gap: 0.8rem;
				width: auto;

				&_type_prev,
				&_type_next {
					background-color: transparent;
					color: #000;
					font-size: 1.4rem;
					font-family: 'Inter', sans-serif;

					&:disabled {
						background-color: transparent;
						color: #868695;
					}

					&:hover:not(:disabled) {
						background-color: transparent;
						color: #868695;

						.news__pagination-icon_type_next {
							transform: translateX(0.5em) rotate(180deg) !important;
							path {
								stroke: var(--button-background-primary);
							}
						}

						.news__pagination-icon_type_prev {
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

			@include mobile {
				.pagination__btn_type_prev,
				.pagination__btn_type_next {
					display: none;
				}
			}
		}
	}
</style>
