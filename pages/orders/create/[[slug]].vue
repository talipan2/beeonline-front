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
      <component :is="currentComponent" :title="title" role="customer"/>
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
import { getLocationNameById } from '~/utils/locationName';

const router = useRouter();
const entityStore = useEntityStore();
const locationStore = useLocationStore();
const title = ref('');


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
  { label: 'Что нужно сделать', path: '/orders/create/step1' },
  { label: 'Подробное описание', path: '/orders/create/step2' },
  { label: 'География', path: '/orders/create/step3' },
  { label: 'Проверка', path: '/orders/create/step4' },
]);

const order = computed(() => entityStore.order)
const locationList = computed(() => locationStore.locations)

const location = computed(() => {
  if (order.value.placeOfProductionId && locationList.value) {
    return order.value.placeOfProductionId.map(id => getLocationNameById(id, locationList.value));
  }
  return [];
});

const ordersData = computed(() => ({
  name: order.value.name,
  logo: order.value.logo,
  data: [
    {id: 1, name: 'Категории', value: order.value.categories},
    {id: 2, name: 'Место производства', value: location.value},
    {id: 3, name: 'Партия', value: order.value.batch},
    {id: 4, name: 'Лекала', value: order.value.patterns},
    {id: 5, name: 'Сырье', value: order.value.rawMaterials},
    {id: 6, name: 'Срок выполнения', value: order.value.completionDate},
    {id: 7, name: 'Описание', value: order.value.description},
  ],
}))

  

</script>