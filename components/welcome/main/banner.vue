<template>
  <section class="welcome-banner">
    <Swiper class="welcome-banner__swiper" 
      :slides-per-view="1" 
      :loop="false" 
      :pagination="true" 
      :modules="[SwiperNavigation]" 
      :navigation="{ nextEl: '.welcome-banner__swiper-button_type_next', prevEl: '.welcome-banner__swiper-button_type_prev'}"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <!-- <SwiperSlide class="welcome-banner__container">
        <div class="welcome-banner__wrapper">
          <div class="welcome-banner__info">
            <h1 class="welcome-banner__title">Пошив одежды<br>на заказ</h1>
            <p class="welcome-banner__subtitle">
              Закажи пошив одежды с вашим брендированием 
              у сотен фабрик по всей стране
            </p>
            <NuxtLink class="welcome-banner__link">
              Разместить заказ
              <div class="welcome-banner__arrow">
                <SvgoLinkArrow class="svg-l" />
              </div>
            </NuxtLink>
          </div>
          <UiImage class="welcome-banner__image-left" :src="'/assets/images/welcome/banner/banner-1-1.png'" alt="Пошив одежды на заказ"/>
          <UiImage class="welcome-banner__image-right" :src="'/assets/images/welcome/banner/banner-1-2.png'" alt="Пошив одежды на заказ"/>
        </div>
      </SwiperSlide> -->
      <SwiperSlide class="welcome-banner__container welcome-banner__container_type_second" v-for="(item, index) in sliderData" :key="index" :style="{ backgroundColor: item.color }">
        <div class="welcome-banner__wrapper welcome-banner__wrapper_type_second">
          <div class="welcome-banner__info welcome-banner__info_type_second">
            <h1 class="welcome-banner__title">{{ item.title }}</h1>
            <p class="welcome-banner__subtitle">{{ item.subtitle }}</p>
            <NuxtLink type="button" @click="handleCreateOrder" class="welcome-banner__link" >
              Разместить заказ
              <div class="welcome-banner__arrow">
                <SvgoLinkArrow class="svg-l" />
              </div>
            </NuxtLink>
            <UiImage :src="item.url" alt="Заказать на пошив вязаный трикотаж" class="welcome-banner__image" :class="{ 'welcome-banner__image_type_top': index  === 9 }"/>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
    <div class="welcome-banner__navigation">
      <div class="welcome-banner__swiper-button welcome-banner__swiper-button_type_prev">
        <SvgoSlideArrow class="svg-l" />
      </div>
      <div class="welcome-banner__pagination">
        {{ currentSlide + 1 }} / {{ totalSlides }}
      </div>
      <div class="welcome-banner__swiper-button welcome-banner__swiper-button_type_next">
        <SvgoSlideArrow class="svg-l" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { useUserStore } from '~/store/userStore';


const currentSlide = ref(0);
const totalSlides = ref(0);

const onSwiper = (swiper) => {
  totalSlides.value = swiper.slides.length;
};

const onSlideChange = (swiper) => {
  currentSlide.value = swiper.realIndex;
};

const userStore = useUserStore();
const router = useRouter();

const handleCreateOrder = () => {
  router.push({path: '/register',  query: { role: 'customer', action: 'create-order' } });
  userStore.role = 'customer'
  localStorage.setItem('role', 'customer');
  settingStore.isCreateOrder = true
}

