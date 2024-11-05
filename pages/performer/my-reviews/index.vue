<template>
  <NuxtLayout name="profile" title="Мои отзывы" class="reviews-layout">
    <template #header>
      <UiBreadCrumb :list="[{label: 'Главная', link: '/'}, { label: 'Кабинет исполнителя', link: '/performer/desktop' }, { label: 'Мои отзывы', link: '' }]" />
    </template>
    <template #content>
      <Reviews reviewsState="my-reviews" />
    </template>
  </NuxtLayout>
</template>

<script setup>

</script>