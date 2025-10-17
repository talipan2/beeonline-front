<template>
	<NuxtLayout
		name="profile"
		:title="pageTitle"
		class="reviews-layout"
	>
		<template #header>
			<UiBreadCrumb
				:list="[
					{ label: 'Главная', link: '/' },
					{ label: `Кабинет ${roleName}`, link: '/desktop' },
					{ label: pageTitle, link: '/reviews' },
					{ label: 'Отзыв ', link: '' },
				]"
			/>
		</template>
		<template #content>
			<ReviewsDetails
				:reviewsState="reviewsState"
				:review="review"
			/>
		</template>
		<template #rightSide>
			<ReviewsMessageCard :data="otherSidePubCard" />
		</template>
	</NuxtLayout>
</template>

<script setup>
	import { useOrganizationStore } from '~/store/organizationStore';
	import { useReviewsStore } from '~/store/reviewsStore';
	import { useUserStore } from '~/store/userStore';

	definePageMeta({
		disableMetrika: false,
	});

	const userStore = useUserStore();

	const roleName = userStore.getRoleNameForBreadcrumbs;

	const reviewsStore = useReviewsStore();
	const organizationStore = useOrganizationStore();
	const router = useRouter();

	const pageTitle = ref('');

	const review = ref({});
	const reviewsState = computed(() => {
		if (
			review.value.owner_pubcard?.organization_id ===
			userStore.userOrganization.id
		) {
			return 'my-reviews';
		} else {
			return 'reviews';
		}
	});

	watch(
		() => reviewsState.value,
		() => {
			if (reviewsState.value === 'my-reviews') {
				pageTitle.value = 'Мои отзывы';
			} else {
				pageTitle.value = 'Отзывы о нас';
			}
		},
		{ immediate: true }
	);

	const otherSidePubCard = ref({});

	const reviewId = router.currentRoute.value.params.id;

	if (reviewId) {
		await reviewsStore.getReview(reviewId).then((res) => {
			review.value = res;
			if (reviewsState.value === 'reviews') {
				organizationStore.getPubCard(res.owner_pubcard?.id).then((res) => {
					review.value = {
						...review.value,
						aboutOrgLogo: res.logo ? res.logo : null,
					};
					otherSidePubCard.value = res;
				});
			} else {
				organizationStore.getPubCard(res.about_pubcard?.id).then((res) => {
					review.value = {
						...review.value,
						aboutOrgLogo: res.logo ? res.logo : null,
					};
					otherSidePubCard.value = res;
				});
			}
		});
	}

	// onMounted(() => {
	//   const reviewId = router.currentRoute.value.params.id;

	//   if (reviewId) {
	//     reviewsStore.getReview(reviewId).then((res) => {
	//       review.value = res;
	//       if(reviewsState.value === 'reviews') {
	//         organizationStore.getPubCard(res.owner_pubcard?.id)
	//         .then((res) => {
	//           review.value = {
	//             ...review.value,
	//             aboutOrgLogo: res.logo ? res.logo : null,
	//           };
	//           otherSidePubCard.value = res;
	//         });
	//       } else {
	//         organizationStore.getPubCard(res.about_pubcard?.id)
	//           .then((res) => {
	//             review.value = {
	//               ...review.value,
	//               aboutOrgLogo: res.logo ? res.logo : null,
	//             };
	//             otherSidePubCard.value = res;
	//           });
	//       }
	//     });
	//   }
	// });
</script>

<style lang="scss"></style>
