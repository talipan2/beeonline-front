<template>
  <NuxtLayout name="profile" title="Сотрудники" class="staff-create-layout">
    <template #header>
      <UiBreadCrumb
        :list="[
          { label: 'Главная', link: '/' },
          { label: 'Кабинет заказчика', link: '/customer/desktop' },
          { label: 'Список сотрудников', link: '/customer/staff' },
          { label: 'Имя сотрудника', link: '' },
        ]"
      />
    </template>
    <template #content>
      <StaffEdit />
    </template>
  </NuxtLayout>
</template>

<style lang="scss">
.staff-create-layout {
  .profile__content {
    flex: 0 1 50%;
  }
}
</style>
