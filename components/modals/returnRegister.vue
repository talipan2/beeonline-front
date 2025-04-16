<template>
  <UiModal class="register-info-modal modal" size="md" v-model="settingStore.returnRegisterModal" title="" @confirm="() => confirm()" :closeButton="false">
    <template #content>
      <h3 class="register-info-modal__title">Вы не завершили регистрацию, пожалуйста, заполните все данные</h3>
      <div class="register-info-modal__btn-container">
        <UiButton type="button" class="register-info-modal__btn" variant="tertiary" size="large" @click="handleRedirect">Все равно перейти</UiButton>
        <UiButton type="button" class="register-info-modal__btn" variant="quinary" @click="() => confirm()" size="large">Продолжить регистрацию</UiButton>
      </div>
    </template>
  </UiModal>
</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';

const props = defineProps({
  
})

const settingStore = useSettingStore();
const router = useRouter()
const redirectPath = computed(() => settingStore.registerRedirectPath)

const handleRedirect = () => {
  if (redirectPath.value) {
    router.push(redirectPath.value);
    settingStore.registerRedirectConfirm = true
    settingStore.registerRedirectPath = null
  }
  confirm();
}

function confirm() {
  settingStore.returnRegisterModal = false;
}

</script>

<style lang="scss">

.register-info-modal {
  font-size: 1rem;
  
  .modal-content {
    padding: 2em;
  }

  &__title {
    font-size: 2.8em;
    margin-bottom: .9em;
    text-align: center;
  }
  &__text {
    font-size: 1.6em;
    margin-bottom: 1.9em;
  }

  &__btn {
    font-size: 1.2em;
    line-height: 1em;
    font-weight: 400;
    text-transform: uppercase;
    width: 100%;
  }

  &__btn-container {
    display: flex;
    column-gap: 1em;

    @include mobile {
      flex-direction: column;
      row-gap: 1em;
    }
  }
}

</style>