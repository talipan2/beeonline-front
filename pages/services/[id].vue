<template>
  <NuxtLayout name="details-entity" title="Пошив крупной партии вязаных изделий ( свитеры, шапки, носки)" badge="Услуга">
    <template #header>
      <UiBreadCrumb
        :list="[
          { label: 'Главная', link: '/' },
          { label: 'Каталог услуг', link: '/orders' },
          { label: 'Заказ', link: '' },
        ]"
      />
    </template>
    <template #content>
      <CatalogOrdersDetails type="service"/>
    </template>
    <template #rightSide>
      <CatalogOtherEntityCompany type="service"/>
    </template>
  </NuxtLayout>
</template>