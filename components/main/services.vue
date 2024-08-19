<template>
  <section class="services container">
    <div class="services__container">
      <div class="services__card services__card_type_performers">
        <h2 class="services__title">Поиск исполнителей</h2>
        <p class="services__description">
          Ускорьте свой путь к успеху с нашим сервисом, находя лучших производителей одежды в легкой промышленности за считанные минуты!
        </p>
        <UiButton to="https://bee-online.ru/services" variant="quaternary" size="xl" class="services__link">Подробнее</UiButton>
        <UiImage src="/assets/images/main/services/services-performers.png" class="services__image" />
        <UiImage src="/assets/images/main/services/services-mobile-1.png" class="services__image services__image-mobile"/>
      </div>
      <div class="services__card services__card_type_customers">
        <h2 class="services__title">Поиск заказчиков</h2>
        <p class="services__description">
          Расширьте свой бизнес и увеличьте объем заказов, находя новых клиентов среди ведущих брендов и ритейлеров с нашим удобным и быстрым сервисом!
        </p>
        <UiButton to="https://bee-online.ru/orders" variant="quaternary" size="xl" class="services__link">Подробнее</UiButton>
        <UiImage src="/assets/images/main/services/services-customers.png" class="services__image" />
        <UiImage src="/assets/images/main/services/services-mobile-2.png" class="services__image services__image-mobile"/>
      </div>
      <div class="services__card services__card_type_suppliers">
        <h2 class="services__title">Поиск поставщиков</h2>
        <p class="services__description">
          Расширьте свои возможности и увеличьте продажи, подключившись к нашему сервису, который связывает вас с ведущими брендами, ритейлерами и производителями одежды в легкой промышленности!
        </p>
        <UiButton to="https://marketplace.bee-online.ru/" variant="quaternary" size="xl" class="services__link">Подробнее</UiButton>
        <UiImage src="/assets/images/main/services/services-suppliers.png" class="services__image" />
        <UiImage src="/assets/images/main/services/services-mobile-3.png" class="services__image services__image-mobile"/>
      </div>
      <!-- <div class="services__card services__card_type_factories">
        <h2 class="services__title">Поиск фабрик</h2>
        <p class="services__description">Проект представляет удобный сервис для поиска партнеров и выхода на прямые
          переговоры</p>
        <UiButton to="https://bee-online.ru/services" variant="quaternary" size="xl" class="services__link">Подробнее</UiButton>
        <UiImage src="/assets/images/main/services/services-factories.png" class="services__image" />
        <UiImage src="/assets/images/main/services/services-mobile-4.png" class="services__image services__image-mobile"/>
      </div> -->
      <div class="services__card services__card_type_exhibitions">
        <h2 class="services__title">Поиск выставок</h2>
        <p class="services__description">
          Посещайте наши выставки, чтобы найти надежных заказчиков, расширить свою сеть и открыть новые возможности для роста в легкой промышленности!
        </p>
        <UiButton to="https://expo.bee-online.ru/" variant="quaternary" size="xl" class="services__link">Подробнее</UiButton>
        <UiImage src="/assets/images/main/services/services-exhibitions.png" class="services__image" />
        <UiImage src="/assets/images/main/services/services-mobile-5.png" class="services__image services__image-mobile"/>

      </div>
    </div>
  </section>
</template>

<style lang="scss">

.services__container {
  display: grid;
  gap: 3.2rem;
  grid-template-columns: repeat(2, 1fr);
  padding-block: 16rem 14rem;
}

.services__card {
  align-items: flex-start;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  height: 46rem;
  overflow: hidden;
  padding: 4.8rem;
  position: relative;
  row-gap: 4.8rem;
  z-index: 0;
  box-sizing: border-box;
}

.services__card_type_wide {
  grid-column-end: 3;
  grid-column-start: 1
}

.services__card_type_wide .services__title {
  font-size: 5.6rem
}

.services__card_type_wide .services__description {
  font-size: 2.2rem;
  max-width: 45.5rem;
}

.services__title {
  font-family: Coolvetica, sans-serif;
  font-size: 4rem;
  letter-spacing: 2px;
  line-height: 1em
}

.services__description,
.services__title {
  color: var(--text-color-octonary);
  margin: 0;
  position: relative;
  z-index: 2
}

.services__description {
  font-size: 1.8rem;
  font-weight: 500;
  line-height: 1.3em;
  max-width: 37.5rem;
  opacity: .8
}

.services__link {
  display: block;
  font-family: Involve, sans-serif;
  font-size: 1.8rem;
  line-height: 1.33em;
  margin-block: auto 0;
  position: relative;
  z-index: 2
}

.services__image {
  bottom: 0;
  position: absolute;
  right: 0;
  z-index: 0;
  max-width: 100%;
}

.services__card_type_performers {
  background-color: #9367c4
}

.services__card_type_performers img {
  height: auto;
  width: 32.2rem
}

.services__card_type_customers {
  background-color: #656ec3;
}

.services__card_type_customers img {
  height: auto;
  width: 65.4rem;
}

.services__card_type_suppliers {
  background-color: #403186
}

.services__card_type_suppliers img {
  height: auto;
  width: 95.4rem;
}

.services__card_type_factories {
  background-color: #432762
}

.services__card_type_factories img {
  height: auto;
  width: 44rem;
}

.services__card_type_exhibitions {
  background-color: #2b3164
}

.services__card_type_exhibitions img {
  height: auto;
  width: 31.2rem
}

.services__image-mobile {
  display: none
}

@include mobile {
  .services__container {
    display: flex;
    flex-direction: column
  }

  .services__card {
    box-sizing: border-box;
    min-height: 388px;
    padding: 24px;
    row-gap: 8px
  }

  .services__card:nth-child(3) .services__title {
    font-size: 22px
  }

  .services__card:nth-child(3) .services__description {
    font-size: 13px;
    max-width: none
  }

  .services__title {
    font-size: 22px;
    font-weight: 400;
    letter-spacing: 1px;
    line-height: 1.36em
  }

  .services__description {
    font-size: 13px;
    line-height: 1.5em;
    max-width: none
  }

  .services__link {
    -webkit-backdrop-filter: blur(20px);
    backdrop-filter: blur(20px);
    font-size: 14px;
    padding: 12px 47px
  }

  .services__link:hover {
    background-color: hsla(0, 0%, 100%, .31);
    color: #fff
  }

  .services__link:active {
    background-color: #fff;
    color: #6937a5
  }

  .services__card_type_performers img {
    bottom: 24px;
    height: 254px;
    width: 254px
  }

  .services__card_type_customers img {
    height: auto;
    width: 293px
  }

  .services__card_type_suppliers img {
    height: auto;
    width: 253px
  }

  .services__card_type_factories img {
    height: auto;
    width: 227px
  }

  .services__card_type_exhibitions img {
    height: auto;
    width: 185px
  }

  .services__image {
    display: none
  }

  .services__image-mobile {
    display: block
  }
}

</style>