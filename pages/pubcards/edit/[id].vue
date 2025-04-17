<template>
  <NuxtLayout name="profile" title="Обновление публичной карточки компании">
    <template #header>
      <UiBreadCrumb :list="[{label: 'Главная', link: '/'}, { label: `Кабинет ${roleName}` , link: '/desktop'}, { label: 'Карточка компании', link: '' }]" />
    </template>
    <template #content>
      <ProfilePubCard />
    </template>
  </NuxtLayout>
</template>

<script setup>
import { useUserStore } from '~/store/userStore';

useHead({
  title: 'Обновление публичной карточки компании',
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
