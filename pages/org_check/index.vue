<template>
  <NuxtLayout name="profile" title="Проверки контрагентов" class="org-check-layout">
    <template #header>
      <UiBreadCrumb :list="[{label: 'Главная', link: '/'}, { label: `Кабинет ${roleName}`, link: '/desktop' }, { label: 'Проверки контрагентов', link: '' }]" />
    </template>
    <template #content>
      <OrgCheck />
    </template>
  </NuxtLayout>
</template>

<script setup>
import { useUserStore } from '~/store/userStore';


useHead({
  title: 'Проверки контрагентов',
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