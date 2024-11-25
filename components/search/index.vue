<template>
  <div class="search__container">
    <h1 class="search__title">Результаты поиска</h1>
    <UiInput class="search__input">
      <UiButton class="search__btn" variant="default" size="around">
        <SvgoSearchIcon class="search__btn-icon svg-m"/>
      </UiButton>
    </UiInput>
    <CommonSelectorListButtons :buttons-list="selectorButtons" @update-active-button="handleListChange"/>
    <div class="search__list">
      <CatalogOrdersList v-if="currentEntityType === 'orders'" :data="searchResultOrderList" :isPagination="false"/>
      <CatalogServiceList v-if="currentEntityType === 'services'" :data="searchResultServiceList" :isPagination="false" />
      <CatalogMembersListDefault v-if="currentEntityType === 'members'" :data="searchResultMemberList" />
    </div>
  </div>
</template>

<script setup>
import { useEntityStore } from '~/store/entityStore';
import { useOrganizationStore } from '~/store/organizationStore';


const currentEntityType = ref('orders');

const entityStore = useEntityStore();
const organizationStore = useOrganizationStore();

const selectorButtons = [
  { id: 1, label: 'Заказы', value: 'orders', count: computed(() => entityStore.ordersList.length) },
  { id: 2, label: 'Услуги', value: 'services', count: computed(() => entityStore.servicesList.length) },
  { id: 3, label: 'Участники портала', value: 'members', count: computed(() => organizationStore.pubCardsList.length) },
];

function handleListChange(value) {
  currentEntityType.value = value;
}

const searchResultOrderList = computed(() => entityStore.ordersList);
const searchResultServiceList = computed(() => entityStore.servicesList);
const searchResultMemberList = ref(computed(() => organizationStore.pubCardsList));

onMounted(() => {
  entityStore.getServices();
  entityStore.getOrders();
  organizationStore.getPubCardsList();
});

</script>

<style lang="scss">

.search {
  &__container {
    max-width: 70%;
    margin-inline: auto;
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