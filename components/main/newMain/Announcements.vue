<template>
	<section class="container new-main__announcements">
		<MainNewMainSectionContainer title="Поиск объявлений" link="/board" linkText="Перейти в раздел">
			<template #description>Найдите подрядчиков и поставщиков для фабрики, ателье, бренда или магазина в разделе <NuxtLink to="/board" class="section-link">«Поставщики»</NuxtLink>. Здесь размещают объявления о продаже тканей и фурнитуры, услугах в сферах логистики, фулфилмента, маркировки, и других смежных с легкой промышленностью направлениях — все на одной площадке.</template>
			<div class="new-main__announcements-list">
				<MainNewMainEntityCardSkeleton
					v-for="n in 8"
					:key="'skeleton-announcement-' + n"
					v-if="isLoading"
					type="announcement"
				/>
				<MainNewMainEntityCard
					v-else
					v-for="entity in data"
					:key="entity.id"
					:entity="entity"
					entityType="announcement"
					link="/board"
				/>
			</div>
		</MainNewMainSectionContainer>
	</section>
</template>

<script setup>
	import { useAnnouncementStore } from '~/store/announcementStore';

	const announcementStore = useAnnouncementStore();
	const data = ref([]);
	const isLoading = ref(false);

	onMounted(() => {
		isLoading.value = true;
		announcementStore
			.getAnnouncements({
				per_page: 8,
			})
			.then((res) => {
				if (res && res.data && res.data.length > 0) {
					data.value = res.data.map((item) => {
						return {
							id: item.id,
							title: item.title,
							description: item.content,
							image: item.announcement_image,
							price: item.price,
							date: item.updated_at,
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
	.section-link {
		display: inline;
		color: #62636e;
		text-decoration: underline;
		text-underline-offset: 3px;
		transition: opacity 0.2s ease;

		&:hover {
			opacity: 0.75;
		}
	}

	.new-main__announcements {
		font-size: 1rem;
		margin-bottom: 10em;

		@include mobile {
			margin-bottom: 6.4rem;
		}

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
