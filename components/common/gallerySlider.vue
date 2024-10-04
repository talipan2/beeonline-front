<template>
  <div class="gallery-slider">
    <Swiper
      :slidesPerView="4"
      :grid="{
        rows: 2,
        fill: 'row',
      }"
      :loopAddBlankSlides="true"
      :spaceBetween="20"
      :navigation="{
        nextEl: '.gallery-slider__pagination-button_type_next',
        prevEl: '.gallery-slider__pagination-button_type_prev'
      }"
      class="gallery-slider__container"
      :modules="modules"
    >
      <SwiperSlide v-for="(image, index) in images" :key="index">
        <a :href="image" class="gallery-slider__link" data-fancybox="gallery">
          <img :src="image" class="gallery-slider__image" alt="Image" />
        </a>
      </SwiperSlide>

    <div class="gallery-slider__btn-container">
      <UiButton @click="showGallerySlider" type="button" class="gallery-slider__btn form-group-data__btn" variant="quinary" size="large">Смотреть все фото и видео</UiButton>
      <div class="gallery-slider__pagination">
        <button class="gallery-slider__pagination-button gallery-slider__pagination-button_type_prev">
          <SvgoSlideArrow class="svg-lx" />
        </button>
        <button class="gallery-slider__pagination-button gallery-slider__pagination-button_type_next">
          <SvgoSlideArrow class="svg-lx" />
        </button>
      </div>
    </div>
    </Swiper>
  </div>
</template>

<script setup>

import { Fancybox } from '@fancyapps/ui';
import {Grid, Pagination, Navigation} from 'swiper/modules';
const modules = [Grid, Pagination, Navigation];

const showGallerySlider = () => {
  Fancybox.show(
    images.map((image) => ({
      src: image,
      type: 'image',
    })),
    {
      Thumbs: false
    }
  )
}

const images = [
  'https://i.pinimg.com/564x/ee/30/f5/ee30f54fcd2777b83a171c01580465b4.jpg',
  'https://i.pinimg.com/564x/ee/30/f5/ee30f54fcd2777b83a171c01580465b4.jpg',
  'https://i.pinimg.com/564x/ee/30/f5/ee30f54fcd2777b83a171c01580465b4.jpg',
  'https://i.pinimg.com/564x/ee/30/f5/ee30f54fcd2777b83a171c01580465b4.jpg',
  'https://i.pinimg.com/564x/ee/30/f5/ee30f54fcd2777b83a171c01580465b4.jpg',
  'https://i.pinimg.com/564x/ee/30/f5/ee30f54fcd2777b83a171c01580465b4.jpg',
  'https://i.pinimg.com/564x/ee/30/f5/ee30f54fcd2777b83a171c01580465b4.jpg',
  'https://i.pinimg.com/564x/ee/30/f5/ee30f54fcd2777b83a171c01580465b4.jpg',
  'https://i.pinimg.com/564x/ee/30/f5/ee30f54fcd2777b83a171c01580465b4.jpg',
  'https://i.pinimg.com/564x/ee/30/f5/ee30f54fcd2777b83a171c01580465b4.jpg',
  'https://i.pinimg.com/564x/ee/30/f5/ee30f54fcd2777b83a171c01580465b4.jpg',
  'https://i.pinimg.com/564x/ee/30/f5/ee30f54fcd2777b83a171c01580465b4.jpg',
  'https://i.pinimg.com/564x/ee/30/f5/ee30f54fcd2777b83a171c01580465b4.jpg',
  'https://i.pinimg.com/564x/ee/30/f5/ee30f54fcd2777b83a171c01580465b4.jpg',
  'https://i.pinimg.com/564x/ee/30/f5/ee30f54fcd2777b83a171c01580465b4.jpg',
  'https://i.pinimg.com/564x/ee/30/f5/ee30f54fcd2777b83a171c01580465b4.jpg',
  'https://i.pinimg.com/564x/ee/30/f5/ee30f54fcd2777b83a171c01580465b4.jpg',
  'https://i.pinimg.com/564x/ee/30/f5/ee30f54fcd2777b83a171c01580465b4.jpg',
  'https://i.pinimg.com/564x/ee/30/f5/ee30f54fcd2777b83a171c01580465b4.jpg',
  'https://i.pinimg.com/564x/ee/30/f5/ee30f54fcd2777b83a171c01580465b4.jpg',
  'https://i.pinimg.com/564x/ee/30/f5/ee30f54fcd2777b83a171c01580465b4.jpg',
  'https://i.pinimg.com/564x/ee/30/f5/ee30f54fcd2777b83a171c01580465b4.jpg',
  'https://i.pinimg.com/564x/ee/30/f5/ee30f54fcd2777b83a171c01580465b4.jpg',
  'https://i.pinimg.com/564x/ee/30/f5/ee30f54fcd2777b83a171c01580465b4.jpg',
];

</script>

<style lang="scss">

.swiper-grid-column>.swiper-wrapper {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-auto-flow: column;
}

.gallery-slider {
  width: 100%;
}

.gallery-slider__container {
  width: 100%;
}

.gallery-slider__link {
  position: relative;
  width: 100%;
  padding-bottom: 100%;
}

.gallery-slider__image {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: translate(-50%, -50%);
}

.gallery-slider__btn-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2em;
}

.gallery-slider__btn {
  flex: 0 1 50%;
}

.gallery-slider__pagination {
  display: flex;
  column-gap: .5em;
  // margin-right: 20px;
}



.gallery-slider__pagination-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.6rem;
  height: 3.6rem;
  position: relative;
  border-radius: 5px;
  cursor: pointer;

  svg {
    fill: var(--primary-color);
  }

  &:hover {
    background-color: var(--primary-color);
    svg {
      fill: #fff;
    }
  }

  &::before {
    content: '';
    position: absolute;
    inset: 1px;
    border-radius: 5px;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
    z-index: 222;
  }

  &_type_prev {
    svg {
      transform: rotate(180deg);
    }
  }
}

.swiper-button-disabled {
  cursor: default;
  opacity: .5;

  &:hover {
    background-color: transparent;

    svg {
      fill: var(--primary-color);
    }
  }
}

</style>