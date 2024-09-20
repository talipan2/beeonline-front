<template>
  <NuxtLayout name="profile" title="Редактирование услуги" className="entity-edit">
    <template #header>
      <UiBreadCrumb
        :list="[{ label: 'Главная', link: '/' }, { label: 'Кабинет заказчика', link: '/customer' }, { label: 'Список заказов', link: '/customer/orders' }, { label: 'Редактирование заказа', link: '' }]" />
    </template>
    <template #content>
      <component :is="currentComponent" :title="title" role="customer" :formatData="formatData"  @submit="handleSubmit" :handleBack="previousStep" :data="orderData"/>
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
const id = router.currentRoute.value.params.id;

const order = ref({})
const orderData = computed(() => ({
  name: order.value.name,
  description: order.value.description,
  gallery: order.value.gallery || [],
  termsOfCooperation: order.value.conditions,
  batch: Number(order.value.batch),
  categories: order.value.category || [],
  rawMaterials: !order.value.material ? 0 : 1,
  patterns: !order.value.pattern ? 0 : 1,
  price: Number(order.value.price),
  completionDate: order.value.deadline_at,
  placeOfProduction: order.value.location || [],
}))

const formatData = computed(() => {
  return {
    name: orderData.value.name,
    logo: orderData.value.logo,
    categories: computed(() => entityStore.getEntityLabelById('categories', orderData.value.categories)).value,
    placeOfProductionId: [],
    batch: orderData.value.batch,
    patterns: computed(() => entityStore.getEntityLabelById('patterns', orderData.value.patterns)).value,
    rawMaterials: computed(() => entityStore.getEntityLabelById('rawMaterials', orderData.value.rawMaterials)).value,
    completionDate: `До ${formatDate(orderData.value.completionDate)}`,
    description: orderData.value.description,
    termsOfCooperation: orderData.value.termsOfCooperation
  }
})


const handleSubmit = computed(() => {
  switch (currentStep.value) {
    case 1:
      return (() => {
        entityStore.editOrder(id, {
          name: order.value.name,
        }).then(() => currentStep.value = 2)
      });
    case 2:
      return (() => {
        entityStore.editOrder(id, {
          description: order.value.description,
          rawMaterials: order.value.rawMaterials,
          price: order.value.price,
          batch: order.value.batch,
          patterns: order.value.patterns,
          termsOfCooperation: order.value.termsOfCooperation
        }).then(() => currentStep.value = 3)
      });
    case 3:
      return (() =>{
        entityStore.editOrder(order.value.id, {
          completionDate: order.value.completionDate
        }).then(() => currentStep.value = 4)
        .catch(error => console.log(error));
      });
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
  entityStore.getOrder(id).then(res => order.value = res.data)
})

</script>

<style lang="scss">

</style>