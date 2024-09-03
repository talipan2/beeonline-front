<template>
  <UiNewDropdown :arrow="false" :placement="'bottom-end'" ref="chooseRegisterRole">
    <UiButton variant="secondary" size="large">Регистрация</UiButton>
    <template #content >
      <div class="choose-register">
        <button class="choose-register__btn" @click="registerCustomer">Заказчик</button>
        <button class="choose-register__btn" @click="registerPerformer">Исполнитель</button>
      </div>
    </template>
  </UiNewDropdown>
</template>

<script setup>
import { useUserStore } from '~/store/userStore';

const router = useRouter();
const userStore = useUserStore();
const chooseRegisterRole = ref(null);

const registerCustomer = () => {
  userStore.role = 'customer';
  localStorage.setItem('role', 'customer');
  router.push({ path: '/register' })
  chooseRegisterRole.value.tippy.hide();
}

const registerPerformer = () => {
  userStore.role = 'performer';
  localStorage.setItem('role', 'performer');
  router.push({ path: '/register' })
  chooseRegisterRole.value.tippy.hide();
}

</script>

<style lang="scss">

.choose-register {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: .3rem;
  padding: 2.4rem;
}

.choose-register__btn {
  font-size: 1.4rem;
  color: var(--text-color-primary);
  width: 100%;
  text-align: left;
  padding: .3rem .6rem; 

  &:hover {
    color: var(--text-color-primary);
    background-color: #e9ecef;
  }
}

</style>