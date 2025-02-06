<template>
  <NuxtLayout name="profile" title="Уведомления" class="notifications-layout">
    <template #header>
        <UiBreadCrumb :list="[{label: 'Главная', link: '/'}, { label: 'Кабинет исполнителя', link: '/performer/desktop' }, { label: 'Уведомления', link: '' }]" />
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

useHead({
  title: 'Уведомления',
  meta: [
    {
      name: 'description',
      content: '',
    },
  ],
});

</script>