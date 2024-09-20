<template>
  <NuxtLayout name="create">
    <template #left>
      <CommonCheckList class="sticky" 
        title="Создание заказа" 
        adviceTitle="Для публикации заказа нужно заполнить достаточно информации о заказе" 
        :checkList="checkList" 
      />
    </template>
    <template #content>
      <component :is="currentComponent" :title="title" role="customer" @submit="handleSubmit" :formatData="data" :data="order"/>
    </template>
    <template #right>
      <div class="h4">Предварительный просмотр заказа</div>
      <CreateEntityPreview :data="ordersData"/>
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
const entityStore = useEntityStore();
const userStore = useUserStore();
const organizationStore = useOrganizationStore();
const locationStore = useLocationStore();
const title = ref('');

const validSteps = ['step1', 'step2', 'step3', 'step4'];

onBeforeMount(() => {
  if (!validSteps.includes(router.currentRoute.value.params.slug)) {
    router.replace({ name: 'orders-create-slug', params: { slug: 'step1' } });
  }
})

const handleSubmit = computed(() => {
  switch (router.currentRoute.value.params.slug) {
    case 'step1':
      return (() => {
        entityStore.addNewOrder(
          {
            userId: userStore.userData.id,
            organizationId: organizationStore.organization.id, 
            name: order.value.name, 
            category: order.value.categories
          }
        ).then(() => router.push('/orders/create/step2'))
        .catch(error => console.log(error));
      });
    case 'step2':
      return (() =>{
          entityStore.editOrder(order.value.id, {
            description: order.value.description,
            rawMaterials: order.value.rawMaterials,
            price: order.value.price,
            batch: order.value.batch,
            patterns: order.value.patterns,
            termsOfCooperation: order.value.termsOfCooperation
          }).then(() => router.push('/orders/create/step3'))
          .catch(error => console.log(error));
        });
    case 'step3':
    return (() =>{
          entityStore.editOrder(order.value.id, {
            completionDate: order.value.completionDate
          }).then(() => router.push('/orders/create/step4'))
          .catch(error => console.log(error));
        });
    case 'step4':
      return (() => router.push('/orders/services'));
    default:
    return (() => {
        entityStore.addNewOrder(
          {
            userId: userStore.userData.id,
            organizationId: organizationStore.organization.id, 
            name: order.value.name, 
            category: order.value.categories
          }
        ).then(() => router.push('/orders/create/step2'))
        .catch(error => console.log(error));
      });
  }
})

const currentComponent = computed(() => {
  switch (router.currentRoute.value.params.slug) {
    case 'step1':
      title.value = 'Создание заказа';
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
      title.value = 'Создание заказа';
      return Step1;
  }
})

const checkList = computed(() => [
  { label: 'Что нужно сделать', value: '/orders/create/step1' },
  { label: 'Подробное описание', value: '/orders/create/step2' },
  { label: 'География', value: '/orders/create/step3' },
  { label: 'Проверка', value: '/orders/create/step4' },
]);

const order = computed(() => entityStore.order)

const ordersData = computed(() => ({
  name: order.value.name,
  logo: order.value.logo,
  data: [
    { id: 1, name: 'Категории', value: data.value.categories },
    { id: 2, name: 'Место производства', value: data.value.placeOfProductionId },
    { id: 3, name: 'Партия', value: data.value.batch },
    { id: 4, name: 'Лекала', value: data.value.patterns },
    { id: 5, name: 'Сырье', value: data.value.rawMaterials },
    { id: 6, name: 'Срок выполнения', value: data.value.completionDate },
    { id: 7, name: 'Описание', value: data.value.description },
  ],
}))

const data = computed(() => ({
  name: order.value.name,
  logo: order.value.logo,
  categories: computed(() => entityStore.getEntityLabelById('categories', order.value.categories)).value,
  placeOfProductionId: computed(() => locationStore.getLocationsByIds(order.value.placeOfProductionId)).value,
  batch: order.value.batch,
  patterns: computed(() => entityStore.getEntityLabelById('patterns', order.value.patterns)).value,
  rawMaterials: computed(() => entityStore.getEntityLabelById('rawMaterials', order.value.rawMaterials)).value,
  completionDate: order.value.completionDate,
  description: order.value.description,
  termsOfCooperation: order.value.termsOfCooperation
}))

  

</script>