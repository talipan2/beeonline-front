<template>
  <div class="search__container" :class="{'loading' : loading}">
    <h1 class="search__title">Результаты поиска</h1>
    <UiInput class="search__input" v-model="searchQuery" type="text" name="search" placeholder="Поиск" @input="(event) => debouncedSearch(event.target.value)">
      <UiButton type="button" class="search__btn" variant="default" size="around" @click="handleSearch(searchQuery)" :class="{'search__btn-loading' : loading}">
        <SvgoSearchIcon class="search__btn-icon svg-m"/>
      </UiButton>
    </UiInput>
    <CommonSelectorListButtons v-if="isSearch" :buttons-list="selectorButtons" @update-active-button="handleListChange" :activeBtn="currentEntityType"/>
    <div class="search__list" v-if="isSearch">
      <template v-if="currentEntityType === 'orders'">
        <template v-if="searchResultOrderList.length">
          <CatalogOrdersList :data="searchResultOrderList" :isPagination="false"/>
        </template>
        <template v-else>
          <CommonAlerts type="warning" alert="Подходящих заказов не найдено"/>
        </template>
      </template>
      <template v-if="currentEntityType === 'services'">
        <template v-if="searchResultServiceList.length">
          <CatalogMembersListDefault :data="searchResultServiceList" :isPagination="false" />
        </template>
        <template v-else>
          <CommonAlerts type="warning" alert="Подходящих услуг не найдено"/>
        </template>
      </template>
      <template v-if="currentEntityType === 'members'">
        <template v-if="searchResultMemberList.length">
          <CatalogMembersListDefault :data="searchResultMemberList" />
        </template>
        <template v-else>
          <CommonAlerts type="warning" alert="Подходящих участников не найдено"/>
        </template>
      </template>
      <CommonPagination
        v-if="searchResultPage?.last_page > 1"
        :current-page="searchResultPage.current_page"
        :total-pages="searchResultPage.last_page"
        @changePage="handleChangePage"
        :loading="loading"
        />
    </div>
  </div>
</template>

<script setup>
import { useEntityStore } from '~/store/entityStore';

const entityStore = useEntityStore();

const route = useRoute();
const router = useRouter();

const currentEntityType = ref('orders');

onMounted(() => {
  if(route.query.type) {
    const index = selectorButtons.findIndex(item => item.value === route.query.type);
    if(index !== -1) {
      currentEntityType.value = route.query.type;
    }
  }
  if(route.query.q) {
    searchQuery.value = route.query.q;
    handleSearch(route.query.q, route.query.page || 1);
  }
})

const searchQuery = ref('');
const isSearch = ref(false);
const loading = ref(false);

const selectorButtons = [
  { id: 1, label: 'Заказы', value: 'orders', count: computed(() => searchResultTotal.value.orders) },
  { id: 2, label: 'Услуги', value: 'services', count: computed(() => searchResultTotal.value.services) },
  { id: 3, label: 'Участники портала', value: 'members', count: computed(() => searchResultTotal.value.members) },
];

function handleListChange(value) {
  currentEntityType.value = value;
}

const searchResultOrderList = ref([]);
const searchResultServiceList = ref([]);
const searchResultMemberList = ref([]);

const searchResultPage = ref({});
const searchResultTotal = ref({});

const handleSearch = (searchQuery, page) => {
  if(loading.value) return;
  console.log(searchQuery);
  if(!searchQuery) {
    isSearch.value = false;
    router.push({ query: {
        ...route.query,
        type: undefined,
        q: undefined,
        page: undefined,
    } });
    return;
  }
  loading.value = true;
  const type = currentEntityType.value;
  entityStore.search({query: searchQuery, type: type, page}).then(res => {
    if(res.type === 'orders') {
      searchResultOrderList.value = res.data;
    }
    if(res.type === 'services') {
      searchResultServiceList.value = res.data.map(item => {
        return {
          ...item,
          category: item?.categories?.map(item => item?.name),
          rawMaterials: [item.materials_own ? 'Исполнителя' : '', item.materials_tolling ? 'Заказчика' : ''].filter(Boolean),
          countryId: {cities: item?.cities, regions: item?.regions, countries: item?.countries},
          illRating: item.fill_rating,
          reviewCount: item.reviews_about_count,
          stars: item.reviews_stats_about?.stars,
          rating: item.reviews_about_count,
          entityCount: item?.services_count,
        }
      })
    }
    if(res.type === 'members') {
      searchResultMemberList.value = res.data.map(item => {
        return {
          ...item,
          category: item?.categories?.map(item => item?.name),
          rawMaterials: [item.materials_own ? 'Исполнителя' : '', item.materials_tolling ? 'Заказчика' : ''].filter(Boolean),
          countryId: {cities: item?.cities, regions: item?.regions, countries: item?.countries},
          illRating: item.fill_rating,
          reviewCount: item.reviews_about_count,
          stars: item.reviews_stats_about?.stars,
          rating: item.reviews_about_count,
          entityCount: item.type === 'performer' ? item.services_count : item.orders_count,
        }
      })
    }
    searchResultPage.value = res.meta;
    searchResultTotal.value = res.total;

    isSearch.value = true;

    router.push({ query: {
        ...route.query,
        type: res.type,
        q: searchQuery,
        page: res.meta.current_page > 1 ? res.meta.current_page : undefined,
    } });
  }).finally(() => {
    loading.value = false;
  })
}

const debouncedSearch = useDebounce(handleSearch, 500);

const handleChangePage = (page) => {
  if(!page) return
  handleSearch(searchQuery.value, page)
}

watch(() => currentEntityType.value, (newVal) => {
  handleSearch(searchQuery.value)
}, {deep: true})

</script>

<style lang="scss">

.search {
  &__container {
    max-width: 70%;
    margin-inline: auto;
    margin-bottom: 10rem;

    @include mobile {
      max-width: 100%;
    }
  }

  &__title {
    margin-bottom: 1em;
  }

  &__btn-icon {
    path {
      fill: #94a3b8;
    }
  }

  &__input {
    position: relative;
    font-size: 1.6rem;
    padding: 1em;
    margin-bottom: 1em;
  }

  &__btn {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  }

  &__btn-loading {
    
    .search__btn-icon {
      animation: searchPulse 1.5s ease-in-out infinite;
      
    }
  }

  @keyframes searchPulse {
    0%, 100% {
      transform: scale(1) rotate(0deg);
      opacity: 1;
    }
    25% {
      transform: scale(1.1) rotate(-5deg);
      opacity: 0.8;
    }
    50% {
      transform: scale(0.95) rotate(5deg);
      opacity: 0.9;
    }
    75% {
      transform: scale(1.05) rotate(-3deg);
      opacity: 0.8;
    }
  }
}

</style>
