<template>
  <div class="deals-info">
    <div class="deals-info__header">
      <p>
        Время и дата:
        <span>четверг, 27.02.2025 - 08:21:10</span>
      </p>
      <p>
        Номер сделки:
        <span>22</span>
      </p>
    </div>
    <div class="deals-info__body">
      <h3 class="deals-info__title">Сделка №22</h3>
      <p class="deals-info__name">Пошив большой партии мужских костюмов</p>
      <div class="deals-info__buttons">
        <UiButton type="button" class="deals-info__button" variant="tertiary">Отменить заявку</UiButton>
        <template v-if="isManager">
          <UiButton type="button" class="deals-info__button deals-info__button_type_reset" variant="tertiary">Сбросить сделку</UiButton>
          <UiButton type="button" class="deals-info__button" variant="quinary">Начать арбитраж</UiButton>
        </template>
        <template v-else >
          <UiButton type="button" class="deals-info__button" variant="tertiary">Нужна помощь менеджера</UiButton>
        </template>
      </div>
      <div class="deals-info__info">
        <h3>Информация о заказе</h3>
        <div class="props">
          <div class="prop">
            <p class="prop__name prop__name_type_grey">Заказчик:</p>
            <p class="prop__value">Организация Заказчик 1</p>
          </div>
          <div class="prop">
            <p class="prop__name prop__name_type_grey">Исполнитель:</p>
            <p class="prop__value">Организация Исполнитель 101</p>
          </div>
          <div class="prop">
            <p class="prop__name prop__name_type_grey">Категории:</p>
            <p class="prop__value">Термобелье, Сумки и аксессуары</p>
          </div>
          <div class="prop prop_type_text">
            <p class="prop__name prop__name_type_grey">Описание:</p>
            <p class="prop__value">
              Здесь он несколько времени поспорили о том, как бы совершенно чужой, за дрянь взял деньги! 
              Когда бричка была уже на конце деревни, он подозвал к себе первого — мужика, который, 
              попавши где-то на почтовой станции влюбившеюся в него по уши, у которой ручки, по словам пословицы. Может быть,
              опять случится услужить чем- — нибудь друг другу. «Да, как бы речь шла о хлебе. — Да, время темное, нехорошее время, — прибавил Селифан.
               — Это вам так показалось. Ведь я продаю не лапти. — Однако ж согласитесь.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  isManager: {
    type: Boolean,
    default: false,
  }
})

</script>

<style lang="scss">

.deals-info {
  font-size: 1rem;
  margin-bottom: 3em;


  &__header {
    font-size: 1.3em;
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.15em;

    p {
      color: var(--text-color-tertiary);
    }

    span {
      color: var(--text-color-primary);
      font-weight: 700;
    }

    @include small-mobile {
      flex-direction: column;
    }
  }

  &__body {
    padding: 3em;
    background-color: var(--bg-secondary-color);
    border: 1px solid #e9e9e9;
    
    @include small-mobile {
      margin-inline: -13px;
    }
  }

  &__title {
    font-size: 1.8em;
    font-weight: 500;
    margin-bottom: .83em;
  }

  &__name {
    font-size: 1.6em;
    margin-bottom: 1.5em;
  }

  &__buttons {
    display: flex;
    column-gap: 1em;
    margin-bottom: 2.5em;

    @include mobile {
      flex-direction: column;
      row-gap: 1em;
    }
  }

  &__button {
    &_type_reset {
      border-color: #f1c8c0;

      &:hover {
        color: var(--text-color-primary);
        background-color: #f1c8c0;
        border-color: #f1c8c0;
      }
    }
  }

  &__info {
    h3 {
      font-size: 18px;
      font-weight: 500;
      margin-bottom:  .83em;
    }

    .props {
      font-size: 1.6em;
    }
  }
}

</style>