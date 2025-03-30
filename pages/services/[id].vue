<template>
  <NuxtLayout name="details-entity" :title="formatData.name" badge="Услуга" v-if="!isLoading">
    <template #header>
      <UiBreadCrumb
        :list="[
          { label: 'Главная', link: '/' },
          { label: 'Каталог услуг', link: '/services' },
          { label: 'Услуга', link: '' },
        ]"
      />
    </template>
    <template #content>
      <CatalogDetails type="service" :pubCard="pubCard" :entityData="formatData"/>
    </template>
    <template #rightSide>
      <CatalogOtherEntityCompany v-if="otherActiveEntity.length" :data="otherActiveEntity" type="performer"/>
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
const isLoading = ref(false);

const formatData = computed(() => {
  if(!data.value) return []
  const {locations, alias} = locationFormatter({cities: data.value.cities});
  return {
      id: data.value.id,
      props: [
        {
          name: 'Партии:', 
          value: data.value.batches && data.value.batches.length ? data.value.batches.map(item => item.name).join(' / ') : [],
        },
        {
          name: 'Категории:', 
          value: data.value.product_categories && data.value.product_categories.length ? data.value.product_categories : [], 
          link: 'categories',
        },
        {name: 'Материалы:', value: [data.value.material ? {name:'Давальческое', id: 1} : {name: 'Собственное', id: 0}], link: 'material'},
        {name: 'Наличие СТМ:', value: entityStore.getEntityLabelById('availabilityStm', data.value.is_stm)},
        {name: 'Бесплатные образцы:', value: entityStore.getEntityLabelById('freeTestSamples', data.value.free_samples)},
        {name: 'Регион производства:', value: locations.join(' / ')},
      ],
      organizationId: data.value.organization_id,
      description: data.value.description,
      conditions: data.value.conditions,
      gallery: data.value.gallery && data.value.gallery.length && data.value.gallery.map(item => item.url),
      tzFiles: data.value.tz_files && data.value.tz_files.length && data.value.tz_files.map(item => item.url),
      name: data.value.name
    }
})

const otherActiveEntity = computed(() => {
  if(pubCard.value && pubCard.value.services ) {
    return pubCard.value.services.filter(item => item.id !== data.value.id);
  } else return [];
});

const serviceResponse = await entityStore.getService(router.currentRoute.value.params.id);

onMounted(async() => {
  isLoading.value = true;
  try {
    // const {...serviceResponse} = await entityStore.getService(router.currentRoute.value.params.id);
    data.value = serviceResponse.data;
    if(serviceResponse && serviceResponse.data && serviceResponse.data.pub_card) {
      pubCard.value = serviceResponse.data.pub_card
    }
  } catch (err) {
    console.error(err);
  } finally {
    isLoading.value = false;
  }
});



const pageTitle = computed(() => formatData.value.name || 'Международный цифровой сервис поиска партнеров в сфере легкой промышленности');

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