<template>
  <div class="login">
    <h1 class="login__title">Авторизация без пароля</h1>
    <template v-if="currentAuthPage === 'write-email'">
      <p class="login__subtitle">Введите email, на который вы регистрировали учетную запись. На нее мы отправим код авторизации, который необходимо ввести для входа в личный кабинет.</p>
      <Form class="auth__form" @submit="handleSubmit">
        <UiInput
          :rules="{ required: true, min: 6, email: true }"
          class="auth__input"
          placeholder="E-mail"
          v-model="email"
          name="email"
          label="E-mail"
        />
        <div class="auth__btn-container">
          <UiButton to="/telegram" class="auth__btn" variant="tertiary" size="large"
            >Войти с паролем</UiButton
          >
          <UiButton
            type="submit"
            class="auth__btn"
            variant="quinary"
            size="large"
          >
            Отправить
          </UiButton>
        </div>
      </Form>
    </template>
    <template v-if="currentAuthPage === 'write-password'">
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
          <UiButton to="/telegram" class="auth__btn" variant="tertiary" size="large">
            Войти с паролем
          </UiButton>
          <UiButton
            type="submit"
            class="auth__btn"
            variant="quinary"
            size="large"
          >
            Отправить
          </UiButton>
        </div>
      </Form>
    </template>
  </div>
</template>

<script setup>
import { useUserStore } from '~/store/userStore';


const router = useRouter();

const currentAuthPage = ref('write-email')
const userStore = useUserStore();

const email = ref('');
const password = ref('');


const handleSubmit = (values, form) => {
  userStore.forgotPassword(values, form).then((res) => {
    currentAuthPage.value = 'write-password'
  });
}

const handleSubmitPassword = (values, form) => {
  userStore.authUser({
    email: email.value,
    password: password.value
  }, form).then((res) => {
    router.push({ path: '/customer/orders' });
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

.auth {
  font-family: "lato", sans-serif;

  &__form {
    display: flex;
    flex-direction: column;
    row-gap: 1em;
    font-weight: 400;
    margin-bottom: 1em;
  }

  &__input {
    font-size: 1.6rem;
    padding: 1.25rem;
    position: relative;
    flex: 1;
  }

  &__btn-container {
    display: flex;
    // flex-direction: column;
    gap: 1em;

  }

  &__btn {
    font-size: 1.2rem;
    text-transform: uppercase;
  }

  @include mobile {
    &__input {
      font-size: 1.6rem;
    }
  }
}

</style>