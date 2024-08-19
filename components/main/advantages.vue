<template>
  <section class="advantages container">
    <h2 class="advantages__title">Наши преимущества</h2>
    <p class="advantages__description">Почему поиск партнеров эффективен именно на нашем портале</p>
    <ul class="advantages__cards">
      <li class="advantages__card advantages__card_type_protection">
        <h3>Защита расчетов между участниками сделки</h3>
        <UiImage src="/assets/images/main/advantages/advantages-1.png"/>
      </li>
      <li class="advantages__card advantages__card_type_navigation">
        <h3>Удобная навигация</h3>
        <UiImage src="/assets/images/main/advantages/advantages-2.png"/>
      </li>
      <li class="advantages__card advantages__card_type_catalog">
        <h3>Каталог по ключевым фильтрам</h3>
        <UiImage src="/assets/images/main/advantages/advantages-3.png"/>
      </li>
      <li class="advantages__card advantages__card_type_rating">
        <h3>Честная система рейтинга</h3>
        <UiImage src="/assets/images/main/advantages/advantages-4.png"/>
      </li>
      <li class="advantages__card advantages__card_type_choice">
        <h3>Широкий выбор исполнителей и заказчиков</h3>
        <UiImage src="/assets/images/main/advantages/advantages-5.png"/>
      </li>
      <li class="advantages__card advantages__card_type_negotiation">
        <h3>Моментальный выход на прямые переговоры</h3>
        <UiImage src="/assets/images/main/advantages/advantages-6.png"/>
      </li>
    </ul>
  </section>
</template>

<style lang="scss">
.advantages {
  margin: 0 auto;
  margin-bottom: 20.2rem;
  padding-block: 10rem
}

.advantages__title {
  color: var(--text-color-hexadecimal);
  font-family: SongerGrotesque, sans-serif;
  font-size: 6.4rem;
  font-weight: 700;
  line-height: 1.14em;
  margin-block: 0 2.4rem;
  text-align: center;
  text-transform: uppercase
}

.advantages__description {
  color: #797b89;
  font-size: 1.8rem;
  font-weight: 500;
  line-height: 1.44em;
  margin-block: 0 6.6rem;
  margin-inline: auto;
  max-width: 375px;
  text-align: center
}

.advantages__cards {
  display: grid;
  gap: 2.4rem;
  grid-template-columns: 19.4rem 26.5rem 43.3rem 26.5rem 26.5rem;
  grid-template-rows: repeat(2, 23.4rem)
}

.advantages__card {
  background-color: #f2f0f8;
  border-radius: 24px;
  box-sizing: border-box;
  overflow: hidden;
  padding: 2.4rem 3.2rem;
  position: relative
}

.advantages__card h3 {
  color: var(--text-color-hexadecimal);
  font-family: Coolvetica, sans-serif;
  font-size: 2rem;
  font-weight: 400;
  line-height: 1.2em;
  margin: 0
}

.advantages__card img {
  bottom: 0;
  -o-object-fit: contain;
  object-fit: contain;
  position: absolute;
  right: 0
}

.advantages__card_type_protection {
  grid-column: 1/span 2;
  grid-row: 1/1
}

.advantages__card_type_protection h3 {
  max-width: 196px
}

.advantages__card_type_protection img {
  height: 21.2rem;
  right: -7px;
  width: 21.2rem
}

.advantages__card_type_navigation {
  grid-column: 3;
  grid-row: 1/span 2;
  max-width: 433px
}

.advantages__card_type_navigation h3 {
  font-size: 3.6rem;
  line-height: 1.16em;
  text-align: center
}

.advantages__card_type_navigation img {
  height: 34.5rem;
  right: 50%;
  transform: translateX(50%);
  width:34.5rem;
}

.advantages__card_type_catalog {
  grid-column: 4/span 1;
  grid-row: 1/span 1
}

.advantages__card_type_catalog h3 {
  text-align: center
}

.advantages__card_type_catalog img {
  bottom: -20px;
  height: 17rem;
  right: -10px;
  width: 17rem;
}

.advantages__card_type_rating {
  grid-column: 5/span 1;
  grid-row: 1/span 1
}

.advantages__card_type_rating h3 {
  text-align: center
}

.advantages__card_type_rating img {
  height: 18.1rem;
  right: 50%;
  transform: translateX(50%);
  width: 22.1rem
}

.advantages__card_type_choice {
  grid-column: 2/span 1;
  grid-row: 2/span 1
}

.advantages__card_type_choice h3 {
  text-align: center
}

.advantages__card_type_choice img {
  bottom: -5px;
  height: 14.3rem;
  right: -10px;
  width: 14.3rem
}

.advantages__card_type_negotiation {
  box-sizing: border-box;
  grid-column: 4/span 2;
  grid-row: 2/span 1;
  max-width: 400px
}

.advantages__card_type_negotiation h3 {
  max-width: 208px
}

.advantages__card_type_negotiation img {
  bottom: -25px;
  height: 23.9rem;
  width: 23.9rem;
}

@media screen and (max-width: 1800px) {
  .advantages__cards {
    grid-template-columns: repeat(5, 1fr)
  }
}

@media screen and (max-width: 991px) {
  .advantages__title {
    font-size: 28px;
    margin-bottom: 8px
  }

  .advantages__description {
    font-size: 16px;
    margin-bottom: 32px
  }

  .advantages__cards {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 195px 136px 136px 195px
  }

  .advantages__card {
    padding: 16px
  }

  .advantages__card h3 {
    font-size: 13px;
    text-align: start
  }

  .advantages__card_type_navigation {
    grid-column: 1/span 2;
    grid-row: 1;
    max-width: none;
    order: 1
  }

  .advantages__card_type_navigation h3 {
    font-size: 20px;
    text-align: center
  }

  .advantages__card_type_navigation img {
    bottom: 13px;
    height: 124px;
    width: 124px
  }

  .advantages__card_type_choice {
    grid-column: 1;
    grid-row: 2;
    order: 2
  }

  .advantages__card_type_choice img {
    bottom: 0;
    height: 84px;
    right: 3px;
    width: 84px
  }

  .advantages__card_type_catalog {
    grid-column: 2;
    grid-row: 2;
    order: 3
  }

  .advantages__card_type_catalog img {
    bottom: 0;
    height: 90px;
    right: 3px;
    width: 90px
  }

  .advantages__card_type_protection {
    grid-column: 1;
    grid-row: 3;
    order: 4
  }

  .advantages__card_type_protection img {
    height: 83px;
    right: 0;
    width: 83px
  }

  .advantages__card_type_negotiation {
    grid-column: 2;
    grid-row: 3;
    order: 5
  }

  .advantages__card_type_negotiation img {
    bottom: -8px;
    height: 100px;
    right: 8px;
    width: 100px
  }

  .advantages__card_type_rating {
    grid-column: 1/span 2;
    grid-row: 4;
    order: 6
  }

  .advantages__card_type_rating h3 {
    font-size: 20px;
    margin: 0 auto;
    max-width: 150px;
    text-align: center
  }

  .advantages__card_type_rating img {
    height: 152px;
    width: 152px
  }
}
</style>