<template>
  <NuxtLayout name="catalog" title="Каталог заказов">
    <template #header>
      <UiBreadCrumb
        :list="[{ label: 'Главная', link: '/' }, { label: 'Каталог заказов', link: '' }]" />
    </template>
    <template #title>
      <CommonTutorial :data="tutorialRefs"/>
    </template>
    <template #leftSide>
      <CatalogOrdersFilter v-model="tutorialRefs"/>
    </template>
    <template #content>
      <CatalogOrdersList :data="ordersList" @updateOrderCardRef="updateServiceCardRef"/>
    </template>
  </NuxtLayout>
</template>

<script setup>
import { useEntityStore } from '~/store/entityStore';

const entityStore = useEntityStore();
const ordersList = computed(() => entityStore.ordersList);

const tutorialRefs = ref([]);
const orderCardRef = ref([]);

const updateServiceCardRef = (newVal) => {
  orderCardRef.value = newVal
  if(newVal) {
    tutorialRefs.value = [...tutorialRefs.value, {component: orderCardRef.value, content: 'Нажмите, чтобы просмотреть услугу'}]
  }
}

onMounted(() => {
  entityStore.getOrders()
})

</script>