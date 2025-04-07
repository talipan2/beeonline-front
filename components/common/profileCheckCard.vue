<template>
  <div class="check-card">
    <div class="check-card__container">
      <h5 class="check-card__title">
        {{ title }}
      </h5>
      <UiButton :to="changeLink" variant="quinary" class="check-card__link" v-if="changeLink">{{ changeLinkLabel }}</UiButton>
      <UiButton 
        type="button" 
        @click="firstBtn" 
        variant="quinary" 
        class="check-card__link"
        v-if="firstBtn"
      >
        {{ changeLinkLabel }}
      </UiButton>
      <UiButton :to="secondLink" class="check-card__link" variant="quinary" v-if="secondLink">{{ secondLinkLabel }}</UiButton>
      <UiButton 
        type="button" 
        @click="secondBtn" 
        variant="quinary" 
        class="check-card__link"
        v-if="secondBtn"
      >
        {{ secondLinkLabel }}
      </UiButton>
    </div>
    <p class="check-card__text">
      {{ text }}
    </p>
    <slot />
  </div>
</template>

<script setup>

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
  changeLink: {
    type: String,
    default: '',
  },
  changeLinkLabel: {
    type: String,
    default: '',
  },
  secondLink: {
    type: String,
    default: '',
  },
  secondLinkLabel: {
    type: String,
    default: '',
  },
  firstBtn: {
    type: [Function, Boolean],
    default: null,
  },
  secondBtn: {
    type: [Function, Boolean],
    default: null,
  },
});

</script>

<style lang="scss">

.check-card {
  margin-bottom: 7.5em;

  .form-group-data {
      margin-bottom: 2em;
      color: var(--text-color-secondary);
    }
  
    .form-group__title {
      font-family: 'fira-sans', sans-serif;
      margin-bottom: 0;
    }

    .form-group__value {
      font-size: 1.6rem;
      margin-top: 0;
    }

  &__card {
    margin-bottom: 7.5em;
  }
  
  &__container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    column-gap: 3em;
    margin-bottom: 1.5em;  
  }
  
  &__text {
    font-size: 1.3em;
    padding-bottom: 1.53em;
    margin-bottom: 1.53em;
    border-bottom: 1px solid var(--border-color-secondary);
  }

  &__link {
    // color: var(--text-color-ternary);
    font-size: 1.2em;
    text-transform: none;
  }
}

@include mobile {
  .check-card {
    &__title {
      font-size: 1.4rem;
    }
  }
}

</style>