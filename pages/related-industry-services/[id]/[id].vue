<template>
  <NuxtLayout name="details-entity" className="related-industry-services" title="Сертификат соответствия">
    <template #header>
      <UiBreadCrumb :list="[
      {label: 'Главная', link: '/'}, 
      { label: 'Сервисы смежных отраслей', link: '' },
      { label: 'Национальный центр сертификации', link: '' }, 
      { label: 'Сертификат соответствия', link: '/related-industry-services' },
      ]" />
    </template>
    <template #content>
      <IndustryServicesServiceDetails />
    </template>
  </NuxtLayout>
</template>

<script setup>



</script>

<style lang="scss">

.related-industry-services {
  font-size: 1rem;
  margin-bottom: .7em;
}

</style>