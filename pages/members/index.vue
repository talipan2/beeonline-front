<template>
  <NuxtLayout name="catalog" title="Участники портала" :className="'members'">
    <template #header>
      <UiBreadCrumb
        :list="[{ label: 'Главная', link: '/' }, { label: 'Каталог заказов', link: '' }]" />
    </template>
    <template #leftSide>
      <CatalogMembersFilter />
    </template>
    <template #content>
      <CatalogMembersList :data="data" />
    </template>
  </NuxtLayout>
</template>

<script setup>
import { useLocationStore } from '~/store/locationStore';
import { useOrganizationStore } from '~/store/organizationStore';

const organizationStore = useOrganizationStore();
const locationStore = useLocationStore();

const data = computed(() => {
  return organizationStore.pubCardsList.map(item => {
    return {
      id: item.id,
      name: item.name,
      logo: item.logo,
      location: item.regions && item.cities ? { regions: item.regions.map(item => item.id), cities: item.cities.map(item => item.id) } : [],
      description: item.description,
      fillRating: item.fill_rating,
      entityCount: 1,
      category: [],
      rawMaterials: [],
      type: item.type,
    }
  })
});


onMounted(() => {
  organizationStore.getPubCardsList()
})



</script>