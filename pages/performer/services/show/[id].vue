<template>
  <NuxtLayout name="profile" title="Карточка услуги" class="entity-edit">
    <template #header>
      <UiBreadCrumb
        :list="[{ label: 'Главная', link: '/' }, { label: 'Кабинет исполнителя', link: '/desktop' }, { label: 'Список услуг', link: '/performer/services' }, { label: 'Услуга', link: '' }]" />
    </template>
    <template #content>
      <EntityView v-if="!isLoading" :data="serviceProps" role="performer" type="service"/>
      <CreateEntityFinalModal :text="'Услуга отправлена на модерацию'" :type="'service'"/>
    </template>
  </NuxtLayout>
</template>

<script setup>
import { useEntityStore } from '~/store/entityStore';
import { useLocationStore } from '~/store/locationStore';

definePageMeta({
    disableMetrika: true,
});

const router = useRouter();
const entityStore = useEntityStore();
const service = ref({});
const isLoading = ref(false);
const locationStore = useLocationStore();

const serviceProps = computed(() => {
  const {locations, alias} = locationFormatter({cities: [...service.value.cities]});
  return {
    id: service.value.id,
    name: service.value.name,
    description: service.value.description,
    gallery: service.value.gallery || [],
    conditions: service.value.conditions,
    tzFiles: service.value.tz_files && service.value.tz_files.length ? service.value.tz_files.map(item => item.url) : [],
    status: service.value.status,
    rejectReason: service.value.reject_reason || '',
    views: service.value.view_count,
    props: {
      minLot: {label: "Партии", value: service.value.batches && service.value.batches.length ? service.value.batches.map(item => item.name) : []},
      category: { label: "Категория", value: service.value.product_categories && service.value.product_categories.length ? service.value.product_categories.map(item => item.name) : []},
      rawMaterials: {label: "Сырье", value: [service.value.materials_own ? 'Исполнителя' : '', service.value.materials_tolling ? 'Заказчика' : ''].filter(Boolean).join(' / ')},
      availabilityStm: {label: "Наличие СТМ", value: service.value.availabilityStm ? 'Да' : 'Нет'},
      freeSamples: {label: "Бесплатные образцы", value: formatFreeSamples(service.value.free_samples)},
      placeOfProduction: {label: "Место производства", value: locations,},
      freeStock: {label: "Свободный склад", value: service.value.free_stock ? 'Да' : 'Нет'},
    }
  }
});

const formatFreeSamples = (freeSamples) => {
  if (freeSamples === null || freeSamples === undefined) {
    return null;
  }

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

isLoading.value = true;
await entityStore.getService(router.currentRoute.value.params.id)
  .then((res) => service.value = res.data)
  .finally(() => isLoading.value = false)

// onMounted(() => {
//   isLoading.value = true;
//   entityStore.getService(router.currentRoute.value.params.id)
//   .then((res) => service.value = res.data)
//   .finally(() => isLoading.value = false)
// })

</script>
