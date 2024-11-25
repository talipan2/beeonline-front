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