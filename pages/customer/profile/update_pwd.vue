<template>
  <NuxtLayout name="profile" title="Смена пароля" class="update-password-layout">
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
      <ProfileUpdatePassword />
    </template>
  </NuxtLayout>
</template>

<script setup>
</script>

<style lang="scss">

.update-password-layout {
  .profile__content {
    flex: 0 1 55%;
  }
}

</style>