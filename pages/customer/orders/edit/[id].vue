<template>
  <NuxtLayout name="profile" title="Редактирование услуги" className="entity-edit">
    <template #header>
      <UiBreadCrumb
        :list="[
          { label: 'Главная', link: '/' },
          { label: `Кабинет ${roleName}`, link: '/desktop' },
          { label: 'Список заказов', link: '/customer/orders' },
          { label: 'Редактирование заказа', link: '' }
        ]"
      />
    </template>
    <template #content>
      <component
        :is="currentComponent"
        :title="title" role="customer"
        :formatData="formatData"
        :handleSubmit="handleSubmit"
        :handleBack="previousStep"
        :data="orderData"
        type="edit"
      />
    </template>
    <template #rightSide>
      <div class="h4">Предварительный просмотр заказа</div>
      <CreateEntityPreview :data="previewCardData"/>
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
import { useUserStore } from '~/store/userStore';
import {useToast} from "vue-toastification";
import { useSettingStore } from '~/store/settingStore';

definePageMeta({
  middleware: 'telegram',
  disableMetrika: true,
});

const router = useRouter();
const entityStore = useEntityStore();
const locationStore = useLocationStore();
const settingStore = useSettingStore();
const userStore = useUserStore();
const toast = useToast();

const roleName = userStore.getRoleNameForBreadcrumbs;

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

const previewCardData = computed(() => ({
  name: orderData.value.name,
  logo: orderData.value.gallery && orderData.value.gallery.length ? orderData.value.gallery[0].url : '',
  alias: formatData.value.alias,
  data: [
    { id: 1, name: 'Категории', value: formatData.value.categories },
    { id: 2, name: 'Место производства', value: formatData.value.locations },
    { id: 3, name: 'Партия', value: formatData.value.batch },
    { id: 4, name: 'Лекала', value: formatData.value.patterns },
    { id: 5, name: 'Сырье', value: formatData.value.rawMaterials },
    { id: 6, name: 'Срок выполнения', value: formatData.value.completionDate },
    { id: 7, name: 'Описание', value: formatData.value.description },
  ],
}))



const formatData = computed(() => {
  const {locations, alias} = locationFormatter({cities: [...orderData.value.locations.cities], regions: [...orderData.value.locations.regions], countries: [...orderData.value.locations.countries]});

  return {
    name: orderData.value.name,
    logo: orderData.value.logo,
    categories: entityStore.getEntityLabelById('categories', orderData.value.categories),
    locations: locations,
    alias: alias,
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
      return (async (value, form) => {
        await entityStore.editOrder(orderData.value.id, {
          name: orderData.value.name,
          completionDate: orderData.value.completionDate,
          categories: orderData.value.categories,
          status: 'under_moderation',
        }, form)
        .then(() => currentStep.value = 2)
        .catch(error => {
          console.log(error)
          scrollToError(error)
        });
      });
    case 2:
      return (async (value, form) => {
        await entityStore.editOrder(orderData.value.id, {
          description: orderData.value.description,
          rawMaterials: orderData.value.rawMaterials,
          price: orderData.value.price,
          batch: orderData.value.batch,
          patterns: orderData.value.patterns,
          termsOfCooperation: orderData.value.termsOfCooperation,
          cities: orderData.value.locations.cities.map(item => item.id),
          regions: orderData.value.locations.regions.map(item => item.id),
          countries: orderData.value.locations.countries.map(item => item.id),
          gallery: orderData.value.gallery,
          status: 'under_moderation',
        }, form).then(() => currentStep.value = 4)

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
      return (async(value, form) => {
        await entityStore.editOrder(orderData.value.id, {
          // isSafeDeal: orderData.value.isSafeDeal,
          // isAgreedOrderPlacement: orderData.value.isAgreedOrderPlacement,
          status: 'under_moderation',
        }, form)
        settingStore.createEntityFinalModal = true;
        router.push(`/customer/orders/show/${orderData.value.id}`);
        toast.success('Заказ отправлен на модерацию');
      });
    default:
      return (() => currentStep.value = 2);
  }
})


const handleSubmit = async(value, form) => {
 await currentHandleSubmit.value(value, form)
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
      router.push({path: '/customer/orders/edit/' + id, query: {step: 1}});
      return Step1
    case 2:
      router.push({path: '/customer/orders/edit/' + id, query: {step: 2}});
      return Step2
    // case 3:
    //   router.push({path: '/customer/orders/edit/' + id, query: {step: 3}});
    //   return Step3
    case 4:
      router.push({path: '/customer/orders/edit/' + id, query: {step: 4}});
      return Step4
    default:
      title.value = 'Основные данные услуги';
      return Step1;
  }
})

watch(() => router.currentRoute.value.query.step, (newVal) => {
  currentStep.value = Number(newVal)
})

await entityStore.getOrder(id).then(res => {
  if (res && res.data) {
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
      locations: {
        cities: [],
        regions: res.data.regions?.map(region => ({...region, name: locationFormatter({regions: [{...region}]}).locations[0]})) || [],
        countries: res.data.countries?.map(country => ({...country, name: locationFormatter({countries: [{...country}]}).locations[0]})) || []},
      isSafeDeal: Boolean(res.data.is_safedeal),
      isAgreedOrderPlacement: Boolean(res.data.tg_publish)
    }
  }
})

onMounted(() => {
  // entityStore.getOrder(id).then(res => {
  //   if(res && res.data) {
  //     orderData.value = {
  //       id: res.data.id,
  //       name: res.data.name,
  //       description: res.data.description,
  //       logo: res.data.logo,
  //       gallery: res.data.gallery,
  //       tzFiles: res.data.tz_files,
  //       termsOfCooperation: res.data.conditions,
  //       batch: Number(res.data.batch),
  //       categories: res.data.product_categories && res.data.product_categories.map(item => item.id) || [],
  //       rawMaterials: !res.data.material ? 0 : 1,
  //       patterns: !res.data.pattern ? 0 : 1,
  //       price: Number(res.data.price),
  //       completionDate: res.data.deadline_at,
  //       locations: res.data.cities && res.data.regions && {cities: res.data.cities.map(item => item.id), regions: res.data.regions.map(item => item.id)},
  //       isSafeDeal: Boolean(res.data.is_safedeal)
  //     }
  //   }
  // })
})

onMounted(() => {
  if(router.currentRoute.value.query.step) {
    currentStep.value = Number(router.currentRoute.value.query.step);
  }
})

</script>

<style lang="scss">

</style>
