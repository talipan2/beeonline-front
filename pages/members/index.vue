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
import { useOrganizationStore } from '~/store/organizationStore';

const organizationStore = useOrganizationStore();

const data = computed(() => organizationStore.pubCardsList);

onMounted(() => {
  organizationStore.getPubCardsList()
})

</script>