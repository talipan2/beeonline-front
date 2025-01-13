<template>
  <NuxtLayout name="details-entity" :title="data.name" badge="Заказ">
    <template #header>
      <UiBreadCrumb
        :list="[
          { label: 'Главная', link: '/' },
          { label: 'Каталог заказов', link: '/orders' },
          { label: 'Заказ', link: '' },
        ]"
      />
    </template>
    <template #content>
      <CatalogDetails type="order" :pubCard="pubCard" :entityData="formatData"/>
    </template>
    <template #rightSide>
      <CatalogOtherEntityCompany type="order"/>
    </template>
  </NuxtLayout>
</template>

<script setup>
import { useEntityStore } from '~/store/entityStore';
import { useOrganizationStore } from '~/store/organizationStore';

const router = useRouter();
const entityStore = useEntityStore();
const organizationStore = useOrganizationStore();
const data = ref({});
const pubCard = ref({});
const formatData = computed(() => {
  if(!data.value) return []
  return {
      props: [
        {name: 'Категории:', value: ["Детская одежда", 'Термобелье', 'Носочно-чулочная продукция',  'Сумки и аксессуары',  'Ткани, фурнитура, материалы'], link: ['1', '2', '3']},
        {name: 'Лекала:', value: [entityStore.getEntityLabelById('patterns', data.value.pattern)], link: ['1', '2', '3']},
        {name: 'Сырье:', value: [data.value.material ? 'Давальческое' : 'Собственное'], link: ['1', '2']},
        {name: 'Размер партии:', value: parseInt(data.value.batch)},
        {name: 'Сроки выполнения:', value: "до 17/06/2021"},
        {name: 'Предпочтительные регионы производства:', value: 'Адыгейск, Адыгея Респ, Россия'},
      ],
      description: data.value.description,
      conditions: data.value.conditions,
      gallery: data.value.gallery,
      name: data.value.name
    }
})

onMounted(async () => {
    try {
      const ordersResponse = await entityStore.getOrder(router.currentRoute.value.params.id);
      console.log(ordersResponse.data)
      data.value = ordersResponse.data;
  
      try {
        const pubCardResponse = await organizationStore.getPubCard(data.value.organization_id);
        pubCard.value = pubCardResponse;
      } catch (err) {
        console.error(err);
      }
    } catch (err) {
      console.error(err);
    }
  }
);


</script>
