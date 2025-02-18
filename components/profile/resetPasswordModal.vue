<template>
  <UiModal class="reset-password-modal modal" size="xs"  v-model="settingStore.resetPasswordModal" @confirm="() => confirm()" :closeButton="false">
    <template #content>
      <h2 class="reset-password-modal__title">Сброс пароля</h2>
      <p class="reset-password-modal__text">Вы уверены, что хотите сбросить пароль?</p>
      <div class="reset-password-modal__btn-container">
        <UiButton 
          class="reset-password-modal__btn" 
          type="button" 
          variant="quinary" 
          size="large" 
          @click="resetPassword"
        >
          Сбросить
        </UiButton>
        <UiButton 
          class="reset-password-modal__btn 
          reset-password-modal__btn__type-cancel" 
          type="button" 
          variant="tertiary" 
          size="large" 
          @click="confirm"
        >
          Отменить
        </UiButton>
      </div>
    </template>
  </UiModal>
</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';


const settingStore = useSettingStore();
const emit = defineEmits(['reset']);

const resetPassword = () => {
  confirm();
  emit('reset');
}

function confirm() {
  settingStore.resetPasswordModal = false;
}

</script>

<style lang="scss">

.reset-password-modal {
  font-size: 1rem;
  
  .modal-content {
    padding: 2em;
  }

  &__title {
    font-size: 2.8em;
    margin-bottom: 1em;
  }

  &__text {
    font-size: 1.6em;
    margin-bottom: 2em;
  }

  &__btn-container {
    display: flex;
    column-gap: 1em;
    font-size: 1.2em;
    justify-content: flex-end;
  }
  
  &__btn {
    font-weight: 400;
    text-transform: uppercase;
  }

  &__btn__type-cancel {
    color: var(--text-color-secondary);
  }
}

</style>