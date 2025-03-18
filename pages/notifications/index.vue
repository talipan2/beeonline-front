<template>
  <NuxtLayout name="profile" title="Уведомления" class="notifications-layout">
    <template #header>
        <UiBreadCrumb :list="[{label: 'Главная', link: '/'}, { label: `Кабинет ${roleName}`, link: '/desktop' }, { label: 'Уведомления', link: '' }]" />
      </template>
      <template #content>
        <NotificationList />
      </template>
      <template #rightSide>
        <NotificationSetting />
      </template>
  </NuxtLayout>
</template>

<script setup>
import { useUserStore } from '~/store/userStore';


useHead({
  title: 'Уведомления',
  meta: [
    {
      name: 'description',
      content: '',
    },
  ],
});

const userStore = useUserStore();

const roleName = userStore.getRoleNameForBreadcrumbs;

onMounted(() => {
  if(userStore.userData.id) {
    userStore.getNotifications(userStore.userData.id);
  }
});

</script>