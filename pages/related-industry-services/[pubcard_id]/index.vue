<template>
  <NuxtLayout name="info" className="related-industry-services" :title="pubcard?.name">
    <template #header>
      <UiBreadCrumb :list="breadcrumb" />
    </template>
    <template #content>
      <IndustryServicesCompanyDetails @pubcard:loaded="pubcard = $event" :id="router.currentRoute.value.params.pubcard_id"/>
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
const router = useRouter();

const pubcard = ref(null);

const breadcrumb = computed(() => {
    let bc = [{label: 'Главная', link: '/'}, {label: 'Сервисы', link: '/related-industry-services'}];
    if (pubcard.value) {
        bc.push({label: pubcard.value.name, link: ``});
    }
    return bc;
});
</script>
