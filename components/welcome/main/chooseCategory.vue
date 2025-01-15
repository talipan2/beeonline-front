<template>
  <div class="choose-category welcome-container">
    <div class="welcome-block-wrapper">
      <h2 class="welcome-block-name">Каталог</h2>
      <h3 class="welcome-title"><span>Выберите</span> подходящую категорию одежды</h3>
      <p class="welcome-subtitle">Сервис Bee-online.ru - место, где можно найти исполнителя 
        на пошив одежды из сотен предпринимателей и фабрик по всей России, Белорусии и Казахстана
      </p>
    </div>
    <div class="choose-category__container">
      <div class="choose-category__item" v-for="(category, index) in categoryProps" :key="index">
        <p class="choose-category__item-title">{{ category.title }}</p>
        <UiImage class="choose-category__item-image" :src="category.image" :alt="category.title" />
        <div class="choose-category__item-btn">
          <SvgoSlideArrow class="svg-l" />
        </div>
        <NuxtLink :to="category.url" class="choose-category__item-link" />
      </div>
    </div>
    <div class="choose-category__link">
      <NuxtLink to="/" class="choose-category__link-button">
        Весь каталог услуг
        <SvgoSlideArrow class="svg-l" />
      </NuxtLink>
    </div>
  </div>
</template>


<script setup>

const categoryProps = [
  {id: 1, title: 'Пошив женской одежды', url: 'Описание категории', image: '/assets/images/welcome/category/category-1.png'},
  {id: 1, title: 'Пошив женской одежды', url: 'Описание категории', image: '/assets/images/welcome/category/category-2.png'},
  {id: 1, title: 'Пошив женской одежды', url: 'Описание категории', image: '/assets/images/welcome/category/category-3.png'},
  {id: 1, title: 'Пошив женской одежды', url: 'Описание категории', image: '/assets/images/welcome/category/category-4.png'},
  {id: 1, title: 'Пошив женской одежды', url: 'Описание категории', image: '/assets/images/welcome/category/category-5.png'},
  {id: 1, title: 'Пошив женской одежды', url: 'Описание категории', image: '/assets/images/welcome/category/category-6.png'},

]

</script>

<style lang="scss">

.choose-category {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  padding-block: 12em;

  &__container {
    display: flex;
    flex-wrap: wrap;
    gap: 2.4em;
    margin-bottom: 2.4em;
  }

  &__item {
    position: relative;
    flex: 0 1 32%;
    box-sizing: border-box;
    height: 385px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 2.6em 2.6em 3.2em;
    background-color: #eeeef3;
    border-radius: 24px;

    &:hover {
      .choose-category__item-btn {
        background-color: #e3e3e3;
      }
    }
  }

  &__item-title {
    font-size: 2.4em;
    font-weight: 600;
    line-height: 1.17em;
    color: #343843;
    max-width: 50%;
  }

  &__item-image {
    position: absolute;
    bottom: 0;
    right: 0;
    width: auto;
    pointer-events: none;
  }

  &__item-btn {
    background-color: #fff;
    border-radius: 100%;
    width: 4em;
    height: 4em;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    transition: background-color 0.2s ease;
  }

  &__item-link {
    position: absolute;
    inset: 0;
    z-index: 2;
  }

  &__link {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #eeeef3;
    padding-block: 4em;
    border-radius: 24px;
  }

  &__link-button {
    font-size: 2em;
    font-weight: 700;
    color: #343843;
    display: flex;
    align-items: center;
    column-gap: .6em;
  }
}

</style>

