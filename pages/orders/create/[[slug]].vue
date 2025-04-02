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
import { useToast } from 'vue-toastification';

useHead({
  title: 'Создание заказа',
  meta: [
    {
      name: 'description',
      content: '',
    },
  ],
});

definePageMeta({
  middleware: 'telegram' 
});

const router = useRouter();
const route = useRoute();
const entityStore = useEntityStore();
const userStore = useUserStore();
const settingStore = useSettingStore();
const organizationStore = useOrganizationStore();
const locationStore = useLocationStore();
const title = ref('');
const toast = useToast();

// если есть заказ который находиться в статусе filling
const fillingOrder = ref(null);

const validSteps = ['step1', 'step2', 'step4'];

// onBeforeMount(() => {
//   if (!validSteps.includes(router.currentRoute.value.params.slug)) {
//     router.replace({ name: 'orders-create-slug', params: { slug: 'step1' } });
//   }
// })

const currentHandleSubmit = computed(() => {
  switch (router.currentRoute.value.params.slug) {
    case 'step1':
      return (async(value, form) => {
        if(!order.value.id) {
          await entityStore.addNewOrder(
            {
              userId: userStore.userData.id,
              organizationId: userStore.userData.organization_id || null, 
              name: order.value.name, 
              category: order.value.categories,
              completionDate: order.value.completionDate,
              status: 'filling',
            },
            form
          ).then(() => {
            entityStore.updateOrderStep(order.value.id, 1)
            router.push('/orders/create/step2')
          })

        } else {
          await entityStore.editOrder(order.value.id, {
            name: order.value.name,
            category: order.value.categories,
            completionDate: order.value.completionDate,
          }).then(() => router.push('/orders/create/step2'))
        }    
      });
    case 'step2':
      return (async (value, form) =>{
          await entityStore.editOrder(order.value.id, {
            description: order.value.description,
            rawMaterials: order.value.rawMaterials,
            price: order.value.price,
            batch: order.value.batch,
            patterns: order.value.patterns,
            termsOfCooperation: order.value.termsOfCooperation,
            cities: order.value.locations.cities.map(item => item.id),
            regions: order.value.locations.regions.map(item => item.id),
            countries: order.value.locations.countries.map(item => item.id),
          }, form).then(() => {
            entityStore.updateOrderStep(order.value.id, 2)
            if(entityStore.fillingOrder && entityStore.fillingOrder.id){
              entityStore.fillingOrder.currentStep = 2
            }
            router.push('/orders/create/step4')
          })

          if(order.value.gallery && order.value.gallery.length) {
            entityStore.uploadOrderGallery(order.value.id, order.value.gallery.map(item => item.id))
          }

          // if(order.value.logo && order.value.logo.id) {
          //   entityStore.uploadOrderLogo(order.value.id, order.value.logo.id)
          // }
          
          if(order.value.tzFiles && order.value.tzFiles.length) {
            entityStore.uploadTzFiles(order.value.id, order.value.tzFiles.map(item => item.id))
          }
        });
    case 'step4':
      return (async (value, form) => {
        await entityStore.editOrder(order.value.id, {
          isSafeDeal: order.value.isSafeDeal,
          isAgreedOrderPlacement: order.value.isAgreedOrderPlacement,
          status: 'under_moderation',
        }, form).then(res => {
          entityStore.fillingOrder = null
          entityStore.resetOrder()
          toast.success('Заказ отправлен на модерацию');
        });
        if(settingStore.isCreateOrder) {
          router.push('/register/step1')
          // settingStore.isCreateOrder = false
        } else {
          router.push(`/customer/orders/show/${order.value.id}`)
          // settingStore.createEntityFinalModal = true;
        }
      });
  } 
})

