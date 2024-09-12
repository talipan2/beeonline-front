<template>
  <NuxtLayout name="profile" title="Заказы">
    <template #header>
      <UiBreadCrumb
        :list="[{ label: 'Главная', link: '/' }, { label: 'Кабинет заказчика', link: '/customer' }, { label: 'Список заказов', link: '' }]" />
    </template>
    <template #content>
      <Entity 
        title="Все заказы"
        subtitle="Размещайте список своих заказов в каталоге заказчиков и ищите исполнителей в кратчайшие сроки с учетом именно ваших потребностей"
        btnLabel="Создать заказ"
        btnLink="/orders/create" 
      />
    </template>
  </NuxtLayout>
</template>