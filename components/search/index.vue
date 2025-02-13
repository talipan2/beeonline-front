<template>
  <div class="search__container" :class="{'loading' : loading}">
    <h1 class="search__title">Результаты поиска</h1>
    <UiInput class="search__input" v-model="searchQuery" type="text" name="search" placeholder="Поиск">
      <UiButton type="button" class="search__btn" variant="default" size="around" @click="handleSearch(searchQuery)">
        <SvgoSearchIcon class="search__btn-icon svg-m"/>
      </UiButton>
    </UiInput>
    <CommonSelectorListButtons v-if="isSearch" :buttons-list="selectorButtons" @update-active-button="handleListChange"/>
    <div class="search__list" v-if="isSearch">
      <template v-if="currentEntityType === 'orders'">
        <template v-if="searchResultOrderList.length">
          <CatalogOrdersList  :data="searchResultOrderList" :isPagination="false"/>
          <CommonPagination 
            v-if="searchResultOrderPage.lastPage > 1" 
            :current-page="searchResultOrderPage.currentPage" 
            :total-pages="searchResultOrderPage.lastPage" 
            @changePage="handleChangePage" 
            :loading="loading"
          />
        </template>
        <template v-else>
          <CommonAlerts type="warning" alert="Подходящих заказов не найдено"/>
        </template>
      </template>
      <template v-if="currentEntityType === 'services'">
        <template v-if="searchResultServiceList.length">
          <CatalogServiceList  :data="searchResultServiceList" :isPagination="false" />
          <CommonPagination 
            v-if="searchResultServicePage.lastPage > 1" 
            :current-page="searchResultServicePage.currentPage" 
            :total-pages="searchResultServicePage.lastPage" 
            @changePage="handleChangePage" 
            :loading="loading"
          />
        </template>
        <template v-else>
          <CommonAlerts type="warning" alert="Подходящих услуг не найдено"/>
        </template>
      </template>
      <template v-if="currentEntityType === 'members'">
        <template v-if="searchResultMemberList.length">
          <CatalogMembersListDefault  :data="searchResultMemberList" />
          <CommonPagination 
            v-if="searchResultMemberPage.lastPage > 1" 
            :current-page="searchResultMemberPage.currentPage" 
            :total-pages="searchResultMemberPage.lastPage" 
            @changePage="handleChangePage" 
            :loading="loading"
          />
        </template>
        <template v-else>
          <CommonAlerts type="warning" alert="Подходящих участников не найдено"/>
        </template>
      </template>
    </div>
  </div>
</template>

<script setup>
import { useEntityStore } from '~/store/entityStore';

const currentEntityType = ref('orders');

const entityStore = useEntityStore();

const searchQuery = ref('');
const isSearch = ref(false);
const loading = ref(false);

const selectorButtons = [
  { id: 1, label: 'Заказы', value: 'orders', count: computed(() => searchResultOrderPage.value.total) },
  { id: 2, label: 'Услуги', value: 'services', count: computed(() => searchResultServicePage.value.total) },
  { id: 3, label: 'Участники портала', value: 'members', count: computed(() => searchResultMemberPage.value.total) },
];

function handleListChange(value) {
  currentEntityType.value = value;
}

const searchResultOrderList = ref([]);
const searchResultServiceList = ref([]);
const searchResultMemberList = ref([]);

const searchResultOrderPage = ref({
  currentPage: 1,
  lastPage: 0,
  total: 0,
  itemsToPage: 0,
})

const searchResultServicePage = ref({
  currentPage: 1,
  lastPage: 0,
  total: 0,
  itemsToPage: 0,
})

const searchResultMemberPage = ref({
  currentPage: 1,
  lastPage: 0,
  total: 0,
  itemsToPage: 0,
})

const handleSearch = (searchQuery, page) => {
  loading.value = true;
  entityStore.search({query: searchQuery, page}).then(res => {
    if(res && res.orders && res.orders.data) {
      searchResultOrderList.value = res.orders.data;
      searchResultOrderPage.value = {
        currentPage: res.orders.current_page,
        lastPage: res.orders.last_page,
        total: res.orders.total,
        itemsToPage: res.orders.per_page
      }
    }
    if(res && res.services && res.services.data) {
      searchResultServiceList.value = res.services.data;
      searchResultServicePage.value = {
        currentPage: res.services.current_page,
        lastPage: res.services.last_page,
        total: res.services.total,
        itemsToPage: res.services.per_page
      }
    }
    if(res && res.pub_cards && res.pub_cards.data) {
      searchResultMemberList.value = res.pub_cards.data;
      searchResultMemberPage.value = {
        currentPage: res.pub_cards.current_page,
        lastPage: res.pub_cards.last_page,
        total: res.pub_cards.total,
        itemsToPage: res.pub_cards.per_page
      }
    }

    isSearch.value = true;
  }).finally(() => {
    loading.value = false;
  })
}


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
}

</style>