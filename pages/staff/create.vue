<template>
  <NuxtLayout name="profile" title="Сотрудники" class="staff-create-layout">
    <template #header>
      <UiBreadCrumb
        :list="[
          { label: 'Главная', link: '/' },
          { label: `Кабинет ${roleName}` , link: '/desktop' },
          { label: 'Список сотрудников', link: '/staff' },
          { label: 'Создание нового сотрудника', link: '' },
        ]"
      />
    </template>
    <template #content>
      <StaffCreate />
    </template>
  </NuxtLayout>
</template>

<script setup>
import { useUserStore } from '~/store/userStore';


useHead({
  title: 'Создание нового сотрудника',
  meta: [
    {
      name: 'description',
      content: '',
    },
  ],
});

const userStore = useUserStore();

const roleName = userStore.getRoleNameForBreadcrumbs;

</script>

<style lang="scss">
.staff-create-layout {
  .profile__content {
    flex: 0 1 50%;
  }
}

@include tablet {
  .staff-create-layout {
    .profile__content {
      flex: 0 1 70%;
    }
  }  
}

@include mobile {
  .staff-create-layout {
    .profile__content {
      flex: 0 1 100%;
    }
  }  
}
</style>
