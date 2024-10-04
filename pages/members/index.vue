<template>
  <NuxtLayout name="catalog" title="Участники портала">
    <template #header>
      <UiBreadCrumb
        :list="[{ label: 'Главная', link: '/' }, { label: 'Каталог заказов', link: '' }]" />
    </template>
    <template #leftSide>
      <CatalogMembersFilter />
    </template>
    <template #content>
      <CatalogMembersList />
    </template>
  </NuxtLayout>
</template>