<template>
  <NuxtLayout name="profile" title="Отзыв о нас" class="reviews-layout">
    <template #header>
      <UiBreadCrumb
        :list="[
          { label: 'Главная', link: '/' },
          { label: 'Кабинет исполнителя', link: '/performer/desktop' },
          { label: 'Отзывы о нас', link: '/performer/reviews' },
          { label: 'Отзыв ', link: '' },
        ]"
      />
    </template>
    <template #content>
      <ReviewsDetails :reviewsState="'reviews'"/>
    </template>
    <template #rightSide>
      <ReviewsMessageCard />
    </template>
  </NuxtLayout>
</template>

<script setup>



</script>
