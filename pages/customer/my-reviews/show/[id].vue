<template>
  <NuxtLayout name="profile" title="Отзыв" class="reviews-layout">
    <template #header>
      <UiBreadCrumb
        :list="[
          { label: 'Главная', link: '/' },
          { label: 'Кабинет заказчика', link: '/customer/desktop' },
          { label: 'Мои отзывы', link: '/customer/my-reviews' },
          { label: 'Отзыв', link: '' },
        ]"
      />
    </template>
    <template #content>
      <ReviewsDetails reviewsState="my-reviews"/>
    </template>
    <template #rightSide>
      <ReviewsMessageCard />
    </template>
  </NuxtLayout>
</template>

<script setup>



</script>
