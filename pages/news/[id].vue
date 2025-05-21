<template>
  <NuxtLayout name="info" title="Новости" class="news-layout">
    <template #header>
      <UiBreadCrumb :list="[{label: 'Главная', link: '/'}, { label: 'Новости', link: '/news' }, { label: data.name, link: '' }]" />
    </template>
    <template #content>
      <NewsDetails :data="data"/>
    </template>
  </NuxtLayout>
</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';


const settingStore = useSettingStore();
const data = ref({});
const router = useRouter();

await settingStore.getNews(router.currentRoute.value.params.id).then((res) => {
  data.value = res
})

useHead({
  title: 'Новости',
  meta: [
    {
      name: 'description',
      content: '',
    },
  ],
});

</script>