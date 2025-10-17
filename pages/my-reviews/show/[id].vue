<template>
  <NuxtLayout name="profile" title="Отзыв" class="reviews-layout">
    <template #header>
      <UiBreadCrumb
        :list="[
          { label: 'Главная', link: '/' },
          { label: `Кабинет ${roleName}`, link: '/desktop' },
          { label: 'Мои отзывы', link: '/my-reviews' },
          { label: 'Отзыв', link: '' },
        ]"
      />
    </template>
    <template #content>
      <ReviewsDetails reviewsState="my-reviews"/>
    </template>
    <template #rightSide>
      <ReviewsMessageCard />
    </template>
  </NuxtLayout>
</template>

<script setup>
import { useUserStore } from '~/store/userStore';

definePageMeta({
    disableMetrika: false,
});

const userStore = useUserStore();

const roleName = userStore.getRoleNameForBreadcrumbs;


</script>
