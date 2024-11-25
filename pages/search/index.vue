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

<style lang="scss">


</style>