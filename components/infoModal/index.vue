<template>
  <UiModal class="info-modal modal" v-model="settingStore.infoModal" title="" @confirm="() => confirm()" :closeButton="false">
    <template #content>
      <h3 class="info-modal__title" v-if="title">{{ title }}</h3>
      <p class="info-modal__text" v-if="text">{{ text }}</p>
      <div class="info-modal__btn-container" v-if="$slots.content">
        <UiButton type="button" class="info-modal__btn" variant="tertiary" @click="confirm" size="around" v-if="!$slots.content">Закрыть</UiButton>
        <slot name="content"></slot>
      </div>
    </template>
  </UiModal>
</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';


const props = defineProps({
  text: {
    type: String,
    default: '',
    required: true,
  },
  title: {
    type: String,
    default: '',
    required: true,
  },
});

const settingStore = useSettingStore();

function confirm() {
  settingStore.infoModal = false;
}

</script>

<style lang="scss">

.info-modal {
  font-size: 1rem;

  .modal-dialog {
    width: 21%;
  }
  
  .modal-content {
    padding: 2em;
  }

  &__title {
    font-size: 2.8em;
    margin-bottom: .9em;
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
  }

  &__btn-container {
    display: flex;
    column-gap: 1em;
    justify-content: end;
  }
}

</style>