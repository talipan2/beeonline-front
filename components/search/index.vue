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
        </template>
        <template v-else>
          <CommonAlerts type="warning" alert="Подходящих заказов не найдено"/>
        </template>
      </template>
      <template v-if="currentEntityType === 'services'">
        <template v-if="searchResultServiceList.length">
          <CatalogServiceList  :data="searchResultServiceList" :isPagination="false" />
        </template>
        <template v-else>
          <CommonAlerts type="warning" alert="Подходящих услуг не найдено"/>
        </template>
      </template>
      <template v-if="currentEntityType === 'members'">
        <template v-if="searchResultMemberList.length">
          <CatalogMembersListDefault  :data="searchResultMemberList" />
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
  { id: 1, label: 'Заказы', value: 'orders', count: computed(() => searchResultOrderList.value.length) },
  { id: 2, label: 'Услуги', value: 'services', count: computed(() => searchResultServiceList.value.length) },
  { id: 3, label: 'Участники портала', value: 'members', count: computed(() => searchResultMemberList.value.length) },
];

function handleListChange(value) {
  currentEntityType.value = value;
}

const searchResultOrderList = ref([]);
const searchResultServiceList = ref([]);
const searchResultMemberList = ref([]);

const handleSearch = (searchQuery) => {
  loading.value = true;
  entityStore.search({query: searchQuery}).then(res => {
    if(res && res.orders && res.orders.data) {
      searchResultOrderList.value = res.orders.data;
    }
    if(res && res.services && res.services.data) {
      searchResultServiceList.value = res.services.data;
    }
    if(res && res.pub_cards && res.pub_cards.data) {
      searchResultMemberList.value = res.pub_cards.data;
    }

    isSearch.value = true;
  }).finally(() => {
    loading.value = false;
  })
}

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