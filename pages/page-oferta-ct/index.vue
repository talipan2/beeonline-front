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

<script setup>

useHead({
  title: 'Оферта о заключении Договора об использовании онлайн сервиса «Безопасная Сделка»',
  meta: [
    {
      name: 'description',
      content: '',
    },
  ],
});

</script>