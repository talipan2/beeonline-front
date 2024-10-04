<template>
  <div class="list-card">
    <div class="list-card__col-1">
      <div class="list-card__container">
        <h5 class="list-card__title">{{ 'Название компании' }}</h5>
        <CommonRating />
      </div>
    </div>
    <div class="list-card__col-2">
      <div class="list-card__location">
        <i class="flag flag_round"></i>
        <p>{{ 'qweqweqweqw' }}</p>
      </div>
    </div>
    <div class="list-card__props list-card__col-3">
      <p class="list-card__prop">1 услуга</p>
    </div>
    <div class="list-card__props list-card__col-4">
      <p class="list-card__prop-name">Сырье:</p>
      <div class="list-card__prop-container">
        <p class="list-card__prop-value">Собственное</p>
        <p class="list-card__prop-value">Давальческое</p>
      </div>
    </div>
    <div class="list-card__props list-card__col-5">
      <p class="list-card__prop-name">Категории:</p>
      <div class="list-card__prop-container">
        <p class="list-card__prop-value">Вязаный трикотаж</p>
        <p class="list-card__prop-value">Верхняя одежда</p>
        <p class="list-card__prop-value">Головные уборы</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">

.list-card {
  display: flex;
  align-items: center;
  column-gap: 1.7em;
  font-size: 1.7rem;
  padding: .625em;
  // border-top: 1px solid var(--border-color-secondary);
  width: 100%;

  &__col-1 {
    flex: 1 1 25%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;

  }

  &__col-2 {
    flex: 0 1 16%;
  }

  &__col-3 {
    flex: 0 1 9%;
  }

  &__col-4 {
    flex: 0 1 12%;
  }

  &__col-5 {
    flex: 0 1 33%;
  }

  &__title {
    font-size: 1em;
  }

  &__location {
    display: flex;
    align-items: center;
    column-gap: .625em;
    font-size: .88em;
  }

  &__props {
    display: flex;
    flex-direction: column;
    row-gap: .3em;
  }

  &__prop {
    font-size: 1.5rem;
  }

  &__prop-name {
    font-size: 1.7rem;
  }


  &__prop-container {
    display: flex;
    flex-wrap: wrap;
    column-gap: .29em;
    row-gap: .29em;
  }

  &__prop-value {
    font-size: 1.5rem;
    background-color: #E5E5E5;
    padding: .13rem .38rem;
    font-weight: 400;

  }
}

</style>
