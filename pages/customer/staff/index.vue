<template>
  <NuxtLayout name="profile" title="Сотрудники" class="staff-layout">
    <template #header>
      <UiBreadCrumb :list="[{label: 'Главная', link: '/'}, { label: 'Кабинет заказчика', link: '/customer/desktop' }, { label: 'Сотрудники', link: '' }]" />
    </template>
    <template #content>
      <Staff :role="role"/>
    </template>
  </NuxtLayout>
</template>

<script setup>
import { useUserStore } from '~/store/userStore';


const userStore = useUserStore();

const role = computed(() => userStore.role);

</script>

<style lang="scss">

.staff-layout {
  .profile__content {
    flex: 0 1 70%;
  }
}

</style>