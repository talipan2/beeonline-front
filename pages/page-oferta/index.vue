<template>
  <NuxtLayout name="info" className="page-oferta" title="ОФЕРТА">
    <template #header>
      <UiBreadCrumb :list="[{label: 'Главная', link: '/'}, { label: 'ОФЕРТА', link: '' }]" />
    </template>
    <template #content>
      <Oferta />
    </template>
  </NuxtLayout>
</template>