<template>
  <div class="orders">
    <div class="orders__list">
      <div class="orders__item" v-for="(data, index) in ordersData" :key="index">
        <CatalogServiceCard :data="data" />
      </div>
    </div>
    <CommonPagination />
  </div>
</template>

<script setup>

const props = defineProps({
  data: {
    type: Array,
    default: () => ([]),
  }
})

const ordersData = computed(() => {
  return props.data.map((item) => {
    return {
      id: item.id,
      name: item.name,
      logo: '',
      location: [],
      minLot: [],
      views: 0,
      companyName: 'test1',
      data: [
        { id: 1, name: 'Сырье', value: [item.materials_own ? 'Собственное' : '', item.materials_tolling ? 'Давальческое' : ''].filter(Boolean).join(' / ') },
        { id: 2, name: 'Категории', value: [] },
        { id: 3, name: 'Наличие СТМ', value: item.is_stm ? 'Да' : 'Нет' },
        { id: 4, name: 'Бесплатные образцы', value: item.free_samples ? 'Да' : 'Нет' },
      ],
    }
  })


})

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