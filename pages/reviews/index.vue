<template>
  <NuxtLayout name="profile" title="Отзывы о нас" class="reviews-layout">
    <template #header>
      <UiBreadCrumb :list="[{label: 'Главная', link: '/'}, { label: `Кабинет ${roleName}`, link: '/desktop' }, { label: 'Отзывы о нас', link: '' }]" />
    </template>
    <template #content>
      <Reviews reviewsState="reviews"/>
    </template>
  </NuxtLayout>
</template>

<script setup>
import { useUserStore } from '~/store/userStore';


useHead({
  title: 'Отзывы о нас',
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