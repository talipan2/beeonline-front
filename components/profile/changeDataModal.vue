<template>
  <UiModal 
    class="change-data-modal modal" 
    v-model="settingStore.changeDataModal" 
    title="Данные организации" 
    @confirm="() => confirm()" 
    :closeButton="false"
    size="xs"
  >
    <template #header />
    <template #content>
      <p class="change-data-modal__text">Чтобы изменить данные организации обратитесь в тех. поддержку</p>
      <div class="change-data-modal__button-container">
        <UiButton class="change-data-modal__btn" type="button" variant="quinary" size="large" @click="changeDataLink">Изменить данные</UiButton>
        <UiButton class="change-data-modal__btn change-data-modal__btn__type-cancel" type="button" variant="tertiary" size="large" @click="() =>confirm()">Отменить</UiButton>
      </div>
    </template>
  </UiModal>
</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';


const settingStore = useSettingStore();
const router = useRouter();

const changeDataLink = () => {
  router.push('/support');
  confirm();
}

const confirm = () => {
  settingStore.changeDataModal = false;
}

</script>

<style lang="scss">

.change-data-modal {
  font-size: 1rem;

  .modal-content {
    padding: 2em;
  }

  .modal-title {
    font-size: 2.8em;
  }

  &__text {
    font-size: 1.6em;
    margin-bottom: 2em;
  }

  &__button-container {
    display: flex;
    column-gap: 1em;
    justify-content: right;
  }

  &__btn {
    font-size: 1.2em;
    text-transform: uppercase;

    &__type-cancel {
      color: var(--text-color-primary);
      font-weight: 400;
    }
  }
}

</style>