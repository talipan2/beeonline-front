<template>
  <NuxtLayout name="info" className="page-oferta" title="Оферта">
    <template #header>
      <UiBreadCrumb :list="[{label: 'Главная', link: '/'}, { label: 'Оферта', link: '' }]" />
    </template>
    <template #content>
      <OfertaCt />
    </template>
  </NuxtLayout>
</template>