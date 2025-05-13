<template>
  <div class="images-list images-list_type_desktop">
    <div class="images-list__container">
      <div 
        class="images-list__item" 
        v-for="(image, index) in visibleImages" 
        :key="image.id"
        :class="{ 'has-more': showMoreOverlay && index === visibleImages.length - 1 }"
      >
        <a :href="image.url" class="images-list__link" :data-fancybox="`service-gallery-${type}`" v-if="showFancybox">
          <UiImage class="images-list__item-image" :src="image.url" :alt="image.url" :external="true" />
        </a>
        <UiImage v-else class="images-list__item-image" :src="image.url" :alt="image.url" :external="true" />
        <div v-if="showMoreOverlay && index === visibleImages.length - 1" class="images-list__more-overlay">
          + {{ hiddenImagesCount }}
        </div>
      </div>
    </div>
    
    <UiButton
      type="button" 
      v-if="showMoreButtonVisible"
      class="images-list__show-more"
      @click="showAllImages"
      variant="quinary"
      size="large"
    >
      {{ showAll ? 'Скрыть' : 'Показать все' }}
    </UiButton>
  </div>
  <div class="images-list images-list_type_mobile">
    <template v-if="mobileSlider">
      <Swiper
        :slidesPerView="1"
        :spaceBetween="20"
        class="images-list__slider"
        :modules="modules"
        :breakpoints="{
          512: {
            slidesPerView: 1.5,
          }
        }"
        @swiper="setSwiperInstance"
        @slideChange="onSlideChange"
      >
        <SwiperSlide v-for="(image, index) in data" :key="index" class="images-list__slide">
          <a :href="image.url" class="" :data-fancybox="`gallery-${type}`">
            <img :src="image.url" class="images-list__item-image" :alt="image.url" />
          </a>
        </SwiperSlide>
      </Swiper>
      <div class="images-list__slider-navigation" v-if="data.length > 1">
        <UiButton
          type="button"
          class="images-list__slider-btn images-list__slider-btn_type_prev"
          variant="secondary"
          @click="slidePrev"
          :disabled="isBeginning"
        >
          <SvgoSlideArrow class="svg-l" />
        </UiButton>
        <UiButton
          type="button"
          class="images-list__slider-btn images-list__slider-btn_type_next"
          variant="secondary"
          @click="slideNext"
          :disabled="isEnd"
        >
          <SvgoSlideArrow class="svg-l" />
        </UiButton>
      </div>
    </template>
    <div class="images-list__container" v-if="!mobileSlider">
      <div 
        class="images-list__item" 
        v-for="(image, index) in visibleImages.slice(0, 2)" 
        :key="image.id"
        :class="{ 'has-more': showMoreOverlay && index === visibleImages.length - 1 }"
      >
        <a :href="image.url" class="images-list__link" data-fancybox="service-gallery" v-if="showFancybox">
          <UiImage class="images-list__item-image" :src="image.url" :alt="image.url" :external="true" />
        </a>
        <UiImage v-else class="images-list__item-image" :src="image.url" :alt="image.url" :external="true" />
        <div v-if="showMoreOverlay && index === visibleImages.length - 1" class="images-list__more-overlay">
          + {{ hiddenImagesCount }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Navigation } from 'swiper/modules'

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  limit: {
    type: Number,
    default: 4,
  },
  showMore: {
    type: Boolean,
    default: false,
  },
  showFancybox: {
    type: Boolean,
    default: false
  },
  mobileSlider: {
    type: Boolean,
    default: false
  },
  overlay: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['updateSlide'])

const showAll = ref(false)
const swiperInstance = ref(null)
const modules = [Navigation]
const currentSlideIndex = ref(0)

const isBeginning = ref(true);
const isEnd = ref(false);

// Вычисляемые свойства
const visibleImages = computed(() => {
  return showAll.value || (props.showMore && showAll.value) 
    ? props.data 
    : props.data.slice(0, props.limit)
})

const showMoreButtonVisible = computed(() => {
  return props.showMore && props.data.length > props.limit
})

const hiddenImagesCount = computed(() => {
  return props.data.length - props.limit
})

const showMoreOverlay = computed(() => {
  return !showAll.value && props.overlay && props.data.length > props.limit
})

// Методы
const showAllImages = () => {
  showAll.value = !showAll.value
}

const setSwiperInstance = (swiper) => {
  swiperInstance.value = swiper
}

const slidePrev = () => {
  if (swiperInstance.value) {
    swiperInstance.value.slidePrev()
  }
}

const slideNext = () => {
  if (swiperInstance.value) {
    swiperInstance.value.slideNext()
  }
}

const onSlideChange = (swiper) => {
  currentSlideIndex.value = swiper.activeIndex
  emit('updateSlide', swiper.activeIndex, props.type)
  updateNavigationState(swiper);
}

const updateNavigationState = (swiper) => {
  isBeginning.value = swiper.isBeginning;
  isEnd.value = swiper.isEnd;
};
</script>

<style lang="scss">

.images-list {
  font-size: 1rem;

  &_type_mobile {
    display: none;
  }

  &__slide {
    aspect-ratio: 1 / 1.18;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    
    a {
      position: absolute;
      inset: 0;
    }

    img {
      height: 100%;
      object-fit: cover;
    }
  }

  &__container {
    display: flex;
    gap: 2em;
    flex-wrap: wrap;
    margin-bottom: 2em;
  }

  &__item {
    flex: 0 1 calc(25% - 1.5em);
    max-width: calc(25% - 1.5em);
    position: relative;
    aspect-ratio: 1 / 1.18;
    border-radius: 8px;
    overflow: hidden;

    &.has-more {
      .images-list__item-image {
        filter: brightness(0.7);
      }
    }
    
    a {
      position: absolute;
      inset: 0;
      overflow: hidden;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    @include mobile {
      flex: 0 1 calc(50% - 1em);
      max-width: 100%;
      aspect-ratio: 1 / 1.45;
    }
  }

  &__more-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 2rem;
    font-weight: bold;
  }

  &__show-more {
    margin-left: auto;
    font-size: 1.2em;
    text-transform: uppercase;
  }

  &__slider-navigation {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: -10px;
    left: -10px;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__slider-btn {
    box-shadow: 0 2px 10px 0 rgba(89, 89, 89, 0.25);
    background: #fff;

    &_type_prev {
      transform: rotate(180deg);
    }
  }

  @include mobile {
    &_type_mobile {
      display: block;
      position: relative;
    }

    &_type_desktop {
      display: none;
    }
  }
}

</style>