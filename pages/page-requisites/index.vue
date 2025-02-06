<template>
  <NuxtLayout name="info" className="page-requisites" title="Реквизиты">
    <template #header>
      <UiBreadCrumb :list="[{label: 'Главная', link: '/'}, { label: 'Реквизиты', link: '' }]" />
    </template>
    <template #content>
      <Requisites />
    </template>
  </NuxtLayout>
</template>

<script setup>

useHead({
  title: 'Реквизиты',
  meta: [
    {
      name: 'description',
      content: 'Реквизиты',
    },
  ],
});

</script>
