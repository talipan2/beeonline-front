<template>
  <!-- <NuxtLayout name="details-entity" :title="formatData.name" badge="Услуга" v-if="!isLoading">
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
  </NuxtLayout> -->
  <NuxtLayout name="info" class="new-service-details-page">
    <template #header>
      <UiBreadCrumb
        :list="[
          { label: 'Главная', link: '/' },
          { label: 'Каталог исполнителей', link: '/services' },
          { label: `${data?.name || 'Исполнитель'} `, link: ''},
        ]"
      />
    </template>
    <template #content>
      <CatalogNewServiceDetails :data="data"/>
    </template>
  </NuxtLayout>
</template>

<script setup>

import { useEntityStore } from '~/store/entityStore';
import { useLocationStore } from '~/store/locationStore';
import { useOrganizationStore } from '~/store/organizationStore';
import { useReviewsStore } from '~/store/reviewsStore';

const router = useRouter();
const entityStore = useEntityStore();
const organizationStore = useOrganizationStore();
const locationStore = useLocationStore();
const reviewStore = useReviewsStore();
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
        {name: 'Материалы:', value: [data.value.materials_tolling ? {name:'Заказчика', id: 1} : '', data.value.materials_own ? {name: 'Исполнителя', id: 0} : ''].filter(Boolean), link: 'material'},
        {name: 'Наличие СТМ:', value: entityStore.getEntityLabelById('availabilityStm', data.value.is_stm)},
        {name: 'Бесплатные образцы:', value: entityStore.getEntityLabelById('freeTestSamples', data.value.free_samples)},
        {name: 'Регион производства:', value: locations.join(' / ')},
        {name: 'Свободный склад:', value: null},
      ],
      organizationId: data.value.organization_id,
      description: data.value.description,
      conditions: data.value.conditions,
      gallery: data.value.gallery && data.value.gallery.length && data.value.gallery.map(item => item.url),
      tzFiles: data.value.tz_files && data.value.tz_files.length && data.value.tz_files.map(item => item.url),
      views: data.value.view_count,
      name: data.value.name
    }
})

const otherActiveEntity = computed(() => {
  if(pubCard.value && pubCard.value.services ) {
    return pubCard.value.services.filter(item => item.id !== data.value.id);
  } else return [];
});

const serviceResponse = await organizationStore.getPubCard(router.currentRoute.value.params.id);

onMounted(async() => {
  isLoading.value = true;
  try {
    // const {...serviceResponse} = await entityStore.getService(router.currentRoute.value.params.id);
    data.value = serviceResponse;
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

<style lang="scss">

.new-service-details-page {
  .info__content {
    max-width: 80%;
    margin-inline: auto;

    @include mobile {
      max-width: 100%;
    }
  }
}

</style>