<template>
  <NuxtLayout name="profile" title="Новости" class="news-layout">
    <template #header>
      <UiBreadCrumb :list="[{label: 'Главная', link: '/'}, { label: 'Новости', link: '' }]" />
    </template>
    <template #content>
      <News />
    </template>
  </NuxtLayout>
</template>