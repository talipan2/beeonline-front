<template>
  <NuxtLayout >
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>

useHead({
  title: 'Международный цифровой сервис поиска партнеров в сфере легкой промышленности',
  meta: [
    {
      name: 'description',
      content: 'Международный цифровой сервис поиска партнеров для контрактного производства в сфере легкой промышленности, соединяющий фабрики с потенциальными заказчиками',
    },
  ],
});

const route = useRoute()

const saveUtmParams = () => {
  const utmParams = {
    source: route.query.utm_source,
    medium: route.query.utm_medium,
    campaign: route.query.utm_campaign,
    term: route.query.utm_term,
    content: route.query.utm_content
  }

  localStorage.setItem('utm_params', JSON.stringify(utmParams))
}

onMounted(() => {
  saveUtmParams()
})

</script>
