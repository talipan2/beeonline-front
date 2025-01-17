<template>
  <NuxtLayout name="profile" title="Услуги">
    <template #header>
      <UiBreadCrumb
        :list="[{ label: 'Главная', link: '/' }, { label: 'Кабинет исполнителя', link: '/performer/desktop' }, { label: 'Список услуг', link: '' }]" />
    </template>
    <template #content>
      <Entity
        role="performer"
        title="Все заказы"
        subtitle="Размещайте список своих услуг в каталоге исполнителей и ищите заказчиков в кратчайшие сроки с учетом именно ваших потребностей."
        btnLabel="Создать услугу"
        btnLink="/services/create" 
        :data="cardData"
        :isLoading="isLoading"
        emptyAlertText="Услуг нет"
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
const locationStore = useLocationStore();
const isLoading = ref(false);

const formatFreeSamples = (freeSamples) => {
    switch (Number(freeSamples)) {
      case 1:
        return 'Да'
      case 2:
        return 'Нет'
      case 0:
        return 'По Запросу'
      default:
        return null
    }
  }

const cardData = computed(() => {
  return entityStore.organizationServices.map(item => {
    return {
    id: item.id,
    name: item.name,
    placeOfProduction: locationStore.getLocationsByIds([], [], item.cities.map(item => item.id)) || [],
    rawMaterials: [item.materials_own ? 'Собственное' : '', item.materials_tolling ? 'Давальческое' : ''].filter(Boolean),
    availabilityStm: item.is_stm ? 'Да' : 'Нет',
    freeSamples: formatFreeSamples(item.free_samples),
    minLot: item.batches && item.batches.length ? item.batches.map(item => item.name) : [],
    status: entityStore.getEntityStatusByValue(item.status),
  }})
})


onMounted(() => {
  isLoading.value = true
  entityStore.getOrganizationServices(userStore.userData.organization_id).finally(() => isLoading.value = false);
})

</script>