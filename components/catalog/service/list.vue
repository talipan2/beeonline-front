<template>
  <div class="services">
    <!-- <CatalogBanner :data="ordersData" v-if="banner">
      <template #item="{ item }">
        <CatalogServiceCard :data="item" />
      </template>
    </CatalogBanner> -->
      <div class="services__list" v-if="ordersData.length > 0">
          <div class="services__item" v-for="(data, index) in ordersData" :key="index" v-bind="setFirstCardRef(index)">
            <CatalogServiceCard :data="data" />
          </div>
      </div>
    <CommonAlerts alert="Услуг нет" :type="'warning'" v-if="!ordersData.length && isLoaded" />
  </div>
</template>

<script setup>
import { useLocationStore } from '~/store/locationStore';


const props = defineProps({
  data: {
    type: Array,
    default: () => ([]),
  },
  banner: {
    type: Boolean,
    default: false,
  },
  isLoaded: {
    type: Boolean,
    default: false
  }
})

const locationStore = useLocationStore();
const firstCardRef = ref(null);

const emit = defineEmits(['updateServiceCardRef']);

const setFirstCardRef = (index) => {
  return index === 0 ? { ref: firstCardRef } : {};
};

watch(() => firstCardRef.value, (newVal) => {
  emit('updateServiceCardRef', firstCardRef.value[0]);
}, {deep: true})

const ordersData = computed(() => {
  return props.data.map((item) => {
    return {
      id: item.id,
      name: item.name,
      logo: item.pub_card && item.pub_card.logo ? item.pub_card.logo : '',
      location: formatLocationsList(item.cities),
      countryId: formatLocationsList(item.cities, true),
      minLot: item.batches && item.batches.length ? item.batches[0].name : '',
      views: 0,
      companyName: item.pub_card && item.pub_card.name ? item.pub_card.name : '',
      data: [
        { 
          id: 1, 
          name: 'Сырье', 
          value: [item.materials_own ? 'Собственное' : '', item.materials_tolling ? 'Давальческое' : ''].filter(Boolean).join(' / ') 
        },
        { 
          id: 2, 
          name: 'Категории', 
          value: item.product_categories && item.product_categories.length ? item.product_categories.map(item => item.name).join(' / ') : '' 
        },
        { id: 3, name: 'Наличие СТМ', value: item.is_stm ? 'Да' : 'Нет' },
        { id: 4, name: 'Бесплатные образцы', value: item.free_samples ? 'Да' : 'Нет' },
      ],
    }
  })
})

const formatLocationsList = (cities = [], citiesId = false) => {
  if(!cities.length) return [];
  const citiesIds = cities.map(item => item.id);
  const locations = locationStore.getLocationsByIds([], [], citiesIds);
  if (citiesId) {
    return locations[0] && locations[0].countryId ? locations[0].countryId : null; 
  } else {
    return locations.map(item => item.name);
  }
}

</script>

<style lang="scss">

.services {

  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: 3rem;
    justify-content: space-between;
  }

  &__item {
    flex: 0 1 48%;
  }

}

@include tablet {
  .services {
    &__list {
      gap: 2em;
    }
  }
}

@include mobile {
  .services {
    &__item {
      flex: 0 1 100%;
    }
  }
}

</style>