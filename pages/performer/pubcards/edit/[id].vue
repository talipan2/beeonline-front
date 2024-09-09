<template>
  <NuxtLayout name="profile" title="Обновление публичной карточки компании">
    <template #header>
      <UiBreadCrumb :list="[{label: 'Главная', link: '/'}, { label: 'Кабинет исполнителя', link: '/performer'}, { label: 'Карточка компании', link: '' }]" />
    </template>
    <template #content>
      <ProfilePubCard />
    </template>
  </NuxtLayout>
</template>