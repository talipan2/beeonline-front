<template>
  <div class="profile-update-password">
    <h2 class="profile-update-password__title">Смена пароля</h2>
    <p class="profile-update-password__text">Указанные данные не разглашаются третьим лицам и необходимы для успешной работы на сервисе</p>
    <Form class="profile-update-password__form">
      <div class="form-group">
        <div class="form-group-data profile-update-password__old-password">
          <label class="form-group__title">
            Старый пароль*
            <UiInput
              :rules="{ required: true, min: 6 }"
              class="form-group__value" 
              name="oldPassword" 
              label="Старый пароль" 
              type="password" 
              placeholder="*****" 
            />
          </label>
        </div>
      </div>
      <div class="form-group">
        <div class="form-group-data">
          <label class="form-group__title">
            Новый пароль*
            <UiInput 
              :rules="{ required: true, min: 6 }"
              class="form-group__value" 
              name="newPassword" 
              label="Старый пароль" 
              :type="showNewPassword ? 'text' : 'password'" 
              placeholder="Не менее 6 символов"
            >
              <template #action>
                <button
                  type="button"
                  class="profile-update-password__show-password"
                  @click="showNewPassword = !showNewPassword"
                >
                  <SvgoViews class="svg-lx" fill="#6937a5" />
                </button>
              </template>
            </UiInput>
          </label>
        </div>
        <div class="form-group-data">
          <label class="form-group__title">
            Подтвердите пароль
            <UiInput 
              :rules="{ required: true, min: 6 }"
              class="form-group__value" 
              name="confirmPassword" 
              label="Старый пароль" 
              :type="showConfirmPassword ? 'text' : 'password'" 
              placeholder="Не менее 6 символов"
            >
              <template #action>
                <button
                  type="button"
                  class="profile-update-password__show-password"
                  @click="showConfirmPassword = !showConfirmPassword"
                >
                  <SvgoViews class="svg-lx" fill="#6937a5" />
                </button>
              </template>
            </UiInput>
          </label>
        </div>
      </div>
      <UiButton type="button" @click="settingStore.resetPasswordModal = true" class="profile-update-password__forgot-btn" variant="default">Забыли пароль</UiButton>
      <UiButton class="profile-update-password__btn" variant="quinary" size="large">
        Изменить пароль
        <SvgoBtnArrow class="svg-lx" />  
      </UiButton>
    </Form>
    <ProfileResetPasswordModal />
  </div>
</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';


const settingStore = useSettingStore();
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);

</script>

<style lang="scss">

.profile-update-password {
  font-size: 1rem;
  &__title {
    font-size: 2.4em;
    margin-bottom: .5em;
  }

  &__text {
    font-size: 1.3em;
    margin-bottom: 1.5em;
  }

  &__form {
    font-size: 1.6em;
    .input-container {
      flex: 1;
    }
  }

  &__old-password {
    flex: 0 1 47%;
  }

  &__forgot-btn {
    width: fit-content;
    margin-bottom: 1em;
  }

  &__btn {
    text-transform: uppercase;
    width: 60%;
    column-gap: 1em;
  }

  &__show-password {
    font-size: 1.23em;
    border: 2px solid var(--border-color-quaternary);
    border-radius: 0 100px 100px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3em;
    margin-top: .6em;

    &:hover {
      background-color: var(--button-background-primary);

      svg {
        fill: #fff
      }
    }
  }

}

</style>