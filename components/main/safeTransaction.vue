<template>
  <section class="safe-transaction">
    <div class="safe-transaction__container container">
      <h3 class="safe-transaction__title">Подключить безопасную сделку</h3>
      <p class="safe-transaction__text">Сервис по защите расчетов между участниками сделки</p>
      <UiButton to="https://test.bee-online.ru/deals/main?utm_source=bs" variant="quaternary" size="xl" class="safe-transaction__link">Узнать подробнее</UiButton>
      <UiImage class="safe-transaction__image" src="/assets/images/main/safe-transaction/safe-transaction-img.png"/>
      <UiImage class="safe-transaction__pattern" src="/assets/images/main/safe-transaction/safe-transaction-pattern.png"/>
    </div>
  </section>
</template>

<style lang="scss">
.safe-transaction {
  margin-block: 14.6rem 22.1rem;
}

.safe-transaction__container {
  background-image: url(/assets/images/main/safe-transaction/Banner.png);
  background-position: 0 0;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 2.4em;
  padding: 7em 8.6em 5.8em;
  position: relative
}

.safe-transaction__title {
  color: var(--text-color-octonary);
  font-family: 'Coolvetica', sans-serif;
  font-size: 6.4em;
  font-weight: 500;
  line-height: 1.14em;
  margin-block: 0 .5em;
  max-width: 10em;
}

.safe-transaction__text {
  color: var(--text-color-octonary);
  font-size: 2em;
  font-weight: 500;
  line-height: 1.5em;
  margin-block: 0 2.8em;
  max-width: 22.75em;
  opacity: .8
}

.safe-transaction__image {
  bottom: 2em;
  height: auto;
  position: absolute;
  right: 7.7em;
  width: 61.4em;
  z-index: 2
}

.safe-transaction__pattern {
  border-radius: 0 0 2.4em 2.4em;
  bottom: 0;
  height: auto;
  max-width: 80em;
  position: absolute;
  right: 0;
  z-index: 1
}

.safe-transaction__link {
  font-family: Involve, sans-serif;
  font-size: 1.8em;
  font-weight: 700;
  line-height: 1.3em;
  display: inline-block;
}

@include mobile {
  .safe-transaction {
    margin-bottom: 12em;
  }

  .safe-transaction__pattern {
    display: none
  }

  .safe-transaction__image {
    bottom: none;
    right: 50%;
    top: -50px;
    transform: translateX(50%);
    width: 26em;
  }

  .safe-transaction__container {
    align-items: center;
    // background-size: 200%;
    border-radius: 0;
    display: flex;
    flex-direction: column;
    padding-block: 21.2em 3.2em
  }

  .safe-transaction__title {
    font-size: 2.8em;
    margin-bottom: .85em;
    max-width: 9.03em;
    text-align: center
  }

  .safe-transaction__text {
    font-size: 1.6em;
    line-height: 1.5em;
    margin-bottom: 2em;
    max-width: none;
    text-align: center
  }

  .safe-transaction__link {
    font-family: Coolvetica, sans-serif;
    font-size: 1.6em;
    font-weight: 400;
    margin-block: .75em;
  }

}
</style>