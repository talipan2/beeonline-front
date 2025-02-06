<template>
  <NuxtLayout name="profile" title="Избранное" class="favorites-layout">
    <template #header>
      <UiBreadCrumb :list="[{label: 'Главная', link: '/'}, { label: 'Кабинет исполнителя', link: '/performer/desktop' }, { label: 'Избранное', link: '' }]" />
    </template>
    <template #content>
      <Favorites />
    </template>
  </NuxtLayout>
</template>

<script setup>

useHead({
  title: 'Избранное',
  meta: [
    {
      name: 'description',
      content: '',
    },
  ],
});

</script>