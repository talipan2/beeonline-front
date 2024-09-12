<template>
  <NuxtLayout name="profile" title="Услуги">
    <template #header>
      <UiBreadCrumb
        :list="[{ label: 'Главная', link: '/' }, { label: 'Кабинет исполнителя', link: '/performer' }, { label: 'Список услуг', link: '' }]" />
    </template>
    <template #content>
      <Entity
        title="Все заказы"
        subtitle="Размещайте список своих услуг в каталоге исполнителей и ищите заказчиков в кратчайшие сроки с учетом именно ваших потребностей."
        btnLabel="Создать услугу"
        btnLink="/services/create" 
      />
    </template>
  </NuxtLayout>
</template>