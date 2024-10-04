<template>
  <div class="orders-details">
    <div class="orders-details__container" v-if="type === 'order'">
      <div class="orders-details__item">
        <p class="orders-details__title">Категории:</p>
        <p class="orders-details__value">Вязаный трикотаж  Верхняя одежда  Женская одежда  Головные уборы</p>
      </div>
      <div class="orders-details__item">
        <p class="orders-details__title">Лекала:</p>
        <p class="orders-details__value">Нужен конструктор</p>
      </div>
      <div class="orders-details__item">
        <p class="orders-details__title">Сырье:</p>
        <p class="orders-details__value">Нужен конструктор</p>
      </div>
      <div class="orders-details__item">
        <p class="orders-details__title">Размер партии:</p>
        <p class="orders-details__value">Нужен конструктор</p>
      </div>
      <div class="orders-details__item">
        <p class="orders-details__title">Предпочтительная цена:</p>
        <p class="orders-details__value">Нужен конструктор</p>
      </div>
      <div class="orders-details__item">
        <p class="orders-details__title">Сумма:</p>
        <p class="orders-details__value">Нужен конструктор</p>
      </div>
      <div class="orders-details__item">
        <p class="orders-details__title">Срок выполнения:</p>
        <p class="orders-details__value">Нужен конструктор</p>
      </div>
      <div class="orders-details__item">
        <p class="orders-details__title">Предпочтительные регионы производства:</p>
        <p class="orders-details__value">Нужен конструктор</p>
      </div>
    </div>
    <div class="orders-details__container" v-if="type === 'service'">
      <div class="orders-details__item">
        <p class="orders-details__title">Партии:</p>
        <p class="orders-details__value">до 100</p>
      </div>
      <div class="orders-details__item">
        <p class="orders-details__title">Категории:</p>
        <p class="orders-details__value">Вязаный трикотаж  Верхняя одежда  Женская одежда  Головные уборы</p>
      </div>
      <div class="orders-details__item">
        <p class="orders-details__title">Сырье:</p>
        <p class="orders-details__value">Нужен конструктор</p>
      </div>
      <div class="orders-details__item">
        <p class="orders-details__title">Наличие СТМ:</p>
        <p class="orders-details__value">Нет</p>
      </div>
      <div class="orders-details__item">
        <p class="orders-details__title">Бесплатные образцы:</p>
        <p class="orders-details__value">По запросу</p>
      </div>
      <div class="orders-details__item">
        <p class="orders-details__title">Регион производства:</p>
        <p class="orders-details__value">Петрозаводск, Карелия Респ, Россия</p>
      </div>
    </div>
    <div class="orders-details__pub-card">
      <div class="orders-details__pub-card-image">
        <img :src='defaultImage' alt="">
        <NuxtLink to="/" class="orders-details__pub-card-link"></NuxtLink>
      </div>
      <div class="orders-details__pub-card-content">
        <NuxtLink to="/" class="orders-details__pub-card-title link">Веснушка</NuxtLink>
        <div class="orders-details__pub-card-rating">
          <CommonRating />
        </div>
        <div class="orders-details__pub-card-location">
          <i class="flag flag_round" />
          Россия
        </div>
      </div>
    </div>
    <div class="orders-details__btn-container">
      <UiButton class="orders-details__btn" variant="quinary" size="large" v-if="type === 'service'">
        <SvgoMessage class="svg-m" />
        Написать исполнителю
      </UiButton>
      <UiButton class="orders-details__btn" variant="quinary" size="large" v-if="type === 'order'">
        <SvgoMessage class="svg-m" />
        Написать Заказчику
      </UiButton>
      <UiButton class="orders-details__btn" variant="tertiary" size="around">
        <SvgoFavorite class="svg-m" />
      </UiButton>
    </div>
    <div class="orders-details__details">
      <p class="orders-details__details-title">Описание</p>
      <p class="orders-details__details-text">Нужен конструктор</p>
    </div>
    <div class="orders-details__details">
      <p class="orders-details__details-title">Условия сотрудничества</p>
      <p class="orders-details__details-text">Нужен конструктор</p>
    </div>
    <div class="orders-details__details">
      <p class="orders-details__details-title">Галерея</p>
      <CommonGallerySlider />
    </div>
  </div>
</template>

<script setup>
import defaultImage from '~/assets/images/nophoto_pc.png';

const props = defineProps({
  type: {
    type: String,
    default: '',
  }
})

</script>

<style lang="scss">

.orders-details {
  font-size: 1.6rem;

  &__container {
    display: flex;
    flex-direction: column;
    row-gap: .625em;
    margin-bottom: 1.25em;
  }

  &__item {
    display: flex;
  }

  &__title {
    margin-right: .625em;
  }

  &__pub-card {
    display: flex;
    align-items: center;
    column-gap: 1.87em;
    margin-bottom: 1.25em;
  }

  &__pub-card-image {
    flex: 0 0 13%;
    background-color: #fff;
    box-shadow: 0 0 0 1px #E4E4E4;
    position: relative;

    img {
      box-sizing: border-box;
      padding: .5em;
    }
  }

  &__pub-card-link {
    position: absolute;
    inset: 0;
  }

  &__pub-card-title {
    margin-bottom: .625em;
  }


  &__pub-card-rating {
    margin-bottom: 1em;
  }

  &__pub-card-location {
    display: flex;
    align-items: center;
    column-gap: .5em;
  }

  &__btn-container {
    display: flex;
    align-items: center;
    column-gap: 1em;
    margin-bottom: 3.125em;
  }

  &__btn {
    flex: 0 1 auto;
    display: flex;
    align-items: center;
    column-gap: .75em;
    text-transform: uppercase;
    font-size: .75em;
  }

  &__details {
    margin-bottom: 3.125em;
  }

  &__details-title {
    font-family: 'fira-sans', sans-serif;
    font-size: 1.5em;
    margin-bottom: .83em;
  }

  &__details-text {
    font-size: 1em;
  }

}

</style>