const sliderData = [
  {
    id: 1, 
    title: 'Пошив одежды на заказ', 
    subtitle: 'Закажите пошив одежды с вашим брендом у фабрик России, Кыргызстан, Турции, Китая и т.д.', 
    url: '/assets/images/welcome/banner/banner-1-1.png',
    color: '#dcdce4'
  },
  {
    id: 1, 
    title: 'Найти фабрику вязанного трикотажа', 
    subtitle: 'Закажите вязанный трикотаж с вашим брендом у фабрики', 
    url: '/assets/images/welcome/banner/banner-2.png',
    color: '#CDBAB7'
  },
  {
    id: 2, 
    title: 'Найти производителя верхней одежды', 
    subtitle: 'Верхняя одежда от производителей России, Узбекистана, Кыргызстана и т.д.', 
    url: '/assets/images/welcome/banner/banner-3.png',
    color: '#A8C0D7'
  },
  {
    id: 3, 
    title: 'Пошив детской одежды на заказ', 
    subtitle: 'Закажите детскую одежду с вашим брендом у фабрик России, Кыргызстан, Турции и т.д.', 
    url: '/assets/images/welcome/banner/banner-4.png',
    color: '#A5C37F'
  },
  {
    id: 4, 
    title: 'Пошив женской одежды на заказ', 
    subtitle: 'Закажите пошив женской одежды с вашим брендом у фабрик России, Кыргызстан, Турции, Китая и т.д.', 
    url: '/assets/images/welcome/banner/banner-5.png',
    color: '#9EA6A6'
  },
  {
    id: 5, 
    title: 'Найти производителя головных уборов', 
    subtitle: 'Головные уборы от производителей России, Узбекистана, Кыргызстана и т.д.', 
    url: '/assets/images/welcome/banner/banner-6.png',
    color: '#AAB59C'
  },
  {
    id: 6, 
    title: 'Пошив мужской одежды на заказ', 
    subtitle: 'Закажите пошив мужской одежды с вашим брендом у фабрик России, Кыргызстан, Турции, Китая и т.д.', 
    url: '/assets/images/welcome/banner/banner-7.png',
    color: '#A0A3AE'
  },
  {
    id: 7, 
    title: 'Найти фабрику кроеного трикотажа', 
    subtitle: 'Закажите кроеный трикотаж с вашим брендом у фабрики', 
    url: '/assets/images/welcome/banner/banner-8.png',
    color: '#809CB0'
  },
  {
    id: 8, 
    title: 'Найти производителя термобелья', 
    subtitle: 'Термобелье от производителей России, Узбекистана, Кыргызстана и т.д.', 
    url: '/assets/images/welcome/banner/banner-9.png',
    color: '#A2ABC9'
  },
  {
    id: 9, 
    title: 'Найти производителя носочно-чулочной продукции', 
    subtitle: 'Носочно-чулочная продукция от производителей России, Узбекистана, Кыргызстана и т.д.', 
    url: '/assets/images/welcome/banner/banner-10.png',
    color: '#E7AAAA'
  },
  {
    id: 10, 
    title: 'Найти производителя униформы и спецодежды', 
    subtitle: 'Униформа и спецодежда от производителей России, Узбекистана, Кыргызстана и т.д.', 
    url: '/assets/images/welcome/banner/banner-11.png',
    color: '#AFB6C6'
  },
  {
    id: 11, 
    title: 'Найти производителя сумок и аксессуаров', 
    subtitle: 'Сумки и аксессуары от производителей России, Узбекистана, Кыргызстана и т.д.', 
    url: '/assets/images/welcome/banner/banner-12.png',
    color: '#D4A67B'
  },
  {
    id: 12, 
    title: 'Найти поставщика ткани, фурнитуры и комплектующих', 
    subtitle: 'Ткань, фурнитура и комплектующие оптом', 
    url: '/assets/images/welcome/banner/banner-13.png',
    color: '#AFB6C6'
  },
  {
    id: 13, 
    title: 'Найти фабрику верхнего трикотажа', 
    subtitle: 'Закажите верхний трикотаж с вашим брендом у фабрики', 
    url: '/assets/images/welcome/banner/banner-14.png',
    color: '#E9AFC4'
  },
  // {
  //   id: 14, 
  //   title: 'Заказать на пошив средства индивидуальной защиты', 
  //   subtitle: 'Закажи пошив средств индивидуальной защиты с вашим брендированием у сотен фабрик по всей стране', 
  //   url: '/assets/images/welcome/banner/banner-15.png',
  //   color: '#A8C0D7'
  // },
  {
    id: 15, 
    title: 'Пошив одежды больших размеров на заказ', 
    subtitle: 'Закажите пошив одежды больших размеров с вашим брендом у фабрик России, Кыргызстан, Турции, Китая и т.д.', 
    url: '/assets/images/welcome/banner/banner-16.png',
    color: '#A1A6D1'
  },
  {
    id: 16, 
    title: 'Пошив джинсовой одежды на заказ', 
    subtitle: 'Закажите пошив джинсовой одежды с вашим брендом у фабрик России, Кыргызстан, Турции, Китая и т.д.', 
    url: '/assets/images/welcome/banner/banner-17.png',
    color: '#96A8AC'
  },
  {
    id: 17, 
    title: 'Заказать на пошив домашнюю одежду и текстиль', 
    subtitle: 'Закажите пошив домашней одежды и текстиля с вашим брендированием у сотен фабрик по всей стране', 
    url: '/assets/images/welcome/banner/banner-18.png',
    color: '#AFB6C6'
  },  
  {
    id: 18, 
    title: 'Пошив изделий из кожи и меха на заказ', 
    subtitle: 'Закажите изделия из кожи и меха с вашим брендом у фабрик России, Кыргызстан, Турции и т.д.', 
    url: '/assets/images/welcome/banner/banner-19.png',
    color: '#422F13'
  },  
  {
    id: 19, 
    title: 'Найти производителя купальников', 
    subtitle: 'Купальники от производителей России, Узбекистана, Кыргызстана и т.д.', 
    url: '/assets/images/welcome/banner/banner-20.png',
    color: '#877D75'
  },  
  {
    id: 20, 
    title: 'Пошив медицинской одежды на заказ', 
    subtitle: 'Закажите пошив медицинской одежды с вашим брендом у фабрик России, Кыргызстан, Турции и т.д.', 
    url: '/assets/images/welcome/banner/banner-21.png',
    color: '#26629A'
  },  
  {
    id: 21, 
    title: 'Найти производителя нижнего белья', 
    subtitle: 'Нижнее белье от производителей России, Узбекистана, Кыргызстана и т.д.', 
    url: '/assets/images/welcome/banner/banner-22.png',
    color: '#474747'
  },  
  {
    id: 22, 
    title: 'Найти производителя спортивной одежды', 
    subtitle: 'Закажите пошив спортивной одежды с вашим брендом у фабрик России, Кыргызстан, Турции, Китая и т.д.', 
    url: '/assets/images/welcome/banner/banner-23.png',
    color: '#6C7A87'
  },  
  // {
  //   id: 23, 
  //   title: 'Заказать на пошив школьную форму', 
  //   subtitle: 'Закажите пошив школьной формы с вашим брендированием у сотен фабрик по всей стране', 
  //   url: '/assets/images/welcome/banner/banner-24.png',
  //   color: '#58360E'
  // },  
  {
    id: 24, 
    title: 'Заказать печать на ткани', 
    subtitle: 'Закажите печать на ткани с вашим брендированием у сотен фабрик по всей стране', 
    url: '/assets/images/welcome/banner/banner-25.png',
    color: '#E7AAAA'
  }
]

