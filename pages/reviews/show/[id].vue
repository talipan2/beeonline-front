<template>
  <NuxtLayout name="profile" title="Отзыв о нас" class="reviews-layout">
    <template #header>
      <UiBreadCrumb
        :list="[
          { label: 'Главная', link: '/' },
          { label: `Кабинет ${roleName}`, link: '/desktop' },
          { label: 'Отзывы о нас', link: '/reviews' },
          { label: 'Отзыв ', link: '' },
        ]"
      />
    </template>
    <template #content>
      <ReviewsDetails :reviewsState="reviewsState" :review="review"/>
    </template>
    <template #rightSide>
      <ReviewsMessageCard :data="otherSidePubCard"/>
    </template>
  </NuxtLayout>
</template>

<script setup>
import { useOrganizationStore } from '~/store/organizationStore';
import { useReviewsStore } from '~/store/reviewsStore';
import { useUserStore } from '~/store/userStore';


const userStore = useUserStore();

const roleName = userStore.getRoleNameForBreadcrumbs;

const reviewsStore = useReviewsStore();
const organizationStore = useOrganizationStore();
const router = useRouter();

const review = ref({});
const reviewsState = computed(() => {
  if(review.value.owner_org?.id === userStore.userOrganization.id) {
    return 'my-reviews';
  } else {
    return 'reviews';
  }
});

const otherSidePubCard = ref({});

onMounted(() => {
  const reviewId = router.currentRoute.value.params.id;

  if (reviewId) {
    reviewsStore.getReview(reviewId).then((res) => {
      review.value = res;
      if(reviewsState.value === 'reviews') {
        organizationStore.getPubCard(res.owner_org?.id)
        .then((res) => {
          review.value = {
            ...review.value,
            aboutOrgLogo: res.logo ? res.logo : null,
          };
          otherSidePubCard.value = res;
        });
      } else {
        organizationStore.getPubCard(res.about_org?.id)
          .then((res) => {
            review.value = {
              ...review.value,
              aboutOrgLogo: res.logo ? res.logo : null,
            };
            otherSidePubCard.value = res;
          });
      }
    });
  }
});

</script>

<style lang="scss">


</style>
