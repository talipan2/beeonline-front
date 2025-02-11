<template>
  <NuxtLayout name="profile" title="Мои отзывы" class="reviews-layout">
    <template #header>
      <UiBreadCrumb :list="[{label: 'Главная', link: '/'}, { label: 'Кабинет заказчика', link: '/customer/desktop' }, { label: 'Мои отзывы', link: '' }]" />
    </template>
    <template #content>
      <Reviews reviewsState="my-reviews" />
    </template>
  </NuxtLayout>
</template>

<script setup>

useHead({
  title: 'Мои отзывы',
  meta: [
    {
      name: 'description',
      content: '',
    },
  ],
});

</script>