</script>


<style lang="scss">

.welcome-banner {
  font-size: 1rem;
  position: relative;
  margin-bottom: 5em;

  &__swiper {
    width: 100%;
  }

  &__container {
    box-sizing: border-box;
    // padding-block: 14em 25em;
    background-color: #dcdce4;
    height: 90em;
  }

  // &__container_type_second {
  //   padding: 14em 15.6em 19em;
  // }

  &__wrapper {
    position: relative;
    max-width: 1920px;
    margin-inline: auto;
    padding-block: 14em 25em;
    box-sizing: border-box;
    height: 100%;

    &_type_second {
      display: flex;
      align-items: center;
      height: 100%;
      padding-block: 0;
      padding-inline: 15.6em;
    }
  }

  &__info {
    margin-inline: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1200px;
  }

  &__info_type_second {
    margin-inline: 0;
    align-items: flex-start;
    max-width: 45em;

    .welcome-banner__title {
      text-align: left;
      font-size: 9.6em;
      max-width: 575px;
    }

    .welcome-banner__subtitle {
      text-align: left;
      max-width: 309px;
    }
  }

  &__title {
    font-family: 'Coolvetica', sans-serif;
    font-size: 15em;
    font-weight: 500;
    line-height: 1em;
    // text-transform: uppercase;
    text-align: center;
    color: #fff;
    margin-bottom: .26em;
    z-index: 1;
    word-wrap: normal;
  }

  &__subtitle {
    font-size: 2em;
    line-height: 1.4em;
    color: #fff;
    max-width: 500px;
    text-align: center;
    margin-bottom: 3.25em;
    z-index: 1;
  }

  &__link {
    font-size: 2em;
    font-weight: 600;
    font-family: 'Inter', sans-serif;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .4em .4em .4em 1.2em;
    max-width: 15.5em;
    width: 100%;
    background-color: #fff;
    border-radius: 100px;
    z-index: 2;

    &:hover {
      background-color: #6937A5;
      color: #fff;

      .welcome-banner__arrow {
        background-color: rgba(255, 255, 255, 0.2);
      }
    }
  }

  &__arrow {
    transition: background-color .2s ease;
  }

  &__arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #6937a5;
    width: 2.4em;
    height: 2.4em;
    border-radius: 100px;

    svg {
      width: .8em;
      height: .8em;

      path {
        fill: #fff;
      } 
    }
  }

  &__image-left {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 0;
    height: 47.6em;
    width: auto;
  }

  &__image-right {
    position: absolute;
    bottom: 0;
    right: 0;
    height: 65em;
    width: auto;
    z-index: 0;
  }

  &__image {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 0;
    width: auto;

    &_type_top {
      top: 0;
      bottom: unset;
    }
  }

  &__navigation {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 8em;
    display: flex;
    align-items: center;
    column-gap: 2em;
    z-index: 1;
  }

  &__swiper-button {
    cursor: pointer;
    width: 8.8em;
    height: 8.8em;
    border-radius: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.3);
    transition: background-color .2s ease;

    
    &:hover {
      background-color: #e3e3e3;
    }

    svg {
      fill: #fff;
      width: 4.5em;
      height: 4.5em;
    }
  }

  &__swiper-button_type_prev {
    transform: rotate(180deg);
  }

  &__pagination {
    font-family: 'Lato', sans-serif;
    font-size: 2.4em;
    color: #fff;
    user-select: none;
  }

}

