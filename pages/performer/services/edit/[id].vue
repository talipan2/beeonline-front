<template>
  <NuxtLayout name="profile" title="Редактирование услуги" className="entity-edit">
    <template #header>
      <UiBreadCrumb
        :list="[{ label: 'Главная', link: '/' }, { label: 'Кабинет исполнителя', link: '/performer/desktop' }, { label: 'Список услуг', link: '/performer/services' }, { label: 'Редактирование услуги', link: '' }]" />
    </template>
    <template #content>
      <component :is="currentComponent" :title="title" role="performer" :formatData="formatData"  :handleSubmit="handleSubmit" :handleBack="previousStep" :data="serviceData"/>
      {{ serviceData }}
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

const router = useRouter();
const entityStore = useEntityStore();
const locationStore = useLocationStore();

const currentStep = ref(1);
const title = ref('');
const alertsList = ref([]);
const id = router.currentRoute.value.params.id;
// const formatData = ref({});

const service = ref({})
// const serviceData = computed(() => ({
//   name: service.value.name,
//   logo: service.value.gallery,
//   categories: service.value.categories || [],
//   placeOfProductionId: service.value.placeOfProductionId || [],
//   availabilityStm: Number(service.value.is_stm),
//   freeTestSamples: Number(service.value.free_samples),
//   minLot: service.value.min_lot || [],
//   rawMaterials: [service.value.materials_own ? 5 : '', service.value.materials_tolling ? 6 : ''].filter(Boolean) || [],
//   description: service.value.description,
//   termsOfCooperation: service.value.conditions
// }))

const serviceData = ref({
  name: '',
  logo: '',
  categories: [],
  locations: {
    cities: [],
  },
  availabilityStm: null,
  freeTestSamples: null,
  minLot: [],
  rawMaterials: [],
  description: '',
  termsOfCooperation:'',
  gallery: [],
  tzFiles: [],
})

const formatData = computed(() => {
  return {
    name: serviceData.value.name,
    categories: entityStore.getEntityLabelById('categories', serviceData.value.categories),
    placeOfProductionId: locationStore.getLocationsByIds([], [], serviceData.value.locations.cities),
    availabilityStm: entityStore.getEntityLabelById('availabilityStm', serviceData.value.availabilityStm),
    freeTestSamples: entityStore.getEntityLabelById('freeTestSamples', serviceData.value.freeTestSamples),
    minLot: entityStore.getEntityLabelById('minLot', serviceData.value.minLot),
    rawMaterials: entityStore.getEntityLabelById('rawMaterials', serviceData.value.rawMaterials),
    description: serviceData.value.description,
    termsOfCooperation: serviceData.value.termsOfCooperation
  }
})


const currentHandleSubmit = computed(() => {
  switch (currentStep.value) {
    case 1:
      return (() => {
        entityStore.editService(id, {
          name: serviceData.value.name,
          categories: serviceData.value.categories,
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
        }).then(() => {currentStep.value = 3})

        if(serviceData.value.gallery && serviceData.value.gallery.length) {
          const galleryIds = serviceData.value.gallery.map(item => item.id)
          entityStore.uploadServiceGallery(id, galleryIds)
        }

        if(serviceData.value.tzFiles && serviceData.value.tzFiles.length) {
          const tzFilesIds = serviceData.value.tzFiles.map(item => item.id)
          entityStore.uploadServiceFiles(id, tzFilesIds)
        }
      });
    case 3:
      return (() => {
        entityStore.editService(id, {
          cities: serviceData.value.locations.cities
        })
        currentStep.value = 4
      });
    case 4:
      return (() => router.push('/performer/services'));
    default:
      return (() => currentStep.value = 2);
  }
})

const handleSubmit = () => {
  currentHandleSubmit.value()
}

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
  entityStore.getService(id).then(res => {
    if(res && res.data) {
      serviceData.value = {
        id: res.data.id,
        name: res.data.name,
        logo: res.data.gallery && res.data.gallery.length ? res.data.gallery[0] : {url: null, id: null},
        categories: res.data.product_categories ? res.data.product_categories.map(item => item.id) : [],
        locations: res.data.cities ? {cities: res.data.cities.map(item => item.id)}: {},
        availabilityStm: Number(res.data.is_stm),
        freeTestSamples: Number(res.data.free_samples),
        minLot: res.data.batches && res.data.batches.length ? res.data.batches.map(item => item.id) : [],
        rawMaterials: [res.data.materials_own ? 1 : '', res.data.materials_tolling ? 0 : ''].filter(item => item !== '') || [],
        description: res.data.description,
        termsOfCooperation: res.data.conditions,
        gallery: res.data.gallery || [],
        tzFiles: res.data.tz_files || []
      }
    }
  })
})

</script>

<style lang="scss">

</style>