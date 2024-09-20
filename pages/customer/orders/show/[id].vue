<template>
  <NuxtLayout name="profile" title="Карточка заказа" class="entity-edit">
    <template #header>
      <UiBreadCrumb
        :list="[{ label: 'Главная', link: '/' }, { label: 'Кабинет заказчика', link: '/performer' }, { label: 'Список заказов', link: '/performer/services' }, { label: 'Заказ', link: '' }]" />
    </template>
    <template #content>
      <EntityView :data="orderProps" role="customer"/>
    </template>
  </NuxtLayout>
</template>

<script setup>
import { useEntityStore } from '~/store/entityStore';


const router = useRouter();
const entityStore = useEntityStore();
const order = ref({});
const orderProps = computed(() => {
  return {
    id: order.value.id,
    name: order.value.name,
    description: order.value.description,
    gallery: order.value.gallery || [],
    conditions: order.value.conditions,
    props: {
      batch: {label: "Размер партии", value: Number(order.value.batch)},
      category: { label: "Категория", value: order.value.category },
      rawMaterials: {label: "Сырье", value: !order.value.material ? 'Собственное' : 'Давальческое'},
      pattern: {label: "Лекала", value: !order.value.pattern ? 'Есть лекала' : 'Нужен конструктор'},
      completionDate: {label: "Срок выполнения", value: `До ${formatDate(order.value.deadline_at)}`},
      placeOfProduction: {label: "Предпочтительные регионы производства", value: order.value.location || ''},
    }
  }
});

onMounted(() => {
  entityStore.getOrder(router.currentRoute.value.params.id).then((res) => order.value = res.data)
})

</script>