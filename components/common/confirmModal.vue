<template>
  <ModalsRoundBorder class="confirm-modal modal" size="xs" :fixed-header="false">
      <div class="confirm-modal__content">
        <div class="confirm-modal__icon">
          <SvgoAlertIcon class="svg-l"/>
        </div>
        <h3 class="confirm-modal__title" v-if="title">{{ title }}</h3>
        <p class="confirm-modal__text" v-if="message">{{ message }}</p>
        <div class="confirm-modal__buttons">
          <UiButton class="confirm-modal__btn confirm-modal__btn_type_cancel" type="button" variant="quinary" size="large" @click="onCancel" v-if="cancelText">{{ cancelText }}</UiButton>
          <UiButton class="confirm-modal__btn confirm-modal__btn_type_confirm" type="button" variant="quinary" size="large" @click="onConfirm" v-if="confirmText">{{ confirmText }}</UiButton>
        </div>
      </div>
  </ModalsRoundBorder>
</template>

<script setup>

const props = defineProps({
  confirmText: {
    type: String,
    default: '',
  },
  cancelText: {
    type: String,
    default: '',
  },
  message: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  onConfirm: {
    type: Function,
    default: () => {},
  },
  onCancel: {
    type: Function,
    default: () => {},
  },
});

</script>

<style lang="scss">

.confirm-modal {
  font-size: 1rem;
  font-family: 'lato', sans-serif;
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 1em;
  }

  &__icon {
    width: 5em;
    height: 5em;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: #fef3f2;

    svg {
      width: 2.8em;
      height: 2.8em;
      flex-basis: 100%;
      color: #be5151;
    }
  }

  &__title {
    font-size: 1.8em;
    font-weight: 600;
    line-height: 1.4em;
    color: #3c3c53;
    text-align: center;
  }

  &__text {
    font-size: 1.6em;
    font-weight: 400;
    line-height: 1.5em;
    text-align: center;
    color: #8a8a9f;
  }

  &__buttons {
    display: flex;
    column-gap: 1em;
    justify-content: center;
    margin-top: 2em;
  }

  &__btn {
    font-size: 1.2em;
    text-transform: uppercase;
  }

  &__btn_type_cancel {
    color: #000;
    background-color: #eae7ee;

    @include hover {
      background-color: #eae7ee;
    }
  }

  &__btn_type_confirm {
    color: #fff;
    background-color: #d14237;

    @include hover {
      background-color: #a11106;
      color: #fff;
      border-color: #a5150a;
    }
  }

  @include mobile {
    .modal-content {
      border-radius: 20px;
    }
  }
}

</style>