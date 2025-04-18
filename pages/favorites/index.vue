<template>
  <NuxtLayout name="profile" title="Избранное" class="favorites-layout">
    <template #header>
      <UiBreadCrumb :list="[{label: 'Главная', link: '/'}, { label: `Кабинет ${roleName}`, link: '/desktop' }, { label: 'Избранное', link: '' }]" />
    </template>
    <template #content>
      <Favorites />
    </template>
  </NuxtLayout>
</template>

<script setup>
import { useUserStore } from '~/store/userStore';

useHead({
  title: 'Избранное',
  meta: [
    {
      name: 'description',
      content: '',
    },
  ],
});

definePageMeta({
    disableMetrika: true,
});

const userStore = useUserStore();

const roleName = userStore.getRoleNameForBreadcrumbs;



</script>
