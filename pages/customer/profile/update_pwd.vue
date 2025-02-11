<template>
  <NuxtLayout name="profile" title="Профиль" class="update-password-layout">
    <template #header>
      <UiBreadCrumb 
        :list="[
          {label: 'Главная', link: '/'}, 
          { label: 'Кабинет заказчика', link: '/customer/desktop' },
          { label: 'Профиль', link: '/customer/profile' },
          { label: 'Смена пароля', link: '' }
        ]" 
      />
    </template>
    <template #content>
      <ProfileUpdatePassword role="customer"/>
    </template>
  </NuxtLayout>
</template>

<script setup>

useHead({
  title: 'Профиль',
  meta: [
    {
      name: 'description',
      content: '',
    },
  ],
});

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