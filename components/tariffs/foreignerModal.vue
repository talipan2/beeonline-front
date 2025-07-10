<template>
  <UiModal
    v-model="settingStore.foreignerModal"
    @confirm="confirm"
    class="modal"
    :closeButton="false"
  >
  <template #content>
    <div class="foreigner-modal">
      <h2 class="foreigner-modal__title">
        Внимание!
      </h2>
      <p class="foreigner-modal__description">
        {{ text }}
      </p>
      <div class="foreigner-modal__buttons">
        <UiButton
          type="button"
          variant="quinary"
          size="large"
          class="foreigner-modal__button"
          @click="confirm"
        >
          Закрыть
        </UiButton>
        <!-- <UiButton
          type="button"
          variant="quinary"
          size="large"
          class="foreigner-modal__button"
          @click="handleOpenPayModal"
        >
          Подключить тариф
        </UiButton> -->
      </div>
    </div>
  </template>

  </UiModal>
</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';

const props = defineProps({
  text: {
    type: String,
    required: 'Ваша карточка компании отправлена на модерацию! В ближайшее время с вами свяжется менеджер.',
  },
});

const settingStore = useSettingStore();

const emit = defineEmits(['payFunction']);

const handleOpenPayModal = () => {
  emit('payFunction');
};

const confirm = () => {
  settingStore.foreignerModal = false;
};
</script>

<style lang="scss">
.foreigner-modal {
  &__title {
    font-size: 2.8em;
    margin-bottom: 1em;
  }

  &__description {
    font-size: 1.6em;
    margin-bottom: 2em;
  }

  &__buttons {
    font-size: 1.2em;
    display: flex;
    column-gap: 1em;
    justify-content: flex-end;
  }

  &__button {
    text-transform: uppercase;
  }
}
</style>