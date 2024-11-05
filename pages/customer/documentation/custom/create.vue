<template>
  <NuxtLayout name="profile" title="Файлы организации" class="document-layout">
    <template #header>
      <UiBreadCrumb :list="[{label: 'Главная', link: '/'}, { label: 'Кабинет заказчика', link: '/customer/desktop' },{ label: 'Документы организации', link: '/customer/documentation' }, { label: 'Файлы организации', link: '' }]" />
    </template>
    <template #content>
      <DocumentationCreate />
    </template>
  </NuxtLayout>
</template>

<script setup>



</script>