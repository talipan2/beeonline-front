<template>
  <NuxtLayout name="details-entity" :title="formatData.name" badge="Услуга" v-if="!isLoading">
    <template #header>
      <UiBreadCrumb
        :list="[
          { label: 'Главная', link: '/' },
          { label: 'Каталог услуг', link: '/orders' },
          { label: 'Услуга', link: '' },
        ]"
      />
    </template>
    <template #content>
      <CatalogDetails type="service" :pubCard="pubCard" :entityData="formatData"/>
    </template>
    <template #rightSide>
      <CatalogOtherEntityCompany type="service"/>
    </template>
  </NuxtLayout>
</template>

<script setup>

import { useEntityStore } from '~/store/entityStore';
import { useOrganizationStore } from '~/store/organizationStore';

const router = useRouter();
const entityStore = useEntityStore();
const organizationStore = useOrganizationStore();
const data = ref({});
const pubCard = ref({});
const isLoading = ref(false);

const formatData = computed(() => {
  if(!data.value) return []
  return {
      props: [
        {
          name: 'Партии:', 
          value: data.value.batches && data.value.batches.length && data.value.batches, 
          link: 'bathes',
        },
        {
          name: 'Категории:', 
          value: data.value.product_categories && data.value.product_categories.length && data.value.product_categories, 
          link: 'product_categories',
        },
        {name: 'Материалы:', value: [data.value.materials_own ? 'Собственное' : '', data.value.materials_tolling ? 'Давальческое' : ''].filter(Boolean), link: ['1', '2']},
        {name: 'Наличие СТМ:', value: entityStore.getEntityLabelById('availabilityStm', data.value.is_stm)},
        {name: 'Бесплатные образцы:', value: entityStore.getEntityLabelById('freeTestSamples', data.value.free_samples)},
        {name: 'Регион производства:', value: 'Адыгейск, Адыгея Респ, Россия'},
      ],
      organizationId: data.value.organization_id,
      description: data.value.description,
      conditions: data.value.conditions,
      gallery: data.value.gallery && data.value.gallery.length && data.value.gallery.map(item => item.url),
      tzFiles: data.value.tz_files && data.value.tz_files.length && data.value.tz_files.map(item => item.url),
      name: data.value.name
    }
})

onMounted(async() => {
  isLoading.value = true;
  try {
    const serviceResponse = await entityStore.getService(router.currentRoute.value.params.id);
    data.value = serviceResponse.data;
    if(serviceResponse && serviceResponse.data && serviceResponse.data.pub_card) {
      pubCard.value = serviceResponse.data.pub_card
    }
    // try {
    //   const pubCardResponse = await organizationStore.getPubCard(data.value.organization_id);
    //   pubCard.value = pubCardResponse;
    // } catch (err) {
    //   console.error(err);
    // }
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