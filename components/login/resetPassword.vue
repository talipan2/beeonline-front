<template>
  <div class="login">
    <h1 class="login__title">Обновление пароля</h1>
    <Form class="reset__form" @submit="handleSubmit">
      <UiInput
        :rules="{ required: true }"
        class="auth__input"
        v-model="formData.token"
        name="token"
        label="token"
        type="hidden"
      />
      <UiInput
        :rules="{ required: true, min: 6, email: true }"
        class="auth__input"
        placeholder="E-mail"
        v-model="formData.email"
        name="email"
        label="E-mail"
      />
      <UiInput
        :rules="{ required: true, min: 6 }"
        class="auth__input"
        placeholder="Пароль"
        v-model="formData.password"
        name="password"
        label="Пароль"
        type="password"
      />
      <UiInput
        :rules="{ required: true, min: 6, confirmed: formData.password }"
        class="auth__input"
        placeholder="Повторите пароль"
        v-model="formData.confirmPassword"
        name="confirmPassword"
        label="Повторите пароль"
        type="password"
      />
      <div class="reset__btn-container">
        <UiButton
          to="/login"
          class="reset__btn reset__btn_type-back"
          variant="default"
          >Вернуться к авторизации</UiButton
        >
        <UiButton type="submit" to="/login" class="reset__btn" variant="quinary" size="large"
          >Отправить</UiButton
        >
      </div>
    </Form>
  </div>
</template>

<script setup>
import { useUserStore } from '~/store/userStore';


const userStore = useUserStore();

const formData = ref({
  email: '',
  password: '',
  confirmPassword: '',
  token: ''
})

const router = useRouter();

const handleSubmit = (values, form) => {
  userStore.resetForgotPassword(values, form);
}

onMounted(() => {
  if(router.currentRoute.value.query && router.currentRoute.value.query.token) {
    formData.value.token = router.currentRoute.value.query?.token
    formData.value.email = router.currentRoute.value.query?.email
  }
});

</script>

<style lang="scss">

.login {
  font-size: 1rem;

  &__title {
    font-size: 3.6em;
    margin-bottom: .83em;
  }

  &__subtitle {
    font-size: 1.6em;
    margin-bottom: 1.5em;
  }
}

.reset {
  font-family: "lato", sans-serif;

  &__form {
    display: flex;
    flex-direction: column;
    row-gap: 1em;
    font-weight: 400;
    margin-bottom: 1em;
  }

  &__input {
    font-size: 1.6em;
    padding: 1.25em;
    position: relative;
    flex: 1;
  }

  &__btn-container {
    display: flex;
    gap: 1em;
    justify-content: space-between;
  }

  &__btn {
    flex: 0 1 50%;
    font-size: 1.2rem;
    text-transform: uppercase;
  }

  &__btn_type-back {
    flex: 0 0 auto;
    padding: 0;
    text-transform: none;
    font-size: 1.6rem;
    color: #a9abac;

    &:hover {
      color: #828586 !important;
      text-decoration: underline;
    }
  }
}

</style>