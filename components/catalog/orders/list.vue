<template>
  <div class="orders">
    <div class="orders__list">
      <template v-if="orderData.length > 0">
        <div class="orders__item" v-for="(data, index) in orderData" :key="index" v-bind="setFirstCardRef(index)">
          <CatalogOrdersCard  :data="data" isFooter />
        </div>
      </template>
      <CommonAlerts alert="Заказов нет" :type="'warning'" v-if="!orderData.length && isLoaded" />
    </div>
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
  isLoaded: {
    type: Boolean,
    default: false
  }
})

const entityStore = useEntityStore();
const locationStore = useLocationStore();
const firstCardRef = ref(null);
const emit = defineEmits(['updateOrderCardRef']);

const orderData = computed(() => {
  return props.data.map(item => {
    const {locations, alias} = locationFormatter({cities: item.cities, regions: item.regions});
    return {
      id: item.id,
      name: item.name,
      logo: item.gallery && item.gallery.length ? item.gallery[0].url : '',
      alias: alias,
      lifecycle_status: item.lifecycle_status,
      lifecycle_status_name: item.lifecycle_status_name,
      status: item.status,
      data: [
        { id: 1, name: 'Категории', value: item.product_categories && item.product_categories.length ? item.product_categories.map(item => item.name) : [] },
        { id: 2, name: 'Место производства', value: locations },
        { id: 3, name: 'Партия', value: Number(item.batch) },
        { id: 4, name: 'Лекала', value: entityStore.getEntityLabelById('patterns', item.pattern) },
        { id: 5, name: 'Сырье', value: entityStore.getEntityLabelById('rawMaterials', item.material) },
        { id: 6, name: 'Срок выполнения', value: formatDate(item.deadline_at) },
        { id: 7, name: 'Описание', value: item.description },
      ],
    };
  });
});

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
