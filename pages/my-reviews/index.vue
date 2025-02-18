<template>
  <NuxtLayout name="profile" title="Мои отзывы" class="reviews-layout">
    <template #header>
      <UiBreadCrumb :list="[{label: 'Главная', link: '/'}, { label: `Кабинет ${roleName}`, link: '/desktop'}, { label: 'Мои отзывы', link: '' }]" />
    </template>
    <template #content>
      <Reviews reviewsState="my-reviews" />
    </template>
  </NuxtLayout>
</template>

<script setup>
import { useUserStore } from '~/store/userStore';

useHead({
  title: 'Мои отзывы',
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