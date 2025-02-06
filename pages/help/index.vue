<template>
  <NuxtLayout name="info" className="page-oferta" title="Помощь">
    <template #header>
      <UiBreadCrumb :list="[{label: 'Главная', link: '/'}, { label: 'Помощь', link: '' }]" />
    </template>
    <template #content>
      <Help />
    </template>
  </NuxtLayout>
</template>

<script setup>

useHead({
  title: 'Помощь',
  meta: [
    {
      name: 'description',
      content: 'Помощь',
    },
  ],
});

</script>