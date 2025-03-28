<template>
  <NuxtLayout name="profile" title="Карточка заказа" class="entity-edit">
    <template #header>
      <UiBreadCrumb
        :list="[{ label: 'Главная', link: '/' }, { label: `Кабинет ${roleName}`, link: '/desktop' }, { label: 'Список заказов', link: '/customer/orders' }, { label: 'Заказ', link: '' }]" />
    </template>
    <template #content>
      <EntityView v-if="!isLoading" :data="orderProps" role="customer" type="order"/>
      <CreateEntityFinalModal :text="'Заказ отправлен на модерацию'"/>
    </template>
  </NuxtLayout>
</template>

<script setup>
import { useEntityStore } from '~/store/entityStore';
import { useLocationStore } from '~/store/locationStore';
import { useUserStore } from '~/store/userStore';

definePageMeta({
  middleware: 'telegram' 
});

const router = useRouter();
const entityStore = useEntityStore();
const locationStore = useLocationStore();
const userStore = useUserStore();

const roleName = userStore.getRoleNameForBreadcrumbs;

const order = ref({});
const isLoading = ref(false);

const orderProps = computed(() => {
  return {
    id: order.value.id,
    name: order.value.name,
    description: order.value.description,
    gallery: order.value.gallery || [],
    conditions: order.value.conditions,
    tzFiles: order.value.tz_files && order.value.tz_files.length ? order.value.tz_files.map(item => item.url) : [],
    status: order.value.status,
    props: {
      batch: {label: "Размер партии", value: Number(order.value.batch)},
      category: { 
        label: "Категория", 
        value: order.value.product_categories && order.value.product_categories.length
        ? entityStore.getEntityLabelById('categories', order.value.product_categories.map(item => item.id))
        : ''},
      rawMaterials: {label: "Сырье", value: !order.value.material ? 'Собственное' : 'Давальческое'},
      pattern: {label: "Лекала", value: !order.value.pattern ? 'Есть лекала' : 'Нужен конструктор'},
      completionDate: {label: "Срок выполнения", value: `До ${formatDate(order.value.deadline_at)}`},
      placeOfProduction: {
        label: "Предпочтительные регионы производства", 
        value: order.value.cities || order.value.regions 
        ? locationStore.getLocationsByIds([], order.value.regions.map(item => item.id), order.value.cities.map(item => item.id)).map(item => item.name)
        : ''
      },
    }
  }
});

function getLocationNames(cities, regions) {
  const names = []
  if(cities && cities.length) {
    names.push(...cities.map(item => item.name))
  }
  if(regions && regions.length) {
    names.push(...regions.map(item => item.name))
  }
  return names
}

isLoading.value = true;
await entityStore.getOrder(router.currentRoute.value.params.id)
  .then((res) => order.value = res.data)
  .finally(() => isLoading.value = false)

// onMounted(() => {
//   isLoading.value = true;
//   entityStore.getOrder(router.currentRoute.value.params.id)
//   .then((res) => order.value = res.data)
//   .finally(() => isLoading.value = false)
// })

</script>