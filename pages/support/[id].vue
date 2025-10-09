<template>
  <NuxtLayout name="profile" title="Запрос" class="support-layout">
    <template #header>
      <UiBreadCrumb :list="[{label: 'Главная', link: '/'}, { label: 'Техническая поддержка', link: '/support' }, { label: `Запрос #${ticket.id}`, link: '' }]" />
    </template>
    <template #content>
      <SupportShow :ticket="ticket"/>
    </template>
  </NuxtLayout>
</template>

<script setup>

import { useSupportStore } from "~/store/supportStore";

definePageMeta({
    disableMetrika: false,
});

const supportStore = useSupportStore();

const route = useRoute();
const { data: ticket } = await supportStore.getSupportTicket(route.params.id, {
    is_manager: route.query.is_manager
});

useHead({
  title: ticket.id,
  titleTemplate: 'Запрос #%s',
  meta: [
    {
      name: 'description',
      content: '',
    },
  ],
});

</script>