const handleSubmit = async(value, form) => {
  await currentHandleSubmit.value(value, form);
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

const order = ref(entityStore.order);

const ordersData = computed(() => ({
  name: order.value.name,
  logo: order.value.gallery && order.value.gallery.length ? order.value.gallery[0].url : '',
  alias: data.value.alias,
  countryId: data.value.locations && data.value.locations.length ? data.value.locations[0].countryId : null,
  data: [
    { id: 1, name: 'Категории', value: data.value.categories },
    { id: 2, name: 'Место производства', value: data.value.locations },
    { id: 3, name: 'Партия', value: data.value.batch },
    { id: 4, name: 'Лекала', value: data.value.patterns },
    { id: 5, name: 'Сырье', value: data.value.rawMaterials },
    { id: 6, name: 'Срок выполнения', value: data.value.completionDate },
    { id: 7, name: 'Описание', value: data.value.description },
  ],
}))

const data = computed(() => {
  const {locations, alias} = locationFormatter({cities: [...order.value.locations.cities], regions: [...order.value.locations.regions], countries: [...order.value.locations.countries]});
  return {    
    name: order.value.name,
    logo: order.value.gallery && order.value.gallery.length ? order.value.gallery[0].url : '',
    categories: entityStore.getEntityLabelById('categories', order.value.categories),
    locations: locations,
    alias: alias,
    batch: order.value.batch,
    patterns: entityStore.getEntityLabelById('patterns', order.value.patterns),
    rawMaterials: entityStore.getEntityLabelById('rawMaterials', order.value.rawMaterials),
    completionDate: order.value.completionDate ? formatDate(order.value.completionDate) : '',
    description: order.value.description,
    termsOfCooperation: order.value.termsOfCooperation
  }
})

  
onBeforeMount(async () => {
  // Если данных о текущем заказе нет, загружаем их
  if (!entityStore.fillingOrder?.id) {
    await entityStore.getOrganizationOrders(userStore.userData.organization_id).then((res) => {
      if (res?.data?.orders && Array.isArray(res.data.orders)) {
        const orderInProgress = res.data.orders.find((item) => item.status === 'filling');
        if (orderInProgress) {
          entityStore.fillingOrder = {
            id: orderInProgress.id,
            name: orderInProgress.name,
            description: orderInProgress.description,
            gallery: orderInProgress.gallery || [],
            termsOfCooperation: orderInProgress.conditions,
            batch: orderInProgress.batch ? Number(orderInProgress.batch) : '',
            categories: orderInProgress.product_categories.map(item => item.id) || [],
            rawMaterials:
              orderInProgress.material === null
                ? orderInProgress.material
                : !orderInProgress.material
                ? 0
                : 1,
            patterns:
              orderInProgress.pattern === null
                ? orderInProgress.pattern
                : !orderInProgress.pattern
                ? 0
                : 1,
            price: orderInProgress.price ? Number(orderInProgress.price) : '',
            completionDate: orderInProgress.deadline_at,
            locations: {
              cities: orderInProgress.cities?.map(item => ({ id: item.id, name: locationFormatter(item) })) ?? [],
              regions: orderInProgress.regions?.map(item => ({ id: item.id, name: locationFormatter(item) })) ?? [],
              countries: orderInProgress.countries?.map(item => ({ id: item.id, name: locationFormatter(item) })) ?? [],
            },
            currentStep: orderInProgress.current_step,
            isSafeDeal: orderInProgress.is_safedeal,
            isAgreedOrderPlacement: orderInProgress.tg_publish,
            logo:
              orderInProgress.gallery?.length > 0
                ? orderInProgress.gallery[0]
                : { url: null, id: null },
          };
          order.value = entityStore.fillingOrder;
        }
      }
    });
  }

  if (entityStore.fillingOrder && entityStore.fillingOrder?.id) {
    order.value = entityStore.fillingOrder;
  }

  getLocationsForPubCard();

  // Выполняем редирект после загрузки данных
  handleRedirect();
});

const handleRedirect = () => {
  if (!entityStore.isRedirectedToStep) return;

  const currentStep = entityStore.fillingOrder?.currentStep || 0;

  switch (currentStep) {
    case 0:
      router.push('/orders/create/step1');
      break;
    case 1:
      router.push('/orders/create/step2');
      break;
    case 2:
      router.push('/orders/create/step4');
      break;
  }

  entityStore.isRedirectedToStep = false;
};

function getLocationsForPubCard() {
  if((!order.value.locations.regions.length && userStore.userPubCard?.regions?.length) || 
     (!order.value.locations.countries.length && userStore.userPubCard?.countries?.length)) {
    
    // Для регионов
    if(userStore.userPubCard?.regions?.length && !order.value.locations.regions.length) {
      order.value.locations.regions = userStore.userPubCard.regions.map(item => ({
        id: item.id,
        name: locationFormatter(item)
      }))
    }
    
    // Для стран
    if(userStore.userPubCard?.countries?.length && !order.value.locations.countries.length) {
      order.value.locations.countries = userStore.userPubCard.countries.map(item => ({
        id: item.id,
        name: locationFormatter(item)
      }))
    }
  }
}


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