<template>
  <NuxtLayout name="details-entity" className="related-industry-services" :title="service?.name || 'Загрузка'">
    <template #header>
      <UiBreadCrumb :list="breadcrumb" />
    </template>
    <template #content>
      <IndustryServicesServiceDetails :service="service" v-if="service"/>
    </template>
  </NuxtLayout>
</template>

<script setup>
import { useAdjacentStore } from '~/store/adjacentStore';

const adjacentStore = useAdjacentStore();

const router = useRouter();
const service = ref(null);

const breadcrumb = computed(() => {
    let bc = [
        { label: 'Главная', link: '/' },
        { label: 'Партнерские сервисы', link: '/related-industry-services' },
    ];
    if (service.value) {
        if (service.value.pubcard) {
            bc.push({ label: service.value.pubcard.name, link: `/related-industry-services/${service.value.pubcard.id}` });
        }
        bc.push({ label: service.value.name, link: `` });
    }
    return bc;
});

onMounted(() => {
    adjacentStore.getService(router.currentRoute.value.params.id)
    .then((response) => {
        service.value = response.data;
    });
})

</script>

<style lang="scss">

.related-industry-services {
  font-size: 1rem;
  margin-bottom: .7em;
}

</style>
