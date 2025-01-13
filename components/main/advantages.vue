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
  font-family: 'Coolvetica', sans-serif;
  font-size: 6.4em;
  font-weight: 500;
  line-height: 1.14em;
  margin-block: 0 .375em;
  text-align: center;
  text-transform: uppercase
}

.advantages__description {
  color: #797b89;
  font-size: 1.8em;
  font-weight: 500;
  line-height: 1.44em;
  margin-block: 0 3.66em;
  margin-inline: auto;
  max-width: 20.83em;
  text-align: center
}

.advantages__cards {
  display: grid;
  gap: 2.4em;
  grid-template-columns: 19.4em 26.5em 43.3em 26.5em 26.5em;
  grid-template-rows: repeat(2, 23.4em)
}

.advantages__card {
  background-color: #f2f0f8;
  border-radius: 2.4em;
  box-sizing: border-box;
  overflow: hidden;
  padding: 2.4em 3.2em;
  position: relative
}

.advantages__card h3 {
  color: var(--text-color-hexadecimal);
  font-family: Coolvetica, sans-serif;
  font-size: 2em;
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
  max-width: 9.8em;
}

.advantages__card_type_protection img {
  height: 21.2em;
  right: - .7em;
  width: 21.2em
}

.advantages__card_type_navigation {
  grid-column: 3;
  grid-row: 1/span 2;
  max-width: 43.3em
}

.advantages__card_type_navigation h3 {
  font-size: 3.6em;
  line-height: 1.16em;
  text-align: center
}

.advantages__card_type_navigation img {
  height: 34.5em;
  right: 50%;
  transform: translateX(50%);
  width: 34.5em;
}

.advantages__card_type_catalog {
  grid-column: 4/span 1;
  grid-row: 1/span 1
}

.advantages__card_type_catalog h3 {
  text-align: center
}

.advantages__card_type_catalog img {
  bottom: -2em;
  height: 17em;
  right: -1em;
  width: 17em;
}

.advantages__card_type_rating {
  grid-column: 5/span 1;
  grid-row: 1/span 1
}

.advantages__card_type_rating h3 {
  text-align: center
}

.advantages__card_type_rating img {
  height: 18.1em;
  right: 50%;
  transform: translateX(50%);
  width: 22.1em
}

.advantages__card_type_choice {
  grid-column: 2/span 1;
  grid-row: 2/span 1
}

.advantages__card_type_choice h3 {
  text-align: center
}

.advantages__card_type_choice img {
  bottom: -.5em;
  height: 14.3em;
  right: -1em;
  width: 14.3em
}

.advantages__card_type_negotiation {
  box-sizing: border-box;
  grid-column: 4/span 2;
  grid-row: 2/span 1;
  max-width: 40em
}

.advantages__card_type_negotiation h3 {
  max-width: 20.8em
}

.advantages__card_type_negotiation img {
  bottom: -2.5em;
  height: 23.9em;
  width: 23.9em;
}

@media screen and (max-width: 1800px) {
  .advantages__cards {
    grid-template-columns: repeat(5, 1fr)
  }
}

@include mobile {
  .advantages__title {
    font-size: 2.8em;
    margin-bottom: .28em;
  }

  .advantages__description {
    font-size: 1.6em;
    margin-bottom: 2em;
  }

  .advantages__cards {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 19.5em 13.6em 13.6em 19.5em
  }

  .advantages__card {
    padding: 1.6em
  }

  .advantages__card h3 {
    font-size: 1.3em;
    text-align: start
  }

  .advantages__card_type_navigation {
    grid-column: 1/span 2;
    grid-row: 1;
    max-width: none;
    order: 1
  }

  .advantages__card_type_navigation h3 {
    font-size: 2em;
    text-align: center
  }

  .advantages__card_type_navigation img {
    bottom: 1.3em;
    height: 12.4em;
    width: 12.4em;
  }

  .advantages__card_type_choice {
    grid-column: 1;
    grid-row: 2;
    order: 2
  }

  .advantages__card_type_choice img {
    bottom: 0;
    height: 8.4em;
    right: .3em;
    width: 8.4em;
  }

  .advantages__card_type_catalog {
    grid-column: 2;
    grid-row: 2;
    order: 3
  }

  .advantages__card_type_catalog img {
    bottom: 0;
    height: 9em;
    right: .3em;
    width: 9em;
  }

  .advantages__card_type_protection {
    grid-column: 1;
    grid-row: 3;
    order: 4
  }

  .advantages__card_type_protection img {
    height: 8.3em;
    right: 0;
    width: 8.3em
  }

  .advantages__card_type_negotiation {
    grid-column: 2;
    grid-row: 3;
    order: 5
  }

  .advantages__card_type_negotiation img {
    bottom: -.8em;
    height: 10em;
    right: .8em;
    width: 10em;
  }

  .advantages__card_type_rating {
    grid-column: 1/span 2;
    grid-row: 4;
    order: 6
  }

  .advantages__card_type_rating h3 {
    font-size: 2em;
    margin: 0 auto;
    max-width: 7.5em;
    text-align: center
  }

  .advantages__card_type_rating img {
    height: 15.2em;
    width: 15.2em
  }
}
</style>