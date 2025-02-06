<template>
  <NuxtLayout name="info" className="search" title="">
    <template #header>
      <UiBreadCrumb :list="[{label: 'Главная', link: '/'}, { label: 'Результаты поиска', link: '' }]" />
    </template>
    <template #content>
      <Search />
    </template>
  </NuxtLayout>
</template>

<script setup>

useHead({
  title: 'Результаты поиска',
  meta: [
    {
      name: 'description',
      content: '',
    },
  ],
})

</script>

<style lang="scss">

</style>