<template>
  <div class="new-service__list">
    <CatalogBanner :fetch-function="fetchServiceSlider">
      <template #item="{ item }">
        <CatalogNewServiceCard :data="item" class="highlight" :revers-color="true"/>
      </template>
    </CatalogBanner>
    <template v-if="servicesList.length">
      <template v-for="item in servicesList" :key="item.id">
        <CatalogNewServiceCard :data="item"/>
      </template>
    </template>
    <template v-else>
      <CommonAlerts alert="Услуги не найдены" :type="'warning'" v-if="!servicesList.length" />
    </template>
  </div>
</template>

<script setup>
import { useEntityStore } from '~/store/entityStore'


const props = defineProps({
  servicesList: {
    type: Array,
    default: () => []
  },
  slider: {
    type: Boolean,
    default: false
  }
})

const entityStore = useEntityStore();

const fetchServiceSlider = async ( page, per_page=10) => {
  const res = await entityStore.getServiceSlider({ page, per_page })
  return {
    data: res.data,
    meta: res.meta
  }
}

</script>

<style lang="scss">

.new-service {
  &__list {
    display: flex;
    flex-direction: column;
    row-gap: 5.6em;
  }
}

</style>