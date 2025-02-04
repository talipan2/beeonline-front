<template>
  <div class="orders">
    <CatalogBanner :data="orderData">
      <template #item="{ item }">
        <CatalogOrdersCard :data="item" />
      </template>
    </CatalogBanner>
    <p class="orders__description">Вы можете создать и разместить заказ через бота быстрых заказов.</p>
    <div class="orders__list">
      <div class="orders__item" v-for="(data, index) in orderData" :key="index" v-bind="setFirstCardRef(index)">
        <CatalogOrdersCard  :data="data" />
      </div>
    </div>
    <!-- <CommonPagination /> -->
  </div>
</template>

<script setup>
import { useEntityStore } from '~/store/entityStore';
import { useLocationStore } from '~/store/locationStore';


const props = defineProps({
  data: {
    type: Array,
    default: () => ([]),
  },
  isPagination: {
    type: Boolean,
    default: true,
  }
})

const entityStore = useEntityStore();
const locationStore = useLocationStore();
const firstCardRef = ref(null);
const emit = defineEmits(['updateOrderCardRef']);

const orderData = computed(() => {
  return props.data.map(item => {
    return {
      id: item.id,
      name: item.name,
      logo: item.gallery && item.gallery.length ? item.gallery[0].url : '',
      countryId: formatLocationsList(item.regions, item.cities, true),
      data: [
        { id: 1, name: 'Категории', value: item.product_categories && item.product_categories.length ? item.product_categories.map(item => item.name) : [] },
        { id: 2, name: 'Место производства', value: formatLocationsList(item.regions, item.cities) },
        { id: 3, name: 'Партия', value: Number(item.batch) },
        { id: 4, name: 'Лекала', value: entityStore.getEntityLabelById('patterns', item.pattern) },
        { id: 5, name: 'Сырье', value: entityStore.getEntityLabelById('rawMaterials', item.material) },
        { id: 6, name: 'Срок выполнения', value: formatDate(item.deadline_at) },
        { id: 7, name: 'Описание', value: item.description },
      ],
    };
  });
});

const formatLocationsList = (regions = [], cities = [], citiesId = false) => {
  if(!regions.length && !cities.length) return [];
  const citiesIds = cities.map(item => item.id);
  const regionsIds = regions.map(item => item.id);
  const locations = locationStore.getLocationsByIds([], regionsIds, citiesIds);
  if (citiesId) {
    return locations[0] && locations[0].countryId ? locations[0].countryId : null; 
  } else {
    return locations.map(item => item.name);
  }
}

const setFirstCardRef = (index) => {
  return index === 0 ? { ref: firstCardRef } : {};
};

watch(() => firstCardRef.value, (newVal) => {
  emit('updateOrderCardRef', firstCardRef.value[0]);
}, {deep: true})

</script>

<style lang="scss">

.orders {
  font-size: 1rem;

  &__description {
    font-size: 1.6em;
    margin-bottom: 1.5em;
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: 3rem;
    justify-content: space-between;
  }

  &__item {
    flex: 0 1 48%;
    display: flex;
  }
}

@include tablet {
  .orders {
    &__list {
      gap: 2rem;
    }
  }
}

@include mobile {
  .orders {
    &__item {
      flex: 0 1 100%;
    }
  }
}

</style>