<template>
  <NuxtLayout name="profile" title="Редактирование услуги" className="entity-edit">
    <template #header>
      <UiBreadCrumb
        :list="[{ label: 'Главная', link: '/' }, { label: 'Кабинет исполнителя', link: '/performer' }, { label: 'Список услуг', link: '/performer/services' }, { label: 'Редактирование услуги', link: '' }]" />
    </template>
    <template #content>
      <component :is="currentComponent" :title="title" role="performer" :formatData="formatData"  @submit="handleSubmit" :handleBack="previousStep" :data="serviceData"/>
    </template>    
  </NuxtLayout>
</template>

<script setup>
import Step1 from '~/components/createEntity/step1.vue';
import Step2 from '~/components/createEntity/step2.vue';
import Step3 from '~/components/createEntity/step3.vue';
import Step4 from '~/components/createEntity/step4.vue';
import { useEntityStore } from '~/store/entityStore';

const router = useRouter();
const entityStore = useEntityStore();

const currentStep = ref(1);
const title = ref('');
const alertsList = ref([]);
const id = router.currentRoute.value.params.id;
// const formatData = ref({});

const service = ref({})
const serviceData = computed(() => ({
  name: service.value.name,
  logo: service.value.gallery,
  categories: service.value.categories || [],
  placeOfProductionId: service.value.placeOfProductionId || [],
  availabilityStm: service.value.is_stm,
  freeTestSamples: service.value.free_samples,
  minLot: service.value.min_lot || [],
  rawMaterials: [service.value.materials_own ? 5 : '', service.value.materials_tolling ? 6 : ''].filter(Boolean) || [],
  description: service.value.description,
  termsOfCooperation: service.value.conditions
}))

const formatData = computed(() => {
  return {
    name: serviceData.value.name,
    categories: computed(() => entityStore.getEntityLabelById('categories', serviceData.value.categories)).value,
    placeOfProductionId: serviceData.value.placeOfProductionId,
    availabilityStm: computed(() => entityStore.getEntityLabelById('availabilityStm', serviceData.value.availabilityStm)).value,
    freeTestSamples: computed(() => entityStore.getEntityLabelById('freeTestSamples', serviceData.value.freeTestSamples)).value,
    minLot: computed(() => entityStore.getEntityLabelById('minLot', serviceData.value.minLot)).value,
    rawMaterials: computed(() => entityStore.getEntityLabelById('rawMaterials', serviceData.value.rawMaterials)).value,
    description: serviceData.value.description,
    termsOfCooperation: serviceData.value.termsOfCooperation
  }
})


const handleSubmit = computed(() => {
  switch (currentStep.value) {
    case 1:
      return (() => {
        entityStore.editService(id, {
          name: serviceData.value.name,
        }).then(() => currentStep.value = 2)
      });
    case 2:
      return (() => {
        entityStore.editService(id, {
          description: serviceData.value.description,
          rawMaterials: serviceData.value.rawMaterials,
          availabilityStm: serviceData.value.availabilityStm,
          freeTestSamples: serviceData.value.freeTestSamples,
          minLot: serviceData.value.minLot,
          termsOfCooperation: serviceData.value.termsOfCooperation
        }).then(() => currentStep.value = 3)
      });
    case 3:
      return (() => currentStep.value = 4);
    case 4:
      return (() => currentStep.value = 4);
    default:
      return (() => currentStep.value = 2);
  }
})

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value -= 1
  }
}

const currentComponent = computed(() => {
  switch (currentStep.value) {
    case 1:
      title.value = 'Основные данные услуги';
      return Step1
    case 2:
      return Step2
    case 3:
      return Step3
    case 4:
      return Step4
    default:
      title.value = 'Основные данные услуги';
      return Step1;
  }
})

onMounted(() => {
  entityStore.getService(id).then(res => service.value = res.data)
})

</script>

<style lang="scss">

</style>