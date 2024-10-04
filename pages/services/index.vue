<template>
  <NuxtLayout name="catalog" title="Каталог услуг" class="catalog-services">
    <template #header>
      <UiBreadCrumb
        :list="[{ label: 'Главная', link: '/' }, { label: 'Каталог услуг', link: '' }]" />
    </template>
    <template #leftSide>
      <CatalogServiceFilter />
    </template>
    <template #content>
      <CatalogServiceList :data="servicesList"/>
    </template>
  </NuxtLayout>
</template>

<script setup>
import { useEntityStore } from '~/store/entityStore';


const entityStore = useEntityStore();

const servicesList = computed(() => entityStore.servicesList);

onMounted(() => {
  entityStore.getServices()
})

</script>

<style lang="scss">

.catalog-services {
  .catalog__container {
    column-gap: 3.5rem;
  }
}

</style>