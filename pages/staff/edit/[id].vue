<template>
  <NuxtLayout name="profile" title="Сотрудники" class="staff-create-layout">
    <template #header>
      <UiBreadCrumb
        :list="[
          { label: 'Главная', link: '/' },
          { label: `Кабинет ${roleName}`, link: '/desktop' },
          { label: 'Список сотрудников', link: '/staff' },
          { label: 'Имя сотрудника', link: '' },
        ]"
      />
    </template>
    <template #content>
      <StaffEdit :userData="userData"/>
    </template>
  </NuxtLayout>
</template>

<script setup>
import { useUserStore } from '~/store/userStore';

definePageMeta({
    disableMetrika: false,
});

const userStore = useUserStore();

const roleName = userStore.getRoleNameForBreadcrumbs;
const route = useRoute();

const userData = ref({});

onMounted(() => {
  if(route.params.id) {
    userStore.getUser(route.params.id).then(res => {
      if(res && res.data) {
        userData.value = res.data;
        userStore.getNotifications(route.params.id).then(res => {
          if(res && res.notification_settings) {
            userData.value = {...userData.value, notifications: res.notification_settings};
          }
        })
      }
    })
  }
})

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
