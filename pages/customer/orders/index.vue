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
        :isLoading="isLoading"
        emptyAlertText="Заказов нет"
        :entityIsFilling="entityIsFilling"
      />
    </template>
  </NuxtLayout>
</template>

<script setup>

import { useEntityStore } from '~/store/entityStore';
import { useLocationStore } from '~/store/locationStore';
import { useUserStore } from '~/store/userStore';

const entityStore = useEntityStore();
const userStore = useUserStore();
const locationStore = useLocationStore()

const isLoading = ref(false);

const entityIsFilling = ref({});

const cardData = computed(() => {
  return entityStore.organizationOrders.map(item => {
    return {
    id: item.id,
    name: item.name,
    placeOfProduction: locationStore.getLocationsByIds([], item.regions.map(item => item.id), item.cities.map(item => item.id)),
    rawMaterials: !item.material ? ['Собственное'] : ['Давальческое'],
    completionDate: item.deadline_at,
    batch: item.batch,
    category: item.product_categories.map(item => item.id),
    status: entityStore.getEntityStatusByValue(item.status),
    locations: {
      cities: [...item.cities],
      regions: [...item.regions]
    },
  }})
})

onMounted(() => {
  if(userStore.userData.organization_id) {
    isLoading.value = true
    entityStore.getOrganizationOrders(userStore.userData.organization_id)
    .finally(() => isLoading.value = false);
  }
  
});

</script>