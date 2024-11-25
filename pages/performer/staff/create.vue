<template>
  <NuxtLayout name="profile" title="Сотрудники" class="staff-create-layout">
    <template #header>
      <UiBreadCrumb
        :list="[
          { label: 'Главная', link: '/' },
          { label: 'Кабинет исполнителя', link: '/performer/desktop' },
          { label: 'Список сотрудников', link: '/performer/staff' },
          { label: 'Создание нового сотрудника', link: '' },
        ]"
      />
    </template>
    <template #content>
      <StaffCreate />
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
