<template>
  <NuxtLayout name="profile" title="Премия Bee-online" class="bonus-layout">
    <template #header>
      <UiBreadCrumb :list="[{label: 'Главная', link: '/'},{ label: 'Кабинет', link: `/${role}/desktop`}, { label: 'Сообщения', link: '' }]" />
    </template>
    <template #content>
      <Bonus />
    </template>
  </NuxtLayout>
</template>

<script setup>
import { useUserStore } from '~/store/userStore';

useHead({
  title: 'Премия Bee-online',
  meta: [
    {
      name: 'description',
      content: '',
    },
  ],
});

const userStore = useUserStore();

const role = computed(() => userStore.role);

</script>