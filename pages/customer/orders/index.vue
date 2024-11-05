<template>
  <NuxtLayout name="profile" title="Заказы">
    <template #header>
      <UiBreadCrumb
        :list="[{ label: 'Главная', link: '/' }, { label: 'Кабинет заказчика', link: '/customer/desktop' }, { label: 'Список заказов', link: '' }]" />
    </template>
    <template #content>
      <Entity 
        role="customer"
        title="Все заказы"
        subtitle="Размещайте список своих заказов в каталоге заказчиков и ищите исполнителей в кратчайшие сроки с учетом именно ваших потребностей"
        btnLabel="Создать заказ"
        btnLink="/orders/create"
        :data="cardData"
      />
    </template>
  </NuxtLayout>
</template>

<script setup>

import { useEntityStore } from '~/store/entityStore';

const entityStore = useEntityStore();

const cardData = computed(() => {
  return entityStore.ordersList.map(item => {
    return {
    id: item.id,
    name: item.name,
    placeOfProduction: item.location || [],
    rawMaterials: !item.material ? ['Собственное'] : ['Давальческое'],
    completionDate: item.deadline_at,
    batch: item.batch,
    category: item.categories || [],
    status: item.status || 'На модерации',
  }})
})

onMounted(() => {
  entityStore.getOrders();
});

</script>