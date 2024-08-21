<template>
  <section class="search-options container">
    <div class="search-options__list">
      <div class="search-options__card">
        <h3 class="search-options__title">Поиск заказчиков</h3>
        <p class="search-options__description">Присоединяйтесь к нашему сервису для легкой и надежной связи с
          заказчиками, чтобы гарантированно получать выгодные контракты и расти вместе с нами!</p>
        <UiButton to="https://test.bee-online.ru/orders" class="search-options__link" variant="primary" size="xl" >Каталог заказчиков</UiButton>
        <UiImage class="search-options__image" src="/assets/images/main/search-options/search-options-1.png"/>
      </div>
      <div class="search-options__card">
        <h3 class="search-options__title">Поиск исполнителей</h3>
        <p class="search-options__description">Обеспечьте своему бренду надежность, скорость и качество — найдите лучших
          исполнителей в легкой промышленности с нашим сервисом!</p>
        <UiButton to="https://test.bee-online.ru/orders" class="search-options__link" variant="primary" size="xl" >Каталог исполнителей</UiButton>
        <UiImage class="search-options__image" src="/assets/images/main/search-options/search-options-2.png"/>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.search-options {
    padding-block: 20em 5em
}

.search-options__list {
    -moz-column-gap: 4em;
    column-gap: 4em;
    display: flex;
    justify-content: space-between;
}

.search-options__card {
    align-items: center;
    background-color: #f6f4ff;
    border-radius: 2.4em;
    display: flex;
    flex-direction: column;
    max-width: 74em;
    padding: 4em 4em 4.9em;
    row-gap: 2.4em;
    width: 100%
}

.search-options__title {
    color: var(--text-color-hexadecimal);
    font-family: Coolvetica,sans-serif;
    font-size: 4.8em;
    font-weight: 400;
    line-height: .91em;
    margin: 0;
    text-align: center
}

.search-options__description {
    color: var(--text-color-octal);
    font-size: 1.6em;
    font-weight: 400;
    line-height: 1.5em;
    margin: 0;
    max-width: 23.9em;
    text-align: center
}

.search-options__link {
    font-size: 1.8rem;
    font-weight: 700;
    line-height: 1.3em;
}

.search-options__image {
    height: 34.3em;
    margin-top: 1.6em;
    -o-object-fit: contain;
    object-fit: contain;
    width: 34.3em;
}

@include mobile {
    .search-options {
        padding-block: 12rem 6.8rem;
    }

    .search-options__list {
        align-items: center;
        flex-direction: column;
        row-gap: 1.6em
    }

    .search-options__card {
        box-sizing: border-box;
        max-width: none;
        padding: 2.4em;
        row-gap: .8em;
    }

    .search-options__title {
        font-size: 2.2em
    }

    .search-options__description {
        font-size: 1.3em;
        max-width: none
    }

    .search-options__link {
        font-size: 1.6em;
        margin-top: .75em;
        order: 4;
        padding: .75em 1.5em;
        // width: 224px
    }

    .search-options__link:hover {
        background-color: rgba(126,71,196,.8)
    }

    .search-options__link:active {
        background-color: #512a7f
    }

    .search-options__image {
        height: 15.4em;
        margin-top: 1.2em;
        order: 3;
        width: 15,4em;
    }
}
</style>