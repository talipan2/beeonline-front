<template>
  <div class="new-service">
    <CommonSelectableButtons :options="categoryList" v-model="selectedCategory">
      <CatalogNewServiceFilter />
    </CommonSelectableButtons>
  </div>
</template>

<script setup>
import { useEntityStore } from '~/store/entityStore';


const entityStore = useEntityStore();

const categoryList = computed(() => entityStore.entityData.categories);
const selectedCategory = ref([]);


</script>