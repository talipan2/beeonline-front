<template>
  <NuxtLayout name="details-entity" title="Пошив крупной партии вязаных изделий ( свитеры, шапки, носки)" badge="Заказ">
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
      <CatalogOrdersDetails type="order"/>
    </template>
    <template #rightSide>
      <CatalogOtherEntityCompany type="order"/>
    </template>
  </NuxtLayout>
</template>
