<template>
  <NuxtLayout name="profile" title="Кабинет заказчика" class="desktop-layout">
    <template #header>
      <UiBreadCrumb :list="[{label: 'Главная', link: '/'}, { label: 'Кабинет заказчика', link: '' }]" />
    </template>
    <template #content>
      <Desktop :getEntity="getEntity" role="customer" :filterList="filterList"/>
    </template>
  </NuxtLayout>
</template>

<script setup>
import { useEntityStore } from '~/store/entityStore';

const entityStore = useEntityStore();

const filterList = ['category', 'minLot', 'date']; // Список фильтров

function getEntity(type, filter) {
  return entityStore.getServices(type, filter)
}

</script>