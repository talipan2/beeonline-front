<template>
  <NuxtLayout name="details-entity" title="Пошив крупной партии вязаных изделий ( свитеры, шапки, носки)" badge="Услуга">
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
// const formatData = computed(() => {
//   if(!data.value) return {}
//   return {
//     conditions: data.value.conditions,
//     description: data.value.description,
//     freeSamples: entityStore.getEntityLabelById('freeTestSamples', data.value.free_samples),
//     gallery: data.value.gallery,
//     id: data.value.id,
//     organizationId: data.value.organization_id,
//     isStm: entityStore.getEntityLabelById('availabilityStm', data.value.is_stm),
//     rawMaterials: [data.value.materials_own ? 'Собственное' : '', data.value.materials_tolling ? 'Давальческое' : ''].filter(Boolean),
//     name: data.value.name,
//   }
// })


const formatData = computed(() => {
  if(!data.value) return []
  return {
      props: [
        {name: 'Партии:', value: ['до 100'], link: ['1']},
        {name: 'Категории:', value: ["Детская одежда", 'Термобелье', 'Носочно-чулочная продукция',  'Сумки и аксессуары',  'Ткани, фурнитура, материалы'], link: ['1', '2', '3']},
        {name: 'Материалы:', value: [data.value.materials_own ? 'Собственное' : '', data.value.materials_tolling ? 'Давальческое' : ''].filter(Boolean), link: ['1', '2']},
        {name: 'Наличие СТМ:', value: entityStore.getEntityLabelById('availabilityStm', data.value.is_stm)},
        {name: 'Бесплатные образцы:', value: entityStore.getEntityLabelById('freeTestSamples', data.value.free_samples)},
        {name: 'Регион производства:', value: 'Адыгейск, Адыгея Респ, Россия'},
      ],
      organizationId: data.value.organization_id,
      description: data.value.description,
      conditions: data.value.conditions,
      gallery: data.value.gallery,
      name: data.value.name
    }
})

onMounted(async() => {
    try {
      const serviceResponse = await entityStore.getService(router.currentRoute.value.params.id);
      data.value = serviceResponse.data;
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