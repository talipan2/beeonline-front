<template>
  <NuxtLayout name="profile" title="Профиль" class="update-password-layout">
    <template #header>
      <UiBreadCrumb
        :list="[
          {label: 'Главная', link: '/'},
          { label: `Кабинет ${roleName}`, link: '/desktop' },
          { label: 'Профиль', link: '/profile' },
          { label: 'Смена пароля', link: '' }
        ]"
      />
    </template>
    <template #content>
      <ProfileUpdatePassword/>
    </template>
  </NuxtLayout>
</template>

<script setup>
import { useUserStore } from '~/store/userStore';

useHead({
  title: 'Профиль',
  meta: [
    {
      name: 'description',
      content: '',
    },
  ],
});

definePageMeta({
    disableMetrika: true,
});

const userStore = useUserStore();

const roleName = userStore.getRoleNameForBreadcrumbs;

</script>

<style lang="scss">

.update-password-layout {
  .profile__content {
    flex: 0 1 55%;
  }
}

@include tablet {
  .update-password-layout {
    .profile__content {
      flex: 0 1 70%;
    }
  }
}

@include mobile {
  .update-password-layout {
    .profile__content {
      flex: 0 1 100%;
    }
  }
}

</style>
