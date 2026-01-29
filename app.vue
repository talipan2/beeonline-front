<template>
  <NuxtLayout :name="layout">
    <NuxtPage />
		<CookieBanner />
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
    },
    {
      innerHTML: `(function(){(function c(d,w,m,i) {
        window.supportAPIMethod = m;
        var s = d.createElement('script');
        s.id = 'supportScript';
        s.async = true;
        var id = '343e36168aed79892af1c06bf605f378';
        s.src = (!i ? 'https://lcab.talk-me.ru/support/support.js' : 'https://static.site-chat.me/support/support.int.js') + '?h=' + id;
        s.onerror = i ? undefined : function(){c(d,w,m,true)};
        w[m] = w[m] ? w[m] : function(){(w[m].q = w[m].q ? w[m].q : []).push(arguments);};
        (d.head ? d.head : d.body).appendChild(s);
      })(document,window,'TalkMe')})();`
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
