<script setup>
import { useSettingStore } from '~/store/settingStore';


const settingStore = useSettingStore();

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

</script>

<template>
  <div class="body telegram-body">
    <TelegramBotHeader />
    <main class="telegram-main container">
      <ClientOnly>
        <slot />
      </ClientOnly>
    </main>
  </div>
</template>



<style lang="scss">

.telegram-main {
  background-color: #fff;
  font-family: "lato", sans-serif;
  font-size: 1rem;
  padding: 1em;

  .breadcrumb-wrapper {
    display: none;
  }
}

.telegram-body {
  max-width: 767px;
}

</style>