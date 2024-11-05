<template>
  <NuxtLayout name="profile" title="Проверки контрагентов" class="org-check-layout">
    <template #header>
      <UiBreadCrumb :list="[{label: 'Главная', link: '/'}, { label: 'Кабинет исполнителя', link: '/performer/desktop' }, { label: 'Проверки контрагентов', link: '' }]" />
    </template>
    <template #content>
      <OrgCheck />
    </template>
  </NuxtLayout>
</template>