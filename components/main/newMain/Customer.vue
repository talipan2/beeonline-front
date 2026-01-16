<template>
	<section class="container new-main__customer">
		<MainNewMainSectionContainer
			title="Поиск заказчиков"
			description="Расширьте свой бизнес и увеличьте объем заказов — найдите новых клиентов среди ведущих брендов и ритейлеров с нашим удобным и быстрым сервисом! Открывайте прямые контакты для контрактного производства и выходите на переговоры без посредников."
			link="/orders"
			linkText="Перейти в раздел"
		>
			<div class="new-main__customer-list">
				<MainNewMainEntityCardSkeleton
					v-for="n in 8"
					:key="'skeleton-customer-' + n"
					v-if="isLoading"
					type="customer"
				/>
				<MainNewMainEntityCard
					v-else
					v-for="entity in data"
					:key="entity.id"
					:entity="entity"
					entityType="customer"
					link="/orders"
				/>
			</div>
		</MainNewMainSectionContainer>
	</section>
</template>

<script setup>
	import { useEntityStore } from '~/store/entityStore';

	const data = ref([]);
	const isLoading = ref(false);
	const entityStore = useEntityStore();

	onMounted(() => {
		entityStore
			.getOrders({ per_page: 8 })
			.then((res) => {
				if (res && res.data && res.data.length > 0) {
					data.value = res.data.map((item) => {
						return {
							id: item.id,
							title: item.name,
							batch: item.batch ? `${item.batch} шт.` : '-',
							deadline_at: item.deadline_at,
						};
					});
				}
			})
			.finally(() => {
				isLoading.value = false;
			});
	});
</script>

<style lang="scss" scoped>
	.new-main__customer {
		font-size: 1rem;
		margin-bottom: 10em;

		&-list {
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			gap: 24px;

			@include desktop {
				grid-template-columns: repeat(3, 1fr);
			}

			@include small-tablet {
				grid-template-columns: repeat(2, 1fr);
			}

			@include mobile {
				grid-template-columns: repeat(1, 1fr);
				max-width: 450px;
				margin: 0 auto;
			}
		}
	}
</style>
