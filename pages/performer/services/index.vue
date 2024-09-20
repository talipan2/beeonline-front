<template>
  <NuxtLayout name="profile" title="Услуги">
    <template #header>
      <UiBreadCrumb
        :list="[{ label: 'Главная', link: '/' }, { label: 'Кабинет исполнителя', link: '/performer' }, { label: 'Список услуг', link: '' }]" />
    </template>
    <template #content>
      <Entity
        role="performer"
        title="Все заказы"
        subtitle="Размещайте список своих услуг в каталоге исполнителей и ищите заказчиков в кратчайшие сроки с учетом именно ваших потребностей."
        btnLabel="Создать услугу"
        btnLink="/services/create" 
        :data="cardData"
      />
    </template>
  </NuxtLayout>
</template>

<script setup>
import { useEntityStore } from '~/store/entityStore';

const entityStore = useEntityStore();

const servicesList = computed(() => entityStore.servicesList)

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
  return entityStore.servicesList.map(item => {
    return {
    id: item.id,
    name: item.name,
    placeOfProduction: item.location || [],
    rawMaterials: [item.materials_own ? 'Собственное' : '', item.materials_tolling ? 'Давальческое' : ''].filter(Boolean),
    availabilityStm: item.is_stm ? 'Да' : 'Нет',
    freeSamples: formatFreeSamples(item.free_samples),
    minLot: item.minLot,
    status: item.status || "На модерации",
  }})
})

onMounted(() => {
  entityStore.getServices()
})

</script>