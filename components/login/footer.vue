<template>
  <div class="login-footer">
    <h3 class="login-footer__subtitle">Впервые на портале?</h3>
    <p class="login-footer__text">
      Зарегистрируйтесь на портале и получите полный доступ к функционалу.
      Выберите, кем вы являетесь:
    </p>
    <div class="login-footer__btn-container">
      <UiButton
        type="button"
        class="login-footer__btn"
        @click="registerCustomer"
        variant="quinary"
        size="large"
        >Заказчик
      </UiButton>
      <UiButton
        type="button"
        class="login-footer__btn"
        variant="quinary"
        @click="registerPerformer"
        size="large"
        >Производитель
      </UiButton>
    </div>
  </div>
</template>

<script setup>
import { useSettingStore } from "~/store/settingStore";
import { useUserStore } from "~/store/userStore";

const settingStore = useSettingStore();
const userStore = useUserStore();
const router = useRouter();

const registerCustomer = () => {
  userStore.role = "customer";
  router.push({ path: "/register", query: { role: "customer" } });
  settingStore.authModalStatus = false;
};

const registerPerformer = () => {
  userStore.role = "performer";
  router.push({ path: "/register", query: { role: "performer" } });
  settingStore.authModalStatus = false;
};

</script>

<style lang="scss">
.login-footer {
  padding-top: 3em;
  border-top: 1px solid #c4c4c4;

  &__subtitle {
    font-family: "fira-sans", sans-serif;
    font-size: 2.4em;
    margin-bottom: 0.83;
  }

  &__text {
    font-size: 1.3em;
    margin-bottom: 1.53em;
  }

  &__btn-container {
    display: flex;
    justify-content: space-between;
    column-gap: 1em;
  }

  &__btn {
    flex: 1;
    justify-content: center;
    text-transform: uppercase;
    font-size: 1.2em;
    font-weight: 400;
    padding: 1em;
  }

}

</style>
