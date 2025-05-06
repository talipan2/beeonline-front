<template>
    <section class="brands container">
        <h2 class="brands__title">Больше 14 000 пользователей<br>на платформе</h2>
        <UiButton variant="quaternary" size="xl" class="brands__link">Каталог заказов</UiButton>
        <div class="brands__cards brands-swiper-container">
            <Swiper class="brands__swiper" :slides-per-view="1.4" :space-between="16" :centered-slides="true" :slides-per-group="1"
                :pagination="true" :modules="[SwiperPagination]" :loop="false" :breakpoints="breakpoints">
                <SwiperSlide class="brands__card" v-for="(brand, index) in ordersList" :key="index">
                    <div class="brands__card-header">
                        <img class="brands__card-logo" :src="brand.pubCard.logo || defaultImage" :alt="brand.pubCard.name">
                        <div class="brands__card-description">
                            <p class="brands__card-brend">
                                <span>{{ brand.pubCard.name }}</span>
                            </p>
                            <p class="brands__card-city">{{ brand.pubCard.country }}</p>
                        </div>
                    </div>
                    <div class="brands__card-image">
                        <img :src="brand.gallery || defaultImage" :alt="brand.name">
                    </div>
                    <div class="brands__card-footer">
                        <p class="brands__card-type">{{ brand.name }}</p>
                        <p class="brands__card-tags">{{ brand.product_categories }}</p>
                    </div>
                    <NuxtLink :to="`/services/${brand.id}`" class="brands__card-link"></NuxtLink>
                </SwiperSlide>
            </Swiper>
            <UiImage class="brands__gift-img" src="/assets/images/main/brands/brands-gift.webp" alt="" />
            <UiImage class="brands__package-img" src="/assets/images/main/brands/brands-package.webp" alt="" />
        </div>
    </section>
</template>

<script setup>
import { useEntityStore } from '~/store/entityStore';
import { useLocationStore } from '~/store/locationStore';

import defaultImage from '~/assets/images/nophoto_pc.png'

const entityStore = useEntityStore();
const locationStore = useLocationStore();

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
    888: { 
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

const ordersList = ref([]);

onMounted(() => {
    entityStore.getServices()
        .then(res => {
            if(res && res.data) {
                ordersList.value = res.data.map(item => {
                    return {
                        id: item.id,
                        pubCard: {
                            logo: item.pub_card && item.pub_card.logo ? item.pub_card.logo : '',
                            name: item.pub_card && item.pub_card.name ? item.pub_card.name : '',
                            country: item.pub_card && item.pub_card.country ? item.pub_card.country.name : '',
                        },
                        name: item.name,
                        gallery: item.gallery && item.gallery.length ? item.gallery[0].url : undefined,
                        product_categories: item.product_categories && item.product_categories.length ? item.product_categories.map(item => item.name).join(' , ') : '',
                    }
                });
            }
        })
})

</script>

<style lang="scss">
.brands {
    background-image: url('~/assets/images/main/brands/brands-bg.jpg');
    background-position: center 40%;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 2.4em;
    box-sizing: border-box;
    margin: 0 auto;
    padding: 7.6em 12em 10.1em;
    position: relative;
    margin-bottom: 10em;
}

.brands__swiper {
    padding-bottom: 3.2em;
}

.brands__title {
    font-family: 'Coolvetica',sans-serif;
    font-size: 6.4em;
    line-height: 1.14em;
    margin-block: 0 .5em;
    font-weight: 500;
}

.brands__link,.brands__title {
    color: var(--text-color-octonary);
    font-weight: 700;
    text-align: center
}

.brands__link {
    font-family: Involve,sans-serif;
    font-size: 1.8rem;
    margin: 0 auto 4em;
    max-width: 11.77em;
    box-sizing: border-box;
}


.brands__cards {
    width: 100%;
    max-width: 128em;
    margin: 0 auto;
}

.brands__card {
    background-color: var(--bg-secondary-color);
    border-radius: 1em;
    max-width: 40em;
    position: relative;
}

.brands__card-header {
    align-items: center;
    column-gap: .8em;
    display: flex;
    padding: 1.6em;
}

.brands__card-header img {
    flex: 0 0 4em;
    height: 4em;
    -o-object-fit: cover;
    object-fit: cover;
    width: 4em;
    border-radius: 100%;
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
    font-size: 1.4em;
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
    font-size: 1.4em;
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
    padding: 1.6em;
}

.brands__card-type {
    color: #353f58;
    font-weight: 700;
    margin-block:0 .28em
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
    border-radius: .4em;
    height: .6em;
    margin: 0 .6em;
    opacity: 1;
    width: .8em;
}

.brands .swiper-pagination-bullet-active {
    background-color: #fff;
    border-radius: .4em;
    height: .6em;
    width: 1.6em;
}

.brands .swiper-pagination {
    bottom: 0;
}

.brands__gift-img {
    height: 43.6em;
    position: absolute;
    right: -12em;
    top: -17rem;
    width: 43.6em
}

.brands__package-img {
    bottom: -11em;
    height: 29.3em;
    left: -11em;
    position: absolute;
    width: 29.3em;
}

@include desktop {
    .brands .brands__gift-img {
        height: 22.8em;
        width: 22.8em;
        top: -10em;
        right: 0;
    }

    .brands .brands__package-img {
        bottom: -10em;
        height: 26.8em;
        left: 0;
        width: 26.8em;
    }
}

@include tablet {
    .brands .brands__gift-img {
        height: 18em;
        width: 18em;
        top: -8em;
        right: 0;
    }

    .brands .brands__package-img {
        bottom: -8em;
        height: 17em;
        left: 0;
        width: 17em;
    }
}

@include mobile {
    .brands {
        border-radius:0;
        padding-block:6.4em 9.2em;
        padding-inline: 0;
    }

    .brands__title {
        font-size: 2.8em;
        margin-bottom: 2.28em
    }

    .brands__link {
        -webkit-backdrop-filter: blur(20px);
        backdrop-filter: blur(20px);
        font-size: 1.6em;
        margin-bottom: 4em;
        max-width: 14.43em;
        padding-block: 0.75em;
    }

    .brands__card-header img {
        height: 4em;
        width: 4em;
    }

    .brands__card-header {
        -moz-column-gap: .8em;
        column-gap: .8em;
        padding: 1.6em
    }

    .brands__card-brend,.brands__card-city {
        font-size: 1.4em
    }

    .brands__card-footer {
        padding: 1.6em
    }

    .brands__card-tags,.brands__card-type {
        font-size: 1.4em
    }

    .brands__gift-img {
        height: 116px;
        top: -58px;
        width: 116px
    }

    .brands__package-img {
        bottom: -5em;
        height: 13.4em;
        left: 0;
        width: 13.4em;
    }

    .brands__swiper {
      padding-bottom: 3.2em;
    }
}
</style>