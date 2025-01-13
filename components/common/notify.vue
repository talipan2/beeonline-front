<template>
  <div class="notify" :class="`notify_${type}`">
    <SvgoAlertIcon class="notify__icon svg-m" />
    <div class="notify__content">
      <h4 class="notify__title" v-if="title">{{ title }}</h4>
      <p class="notify__text" v-if="text">{{ text }}</p>
      <UiButton type="button" class="notify__btn" variant="default" size="large" @click="btnFunction" v-if="btnText">{{ btnText }}</UiButton>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: value => ['warning', 'success', 'danger'].includes(value),
  },
  title: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
  btnText: {
    type: String,
    default: '',
  },
  btnFunction: {
    type: Function,
    default: () => {},
  }
})

</script>

<style lang="scss">

.notify {
  font-family: "fira-sans", sans-serif;
  position: relative;
  font-size: 1rem;
  display: flex;
  border: 1px solid #9b94ff;
  padding: 1.6em;
  background-color: #d1d3ff;
  margin-bottom: 2em;

  &_round {
    border-radius: 1em;
  }

  &_danger {
    background-color: #ffd1d1;
    border-color: #ff9494;

    .notify__icon {
      color: #de5434;
    }
  }

  &_warning {
    background-color: #fff7ee;
    border-color: #ffd2a8;

    .notify__icon {
      color: #ffbe82;
    }
  }

  &_success {
    background-color: #ddedd1;
    border-color: #b6e990;

    .notify__icon {
      color: #12b76a;
    }
  }

  &__icon {
    font-size: 3.2em;
    width: 1em;
    height: 1em;
    flex: 0 0 1em;
    color: var(--text-color-primary);
  }

  &__content {
    flex: 1 1 100%;
    padding: 0 3.6em 0 1.6em;

    p {
      margin-bottom: 0.5em;
    }
  }

  &__title {
    font-weight: 500;
    font-size: 1.4em;
    line-height: 1.42;
    margin-bottom: 0.28em;
  }

  &__text {
    font-family: "fira-sans", sans-serif;
    font-size: 1.2em;
    line-height: 1.66;
  }
  
  &__btn {
    font-family: "lato", sans-serif;
    font-size: 1.2em;
    text-transform: uppercase;
    font-weight: 600;
    margin-top: 1.6em;
    padding: 0;
  }

  &__close {
    font-size: 1em;
    position: absolute;
    top: 1.6em;
    right: 1.6em;
    width: 1.4em;
    height: 1.4em;
  }

  &__close::before,
  &__close::after {
    font-size: 1.4em;
    height: 2px;
    width: 1em;
  }
}
</style>
