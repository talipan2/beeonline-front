<template>
  <NuxtLayout name="info" className="related-industry-services" :title="pubcard?.name">
    <template #header>
      <UiBreadCrumb :list="breadcrumb" />
    </template>
    <template #content>
      <IndustryServicesCompanyDetails :pubcard="pubcard" v-if="pubcard"/>
    </template>
  </NuxtLayout>
</template>

<style lang="scss">

.related-industry-services {
  font-size: 1rem;
  margin-bottom: 15.3em;
}

</style>

<script setup>
import { useOrganizationStore } from '~/store/organizationStore';

const organizationStore = useOrganizationStore();
const router = useRouter();

const pubcard = ref(null);
const services = ref(null);

const breadcrumb = computed(() => {
    let bc = [{label: 'Главная', link: '/'}, {label: 'Партнерские сервисы', link: '/related-industry-services'}];
    if (pubcard.value) {
        bc.push({label: pubcard.value.name, link: ``});
    }
    return bc;
});

onMounted(() => {
    organizationStore.getPubCard(router.currentRoute.value.params.pubcard_id).then((response) => {
        pubcard.value = response;
    });
})
</script>
