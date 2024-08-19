<template>
    <section class="brands container">
        <h2 class="brands__title">Больше 10000 пользователей<br>на платформе</h2>
        <UiButton variant="quaternary" size="xl" class="brands__link">Каталог заказов</UiButton>
        <div class="brands__cards brands-swiper-container">
            <Swiper class="brands__swiper" :slides-per-view="1.7" :space-between="16" :centered-slides="true" :slides-per-group="1"
                :pagination="true" :modules="[SwiperPagination]" :loop="false" :breakpoints="breakpoints">
                <SwiperSlide class="brands__card">
                    <div class="brands__card-header">
                        <UiImage src="/assets/images/main/brands/brand-logo.png" class="brands__card-logo" />
                        <div class="brands__card-description">
                            <p class="brands__card-brend">
                                <span>Оптовый пошив Оптовый пошив Оптовый пошив Оптовый пошив</span>
                            </p>
                            <p class="brands__card-city">Оптовый пошив</p>
                        </div>
                    </div>
                    <div class="brands__card-image">
                        <UiImage src="/assets/images/main/brands/brands-1.png" />
                    </div>
                    <div class="brands__card-footer">
                        <p class="brands__card-type">Оптовый пошив </p>
                        <p class="brands__card-tags">Детская одежда</p>
                    </div>
                    <NuxtLink to="https://test.bee-online.ru/services/1469" class="brands__card-link"></NuxtLink>
                </SwiperSlide>
                <SwiperSlide class="brands__card" v-for="brand in 10" :key="brand">
                    <div class="brands__card-header">
                        <UiImage src="/assets/images/main/brands/brand-logo.png" class="brands__card-logo" />
                        <div class="brands__card-description">
                            <p class="brands__card-brend">
                                <span>Дом моды Арист asd asd as as d asd asdas sdas asddasdas dasdasdasda asd
                                    sdasdasdasdasdasdasdasd</span>
                            </p>
                            <p class="brands__card-city">Тула</p>
                        </div>
                    </div>
                    <div class="brands__card-image">
                        <UiImage src="/assets/images/main/brands/brands-1.png" />
                    </div>
                    <div class="brands__card-footer">
                        <p class="brands__card-type">Оптовый пошив изделий из легких и средних тканей</p>
                        <p class="brands__card-tags">Детская одежда, Женская одежда, Мужская одежда, Кроеный трикотаж,
                            Термобелье,
                            Верхний трикотаж, Домашняя одежда и текстиль, Спортивная одежда, Школьная форма, Разработка
                            лекал</p>
                    </div>
                    <NuxtLink to="https://test.bee-online.ru/services/1469" class="brands__card-link"></NuxtLink>
                </SwiperSlide>
            </Swiper>
            <UiImage class="brands__gift-img" src="/assets/images/main/brands/brands-gift.webp" alt="" />
            <UiImage class="brands__package-img" src="/assets/images/main/brands/brands-package.webp" alt="" />
        </div>
    </section>
</template>

<script setup>

const breakpoints = { 
    375: { 
        slidesPerView: 1.4,
        centeredSlides: true, 
        spaceBetween: 16,
    },
    500: {
        slidesPerView: 2.5,
        centeredSlides: true, 
        spaceBetween: 16,
    },
    768: { 
        slidesPerView: 3,
        centeredSlides: false, 
        spaceBetween: 16,
    }, 
    1024: { 
        slidesPerView: 3,
        centeredSlides: false, 
        spaceBetween: 24,
    }, 
    1440: { 
        slidesPerView: 4,
        spaceBetween: 24,
        centeredSlides: false,
    } 
}

</script>

<style lang="scss">
.brands {
    background-image: url('~/assets/images/main/brands/brands-bg.jpg');
    background-position: center 40%;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 24px;
    box-sizing: border-box;
    margin: 0 auto;
    padding: 7.6rem 12rem 10.1rem;
    position: relative;
    margin-bottom: 100px;
}

.brands__swiper {
    padding-bottom: 3.2rem;
}

.brands__title {
    font-family: SongerGrotesque,sans-serif;
    font-size: 6.4rem;
    line-height: 1.14em;
    margin-block:0 3.2rem;
}

.brands__link,.brands__title {
    color: var(--text-color-octonary);
    font-weight: 700;
    text-align: center
}

