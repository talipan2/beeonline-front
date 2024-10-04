<template>
  <div class="orders">
    <div class="orders__list">
      <div class="orders__item" v-for="data in orderData" :key="data">
        <CatalogOrdersCard  :data="data" />
      </div>
    </div>
    <CommonPagination />
  </div>
</template>

<script setup>
import { useEntityStore } from '~/store/entityStore';


const props = defineProps({
  data: {
    type: Array,
    default: () => ([]),
  },
})

const entityStore = useEntityStore();

const orderData = computed(() => {
  return props.data.map(item => {
    return {
      id: item.id,
      name: item.name,
      logo: '',
      data: [
        { id: 1, name: 'Категории', value: [] },
        { id: 2, name: 'Место производства', value: [] },
        { id: 3, name: 'Партия', value: Number(item.batch) },
        { id: 4, name: 'Лекала', value: entityStore.getEntityLabelById('patterns', item.pattern) },
        { id: 5, name: 'Сырье', value: entityStore.getEntityLabelById('rawMaterials', item.material) },
        { id: 6, name: 'Срок выполнения', value: formatDate(item.deadline_at) },
        { id: 7, name: 'Описание', value: item.description },
      ],
    };
  });
});


</script>

<style lang="scss">

.orders {

  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: 3rem;
  }

  &__item {
    flex: 0 1 48%;
  }
}

</style>