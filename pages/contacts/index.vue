<template>
  <NuxtLayout name="info" className="contacts" title="Контакты">
    <template #header>
      <UiBreadCrumb :list="[{label: 'Главная', link: '/'}, { label: 'Контакты', link: '' }]" />
    </template>
    <template #content>
      <Contacts />
    </template>
  </NuxtLayout>
</template>

<script setup>
useHead({
  title: 'Контакты',
  meta: [
    {
      name: 'description',
      content: 'Контакты',
    },
  ],
});
</script>