<template>
  <div class="catalog__banner">
    <div class="catalog__banner-wrapper">
      <h2 class="catalog__banner-title">Рекомендуем</h2>
      <div class="catalog__banner-content">
        <Swiper
          :slidesPerView="2"
          :spaceBetween="34"
          class="catalog__banner-slider"
          :modules="modules"
          :pagination="true"
        >
          <template v-if="data && data.length > 0">
            <SwiperSlide v-for="(item, index) in data" :key="index">
              <slot name="item" :item="item"/>
            </SwiperSlide>
          </template>
        </Swiper>
      </div>
    </div>
  </div>
</template>

<script setup>
import {Pagination} from 'swiper/modules';

const props = defineProps({
  data: {
    type: Array,
    required: true,
  }
})


const modules = [Pagination];

</script>

<style lang="scss">

.catalog__banner {
  font-size: 1rem;
  max-width: 1161px;
  box-sizing: border-box;
  margin-bottom: 6em;
  padding: 3em 1.5em;
  background-color: rgba(105, 55, 165, 0.1);
  border-radius: 15px;

  &-title {
    font-size: 3.2em;
    margin-left: .46em;
    margin-bottom: .93em;
  }

  &-slider {
    padding: .2em 1.7em 3em;
  }

  .swiper-pagination-bullet {
    background: #000;
    opacity: .2;
    scale: .66;
  }

  .swiper-pagination-bullet-active {
    background: #6937a5;
    opacity: 1;
    scale: 1;
  }

  .swiper-pagination {
    bottom: 0;
    z-index: 0;
  }

  .swiper-slide {
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    height: auto;
  }
}


</style>