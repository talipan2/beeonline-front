<template>
  <NuxtLayout name="profile" title="Файлы организации" class="document-layout">
    <template #header>
      <UiBreadCrumb :list="[{label: 'Главная', link: '/'}, { label: 'Кабинет исполнителя', link: '/performer/desktop' },{ label: 'Документы организации', link: '/performer/documentation' }, { label: 'Файлы организации', link: '' }]" />
    </template>
    <template #content>
      <DocumentationCreate />
    </template>
  </NuxtLayout>
</template>

<script setup>

useHead({
  title: 'Файлы организации',
  meta: [
    {
      name: 'description',
      content: '',
    },
  ],
});

</script>