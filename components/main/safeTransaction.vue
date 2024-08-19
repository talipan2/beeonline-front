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
  border-radius: 24px;
  padding: 7rem 8.6rem 5.8rem;
  position: relative
}

.safe-transaction__title {
  color: var(--text-color-octonary);
  font-family: SongerGrotesque, sans-serif;
  font-size: 6.4rem;
  font-weight: 700;
  line-height: 1.14em;
  margin-block: 0 3.2rem;
  max-width: 64rem;
}

.safe-transaction__text {
  color: var(--text-color-octonary);
  font-size: 2rem;
  font-weight: 500;
  line-height: 1.5em;
  margin-block: 0 5.6rem;
  max-width: 45.5rem;
  opacity: .8
}

.safe-transaction__image {
  bottom: 2rem;
  height: auto;
  position: absolute;
  right: 7.7rem;
  width: 61.4rem;
  z-index: 2
}

.safe-transaction__pattern {
  border-radius: 0 0 24px 24px;
  bottom: 0;
  height: auto;
  max-width: 80rem;
  position: absolute;
  right: 0;
  z-index: 1
}

.safe-transaction__link {
  font-family: Involve, sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 1.3em;
  display: inline-block;
}

@media screen and (max-width: 991px) {
  .safe-transaction {
    margin-bottom: 120px
  }

  .safe-transaction__pattern {
    display: none
  }

  .safe-transaction__image {
    bottom: none;
    right: 50%;
    top: -50px;
    transform: translateX(50%);
    width: 260px
  }

  .safe-transaction__container {
    align-items: center;
    // background-size: 200%;
    border-radius: 0;
    display: flex;
    flex-direction: column;
    padding-block: 212px 32px
  }

  .safe-transaction__title {
    font-size: 28px;
    margin-bottom: 24px;
    max-width: 253px;
    text-align: center
  }

  .safe-transaction__text {
    font-size: 16px;
    line-height: 1.5em;
    margin-bottom: 32px;
    max-width: none;
    text-align: center
  }

  .safe-transaction__link {
    font-family: Coolvetica, sans-serif;
    font-size: 16px;
    font-weight: 400;
    margin-block: 12px;
  }

}
</style>