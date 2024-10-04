<template>
  <NuxtLayout name="catalog" title="Каталог заказов">
    <template #header>
      <UiBreadCrumb
        :list="[{ label: 'Главная', link: '/' }, { label: 'Каталог заказов', link: '' }]" />
    </template>
    <template #leftSide>
      <CatalogOrdersFilter />
    </template>
    <template #content>
      <CatalogOrdersList :data="ordersList"/>
    </template>
  </NuxtLayout>
</template>

<script setup>
import { useEntityStore } from '~/store/entityStore';


const entityStore = useEntityStore();
const ordersList = computed(() => entityStore.ordersList);

onMounted(() => {
  entityStore.getOrders()
})

</script>