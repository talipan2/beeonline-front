<template>
  <NuxtLayout name="profile" title="Профиль" class="update-password-layout">
    <template #header>
      <UiBreadCrumb 
        :list="[
          {label: 'Главная', link: '/'}, 
          { label: 'Кабинет исполнителя', link: '/performer/desktop' },
          { label: 'Профиль', link: '/performer/profile' },
          { label: 'Смена пароля', link: '' }
        ]" 
      />
    </template>
    <template #content>
      <ProfileUpdatePassword role="performer"/>
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