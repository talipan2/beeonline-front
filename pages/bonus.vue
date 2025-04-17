<template>
  <NuxtLayout name="profile" title="Премия Bee-online" class="bonus-layout">
    <template #header>
      <UiBreadCrumb :list="[{label: 'Главная', link: '/'},{ label: `Кабинет ${roleName}`, link: `/desktop`}, { label: 'Премия Bee-online', link: '' }]" />
    </template>
    <template #content>
      <Bonus />
    </template>
  </NuxtLayout>
</template>

<script setup>
import { useUserStore } from '~/store/userStore';

useHead({
  title: 'Премия Bee-online',
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
