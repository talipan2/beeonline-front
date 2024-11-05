<template>
  <NuxtLayout name="profile" title="Кабинет заказчика" class="desktop-layout">
    <template #header>
      <UiBreadCrumb :list="[{label: 'Главная', link: '/'}, { label: 'Кабинет заказчика', link: '' }]" />
    </template>
    <template #content>
      <Desktop :getEntity="getEntity" role="performer" :selectorButtons="selectorButtons" :filterList="filterList"/>
    </template>
  </NuxtLayout>
</template>

<script setup>
import { useEntityStore } from '~/store/entityStore';

const entityStore = useEntityStore();

const selectorButtons = [
  { id: 1, label: 'Активные', value: 'active', count: 3, },
  { id: 2, label: 'Черновики', value: 'draft', count: 2, },
  { id: 3, label: 'В архиве', value: 'archive', count: 1 },
];

const filterList = ['category']; // Список фильтров

function getEntity(type, filter) {
  return entityStore.getOrders(type, filter)
}

</script>