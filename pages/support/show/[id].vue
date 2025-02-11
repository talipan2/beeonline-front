<template>
  <NuxtLayout name="profile" title="Запрос" class="support-layout">
    <template #header>
      <UiBreadCrumb :list="[{label: 'Главная', link: '/'}, { label: 'Техническая поддержка', link: '/support' }, { label: 'Данные запроса', link: '' }]" />
    </template>
    <template #content>
      <SupportShow />
    </template>
  </NuxtLayout>
</template>

<script setup>

const router = useRouter();

const currentIdTicket = ref(router.currentRoute.value.params.id);

useHead({
  title: currentIdTicket,
  titleTemplate: 'Запрос #%s',
  meta: [
    {
      name: 'description',
      content: '',
    },
  ],
});

</script>