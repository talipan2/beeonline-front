<template>
  <div class="selectable-entity-card">
    <div class="selectable-entity-card__item-header">
      <div class="selectable-entity-card__item-image">
        <img src="https://i.pinimg.com/564x/d1/67/07/d16707efcfe492a4f12b6d13a5fbc3cb.jpg" alt="">
      </div>
      <div class="selectable-entity-card__item-title">
        <h2>Исполнитель 11</h2>
        <span v-if="isRating">11.04.2023</span>
        <span v-else>Заказчик 1</span>
      </div>
      <CommonRating v-if="isRating" class="selectable-entity-card__item-rating" :is-count-rating="false" :is-count-reviews="false" />
      <span v-else class="selectable-entity-card__item-date">14.10.2024</span>
    </div>
    <div class="selectable-entity-card__item-text">
      Вы создали сделку (Заказчик 1) Вы создали сделку (Заказчик 1) Вы создали сделку (Заказчик 1)Вы создали сделкуВы
      создали сделкуВы создали сделкуВы создали сделкуВы создали сделкуВы создали сделкуВы создали сделкуВы создали
      сделкуВы создали сделкуВы создали сделкуВы создали сделкуВы создали сделкуВы создали сделкуВы создали сделкуВы
      создали сделку Вы создали сделку (Заказчик 1) Вы создали сделку (Заказчик 1)
    </div>
    <NuxtLink class="link selectable-entity-card__item-link" to="#">{{ btnLabel }}</NuxtLink>
  </div>
</template>

<script setup>

const props = defineProps({
  btnLabel: {
    type: String,
    default: 'Подробнее',
  },
  isRating: {
    type: Boolean,
    default: false,
  }
})

</script>

<style lang="scss">

.selectable-entity-card {
  &:not(:last-child) {
    border-bottom: 1px solid var(--border-color-secondary);
    padding-bottom: 2em;
    margin-bottom: 2em;
  }

  &__item-header {
    display: flex;
    align-items: center;
    margin-bottom: 1.6em;
  }

  &__item-image {
    flex: 0 0 4em;
    width: 4em;
    height: 4em;
    margin-right: 1.5em;
    border-radius: 100%;
    overflow: hidden;
  }

  &__item-title {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    font-size: 1.4em;
    line-height: 1em;

    h2 {
      font-size: 1em;
    }

    span {
      font-size: .85em;
      color: #8b92a1;
    }
  }

  &__item-date {
    font-family: 'fira-sans', sans-serif;
    font-size: 1.4em;
    color: #a9abac;
  }

  &__item-text {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-family: 'fira-sans', sans-serif;
    font-size: 1.4em;
    min-height: 2.8em;
    margin-bottom: .6em;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__item-link {
    font-family: 'fira-sans', sans-serif;
    font-size: 1.2em;
  }
}
</style>