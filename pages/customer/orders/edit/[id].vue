<template>
  <NuxtLayout name="profile" title="Редактирование услуги" className="entity-edit">
    <template #header>
      <UiBreadCrumb
        :list="[{ label: 'Главная', link: '/' }, { label: 'Кабинет заказчика', link: '/customer/desktop' }, { label: 'Список заказов', link: '/customer/orders' }, { label: 'Редактирование заказа', link: '' }]" />
    </template>
    <template #content>
      <component :is="currentComponent" :title="title" role="customer" :formatData="formatData"  :handleSubmit="handleSubmit" :handleBack="previousStep" :data="orderData"/>
      {{ orderData }}
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
const id = router.currentRoute.value.params.id;

const order = ref({})

const orderData = ref({
  id: null,
  name: '',
  description: '',
  gallery: [],
  termsOfCooperation: '',
  batch: '',
  categories: [],
  rawMaterials: null,
  patterns: null,
  price: null,
  completionDate: '',
  locations: [],
  isSafeDeal: false,
})

const formatData = computed(() => {
  return {
    name: orderData.value.name,
    logo: orderData.value.logo,
    categories: entityStore.getEntityLabelById('categories', orderData.value.categories),
    placeOfProductionId: orderData.value.locations && orderData.value.locations.cities && orderData.value.locations.regions 
      ? locationStore.getLocationsByIds([], orderData.value.locations.regions, orderData.value.locations.cities)
      : [],
    batch: orderData.value.batch,
    patterns: entityStore.getEntityLabelById('patterns', orderData.value.patterns),
    rawMaterials: entityStore.getEntityLabelById('rawMaterials', orderData.value.rawMaterials),
    completionDate: `До ${formatDate(orderData.value.completionDate)}`,
    description: orderData.value.description,
    termsOfCooperation: orderData.value.termsOfCooperation
  }
})

const currentHandleSubmit = computed(() => {
  switch (currentStep.value) {
    case 1:
      return (() => {
        console.log(orderData.value.categories)
        entityStore.editOrder(orderData.value.id, {
          name: orderData.value.name,
          completionDate: orderData.value.completionDate,
          categories: orderData.value.categories
        })
        .then(() => currentStep.value = 2)
        .catch(error => {
          console.log(error)
          scrollToError(error)
        });
      });
    case 2:
      return (() => {
        entityStore.editOrder(orderData.value.id, {
          description: orderData.value.description,
          rawMaterials: orderData.value.rawMaterials,
          price: orderData.value.price,
          batch: orderData.value.batch,
          patterns: orderData.value.patterns,
          termsOfCooperation: orderData.value.termsOfCooperation,
          cities: orderData.value.locations.cities,
          regions: orderData.value.locations.regions,
          gallery: orderData.value.gallery,
        }).then(() => currentStep.value = 4)

        if(orderData.value.gallery && orderData.value.gallery.length) {
          const galleryIds = orderData.value.gallery.map(item => item.id)
          entityStore.uploadOrderGallery(orderData.value.id, galleryIds)
        }
        
        if(orderData.value.tzFiles && orderData.value.tzFiles.length) {
          const tzFilesIds = orderData.value.tzFiles.map(item => item.id)
          entityStore.uploadOrderFiles(orderData.value.id, tzFilesIds)
        }
      });
    case 4:
      return (() => {
        entityStore.editOrder(orderData.value.id, {
          isSafeDeal: orderData.value.isSafeDeal
        })
        router.push('/customer/orders')
      });
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
  entityStore.getOrder(id).then(res => {
    if(res && res.data) {
      orderData.value = {
        id: res.data.id,
        name: res.data.name,
        description: res.data.description,
        logo: res.data.logo,
        gallery: res.data.gallery,
        tzFiles: res.data.tz_files,
        termsOfCooperation: res.data.conditions,
        batch: Number(res.data.batch),
        categories: res.data.product_categories && res.data.product_categories.map(item => item.id) || [],
        rawMaterials: !res.data.material ? 0 : 1,
        patterns: !res.data.pattern ? 0 : 1,
        price: Number(res.data.price),
        completionDate: res.data.deadline_at,
        locations: res.data.cities && res.data.regions && {cities: res.data.cities.map(item => item.id), regions: res.data.regions.map(item => item.id)},
        isSafeDeal: Boolean(res.data.is_safedeal)
      }
      console.log(orderData.value)
    }
  })
})

</script>

<style lang="scss">

</style>