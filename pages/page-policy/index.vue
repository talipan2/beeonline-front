<template>
  <NuxtLayout name="info" className="page-policy" title="Политика обработки персональных данных">
    <template #header>
      <UiBreadCrumb :list="[{label: 'Главная', link: '/'}, { label: 'Политика конфиденциальности', link: '' }]" />
    </template>
    <template #content>
      <PrivacyPolicy />
    </template>
  </NuxtLayout>
</template>

<script setup>

useHead({
  title: 'Политика конфиденциальности',
  meta: [
    {
      name: 'description',
      content: 'Политика конфиденциальности',
    },
  ],
});

</script>