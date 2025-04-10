<template>
    <NuxtLayout name="telegram" >
      <TelegramBotAuthWithoutPassword v-if="currentAuthPage === 'without-password'"/>
      <TelegramBotAuth v-else />
    </NuxtLayout>
</template>

<script setup>

definePageMeta({
  layout: '',
});

useHead({
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
})


const router = useRouter();

const currentAuthPage = ref('')

watch(() => router.currentRoute.value.query, (newVal) => {
  if(newVal && newVal.type) {
    currentAuthPage.value = newVal.type
  } else {
    currentAuthPage.value = ''
  }
}, {deep: true, immediate: true})
</script>
