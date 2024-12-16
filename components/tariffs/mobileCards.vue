<template>
  <div class="tariff-card">
    <div class="tariff-card__header">
      <h3 class="tariff-card__title">{{ tariff.title }}</h3>
      <p class="tariff-card__duration">{{ duration }}</p>
    </div>
    <p class="tariff-card__discount" v-if="discount && tariff.value !== 'free'">{{ `(-${discount}%)`}}</p>
    <p class="tariff-card__price">{{ formatMoney(price, currency, 0) }}</p>
    <ul class="tariff-card__list">
      <li class="tariff-card__item" v-for="item in feature" :key="item">
        <div class="tariff-card__item-icon">
          <SvgoChecked class="svg-m"/>
        </div>
        <p class="tariff-card__item-text">
          {{ item.feature }}<br>
          <span v-if="typeof item.value === 'string'" class="tariff-card__item-value">
            {{ item.value }}
          </span>
        </p>
      </li>
    </ul>
    <UiButton v-if="price > 0" type="button" @click="$emit('handlePay')" class="tariff-card__btn" variant="quinary" size="large">Подключить</UiButton>
  </div>
</template>

<script setup>

const props = defineProps({
  tariff: {
    type: Object,
    required: true
  },
  feature: {
    type: Array,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    default: '',
  },
  discount: {
    type: Number,
    default: 0,
  }
});

</script>

<style lang="scss">

.tariff-card {
  font-size: 1rem;
  padding: 2em 1.6em;
  border-radius: 16px;
  background-color: #fff;

  &__header {
    display: flex;
    justify-content: space-between;
  }

  &__title {
    font-family: 'lato', sans-serif;
    font-size: 1.6em;
    font-weight: 700;
    margin-bottom: 1em;
  }

  &__duration {
    font-size: 1.6em;
    font-weight: 500;
    line-height: 1.5em;
    color: #989898;
  }

  &__price {
    font-family: 'fira-sans', sans-serif;
    font-size: 2em;
    font-weight: 700;
    line-height: 1.4em;
    color: #6937a5;
    margin-bottom: 1.6em;
  }

  &__discount {
    font-size: 1.4em;
    font-weight: 700;
    line-height: 1.4em;
    color: #de5434;
    margin-bottom: .5em;
  }

  &__list {
    display: flex;
    font-size: 1.6em;
    flex-direction: column;
    row-gap: 1em;
    margin-bottom: 2em;
  }

  &__item {
    display: flex;
    column-gap: .5em;
  }

  &__item-icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.25em;
    height: 1.25em;
    background-color: #6937a5;
    border-radius: 100%;

    svg {
      width: 1em;
      path {
        stroke: #fff;
      }
    }
  }

  &__item-text {
    flex: 1 1 auto;
    font-size: .875em;
    font-weight: 500;
    line-height: 1.42em;
  }

  &__item-value {
    color: #989898;
  }

  &__btn {
    font-size: 1.2em;
    text-transform: uppercase;
    max-width: 20em;
    width: 100%;
    margin-inline: auto;
  }
}

</style>