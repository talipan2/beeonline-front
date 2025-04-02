<template>
  <div class="news">
    <template v-if="isLoaded">
      <div class="news__list" v-if="data.length" :class="{'loading' : loading}">
        <div class="news__item" v-for="(news, index) in data" :key="index">
          <NewsCard :data="news"/>
        </div>
      </div>
      <CommonAlerts alert="Новостей нет" :type="'warning'" v-if="!data.length" />
      <CommonPagination v-if="newsPage.lastPage > 1" class="news__pagination" :current-page="newsPage.currentPage" :total-pages="newsPage.lastPage" @change-page="handlePageChange" />
    </template>
  </div>
</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';


const settingStore = useSettingStore();
const isLoaded = ref(false);
const loading = ref(false);
const router = useRouter();
const data = ref([]);

const newsPage = ref({
  currentPage: 1,
  lastPage: 1
})

const handlePageChange = (page) => {
  if (loading.value) return
  loading.value = true
  settingStore.getNewsList({page}).then((res) => {
    data.value = res.data
    newsPage.value = {
      currentPage: res.current_page,
      lastPage: res.last_page
    }
    smoothScroll(0, false);
    router.replace({ query: { page: res.current_page } });
  }).finally(() => {
    loading.value = false
  })
}

onMounted(() => {
  loading.value = true
  if(router.currentRoute.value.query.page) {
    newsPage.value.currentPage = Number(router.currentRoute.value.query.page);
  }
  settingStore.getNewsList({page: newsPage.value.currentPage}).then((res) => {
    data.value = res.data
    newsPage.value = {
      currentPage: res.current_page,
      lastPage: res.last_page
    }
  }).finally(() => {
    isLoaded.value = true
    loading.value = false
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