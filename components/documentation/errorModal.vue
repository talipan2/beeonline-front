<template>
  <UiModal class="error-modal modal" v-model="settingStore.errorModal" title="Ошибка" @confirm="() => confirm()" :closeButton="false">
    <template #header></template>
    <template #content>
      <p class="error-modal__text">{{ errorText }}</p>
      <UiButton type="button" class="error-modal__btn" variant="quinary" size="large" @click="() => confirm()">Закрыть</UiButton>
    </template>
  </UiModal>
</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';

const settingStore = useSettingStore();

const errorText = computed(() => settingStore.errorModalText);

const confirm = () => {
  settingStore.errorModal = false
}


</script>

<style lang="scss">

.error-modal {

  .modal-title {
    font-size: 2.8em;
  }
  
  &__text {
    font-size: 1.6em;
    margin-bottom: 1.5em;
  }

  &__btn {
    font-size: 1.2em;
    padding: .83em;
    margin-left: auto;
    width: fit-content;
    text-transform: uppercase;
  }
}

</style>