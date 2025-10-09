<template>
  <NuxtLayout name="profile" title="Файлы организации" class="document-layout">
    <template #header>
      <UiBreadCrumb :list="[
        {label: 'Главная', link: '/'},
        { label: `Кабинет ${translateRole}`, link: '/desktop' },
        { label: 'Документы организации', link: '/documentation' },
        { label: 'Файлы организации', link: '' }
      ]" />
    </template>
    <template #content>
      <DocumentationCreate />
    </template>
  </NuxtLayout>
</template>

<script setup>
import { useUserStore } from '~/store/userStore';


useHead({
  title: 'Файлы организации',
  meta: [
    {
      name: 'description',
      content: '',
    },
  ],
});

definePageMeta({
    disableMetrika: false,
});

const userStore = useUserStore();

const role = computed(() => userStore.role);

const translateRole = computed(() => {
  if (role.value === 'customer') {
    return 'заказчика'
  } else if (role.value === 'performer') {
    return 'производителя'
  }
})

</script>
