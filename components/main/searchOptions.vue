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
    padding-block: 20rem 5rem}

.search-options__list {
    -moz-column-gap: 4rem;
    column-gap: 4rem;
    display: flex;
    justify-content: space-between;
}

.search-options__card {
    align-items: center;
    background-color: #f6f4ff;
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    max-width: 74rem;
    padding: 4rem 4rem 4.9rem;
    row-gap: 2.4rem;
    width: 100%
}

.search-options__title {
    color: #2a1947;
    font-family: Coolvetica,sans-serif;
    font-size: 4.8rem;
    font-weight: 400;
    line-height: .91em;
    margin: 0;
    text-align: center
}

.search-options__description {
    color: var(--text-color-octal);
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 1.5em;
    margin: 0;
    max-width: 38.3rem;
    text-align: center
}

.search-options__link {
    font-size: 1.8rem;
    font-weight: 700;
    line-height: 1.3em;
}

.search-options__image {
    height: 34.3rem;
    margin-top: 1.6rem;
    -o-object-fit: contain;
    object-fit: contain;
    width: 34.3rem;
}

@media screen and (max-width: 991px) {
    .search-options {
        padding-block:120px 68px
    }

    .search-options__list {
        align-items: center;
        flex-direction: column;
        row-gap: 16px
    }

    .search-options__card {
        box-sizing: border-box;
        max-width: none;
        padding: 24px;
        row-gap: 8px
    }

    .search-options__title {
        font-size: 22px
    }

    .search-options__description {
        font-size: 13px;
        max-width: none
    }

    .search-options__link {
        font-size: 16px;
        margin-top: 12px;
        order: 4;
        padding: 12px 24px;
        // width: 224px
    }

    .search-options__link:hover {
        background-color: rgba(126,71,196,.8)
    }

    .search-options__link:active {
        background-color: #512a7f
    }

    .search-options__image {
        height: 154px;
        margin-top: 12px;
        order: 3;
        width: 154px
    }
}
</style>