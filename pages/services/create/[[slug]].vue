<template>
  <NuxtLayout name="create" >
    <template #left>
      <CommonCheckList 
        class="sticky" 
        title="Создание услуги" 
        adviceTitle="Для публикации услуги нужно заполнить достаточно информации об услуге" 
        :check-list="checkList" 
      />
    </template>
    <template #content>
      <component :is="currentComponent" :title="title" role="performer" :formatData="data" :data="service" @submit="handleSubmit"/>
    </template>
    <template #right>
      <div class="h4">Предварительный просмотр услуги</div>
      <CreateEntityPreview :data="servicesData"/>
    </template>
  </NuxtLayout>
</template>

<script setup>
import Step1 from '~/components/createEntity/step1.vue';
import Step2 from '~/components/createEntity/step2.vue';
import Step3 from '~/components/createEntity/step3.vue';
import Step4 from '~/components/createEntity/step4.vue';
import { useEntityStore } from '~/store/entityStore';
import { useLocationStore } from '~/store/locationStore';
import { useOrganizationStore } from '~/store/organizationStore';
import { useUserStore } from '~/store/userStore';

const router = useRouter();
const organizationStore = useOrganizationStore();
const userStore = useUserStore();
const title = ref('');

const handleSubmit = computed(() => {
  switch (router.currentRoute.value.params.slug) {
    case 'step1':
      return (() => {
        entityStore.addNewService(
          {
            userId: userStore.userData.id,
            organizationId: organizationStore.organization.id, 
            name: service.value.name, 
            category: service.categories
          }
        ).then(() => router.push('/services/create/step2'))
        .catch(error => console.log(error));
      });
    case 'step2':
      return (() =>{
          entityStore.editService(1, {
            description: service.value.description,
            rawMaterials: service.value.rawMaterials,
            availabilityStm: service.value.availabilityStm,
            freeTestSamples: service.value.freeTestSamples,
            minLot: service.value.minLot,
            termsOfCooperation: service.value.termsOfCooperation
          }).then(() => router.push('/services/create/step3'))
          .catch(error => console.log(error));
        });
    case 'step3':
      return (() => router.push('/services/create/step4'));
    case 'step4':
      return (() => router.push('/performer/services'));
    default:
    return (() => {
        entityStore.addNewService(
          {
            userId: userStore.userData.id,
            organizationId: organizationStore.organization.id, 
            name: service.value.name, 
            category: service.categories
          }
        ).then(() => router.push('/services/create/step2'))
        .catch(error => console.log(error));
      });
  }
})

const currentComponent = computed(() => {
  switch (router.currentRoute.value.params.slug) {
    case 'step1':
      title.value = 'Создание услуги';
      return Step1
    case 'step2':
      title.value = 'Подробное описание';
      return Step2
    case 'step3':
      title.value = 'Подробное описание';
      return Step3
    case 'step4':
      title.value = 'Подробное описание';
      return Step4
    default:
      title.value = 'Создание услуги';
      return Step1;
  }
})

const entityStore = useEntityStore();
const locationStore = useLocationStore();

const checkList = computed(() => [
  { label: 'Что нужно сделать', path: '/services/create/step1' },
  { label: 'Подробное описание', path: '/services/create/step2' },
  { label: 'География', path: '/services/create/step3' },
  { label: 'Проверка', path: '/services/create/step4' },
]);

const service = computed(() => entityStore.service)
const locationList = computed(() => locationStore.locations)

const location = computed(() => {
  if (service.value.placeOfProductionId && locationList.value) {
    return service.value.placeOfProductionId.map(id => locationStore.getLocationById(id));
  }
  return [];
});

const servicesData = computed(() => ({
  name: data.value.name,
  logo: data.value.logo,
  data: [
    {id: 1, name: 'Категории', value: data.value.categories},
    {id: 2, name: 'Место производства', value: data.value.placeOfProductionId},
    {id: 3, name: 'Мин. партия', value: data.value.minLot},
    {id: 4, name: 'Наличие СТМ', value: data.value.availabilityStm},
    {id: 5, name: 'Бесплатные тестовые образцы', value: data.value.freeTestSamples},
    {id: 6, name: 'Сырье', value: data.value.rawMaterials},
    {id: 7, name: 'Описание', value: data.value.description},
  ],
}))

const data = computed(() => ({
  name: service.value.name,
  logo: service.value.gallery,
  categories: computed(() => entityStore.getEntityLabelById('categories', service.value.categories)).value,
  placeOfProductionId: location.value,
  availabilityStm: computed(() => entityStore.getEntityLabelById('availabilityStm', service.value.availabilityStm)).value,
  freeTestSamples: computed(() => entityStore.getEntityLabelById('freeTestSamples', service.value.freeTestSamples)).value,
  minLot: computed(() => entityStore.getEntityLabelById('minLot', service.value.minLot)).value,
  rawMaterials: computed(() => entityStore.getEntityLabelById('rawMaterials', service.value.rawMaterials)).value,
  description: service.value.description,
  termsOfCooperation: service.value.termsOfCooperation
}))

</script>