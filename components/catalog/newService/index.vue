<template>
  <div class="new-service">
    <CommonSelectableButtons :options="categoryList" v-model="selectedCategory">
      <div class="new-service__filters">
        <CatalogNewServiceFilter class="new-service__filter" />
        <UiButton type="button" class="new-service__btn" variant="default" :without-padding="true">Сбросить фильтры</UiButton>
        <UiButton type="button" class="new-service__btn" variant="quinary" size="large">Применить фильтры</UiButton>
      </div>
    </CommonSelectableButtons>
  </div>
</template>

<script setup>
import { useEntityStore } from '~/store/entityStore';


const entityStore = useEntityStore();

const categoryList = computed(() => entityStore.entityData.categories);
const selectedCategory = ref([]);


</script>

<style lang="scss">

.new-service {
  font-size: 1rem;

  &__filters {
    display: flex;
    column-gap: 5em;
    margin-bottom: 2.4em;
  }

  &__filter {
    margin-right: auto;
  }

  &__btn {
    font-size: 1.2em;
    text-transform: uppercase;
  }
}

</style>