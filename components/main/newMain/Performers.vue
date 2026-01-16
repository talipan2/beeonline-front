<template>
	<section class="container new-main__performers">
		<MainNewMainSectionContainer
			title="Поиск производителей"
			description="Ускорьте свой путь к успеху с нашим сервисом, находя лучших производителей одежды в модной индустрии за считаные минуты! На платформе доступен поиск швейных фабрик и цехов для пошива одежды, реализована возможность установить прямые контакты для контрактного производства без посредников."
			link="/services"
			linkText="Перейти в раздел"
		>
			<div class="new-main__performers-list">
				<template v-if="isLoading">
					<MainNewMainEntityCardSkeleton
						v-for="n in 8"
						:key="'skeleton-performer-' + n"
						type="performer"
					/>
				</template>
				<MainNewMainEntityCard
					v-for="entity in data"
					:key="entity.id"
					:entity="entity"
					entityType="performer"
					link="/services"
				/>
			</div>
		</MainNewMainSectionContainer>
	</section>
</template>

<script setup>
	import { useOrganizationStore } from '~/store/organizationStore';

	const organizationStore = useOrganizationStore();
	const data = ref([]);
	const isLoading = ref(false);

	onMounted(() => {
		isLoading.value = true;
		organizationStore
			.getPubCardsList({ per_page: 8, type: 'performer' })
			.then((res) => {
				if (res && res.data && res.data.length > 0) {
					data.value = res.data.map((item) => {
						return {
							id: item.id,
							title: item.name,
							description: item.description,
							image: item.logo,
							cities: item.cities,
							regions: item.regions,
							countries: item.countries,
							categories: item.categories,
							views: item.view_count,
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
	.new-main__performers {
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
