<template>
  <NuxtLayout name="info" className="terms-of-use" title="Пользовательское соглашение">
    <template #header>
      <UiBreadCrumb :list="[{label: 'Главная', link: '/'}, { label: 'Пользовательское соглашение', link: '' }]" />
    </template>
    <template #content>
      <TermsOfUse />
    </template>
  </NuxtLayout>
</template>

<script setup>

useHead({
  title: 'Пользовательское соглашение',
  meta: [
    {
      name: 'description',
      content: '',
    },
  ],
});

</script>