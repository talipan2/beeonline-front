<template>
  <NuxtLayout name="profile" title="Проверки контрагентов" class="org-check-layout">
    <template #header>
      <UiBreadCrumb :list="[{label: 'Главная', link: '/'}, { label: 'Кабинет заказчика', link: '/customer/desktop' }, { label: 'Проверки контрагентов', link: '' }]" />
    </template>
    <template #content>
      <OrgCheck />
    </template>
  </NuxtLayout>
</template>

<script setup>

useHead({
  title: 'Проверки контрагентов',
  meta: [
    {
      name: 'description',
      content: '',
    },
  ],
});

</script>