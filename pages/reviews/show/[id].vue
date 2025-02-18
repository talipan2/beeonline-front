<template>
  <NuxtLayout name="profile" title="Отзыв о нас" class="reviews-layout">
    <template #header>
      <UiBreadCrumb
        :list="[
          { label: 'Главная', link: '/' },
          { label: `Кабинет ${roleName}`, link: '/desktop' },
          { label: 'Отзывы о нас', link: '/reviews' },
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
import { useUserStore } from '~/store/userStore';


const userStore = useUserStore();

const roleName = userStore.getRoleNameForBreadcrumbs;

</script>

<style lang="scss">


</style>
