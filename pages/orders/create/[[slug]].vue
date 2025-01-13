<template>
  <NuxtLayout name="create">
    <template #left>
      <CommonCheckList class="create__checklist" 
        title="Создание заказа" 
        adviceTitle="Для публикации заказа нужно заполнить достаточно информации о заказе" 
        :checkList="checkList" 
      />
    </template>
    <template #content>
      <component :is="currentComponent" :title="title" role="customer" :handleSubmit="handleSubmit" :formatData="data" :data="order"/>
    </template>
    <template #right>
      <CommonCheckList class="create__checklist create__checklist_type_right" 
        title="Создание заказа" 
        adviceTitle="Для публикации заказа нужно заполнить достаточно информации о заказе" 
        :checkList="checkList" 
      />
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
import { useSettingStore } from '~/store/settingStore';
import { useUserStore } from '~/store/userStore';

const router = useRouter();
const route = useRoute();
const entityStore = useEntityStore();
const userStore = useUserStore();
const settingStore = useSettingStore();
const organizationStore = useOrganizationStore();
const locationStore = useLocationStore();
const title = ref('');

// если есть заказ который находиться в статусе filling
const fillingOrder = ref(null);

const validSteps = ['step1', 'step2', 'step4'];

onBeforeMount(() => {
  if (!validSteps.includes(router.currentRoute.value.params.slug)) {
    router.replace({ name: 'orders-create-slug', params: { slug: 'step1' } });
  }
})

const currentHandleSubmit = computed(() => {
  switch (router.currentRoute.value.params.slug) {
    case 'step1':
      return (() => {
        if(!order.value.id) {
          entityStore.addNewOrder(
            {
              userId: userStore.userData.id,
              organizationId: userStore.userData.organization_id || null, 
              name: order.value.name, 
              category: order.value.categories,
              completionDate: order.value.completionDate,
              status: 'filling',
            }
          ).then(() => {
            entityStore.updateOrderStep(order.value.id, 1)
            router.push('/orders/create/step2')
          })
          .catch(error => console.log(error));

        } else {
          entityStore.editOrder(order.value.id, {
            name: order.value.name,
            category: order.value.categories,
            completionDate: order.value.completionDate,
          }).then(() => router.push('/orders/create/step2'))
          .catch(error =>  console.log(error));
        }    
      });
    case 'step2':
      return (() =>{
          // entityStore.uploadOrderLogo(1, order.value.logo).then((res) => console.log(res))
          entityStore.editOrder(order.value.id, {
            description: order.value.description,
            rawMaterials: order.value.rawMaterials,
            price: order.value.price,
            batch: order.value.batch,
            patterns: order.value.patterns,
            termsOfCooperation: order.value.termsOfCooperation,
            cities: order.value.locations.cities,
            regions: order.value.locations.regions,
          }).then(() => {
            entityStore.updateOrderStep(order.value.id, 2)
            entityStore.fillingOrder.currentStep = 2
            router.push('/orders/create/step4')
          })
          .catch(error => console.log(error));

          if(order.value.gallery && order.value.gallery.length) {
            entityStore.uploadOrderGallery(order.value.id, order.value.logo)
          }
          if(order.value.tzFiles && order.value.tzFiles.length) {
            entityStore.uploadTzFiles(order.value.id, order.value.gallery)
          }
        });
    case 'step4':
      return (() => {
        entityStore.editOrder(order.value.id, {
          isSafeDeal: order.value.isSafeDeal,
          status: 'under_moderation',
        }).then(res => entityStore.fillingOrder = null);
        if(settingStore.isCreateOrder) {
          router.push('/register/step1')
          settingStore.isCreateOrder = false
        } else {
          router.push('/customer/orders')
        }
      });
  } 
})

const handleSubmit = () => {
  currentHandleSubmit.value();
}

const currentComponent = computed(() => {
  switch (router.currentRoute.value.params.slug) {
    case 'step1':
      title.value = 'Создание заказа';
      return Step1
    case 'step2':
      return Step2
    case 'step3':
      return Step3
    case 'step4':
      return Step4
    // default:
    //   title.value = 'Создание заказа';
    //   return Step1;
  }
})

const checkList = computed(() => [
  { label: 'Что нужно сделать', value: '/orders/create/step1' },
  { label: 'Подробное описание', value: '/orders/create/step2' },
  { label: 'География', value: '/orders/create/step3' },
  { label: 'Проверка', value: '/orders/create/step4' },
]);

const order = ref(entityStore.order);

const ordersData = computed(() => ({
  name: order.value.name,
  logo: order.value.gallery.length > 0 ? order.value.gallery.getAll('image[]')[0] : '',
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
  completionDate: order.value.completionDate ? formatDate(order.value.completionDate) : '',
  description: order.value.description,
  termsOfCooperation: order.value.termsOfCooperation
}))

  
onBeforeMount(() => {
  if(!entityStore.fillingOrder && !entityStore.fillingOrder?.id) {
    entityStore.getOrganizationOrders(userStore.userData.organization_id)
    .then((res) => {
      if(res && res.data && res.data.orders && Array.isArray(res.data.orders)) {
        res.data.orders.find(item => {
          if(item.status === 'filling') {
            entityStore.fillingOrder = {
              id: item.id,
              name: item.name,
              description: item.description,
              gallery: item.gallery || [],
              termsOfCooperation: item.conditions,
              batch: item.batch ? Number(item.batch) : '',
              categories: item.category || [],
              rawMaterials: item.material === null ? item.material : (!item.material ? 0 : 1),
              patterns: item.pattern === null ? item.pattern : (!item.pattern ? 0 : 1),
              price: item.price ? Number(item.price) : '',
              completionDate: item.deadline_at,
              cities: item.cities || [],
              regions: item.regions || [],
              currentStep: item.current_step,
              isSafeDeal: item.is_safedeal,
            }
            order.value = entityStore.fillingOrder
          }
        })
      }
    })
  } else {
    order.value = entityStore.fillingOrder
  }
})

onMounted(() => {
  if(!entityStore.isRedirectedToStep) return
  if(entityStore.fillingOrder && entityStore.fillingOrder.currentStep && entityStore.fillingOrder.currentStep === 1) {
    router.push('/orders/create/step2')
    entityStore.isRedirectedToStep = false;
  }
  if(entityStore.fillingOrder && entityStore.fillingOrder.currentStep && entityStore.fillingOrder.currentStep === 2) {
    router.push('/orders/create/step4')
    entityStore.isRedirectedToStep = false;
  }
})



</script>

<style lang="scss">

.create__checklist_type_right {
  display: none;

  @include tablet {
    display: block;
    margin-bottom: 2.5rem;
  }

  @include mobile {
    display: none;
  }
}

</style>