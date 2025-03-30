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
      <CatalogDetails type="order" :pubCard="pubCard" :entityData="formatData" v-if="!loading"/>
    </template>
    <template #rightSide>
      <CatalogOtherEntityCompany v-if="otherActiveEntity.length" :data="otherActiveEntity" type="customer"/>
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
const loading = ref(false);
const formatData = computed(() => {
  if(!data.value) return []
  const {locations, alias} = locationFormatter({cities: data.value.cities, regions: data.value.regions});
  return {
      id: data.value.id,
      props: [
        {
          name: 'Категории:',
          value: data.value.product_categories && data.value.product_categories.length ? data.value.product_categories : [],
          link: 'categories',
        },
        {name: 'Лекала:', value: entityStore.getEntityLabelById('patterns', data.value.pattern)},
        {name: 'Сырье:', value: data.value.material === 1 ? 'Давальческое' : data.value.material === 0 ? 'Собственное' : ''},
        {name: 'Размер партии:', value: parseInt(data.value.batch)},
        {name: 'Сроки выполнения:', value: formatDate(data.value.deadline_at)},
        {name: 'Предпочтительные регионы производства:', value: locations.join(' / ')},
      ],
      description: data.value.description,
      conditions: data.value.conditions,
      gallery: data.value.gallery && data.value.gallery.length && data.value.gallery.map(item => item.url),
      name: data.value.name,
      tzFiles: data.value.tz_files && data.value.tz_files.length && data.value.tz_files.map(item => item.url),
    }
})

const otherActiveEntity = computed(() => {
  if(pubCard.value && pubCard.value.orders ) {
    return pubCard.value.orders.filter(item => item.id !== data.value.id);
  } else return [];
});

const { ...ordersResponse } = await entityStore.getOrder(router.currentRoute.value.params.id)
data.value = ordersResponse.data;
if (ordersResponse.data && ordersResponse.data.pub_card) {
  pubCard.value = ordersResponse.data.pub_card;
}

const pageTitle = computed(() => formatData.value.name || '');

useHead({
  title: pageTitle,
  meta: [
    {
      name: 'description',
      content: '',
    },
  ],
});


</script>
