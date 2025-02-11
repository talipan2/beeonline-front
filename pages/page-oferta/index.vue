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

<script setup>

useHead({
  title: 'ОФЕРТА О заключении договора оказания услуг   По предоставлению доступа к цифровому сервису поиска партнеров',
  meta: [
    {
      name: 'description',
      content: 'ОФЕРТА О заключении договора оказания услуг   По предоставлению доступа к цифровому сервису поиска партнеров',
    },
  ],
});

</script>