<template>
  <NuxtLayout name="info" className="terms-of-use" title="Оферта">
    <template #header>
      <UiBreadCrumb :list="[{label: 'Главная', link: '/'}, { label: 'Оферта', link: '' }]" />
    </template>
    <template #content>
      <OfertaSt />
    </template>
  </NuxtLayout>
</template>