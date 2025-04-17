<template>
  <NuxtLayout name="profile" :title="pageTitle" class="reviews-layout">
    <template #header>
      <UiBreadCrumb :list="[{label: 'Главная', link: '/'}, { label: `Кабинет ${roleName}`, link: '/desktop' }, { label: pageTitle, link: '' }]" />
    </template>
    <template #content>
      <Reviews reviewsState="reviews" @updateState="updateReviewsState"/>
    </template>
  </NuxtLayout>
</template>

<script setup>
import { useUserStore } from '~/store/userStore';

definePageMeta({
    disableMetrika: true,
});

const currentReviewsState = ref('my-reviews');
const pageTitle = ref('Мои отзывы');

const updateReviewsState = (state) => {
  console.log(state)
  currentReviewsState.value = state;
}

watch(() => currentReviewsState.value, (newVal) => {
  if(newVal) {
    switch(newVal) {
      case 'my-reviews':
        pageTitle.value = 'Мои отзывы';
        return;
      case 'reviews':
        pageTitle.value = 'Отзывы о нас';
        return;
    }
  }
}, {deep: true})

useHead({
  title: pageTitle,
  meta: [
    {
      name: 'description',
      content: '',
    },
  ],
});



const userStore = useUserStore();

const roleName = userStore.getRoleNameForBreadcrumbs;

</script>