.brands__link {
    font-family: Involve,sans-serif;
    font-size: 1.8rem;
    margin: 0 auto 7.2rem;
    max-width: 212px;
    box-sizing: border-box;
}


.brands__cards {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
}

.brands__card {
    background-color: #fff;
    border-radius: 10px;
    max-width: 400px;
    position: relative;
}

.brands__card-header {
    align-items: center;
    column-gap: .8rem;
    display: flex;
    padding: 1.6rem;
}

.brands__card-header img {
    flex: 0 0 4rem;
    height: 4rem;
    -o-object-fit: cover;
    object-fit: cover;
    width: 4rem;
}

.brands__card-description {
    width: 100%;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis
}

.brands__card-brend {
    align-items: center;
    color: #353f58;
    display: flex;
    font-size: 1.4rem;
    font-weight: 700;
    height: 2em;
    line-height: 1em;
    margin-block:0;
}

.brands__card-brend span {
    -webkit-line-clamp: 2;
}

.brands__card-brend span,.brands__card-city {
    -webkit-box-orient: vertical;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis
}

.brands__card-city {
    -webkit-line-clamp: 1;
    color: #9ba5ad;
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 1.2em;
    margin-block:0;
    height: 1.2em;
}

.brands__card-image {
    height: 0;
    padding-top: 100%;
    position: relative;
    width: 100%
}

.brands__card-image img {
    height: 100%;
    inset: 0;
    -o-object-fit: cover;
    object-fit: cover;
    position: absolute;
    width: 100%
}

.brands__card-footer {
    padding: 1.6rem;
}

.brands__card-type {
    color: #353f58;
    font-weight: 700;
    margin-block:0 4px
}

.brands__card-tags,.brands__card-type {
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    font-size: 1.4rem;
    min-height: 3em;
    overflow: hidden;
    text-overflow: ellipsis
}

.brands__card-tags {
    color: #9ba5ad;
    font-weight: 500;
    margin: 0
}

.brands__card-link {
    height: 100%;
    inset: 0;
    position: absolute;
    width: 100%
}

.brands .swiper-pagination-bullet {
    background-color: hsla(0,0%,100%,.4);
    border-radius: 4px;
    height: 6px;
    margin: 0 6px;
    opacity: 1;
    width: 8px
}

.brands .swiper-pagination-bullet-active {
    background-color: #fff;
    border-radius: 4px;
    height: 6px;
    width: 16px
}

.brands .swiper-pagination {
    bottom: 0;
}

.brands__gift-img {
    height: 43.6rem;
    position: absolute;
    right: -12rem;
    top: -17rem;
    width: 43.6rem
}

.brands__package-img {
    bottom: -11rem;
    height: 29.3rem;
    left: -11rem;
    position: absolute;
    width: 29.3rem;
}

@include desktop {
    .brands .brands__gift-img {
        height: 228px;
        width: 228px;
        top: -100px;
        right: 0;
    }

    .brands .brands__package-img {
        bottom: -100px;
        height: 268px;
        left: 0;
        width: 268px
    }
}

@include tablet {
    .brands .brands__gift-img {
        height: 180px;
        width: 180px;
        top: -80px;
        right: 0;
    }

    .brands .brands__package-img {
        bottom: -80px;
        height: 170px;
        left: 0;
        width: 170px
    }
}

@include mobile {
    .brands {
        border-radius:0;
        padding-block:64px 92px;
        padding-inline:0
    }

    .brands__title {
        font-size: 28px;
        margin-bottom: 32px
    }

    .brands__link {
        -webkit-backdrop-filter: blur(20px);
        backdrop-filter: blur(20px);
        font-size: 16px;
        margin-bottom: 64px;
        max-width: 231px;
        padding-block:12px
    }

    .brands__card-header img {
        height: 40px;
        width: 40px
    }

    .brands__card-header {
        -moz-column-gap: 8px;
        column-gap: 8px;
        padding: 16px
    }

    .brands__card-brend,.brands__card-city {
        font-size: 14px
    }

    .brands__card-footer {
        padding: 16px
    }

    .brands__card-tags,.brands__card-type {
        font-size: 14px
    }

    .brands__gift-img {
        height: 116px;
        top: -58px;
        width: 116px
    }

    .brands__package-img {
        bottom: -50px;
        height: 134px;
        left: 0;
        width: 134px
    }

    .brands__swiper {
      padding-bottom: 32px;
    }
}
</style>