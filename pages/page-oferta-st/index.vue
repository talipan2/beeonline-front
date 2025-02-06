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