@include desktop {
  .welcome-banner {
    &__info_type_second {
      max-width: 37em;
      .welcome-banner__title {
        font-size: 8em;
      }
    }

    &__wrapper_type_second {
      padding-inline: 7em;
    }

    &__navigation {
      right: 7em;
    }
  }
      
}

@include tablet {
  .welcome-banner {
    &__image {
      height: 90%;
    }
  
  }
}

@include small-tablet {
  
  .welcome-banner {
    margin-bottom: 0;
    &__wrapper_type_second {
      align-items: flex-start;
      padding-top: 8em;
      padding-inline: 1.3em;
    }

    &__info_type_second {
      align-items: center;
      margin-inline: auto;
      max-width: 100%;
      width: 100%;
    }

    &__info_type_second {

      .welcome-banner__title {
        text-align: center;
        max-width: none;
        font-size: 40px;
        margin-bottom: 3.2rem;
      }

      .welcome-banner__subtitle {
        text-align: center;
        max-width: 30em;
        font-size: 18px;
        margin-bottom: 4rem;
      }
    }

    &__container {
      height: 72em;
    }

    &__image {
      height: 46%;
    }

    &__navigation {
      bottom: 0;
      top: unset;
      right: 0;
      left: 0;
      transform: unset;
      justify-content: center;
      backdrop-filter: blur(20px);
      background: rgba(255, 255, 255, 0.1);
      padding-block: 1.2rem;
      column-gap: 4.8rem;
    }

    &__swiper-button {
      width: 4.8rem;
      height: 4.8rem;

      svg {
        width: 2.8rem;
        height: 2.8rem; 
      }
    }

    &__pagination {
      font-size: 1.8em;
      font-weight: 700;
    }


  }
}

</style>