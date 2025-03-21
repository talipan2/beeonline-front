<template>
  <div class="news">
    <template v-if="isLoaded">
      <div class="news__list" v-if="data.length">
        <div class="news__item" v-for="(news, index) in data" :key="index">
          <NewsCard :data="news"/>
        </div>
      </div>
      <CommonAlerts alert="Новостей нет" :type="'warning'" v-if="!data.length" />
    </template>
  </div>
</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';


const settingStore = useSettingStore();
const isLoaded = ref(false);

const data = ref([]);

onMounted(() => {
  settingStore.getNewsList().then((res) => {
    data.value = res.data
  }).finally(() => {
    isLoaded.value = true
  })
})

</script>

<style lang="scss">

.news {
  font-size: 1.6rem;

  .attachment--preview{
    max-width: 100%;
    text-align: left;
    border: none;
    cursor: pointer;
    margin: 0 0 1em;
  }

  &__list {
    display: flex;
    flex-direction: column;
    row-gap: 1.875em;
  }
}

</style>