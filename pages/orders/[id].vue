<template>
  <NuxtLayout name="details-entity" :title="data.name" badge="Заказ">
    <template #header>
      <UiBreadCrumb
        :list="[
          { label: 'Главная', link: '/' },
          { label: 'Каталог заказов', link: '/orders' },
          { label: 'Заказ', link: '' },
        ]"
      />
    </template>
    <template #content>
      <CatalogDetails type="order" :pubCard="pubCard" :entityData="formatData"/>
    </template>
    <template #rightSide>
      <CatalogOtherEntityCompany type="order"/>
    </template>
  </NuxtLayout>
</template>

<script setup>
import { useEntityStore } from '~/store/entityStore';
import { useLocationStore } from '~/store/locationStore';
import { useOrganizationStore } from '~/store/organizationStore';

const router = useRouter();
const entityStore = useEntityStore();
const organizationStore = useOrganizationStore();
const locationStore = useLocationStore();
const data = ref({});
const pubCard = ref({});
const formatData = computed(() => {
  if(!data.value) return []
  return {
      props: [
        {
          name: 'Категории:', 
          value: data.value.product_categories && data.value.product_categories.length && data.value.product_categories,
          link: 'product_categories',
        },
        {name: 'Лекала:', value: entityStore.getEntityLabelById('patterns', data.value.pattern)},
        {name: 'Сырье:', value: [data.value.material ? {name:'Давальческое', id: 1} : {name: 'Собственное', id: 0}], link: 'material'},
        {name: 'Размер партии:', value: parseInt(data.value.batch)},
        {name: 'Сроки выполнения:', value: formatDate(data.value.deadline_at)},
        {name: 'Предпочтительные регионы производства:', value: formatLocationsList(data.value.regions, data.value.cities)},
      ],
      description: data.value.description,
      conditions: data.value.conditions,
      gallery: data.value.gallery && data.value.gallery.length && data.value.gallery.map(item => item.url),
      name: data.value.name,
      tzFiles: data.value.tz_files && data.value.tz_files.length && data.value.tz_files.map(item => item.url),
    }
})

const formatLocationsList = (regions=[], cities=[]) => {
  if(!regions.length && !cities.length) return [];
  const citiesIds = cities.map(item => item.id);
  const regionsIds = regions.map(item => item.id);
  const locations = locationStore.getLocationsByIds([], regionsIds, citiesIds);
  return locations.map(item => item.name).join(' / ');
}

onMounted(async () => {
    try {
      const ordersResponse = await entityStore.getOrder(router.currentRoute.value.params.id);
      data.value = ordersResponse.data;
  
      try {
        const pubCardResponse = await organizationStore.getPubCard(data.value.organization_id);
        pubCard.value = pubCardResponse;
      } catch (err) {
        console.error(err);
      }
    } catch (err) {
      console.error(err);
    }
  }
);


</script>
