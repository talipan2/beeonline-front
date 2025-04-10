<template>
  <NuxtLayout name="profile" title="Редактирование услуги" className="entity-edit">
    <template #header>
      <UiBreadCrumb
        :list="[
          { label: 'Главная', link: '/' },
          { label: `Профиль`, link: '/profile' },
          { label: 'Редактирование услуги', link: '' }
        ]"
      />
    </template>
    <template #content>
      <IndustryServicesEditService v-if="service" :data="service"/>
    </template>
    <template #rightSide>
      <div class="h4 mb-1">Предварительный просмотр услуги</div>
      <IndustryServicesCard v-if="service" :data="formattedService" :isPreview="true"/>
    </template>
  </NuxtLayout>
</template>

<script setup>
import { useAdjacentStore } from '~/store/adjacentStore';
import { useEntityStore } from '~/store/entityStore';

const entityStore = useEntityStore();
const adjacentStore = useAdjacentStore();

const router = useRoute();

const service = ref({});

const formattedService = computed(() => {
  return {
    ...service.value,
    categories: entityStore.getEntityLabelById('adjacentCategories', service.value?.categories, true),
  }
});

onMounted(() => {
    adjacentStore.getService(router.params.id)
    .then((response) => {
        service.value = {
            ...response.data,
            categories: response.data.categories.map((item) => item.id),
          };
    });
});

</script>
