<template>
  <NuxtLayout name="profile" title="Баланс и платные услуги" class="tariffs-layout">
    <template #header>
      <UiBreadCrumb :list="[{label: 'Главная', link: '/'}, { label: 'Баланс и платные услуги', link: '' }]" />
    </template>
    <template #content>
      <Tariffs />
    </template>
  </NuxtLayout>
</template>

<script setup>

useHead({
  title: 'Баланс и платные услуги',
  meta: [
    {
      name: 'description',
      content: '',
    },
  ],
});

definePageMeta({
    disableMetrika: true,
});

</script>
