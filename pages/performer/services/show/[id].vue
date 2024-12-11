<template>
  <NuxtLayout name="profile" title="Карточка услуги" class="entity-edit">
    <template #header>
      <UiBreadCrumb
        :list="[{ label: 'Главная', link: '/' }, { label: 'Кабинет исполнителя', link: '/performer/desktop' }, { label: 'Список услуг', link: '/performer/services' }, { label: 'Услуга', link: '' }]" />
    </template>
    <template #content>
      <EntityView :data="serviceProps" role="performer"/>
    </template>
  </NuxtLayout>
</template>

<script setup>
import { useEntityStore } from '~/store/entityStore';


const router = useRouter();
const entityStore = useEntityStore();
const service = ref({});
const serviceProps = computed(() => {
  return {
    id: service.value.id,
    name: service.value.name,
    description: service.value.description,
    gallery: service.value.gallery || [],
    conditions: service.value.conditions,
    props: {
      minLot: {label: "Партии", value: service.value.min_lot},
      category: { label: "Категория", value: service.value.category },
      rawMaterials: {label: "Сырье", value: [service.value.materials_own ? 'Собственное' : '', service.value.materials_tolling ? 'Давальческое' : ''].filter(Boolean).join(' / ')},
      availabilityStm: {label: "Наличие СТМ", value: service.value.availabilityStm ? 'Да' : 'Нет'},
      freeSamples: {label: "Бесплатные образцы", value: formatFreeSamples(service.value.free_samples)},
      placeOfProduction: {label: "Место производства", value: service.value.location || ''},
    }
  }
});

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

onMounted(() => {
  entityStore.getService(router.currentRoute.value.params.id).then((res) => service.value = res.data)
})

</script>