<template>
  <div class="news-details">
    <h3 class="news-details__title">{{ data.name }}</h3>
    <p class="news-details__date">{{ formatDate(data.created_at, 'DD.MM.YYYY') }}</p>
    <div class="news-body" v-html="data.detail_text"></div>
    <UiButton type="button" @click="goBack" variant="quinary" size="large" class="news-details__btn">К списку новостей</UiButton>
  </div>
</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';

const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
});
const settingStore = useSettingStore();
const router = useRouter();

const goBack = () => {
  if(history.state.back != null && history.state.back.includes('news')) {
    router.back();
  } else {
    router.push('/news');
  }
}

// onMounted(() => {
//   settingStore.getNews(router.currentRoute.value.params.id).then((res) => {
//     data.value = res
//   })
// })

</script>

<style lang="scss">

.news-details {
  font-size: 1.6rem;

  &__title {
    font-size: 1.75em;
    margin-bottom: .92em;
  }

  .attachment--preview{
    max-width: 100%;
    text-align: left;
    border: none;
    cursor: pointer;
    margin: 0 0 1em;
  }

  &__date {
    font-size: .8em;
    margin-bottom: 2.3em;
  }

  &__btn {
    font-size: .75em;
    // max-width: 20%;
    margin-top: 3em;
    text-transform: uppercase;
  }
}

.news-body {
    a {
        display: inline;
        color: var(--primary-color);

        &:hover {
            text-decoration: underline;
        }
    }
}

</style>
