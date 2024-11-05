<template>
  <NuxtLayout name="profile" title="Уведомления" class="notifications-layout">
    <template #header>
        <UiBreadCrumb :list="[{label: 'Главная', link: '/'}, { label: 'Кабинет заказчика', link: '/customer/desktop' }, { label: 'Уведомления', link: '' }]" />
      </template>
      <template #content>
        <NotificationList />
      </template>
      <template #rightSide>
        <NotificationSetting />
      </template>
  </NuxtLayout>
</template>