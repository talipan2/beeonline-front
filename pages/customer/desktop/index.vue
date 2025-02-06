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
import { useUserStore } from '~/store/userStore';

useHead({
  title: 'Рабочий стол',
  meta: [
    {
      name: 'description',
      content: '',
    },
  ],
});

const entityStore = useEntityStore();
const userStore = useUserStore();

const filterList = ['category', 'minLot', 'date']; // Список фильтров

async function getEntity(type) {
  try {
    const res = await entityStore.getOrganizationOrders(userStore.userData.organization_id);
    if (res) {
      return entityStore.organizationOrders;
    }
    return [];
  } catch (error) {
    console.error('Error fetching organization orders:', error);
  }
}

</script>