<template>
  <NuxtLayout name="info" className="related-industry-services" title="Национальный центр сертификации">
    <template #header>
      <UiBreadCrumb :list="[{label: 'Главная', link: '/'}, { label: 'Национальный центр сертификации', link: '' }]" />
    </template>
    <template #content>
      <IndustryServicesCompanyDetails />
    </template>
  </NuxtLayout>
</template>

<style lang="scss">

.related-industry-services {
  font-size: 1rem;
  margin-bottom: 15.3em;
}

</style>