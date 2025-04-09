<template>
  <div class="login">
    <h1 class="login__title">Восстановление пароля</h1>
    <template v-if="stage === 'email'">
      <CommonAlerts alert="Мы отправили письмо со ссылкой для восстановления!" type="info" v-if="isSendedMailToReset" />
      <p class="login__subtitle">Вы можете восстановить пароль, отправив свою электронную почту. На нее мы вышлем письмо с инструкцией по восстановлению.</p>
      <Form class="forgot__form" @submit="handleSubmit">
        <UiInput
          :rules="{ required: true, min: 6, email: true }"
          class="auth__input"
          placeholder="E-mail"
          v-model="email"
          name="email"
          label="E-mail"
        />
        <div class="forgot__btn-container">
          <UiButton
            to="/login"
            class="forgot__btn forgot__btn_type-back"
            variant="default"
            >Вернуться к авторизации</UiButton
          >
          <UiButton type="submit" to="/login" class="forgot__btn" variant="quinary" size="large"
            >Отправить</UiButton
          >
        </div>
      </Form>
    </template>
    <template v-else>
      <p class="login__subtitle">На ваш регистрационный email отправлен код. Введите его в поле ниже.</p>
      <Form class="auth__form" @submit="handleSubmitPassword">
        <UiInput
          :rules="{ required: true, }"
          class="auth__input"
          placeholder="Код из письма"
          v-model="password"
          name="email-code"
          label="Код из письма"
          type="password"
        />
        <div class="auth__btn-container">
          <UiButton to="/login" class="auth__btn" variant="tertiary" size="large"
            >Войти с паролем</UiButton
          >
          <UiButton
            type="submit"
            class="auth__btn"
            variant="quinary"
            size="large"
            >Отправить</UiButton
          >
        </div>
      </Form>
    </template>
  </div>
</template>

<script setup>
import { useUserStore } from '~/store/userStore';

const userStore = useUserStore();

const email = ref('');
const password = ref('')

const stage = ref('email')
const router = useRouter();
const isSendedMailToReset = ref(false);

const handleSubmit = (values, form) => {
  userStore.forgotPassword(values, form).then((res) => {
    isSendedMailToReset.value = true
    stage.value = 'password'
  });
}

const handleSubmitPassword = (values, form) => {
  userStore.authUser({
    email: email.value,
    password: password.value
  }, form).then((res) => {
    router.push({ path: '/desktop' });
  })
}

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

.forgot {
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