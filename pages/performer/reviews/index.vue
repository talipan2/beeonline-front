<template>
  <NuxtLayout name="profile" title="Отзывы о нас" class="reviews-layout">
    <template #header>
      <UiBreadCrumb :list="[{label: 'Главная', link: '/'}, { label: 'Кабинет исполнителя', link: '/performer/desktop' }, { label: 'Отзывы о нас', link: '' }]" />
    </template>
    <template #content>
      <Reviews reviewsState="reviews"/>
    </template>
  </NuxtLayout>
</template>

<script setup>

</script>