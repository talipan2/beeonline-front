<template>
  <!-- <CatalogBanner :fetch-function="fetchServiceSlider" class="new-service__banner">
    <template #item="{ item }">
      <CatalogNewServiceCard :data="item" class="highlight" :revers-color="true"/>
    </template>
  </CatalogBanner> -->
  <div class="new-service__list">
    <template v-if="servicesList.length">
      <template v-for="item in servicesList" :key="item.id">
        <CatalogNewServiceCard :data="item"/>
      </template>
    </template>
    <template v-else>
      <CommonAlerts alert="Производители не найдены" :type="'warning'" v-if="!servicesList.length" />
    </template>
  </div>
</template>

<script setup>
import { useEntityStore } from '~/store/entityStore'
import { useOrganizationStore } from '~/store/organizationStore';


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
const organizationStore = useOrganizationStore();

// const fetchServiceSlider = async ( page, per_page=10) => {
//   const res = await organizationStore.getPubCardSlider({ page, per_page })
//   return {
//     data: res.data,
//     meta: res.meta
//   }
// }

</script>

<style lang="scss">

.new-service {
  &__list {
    display: flex;
    flex-direction: column;
    row-gap: 5.6em;
  }

  @include mobile {
    &__banner {
      margin-inline: -13px;
      max-width: none;
    }
  }
}

</style>