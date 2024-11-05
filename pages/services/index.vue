<template>
  <NuxtLayout name="catalog" title="Каталог услуг" class="catalog-services">
    <template #header>
      <UiBreadCrumb
        :list="[{ label: 'Главная', link: '/' }, { label: 'Каталог услуг', link: '' }]" />
    </template>
    <template #title>
      <CommonTutorial :data="tutorialRefs"/>
    </template>
    <template #leftSide>
      <CatalogServiceFilter v-model="tutorialRefs"/>
    </template>
    <template #content>
      <CatalogServiceList :data="servicesList" @updateServiceCardRef="updateServiceCardRef"/>
    </template>
  </NuxtLayout>
</template>

<script setup>
import { useEntityStore } from '~/store/entityStore';

const entityStore = useEntityStore();

const servicesList = computed(() => entityStore.servicesList);

const tutorialRefs = ref([]);

const serviceCardRef = ref([]);

const updateServiceCardRef = (newVal) => {
  serviceCardRef.value = newVal
  if(newVal) {
    tutorialRefs.value = [...tutorialRefs.value, {component: serviceCardRef.value, content: 'Нажмите, чтобы просмотреть услугу'}]
  }
}

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