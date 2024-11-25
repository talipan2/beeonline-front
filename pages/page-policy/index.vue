<template>
  <NuxtLayout name="info" className="page-policy" title="Политика конфиденциальности">
    <template #header>
      <UiBreadCrumb :list="[{label: 'Главная', link: '/'}, { label: 'Политика конфиденциальности', link: '' }]" />
    </template>
    <template #content>
      <PrivacyPolicy />
    </template>
  </NuxtLayout>
</template>