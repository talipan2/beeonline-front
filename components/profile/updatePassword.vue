<template>
  <div class="profile-update-password">
    <CommonAlerts alert="На вашу почту было отправленно письмо для сброса пароля" type="info" v-if="isSendedMailToReset" />
    <h2 class="profile-update-password__title">Смена пароля</h2>
    <p class="profile-update-password__text">Указанные данные не разглашаются третьим лицам и необходимы для успешной работы на сервисе</p>
    <UiForm class="profile-update-password__form" :submit="handleResetPassword">
      <div class="form-group">
        <div class="form-group-data profile-update-password__old-password">
          <label class="form-group__title">
            Старый пароль*
            <UiInput
              v-model="passwordData.old_password"
              :rules="{ required: true, min: 6 }"
              class="form-group__value" 
              name="old_password" 
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
              v-model="passwordData.new_password"
              :rules="{ required: true, min: 6 }"
              class="form-group__value" 
              name="new_password" 
              label="Новый пароль" 
              :type="showNewPassword ? 'text' : 'password'" 
              placeholder="Не менее 6 символов"
            >
              <template #action>
                <button
                  type="button"
                  class="profile-update-password__show-password form-group__value"
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
              v-model="passwordData.confirmPassword"
              :rules="{ required: true, min: 6, confirmed: passwordData.new_password }"
              class="form-group__value" 
              name="confirmPassword" 
              label="Подтвердите пароль" 
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
      <UiButton type="button" @click="settingStore.resetPasswordModal = true" class="profile-update-password__forgot-btn" variant="default">Забыли пароль?</UiButton>
      <UiButton type="submit" class="profile-update-password__btn" variant="quinary" size="large">
        Изменить пароль
        <SvgoBtnArrow class="svg-lx" />  
      </UiButton>
    </UiForm>
    <ProfileResetPasswordModal @reset="forgotPassword"/>
    <Alerts />
  </div>
</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';
import { useUserStore } from '~/store/userStore';

const props = defineProps({

})

const userStore = useUserStore();
const settingStore = useSettingStore();
const router = useRouter();
const isSendedMailToReset = ref(false);

const showNewPassword = ref(false);
const showConfirmPassword = ref(false);
const passwordData = ref({
  old_password: '',
  new_password: '',
  confirmPassword: '',
})

async function handleResetPassword(values, form) {
  if(passwordData.value.new_password === passwordData.value.confirmPassword) {
    await userStore.resetPassword({
      old_password: passwordData.value.old_password,
      new_password: passwordData.value.new_password,
    }, form)
    .then(res => {
      settingStore.setAlert('success', 'Пароль успешно изменен');
      router.push(`/profile`);
    })
    .catch(err => {
      settingStore.setAlert('error', err.response.data.message);
    })
  }
}

function forgotPassword() {
  isSendedMailToReset.value = true;
}


</script>

<style lang="scss">

.profile-update-password {
  font-size: 1rem;
  &__title {
    font-size: 2.4em;
    margin-bottom: .5em;

    @include mobile {
      font-size: 1.6em;
    }
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

  .form-group-data {
    margin-bottom: 0;
  }

  &__old-password {
    flex: 0 1 47%;

    @include mobile {
      flex: 1;
    }
  }

  &__forgot-btn {
    font-size: 1em;
    width: fit-content;
    margin-bottom: 2em;
    text-transform: none;
    color: #a9abac;
    padding: 0;
  }

  &__btn {
    text-transform: uppercase;
    width: 60%;
    column-gap: 1em;

    @include tablet {
      font-size: 1.1rem;
      padding: 7.5px;
    }

    @include small-mobile {
      width: 100%;
    }
  }

  &__show-password {
    font-size: 1.23em;
    border: 2px solid var(--border-color-quaternary);
    border-radius: 0 100px 100px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3em;
    box-sizing: border-box;
    margin-top: .6em;

    &:hover {
      background-color: var(--button-background-primary);

      svg {
        fill: #fff
      }
    }

    @include mobile {
      width: 2em;
      margin-top: .5em;
    }
  }

}

</style>