<template>
  <UiModal title="Авторизация" v-model="settingStore.authModalStatus" @confirm="() => confirm()" class="auth-modal modal">
    <template #header />
    <template #content>
      <form class="auth-modal__form" @submit="handleSubmit">
        <UiInput class="auth-modal__input" placeholder="E-mail" v-model="email"/>
        <div class="auth-modal__input-container">
          <UiInput type="password" placeholder="Пароль" class="auth-modal__input auth-modal__input_type-password" v-model="password">
        </UiInput>
          <button class="auth-modal__show-password">
            <SvgoViews class="svg-lx" fill="#6937a5"/>
          </button>
        </div>

        <div class="auth-modal__btn-container">
          <UiButton type="submit" class="auth-modal__btn" variant="quinary" size="large">Войти</UiButton>
          <UiButton class="auth-modal__btn" variant="tertiary" size="large">Войти без пароля</UiButton>
        </div>
        <div class="auth-modal__btn-container">
          <UiCheckbox variant="square" class="auth-modal__checkbox">
            Запомнить меня
          </UiCheckbox>
          <NuxtLink to="" class="auth-modal__link">Забыли пароль?</NuxtLink>
        </div>
      </form>
      <div class="auth-modal__soc-reg">
        <div class="auth-modal__soc-divider">
          <p>Или войти через</p>
        </div>
          <div class="auth-modal__soc-links">
            <a href="https://test.bee-online.ru/auth/google?action=auth">
              <SvgoGoogle class="svg-lx" />
            </a>
            <a href="https://test.bee-online.ru/auth/vkontakte?action=auth">
              <SvgoVkontakte class="svg-lx"/>
            </a>
          </div>
        </div>
    </template>
    <template #footer>
      <h3 class="auth-modal__subtitle">Впервые на портале?</h3>
      <p class="auth-modal__text">Зарегистрируйтесь на портале и получите полный доступ к функционалу. Выберите, кем вы являетесь:</p>
      <div class="auth-modal__btn-container">
        <UiButton class="auth-modal__btn"  variant="quinary" size="large">Заказчик</UiButton>
        <UiButton class="auth-modal__btn"  variant="quinary" size="large">Исполнитель</UiButton>
      </div>
    </template>
  </UiModal>
</template>

<script setup>

import { useUserStore } from '~/store/userStore';
import { useSettingStore } from '~/store/settingStore';

const userStore = useUserStore();
const settingStore = useSettingStore();

const email = ref('');
const password = ref('');

const handleSubmit = (event) => {
  event.preventDefault();
  userStore.authUser(email.value, password.value).then((res) => {
    settingStore.authModalStatus = false;
    console.log(res)
  }).catch((err) => {
    console.log(err)
  })
}

const confirm = () => {
  settingStore.authModalStatus = false;
};

</script>

<style lang="scss" >

.auth-modal {
  font-family: 'lato', sans-serif;

  .modal-dialog {
    max-width: 40em;
  }

  .modal-content {
    padding: 2em;
    width: 100%;
  }

  .modal-title {
    font-size: 2.8em;
    margin-block: 1.66em 1.11em;
  }

  &__form {
    display: flex;
    flex-direction: column;
    row-gap: 1em;
    font-weight: 400;
    margin-bottom: 1em;
  }


  &__input-container {
    display: flex;
    max-height: 6em;

  }

  &__input { 
    font-size: 1.6em;
    padding: 1.25em;
    position: relative;
    flex: 1;
  }

  &__input_type-password {
    border-right: none;
  }

  &__show-password {
    border: 2px solid var(--border-color-quaternary);
    width: 100%;
    flex: 0 6em;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      background-color: var(--button-background-primary);
      svg {
        fill: var(--button-background-quaternary)
      }
    }
  }

  &__checkbox {
    .checkbox__label {
      font-size: 1.6em;
      color: #000;
    }
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

  &__link {
    font-size: 1.6em;
    color: #a9abac;

    &:hover {
      text-decoration: underline;
    }
  }

  &__label {
    font-size: 1.6em;
  }

  &__soc-divider {
    display: flex;
    align-items: center;

    &::before, &::after {
      content: "";
      display: block;
      flex: 1 1 100%;
      height: 1px;
      background-color: #F0F0F0;
      width: 100%;
    }

    p {
      white-space: nowrap;
      font-size: 1.2em;
      color: #757575;
      font-family: 'Inter', sans-serif;
    }

  }
  
  &__soc-links {
    padding-block: 1em;
    margin-bottom: 3em;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 1em;
    border-bottom: 1px solid #c4c4c4;

    svg {
      border-radius: 3em;
    }
    
    a:hover {
      svg {
        box-shadow: 0 0 1em 0 rgba(0, 0, 0, 0.3);
      }

    }
    
  }

  &__subtitle {
    font-family: 'fira-sans', sans-serif;
    font-size: 2.4em;
    margin-bottom: .83;
  }

  &__text {
    font-size: 1.3em;
    margin-bottom: 1.53em;
  }



}

</style>