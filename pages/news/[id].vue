<template>
  <NuxtLayout name="info" title="Новости" class="news-layout">
    <template #header>
      <UiBreadCrumb :list="[{label: 'Главная', link: '/'}, { label: 'Новости', link: '/news' }, { label: 'Агентство креативных индустрий (АКИ) ', link: '' }]" />
    </template>
    <template #content>
      <NewsDetails />
    </template>
  </NuxtLayout>
</template>

<script setup>

useHead({
  title: 'Новости',
  meta: [
    {
      name: 'description',
      content: '',
    },
  ],
});

</script>