<template>
  <NuxtLayout :name="layout">
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';

const settingStore = useSettingStore();
useHead({
  title: 'Международный цифровой сервис поиска партнеров в сфере модной индустрии',
  meta: [
    {
      name: 'description',
      content: 'Международный цифровой сервис поиска партнеров для контрактного производства в сфере модной индустрии, соединяющий фабрики с потенциальными заказчиками',
    },
  ],
  script: [
    {
      src: 'https://telegram.org/js/telegram-web-app.js',
      defer: true,
      onload: () => {
        if(window.Telegram.WebApp?.initData) {
          settingStore.isTelegram = true
        }  else {
          settingStore.isTelegram = false
        }
      }
    }
  ]
});

const layout = computed(() => {
  return settingStore.isTelegram ? 'telegram' : 'default'
})

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
