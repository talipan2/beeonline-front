<template>
  <NuxtLayout name="profile" title="Обновление публичной карточки компании">
    <template #header>
      <UiBreadCrumb :list="[{label: 'Главная', link: '/'}, { label: 'Кабинет заказчика', link: '/customer/desktop'}, { label: 'Карточка компании', link: '' }]" />
    </template>
    <template #content>
      <ProfilePubCard />
    </template>
  </NuxtLayout>
</template>

