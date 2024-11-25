<template>
  <div class="card bonus-rules">
    <div class="card__content">
      <h2 class="card__title">Правила</h2>
      <div class="card__subtitle">
        Для повышения своего уровня вы можете:
      </div>
    </div>

    <div class="card__content">
      <div class="bonus-rules__row">
        <div class="bonus-rules__image">
          <UiImage src="/assets/images/bonus/bonus-rules.png" />
        </div>
        <ul class="card__list bonus-rules__list">
          <li><p>Регулярно заходить на сайт</p></li>
          <li><p>Заполнить свой профиль</p></li>
          <li><p>Размещать заказы и услуги</p></li>
          <li><p>Проверять своих контрагентов</p></li>
          <li><p>Общаться в чатах</p></li>
          <li><p>Заключать сделки</p></li>
          <li><p>Проходить опросы</p></li>
          <li><p>Участвовать в фокус-группах</p></li>
          <li><p>Приглашать своих партнеров на платформу Bee-online</p></li>
          <li><p>Покупать дополнительные услуги</p></li>
        </ul>
      </div>
    </div>

    <div class="card__content">
      <h2 class="card__title">Бонус</h2>
      <div class="card__subtitle">
        За каждое ваше действие мы будем начислять благодарность на ваш
        счет!
      </div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({

})

</script>

<style lang="scss">

.bonus-rules {
  margin-top: 3rem;

  &__row {
    display: flex;
    gap: 3rem;
    margin-bottom: 0;
  }

  &__image {
    font-size: 10px;
    position: relative;
    background-color: #59398b;
    overflow: hidden;
    border-radius: 1.2em;
    order: 1;
    width: 50%;
    flex: 1 1 50%;

    img {
      position: absolute;
      inset: 0;
      margin: auto;
      max-width: 72%;
      max-height: 64%;
    }

    &::before {
      content: "";
      position: absolute;
      width: 118%;
      height: 0;
      padding-top: 118%;
      border-radius: 100rem;
      top: 50%;
      left: 50%;
      transform: translate(-25%, -25%);
      margin: auto;
      background-color: #fff;
      opacity: 0.14;
    }
  }

  &__list {
    width: 50%;
    flex: 1 1 50%;

  }
}
</style>