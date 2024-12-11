<template>
  <div
    class="bonus-score"
    :class="{
      'bonus-score_loading': loading,
    }"
  >
    <div class="bonus-score__points">Баллы</div>
    <div class="bonus-score__rate">1 балл = 1₽</div>
    <div class="bonus-score__title">Сейчас у вас</div>
    <div class="bonus-score__score">
      <span>{{ bonuses }}</span>
      <SvgoCoin class="svg-l" />
    </div>
    <div class="bonus-score__description">
      Используйте наш сервис, увеличивайте уровни и получайте рубли на свой счет
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  loading: {
    type: Boolean,
  },
  bonuses: {
    type: Number,
  },
});
</script>

<style lang="scss">
.bonus-score {
  font-size: 1rem;
  line-height: 1.2;
  border-radius: 2.4em;
  display: flex;
  flex-direction: column;
  padding: 2em 3.6em 3em;
  background: var(--primary-color) url(@/assets/images/bonus/bg.jpg) no-repeat center/cover;
  // background-size: 110%;
  background-position-y: 0;
  color: #fff;
  text-align: center;
  margin-bottom: 0;

  &_loading {
    pointer-events: none;
    opacity: 0.6;
  }

  &__points {
    font-size: 1.6em;
    margin-bottom: 0.3em;
    font-weight: 700;
  }

  &__rate {
    font-size: 1.4em;
    margin-bottom: 1em;
    opacity: 0.5;
  }

  &__title {
    font-size: 3.6em;
    line-height: 1;
    letter-spacing: -2%;
    margin-bottom: 0.55em;
  }

  &__score {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1em;
    margin-bottom: 2em;

    span {
      font-size: 4em;
      font-weight: 600;
      line-height: 1.2;
    }

    svg {
      font-size: 3em;
      width: 1em;
      height: 1em;
    }
  }

  &__description {
    font-family: "lato", sans-serif;
    font-size: 1.4em;
    font-weight: 500;
    line-height: 1.4;
    padding: 0.5em 1em;
    position: relative;
    background-color: rgba(255, 255, 255, 0.25);
    border-radius: 1em;
  }
}

@include mobile {
  .bonus-score {
    font-size: 0.9rem;
  }
}
</style>
